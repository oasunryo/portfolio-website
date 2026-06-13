const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const CACHE_FILE = path.join(__dirname, '.embedding_cache.json');
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Simple MD5 hash generator
function getHash(text) {
  return crypto.createHash('md5').update(text).digest('hex');
}

// Call Gemini API to get text embedding
async function fetchEmbedding(text) {
  if (!GEMINI_API_KEY) {
    return null;
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-2:embedContent?key=${GEMINI_API_KEY}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "models/gemini-embedding-2",
        content: {
          parts: [{ text: text }]
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API error (Status ${response.status}): ${errText}`);
    }

    const data = await response.json();
    if (data.embedding && data.embedding.values) {
      return data.embedding.values;
    } else {
      throw new Error("Invalid response format from Gemini API");
    }
  } catch (error) {
    console.error("❌ Error fetching embedding from Gemini:", error.message);
    return null;
  }
}

// Cosine Similarity calculation between two vectors
function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Local TF-IDF Fallback Vectorizer
function calculateLocalTfidfVectors(items) {
  // Stop words for clean term comparison (KO + EN)
  const stopWords = new Set(['은', '는', '이', '가', '을', '를', '에', '의', '와', '과', '으로', '로', '에서', '그리고', '하지만', 'the', 'a', 'and', 'or', 'in', 'on', 'at', 'to', 'of', 'for', 'with']);
  
  function tokenize(text) {
    return text.toLowerCase()
      .replace(/<[^>]*>/g, ' ') // strip HTML tags
      .replace(/[^a-zA-Z0-9가-힣\s]/g, ' ') // filter special chars
      .split(/\s+/)
      .filter(word => word.length > 1 && !stopWords.has(word));
  }

  const docsTokens = items.map(item => {
    const text = `${item.title} ${item.category} ${item.description} ${item.content}`;
    return tokenize(text);
  });

  const vocab = new Set();
  docsTokens.forEach(tokens => tokens.forEach(t => vocab.add(t)));
  const vocabArray = Array.from(vocab);

  const N = items.length;
  const idf = {};
  vocabArray.forEach(word => {
    const df = docsTokens.filter(tokens => tokens.includes(word)).length;
    idf[word] = Math.log(1 + N / (df || 1));
  });

  const vectors = {};
  items.forEach((item, index) => {
    const tokens = docsTokens[index];
    const tf = {};
    tokens.forEach(t => tf[t] = (tf[t] || 0) + 1);

    const key = `${item.lang}_${item.slug}`;
    vectors[key] = vocabArray.map(word => {
      const tfVal = tf[word] || 0;
      return tfVal * (idf[word] || 0);
    });
  });

  return vectors;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetch embeddings using Gemini API (with Cache)
async function getEmbeddingsForItems(items) {
  let cache = {};
  if (fs.existsSync(CACHE_FILE)) {
    try {
      cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
    } catch (e) {
      console.warn("⚠️ Cache file corrupt. Creating a new one.");
    }
  }

  const embeddings = {};
  const newCache = { ...cache };
  let apiCallCount = 0;
  let useFallback = false;

  for (const item of items) {
    const contentToEmbed = `Title: ${item.title}\nCategory: ${item.category}\nDescription: ${item.description}\nContent: ${item.content}`;
    const hash = getHash(contentToEmbed);
    const key = `${item.lang}_${item.slug}`;

    if (cache[key] && cache[key].hash === hash && cache[key].vector && cache[key].vector.some(v => v !== 0)) {
      embeddings[key] = cache[key].vector;
    } else {
      if (!GEMINI_API_KEY) {
        useFallback = true;
        break;
      }
      
      // Free-tier rate limit is 100 RPM, so 650ms delay keeps us safe
      await sleep(650);
      console.log(`🤖 Requesting embedding for: [${item.category}] ${item.title} (${item.slug}) [${item.lang}]...`);
      const vector = await fetchEmbedding(contentToEmbed);
      
      if (vector) {
        embeddings[key] = vector;
        newCache[key] = { hash, vector };
        // Save immediately so that subsequent builds don't re-request already succeeded ones
        fs.writeFileSync(CACHE_FILE, JSON.stringify(newCache, null, 2), 'utf8');
        apiCallCount++;
      } else {
        useFallback = true;
        break;
      }
    }
  }

  // If fallback is triggered, switch to TF-IDF logic
  if (useFallback) {
    console.warn("⚠️ Fallback Triggered: Gemini API Key is missing or invalid, or rate limit hit. Calculating similarity locally using TF-IDF algorithm.");
    return {
      vectors: calculateLocalTfidfVectors(items),
      isFallback: true
    };
  }

  return {
    vectors: embeddings,
    isFallback: false
  };
}

/**
 * Calculates similarities between all items and structures the recommendations list
 * @param {Array} allItems Array of { slug, title, category, description, content, lang }
 */
async function computeRecommendations(allItems) {
  const { vectors, isFallback } = await getEmbeddingsForItems(allItems);
  const recommendationsMap = {};

  for (const currentItem of allItems) {
    const currentSlug = currentItem.slug;
    const currentLang = currentItem.lang;
    const currentKey = `${currentLang}_${currentSlug}`;
    const vecA = vectors[currentKey];

    const similarities = [];

    for (const otherItem of allItems) {
      if (otherItem.slug === currentSlug || otherItem.lang !== currentLang || otherItem.type !== currentItem.type) {
        continue;
      }

      const otherKey = `${otherItem.lang}_${otherItem.slug}`;
      const vecB = vectors[otherKey];
      const sim = cosineSimilarity(vecA, vecB);
      
      // Scale cosine similarity depending on fallback status
      // Standard Gemini embeddings map nicely onto [0, 100]% using (sim + 1) / 2
      // TF-IDF vectors are orthogonal by nature, so direct cosine similarity [0, 1] is mapped to [0, 100]%
      let similarityPercent;
      if (isFallback) {
        similarityPercent = Math.max(0, Math.min(100, Math.round(sim * 100)));
      } else {
        similarityPercent = Math.max(0, Math.min(100, Math.round(((sim + 1) / 2) * 100)));
      }

      similarities.push({
        slug: otherItem.slug,
        category: otherItem.category,
        title: otherItem.title,
        description: otherItem.description,
        date: otherItem.date || '',
        score: similarityPercent
      });
    }

    similarities.sort((a, b) => b.score - a.score || a.slug.localeCompare(b.slug));
    recommendationsMap[currentSlug] = similarities;
  }

  return recommendationsMap;
}

module.exports = {
  computeRecommendations
};
