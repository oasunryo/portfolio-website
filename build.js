const fs = require('fs');
const path = require('path');
const newBlogPosts = require('./newBlogPosts');
const projectProseData = require('./projectsData');

// Ensure output directories exist for both Korean (ko) and English (en)
const languages = ['ko', 'en'];
languages.forEach(lang => {
  const dirLang = path.join(__dirname, lang);
  const dirBlog = path.join(__dirname, lang, 'blog');
  const dirProjects = path.join(__dirname, lang, 'projects');

  [dirLang, dirBlog, dirProjects].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
});

// Load template fragments
const headTpl = fs.readFileSync(path.join(__dirname, 'templates', 'head.html'), 'utf8');
const headerTpl = fs.readFileSync(path.join(__dirname, 'templates', 'header.html'), 'utf8');
const footerTpl = fs.readFileSync(path.join(__dirname, 'templates', 'footer.html'), 'utf8');
const noiseTpl = fs.readFileSync(path.join(__dirname, 'templates', 'noise.html'), 'utf8');

// Projects metadata used in carousel and project grid pages
const projectsMeta = [
  {
    id: 1,
    slug: "capillary-bonding",
    initials: "01",
    image: "/assets/projects/capillary_bonding.png",
    tags: ["OSAT", "Wire-bonding", "SEM", "OriginPro"],
    ko: {
      title: "Ceramic Capillary Geometry",
      category: "OSAT & 후공정",
      hostname: "Capillary Optimization",
      description: "반도체 와이어 본딩 캐필러리 형상이 First Bond 불량 모드 및 접합 신뢰성에 미치는 기계적 메커니즘을 규명하고 최적 파라미터를 도출합니다."
    },
    en: {
      title: "Ceramic Capillary Geometry",
      category: "OSAT & Packaging",
      hostname: "Capillary Optimization",
      description: "Optimizing wire-bonding capillary geometry variables (IHD, ICAD, ICBA) to minimize first bond defects and short circuits."
    }
  },
  {
    id: 2,
    slug: "packaging-test",
    initials: "02",
    image: "/assets/projects/packaging_test.png",
    tags: ["BGA", "TSV", "SI-PI", "FEM"],
    ko: {
      title: "Packaging & Test Fundamentals",
      category: "반도체 이론",
      hostname: "Advanced Packaging",
      description: "WLCSP, Flip-Chip, TSV 적층 HBM 이론부터 Warpage 휨 해석 및 SI 임피던스 매칭을 다루는 후공정 종합 엔지니어링 리서치입니다."
    },
    en: {
      title: "Packaging & Test Fundamentals",
      category: "Semiconductor Theory",
      hostname: "Advanced Packaging",
      description: "Comprehensive research covering WLCSP, Flip-Chip, TSV HBM stacking, warpage thermo-structural analysis, and SI impedance matching."
    }
  },
  {
    id: 3,
    slug: "fpga-verilog",
    initials: "03",
    image: "/assets/projects/fpga_verilog.png",
    tags: ["Verilog", "ModelSim", "FPGA", "Debouncer"],
    ko: {
      title: "FPGA & Verilog HDL Systems",
      category: "디지털 회로",
      hostname: "Digital Design",
      description: "Altera DE2 Cyclone II 보드 환경에서 버튼 글리치 제거용 Debouncing 및 가변 분주 BCD 카운터를 설계하여 5ns 전파 딜레이를 검증합니다."
    },
    en: {
      title: "FPGA & Verilog HDL Systems",
      category: "Digital Circuits",
      hostname: "Digital Design",
      description: "Designing a switch debouncer and clock-dividing BCD counter on an Altera DE2 Cyclone II board, verifying 5ns gate propagation delays."
    }
  },
  {
    id: 4,
    slug: "euv-photoresist",
    initials: "04",
    image: "/assets/projects/euv_photoresist.png",
    tags: ["EUV", "Photoresist", "FE-SEM", "AFM"],
    ko: {
      title: "TinNO₃ EUV Photoresist",
      category: "전공정 노광",
      hostname: "Photoresist Innovation",
      description: "나노 스케일 EUV 리소그래피 한계 극복을 위한 무기 주석 옥소 클러스터 기반 PR 감도 향상 및 건식 식각 저항 메커니즘을 탐구합니다."
    },
    en: {
      title: "TinNO₃ EUV Photoresist",
      category: "Front-end Lithography",
      hostname: "Photoresist Innovation",
      description: "Exploring sensitivity improvements and dry etch resistance of tin oxide cluster PRs to push limits in EUV lithography."
    }
  },
  {
    id: 5,
    slug: "spotfire-analytics",
    initials: "05",
    image: "/assets/projects/spotfire_analytics.png",
    tags: ["TIBCO-Spotfire", "EDA", "Stat-Analysis", "Yield"],
    ko: {
      title: "Spotfire Process Analytics",
      category: "수율 분석",
      hostname: "Manufacturing Yield",
      description: "반도체 대공정 설비 로그 데이터셋을 Spotfire 시각화 프로파일링하여 전위 및 Defect 발생 유발 파라미터 간 상관관계를 통계적으로 도출합니다."
    },
    en: {
      title: "Spotfire Process Analytics",
      category: "Yield Analytics",
      hostname: "Manufacturing Yield",
      description: "Profiling equipment logs using Spotfire statistical EDA tools to map correlations between parameters and dislocation/defect occurrences."
    }
  },
  {
    id: 6,
    slug: "ac-power-meter",
    initials: "06",
    image: "/assets/projects/ac_power_meter.png",
    tags: ["MCU", "AC-Power", "Sensing", "Hardware"],
    ko: {
      title: "MCU AC Power Meter",
      category: "임베디드",
      hostname: "AC Power Meter Board",
      description: "Microcontroller 기반 AC 단상 전력 측정 모듈을 구현하여 전류/전압 실시간 센싱 및 전력 계산 텔레메트리 캘리브레이션을 진행합니다."
    },
    en: {
      title: "MCU AC Power Meter",
      category: "Embedded Systems",
      hostname: "AC Power Meter Board",
      description: "Implementing a single-phase AC power sensing module with an MCU, handling real-time voltage/current sensing calibration."
    }
  },
  {
    id: 7,
    slug: "audio-level-meter",
    initials: "07",
    image: "/assets/projects/audio_level_meter.png",
    tags: ["Analog", "Filter-Design", "OP-AMP", "Orcad-Pspice"],
    ko: {
      title: "3-Band Audio Level Meter",
      category: "아날로그 회로",
      hostname: "Audio Filter Design",
      description: "Sallen-Key 구조 Active Filter 회로를 설계 및 검증하여 오디오 주파수 대역을 3개 밴드로 물리 분할하는 전압 증폭 검출 시스템을 개발합니다."
    },
    en: {
      title: "3-Band Audio Level Meter",
      category: "Analog Circuits",
      hostname: "Audio Filter Design",
      description: "Designing a Sallen-Key Active Filter topology to separate audio frequencies into three bands and capture peak amplitude envelopes."
    }
  },
  {
    id: 8,
    slug: "battery-charger",
    initials: "08",
    image: "/assets/projects/battery_charger.png",
    tags: ["CC-CV", "Power-Electronics", "ADC-Sensing", "Safety-Log"],
    ko: {
      title: "CC-CV Li-Ion Charger",
      category: "전력 전자",
      hostname: "Smart Charging Module",
      description: "리튬이온 배터리 안전 충전을 위한 CC-CV 전력 토폴로지 제어 보드를 실장하고 ADC 센싱 정밀 리포팅 회로망을 설계 및 캘리브레이션합니다."
    },
    en: {
      title: "CC-CV Li-Ion Charger",
      category: "Power Electronics",
      hostname: "Smart Charging Module",
      description: "Implementing a CC-CV power charging controller board, designing precision ADC sensing lines, and calibrating safety logs."
    }
  },
  {
    id: 9,
    slug: "battery-soc-tester",
    initials: "09",
    image: "/assets/projects/battery_soc_tester.png",
    tags: ["SOC-Estimation", "OCV-CCV", "Embedded", "Calibration"],
    ko: {
      title: "Dynamic Battery SOC Tester",
      category: "임베디드",
      hostname: "SOC Battery Tester",
      description: "OCV-CCV 내부 임피던스 동적 오차 보상 수식을 임베디드 펌웨어 상에 적용하여 충전잔량(SOC) 측정 정밀도를 혁신한 계측 툴 개발 프로젝트입니다."
    },
    en: {
      title: "Dynamic Battery SOC Tester",
      category: "Embedded Calibration",
      hostname: "SOC Battery Tester",
      description: "Improving State of Charge (SOC) estimation precision by coding dynamic OCV-CCV impedance compensation curves into MCU firmware."
    }
  }
];

// Translations dictionary for general UI elements
const localeDict = {
  ko: {
    navHomeLabel: "홈",
    navBlogLabel: "블로그",
    navProjectsLabel: "프로젝트",
    langSwitchLabel: "EN",
    titleSuffix: " | 오준서",
    backToHome: "← 홈으로 돌아가기",
    backToBlog: "← 블로그 목록으로",
    searchPlaceholder: "글 검색...",
    featuredTitle: "Featured Projects",
    featuredSubtitle: "반도체 전/후공정, 디지털/아날로그 회로설계, 임베디드 핵심 프로젝트 9선",
    viewDetails: "자세히 보기",
    careerTitle: "Career & Education",
    contactTitle: "Contact",
    contactSubtitle: "어떤 연결도 소중히 생각합니다. 언제든 편하게 연락해 주세요.",
    contactBtn: "연락하기",
    blogGreeting: "반도체 전/후공정 기술 연구 및 엔지니어로서 기록하는 유용한 경험과 깊은 생각들",
    shareAndCopy: "공유 및 복사",
    copyForLlm: "페이지 복사 (LLM용)",
    shareOnLinkedin: "LinkedIn에 공유",
    sendViaEmail: "이메일로 글 보내기",
    blogLinkText: "블로그 읽기 →",
    blogTitle: "블로그",
    blogDesc: "반도체 패키징 및 테스트 엔지니어 오준서의 기술 블로그입니다.",
    projectsTitle: "프로젝트",
    projectsDesc: "반도체 전/후공정, 아날로그/디지털 회로설계, 임베디드 핵심 수행 프로젝트 목록입니다.",
    themeToggleTooltip: "화면 테마 변경 (다크/라이트)",
    langSwitchTooltip: "English 버전으로 변경",
    linkedinTooltip: "LinkedIn 프로필 방문",
    emailTooltip: "이메일 보내기",
    websiteTooltip: "동적 포트폴리오 방문",
    githubTooltip: "GitHub 레포지토리 방문",
    shareTooltip: "글 공유 및 마크다운 복사",
    homeTitle: "오준서 | 전기공학 & 반도체 엔지니어 포트폴리오",
    homeDesc: "광운대학교 전기공학 전공 및 반도체 패키징/테스트 엔지니어 오준서의 학부 핵심 프로젝트 및 기술 블로그 포트폴리오 사이트입니다."
  },
  en: {
    navHomeLabel: "Home",
    navBlogLabel: "Blog",
    navProjectsLabel: "Projects",
    langSwitchLabel: "KO",
    titleSuffix: " | Junseo Oh",
    backToHome: "← Back to Home",
    backToBlog: "← Back to Blog list",
    searchPlaceholder: "Search posts...",
    featuredTitle: "Featured Projects",
    featuredSubtitle: "9 core engineering projects across semiconductor manufacturing, digital circuits, and embedded systems.",
    viewDetails: "Read more",
    careerTitle: "Career & Education",
    contactTitle: "Contact",
    contactSubtitle: "I value every connection. Please feel free to reach out anytime.",
    contactBtn: "Get in touch",
    blogGreeting: "Useful insights and technical research logs recorded as a semiconductor packaging & test engineer.",
    shareAndCopy: "Share & Copy",
    copyForLlm: "Copy Page (for LLMs)",
    shareOnLinkedin: "Share on LinkedIn",
    sendViaEmail: "Send via Email",
    blogLinkText: "Read Blog →",
    blogTitle: "Blog",
    blogDesc: "Technical blog of Junseo Oh, a semiconductor packaging & test engineer.",
    projectsTitle: "Projects",
    projectsDesc: "List of core engineering projects in semiconductor fabrication/packaging, analog/digital designs, and embedded systems.",
    themeToggleTooltip: "Toggle Dark/Light Theme",
    langSwitchTooltip: "Switch to Korean",
    linkedinTooltip: "Visit LinkedIn Profile",
    emailTooltip: "Send an Email",
    websiteTooltip: "Visit Dynamic Portfolio",
    githubTooltip: "Visit GitHub Repository",
    shareTooltip: "Share & Copy Markdown",
    homeTitle: "Junseo Oh | Electrical Engineering & Semiconductor Packaging Portfolio",
    homeDesc: "Personal engineering portfolio and technical blog of Junseo Oh, an Electrical Engineering student and incoming Packaging & Test engineer."
  }
};

// Home content details for both languages
const homeContentDict = {
  ko: {
    title: "오준서",
    location: "대한민국 서울",
    bio: `
      <p>
        안녕하세요. 광운대학교에서 전기공학을 전공하고 있으며, 반도체 전/후공정 이론 및 회로 설계에 깊은 관심을 가진 학부생 오준서입니다. 
        2026년 7월, 글로벌 OSAT 기업인 <strong>앰코테크놀로지(Amkor Technology)</strong>의 후공정(Packaging & Test) 분야 엔지니어로 합류할 예정입니다.
      </p>
      <br>
      <p>
        본 포트폴리오는 학부생 오준서가 실무 현장의 주니어 엔지니어로 성장하기까지 수행한 9대 핵심 프로젝트와 기술적 여정을 담고 있습니다. 
        각 프로젝트에 관한 세부 실증 분석 데이터와 SEM 비교표, 설계 시뮬레이션 결과 등은 <a href="/ko/projects/" style="color: var(--accent-color); font-weight: 500;">프로젝트 탭</a>에서 시각적으로 열람하실 수 있습니다.
      </p>
    `,
    timeline: `
      <div class="list-item">
        <div class="item-header-row">
          <div class="item-title-badge">
            <span style="font-family: var(--font-serif); font-size: 1.15rem; font-weight: 500;">Amkor Technology</span>
            <span class="status-badge">OSAT</span>
          </div>
          <span class="item-date-text">2026.07 ~ (합류 예정)</span>
        </div>
        <p class="item-role-subtitle">Packaging & Test Engineer (후공정 엔지니어)</p>
        <p class="item-description">
          글로벌 반도체 패키징 및 테스트 전문 OSAT 기업인 앰코테크놀로지 코리아에 후공정 엔지니어로 입사할 예정입니다.
        </p>
      </div>

      <div class="list-item">
        <div class="item-header-row">
          <div class="item-title-badge">
            <span style="font-family: var(--font-serif); font-size: 1.15rem; font-weight: 500;">광운대학교 (Kwangwoon University)</span>
            <span class="status-badge">학사 (B.S.)</span>
          </div>
          <span class="item-date-text">2020.03 ~ 2027.02 (졸업 예정)</span>
        </div>
        <p class="item-role-subtitle">전기공학과 학사</p>
        <p class="item-description">
          전기공학을 주전공으로 이수하였으며, 반도체 소자, 후공정 패키징 메커니즘, FPGA Verilog 논리 설계 및 시뮬레이션을 깊이 탐구했습니다.
        </p>
      </div>
    `
  },
  en: {
    title: "JUNSEO OH",
    location: "Seoul, South Korea",
    bio: `
      <p>
        Hello, I am Junseo Oh, an undergraduate student majoring in Electrical Engineering at Kwangwoon University. I have a deep engineering focus on semiconductor fabrication/packaging mechanisms and hardware circuit designs.
        In July 2026, I will join <strong>Amkor Technology</strong> (a global OSAT leader) as a Packaging & Test engineer.
      </p>
      <br>
      <p>
        This portfolio details 9 key engineering projects and technical journeys that highlight my progression as a junior engineer.
        The exact analysis logs, SEM comparison tables, and design verification waveforms can be visually browsed in the <a href="/en/projects/" style="color: var(--accent-color); font-weight: 500;">Projects tab</a>.
      </p>
    `,
    timeline: `
      <div class="list-item">
        <div class="item-header-row">
          <div class="item-title-badge">
            <span style="font-family: var(--font-serif); font-size: 1.15rem; font-weight: 500;">Amkor Technology</span>
            <span class="status-badge">OSAT</span>
          </div>
          <span class="item-date-text">2026.07 ~ (Incoming)</span>
        </div>
        <p class="item-role-subtitle">Packaging & Test Engineer</p>
        <p class="item-description">
          I am joining Amkor Technology Korea as a backend packaging & test process engineer starting July 2026.
        </p>
      </div>

      <div class="list-item">
        <div class="item-header-row">
          <div class="item-title-badge">
            <span style="font-family: var(--font-serif); font-size: 1.15rem; font-weight: 500;">Kwangwoon University</span>
            <span class="status-badge">B.S.</span>
          </div>
          <span class="item-date-text">2020.03 ~ 2027.02 (Candidate)</span>
        </div>
        <p class="item-role-subtitle">B.S. in Electrical Engineering</p>
        <p class="item-description">
          Completed a Bachelor's degree in Electrical Engineering, studying semiconductor devices, advanced packaging, and FPGA Verilog circuit design.
        </p>
      </div>
    `
  }
};

// Unified dynamic page compiler
function compilePage(content, title, description, activeNav, lang = 'ko', depth = 1, overrideLangSwitchHref = null) {
  const relPath = '../'.repeat(depth);
  const locale = localeDict[lang];

  // Dynamic template translations
  let head = headTpl
    .replace('href="/index.css"', `href="${relPath}index.css"`)
    .replace('href="/logo/favicon.svg?v=1.0.1"', `href="${relPath}logo/favicon.svg?v=1.0.1"`)
    .replace(/{{title}}/g, title)
    .replace(/{{description}}/g, description);
  
  // Parameterize Header navigation links
  const targetOppositeLang = (lang === 'ko') ? 'en' : 'ko';
  let switchTargetUrl = `./index.html`; // default fallback
  
  // Derive opposite language page target path
  if (overrideLangSwitchHref) {
    switchTargetUrl = overrideLangSwitchHref;
  } else if (activeNav === 'home') {
    switchTargetUrl = `${relPath}${targetOppositeLang}/index.html`;
  } else if (activeNav === 'blog') {
    switchTargetUrl = `${relPath}${targetOppositeLang}/blog/index.html`;
  } else if (activeNav === 'projects') {
    switchTargetUrl = `${relPath}${targetOppositeLang}/projects/index.html`;
  }

  let header = headerTpl
    .replace('{{navHomeHref}}', `${relPath}${lang}/index.html`)
    .replace('{{navHomeLabel}}', locale.navHomeLabel)
    .replace('{{navBlogHref}}', `${relPath}${lang}/blog/index.html`)
    .replace('{{navBlogLabel}}', locale.navBlogLabel)
    .replace('{{navProjectsHref}}', `${relPath}${lang}/projects/index.html`)
    .replace('{{navProjectsLabel}}', locale.navProjectsLabel)
    .replace('{{langSwitchHref}}', switchTargetUrl)
    .replace('{{langSwitchLabel}}', locale.langSwitchLabel)
    .replace('{{themeToggleTooltip}}', locale.themeToggleTooltip)
    .replace('{{langSwitchTooltip}}', locale.langSwitchTooltip);

  let footer = footerTpl
    .replace('src="/main.js"', `src="${relPath}main.js"`);

  // Mark active nav link
  if (activeNav) {
    header = header.replace(`id="nav-${activeNav}" class="nav-link"`, `id="nav-${activeNav}" class="nav-link active"`);
  }

  // Resolve root paths in contents dynamically
  let resolvedContent = content
    .replace(/href="\/ko\/"/g, `href="${relPath}ko/index.html"`)
    .replace(/href="\/ko\/blog\/"/g, `href="${relPath}ko/blog/index.html"`)
    .replace(/href="\/ko\/projects\/"/g, `href="${relPath}ko/projects/index.html"`)
    .replace(/href="\/en\/"/g, `href="${relPath}en/index.html"`)
    .replace(/href="\/en\/blog\/"/g, `href="${relPath}en/blog/index.html"`)
    .replace(/href="\/en\/projects\/"/g, `href="${relPath}en/projects/index.html"`);

  const mainClass = depth === 3 ? 'max-w-5xl' : 'max-w-2xl';

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  ${head}
</head>
<body class="antialiased flex flex-col min-h-screen">
  ${noiseTpl}
  ${header}
  <main class="w-full ${mainClass} mx-auto px-6 pt-24 pb-12 flex-grow">
    ${resolvedContent}
  </main>
  ${footer}
</body>
</html>`;
}

// Calculate estimated reading time
function calculateReadingTime(content, lang) {
  const text = content.replace(/<[^>]*>/g, ' ');
  if (lang === 'ko') {
    const chars = text.replace(/\s/g, '').length;
    const minutes = Math.max(1, Math.ceil(chars / 500));
    return minutes;
  } else {
    const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return minutes;
  }
}

// Generate Table of Contents (TOC) and inject heading IDs
function generateTocAndProcessContent(content, lang) {
  let tocItems = [];
  let index = 0;
  
  const processedContent = content.replace(/<(h2|h3)([^>]*)>([\s\S]*?)<\/\1>/gi, (match, tag, attrs, text) => {
    let id = `toc-heading-${index++}`;
    const idMatch = attrs.match(/id="([^"]*)"/i);
    if (idMatch) {
      id = idMatch[1];
    } else {
      attrs = `${attrs} id="${id}"`.trim();
    }
    
    const cleanText = text.replace(/<[^>]*>/g, '').trim();
    
    tocItems.push({
      tag: tag.toLowerCase(),
      id: id,
      text: cleanText
    });
    
    return `<${tag} ${attrs}>${text}</${tag}>`;
  });
  
  if (tocItems.length === 0) {
    return { content: processedContent, tocHtml: '' };
  }
  
  let tocHtml = `<nav class="toc-sidebar-container" aria-label="Table of Contents">`;
  tocHtml += `<div class="toc-title">${lang === 'ko' ? '목차' : 'Table of Contents'}</div>`;
  tocHtml += `<ul class="toc-list">`;
  
  tocItems.forEach(item => {
    const indentClass = item.tag === 'h3' ? 'toc-indent' : '';
    tocHtml += `<li class="toc-item ${indentClass}"><a href="#${item.id}" class="toc-link" data-heading-id="${item.id}">${item.text}</a></li>`;
  });
  
  tocHtml += `</ul>`;
  tocHtml += `</nav>`;
  
  return { content: processedContent, tocHtml: tocHtml };
}

// 1. Root index.html redirector (redirects directly to Korean version)
const rootIndexContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="icon" type="image/svg+xml" href="./logo/favicon.svg?v=1.0.1">
  <meta http-equiv="refresh" content="0; url=./ko/index.html">
  <script>window.location.replace("./ko/index.html");</script>
</head>
<body>
</body>
</html>`;
fs.writeFileSync(path.join(__dirname, 'index.html'), rootIndexContent);
console.log('Generated /index.html');

let globalAllBlogPosts = [];

// Build all localized pages for both KO and EN
languages.forEach(lang => {
  const locale = localeDict[lang];
  const homeData = homeContentDict[lang];
  const dirLang = path.join(__dirname, lang);
  const dirBlog = path.join(__dirname, lang, 'blog');
  const dirProjects = path.join(__dirname, lang, 'projects');

  // Build Carousel markup for this language (fixed template literal rendering)
  const homeCarouselContent = `
<section class="carousel-section">
  <div class="carousel-header-row">
    <div class="carousel-title-group">
      <h2 class="carousel-title">${locale.featuredTitle}</h2>
      <p class="carousel-subtitle">${locale.featuredSubtitle}</p>
    </div>
    <div class="carousel-controls">
      <button id="carousel-prev-btn" class="icon-btn" aria-label="Prev Project" disabled>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
      </button>
      <button id="carousel-next-btn" class="icon-btn" aria-label="Next Project">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </button>
    </div>
  </div>
  
  <div class="carousel-container-outer">
    <div class="carousel-container">
      ${projectsMeta.map(p => {
        const trans = p[lang];
        const imgPath = p.image.startsWith('/') ? '../' + p.image.substring(1) : p.image;
        return `
        <div class="carousel-item">
          <a href="./projects/${p.slug}/index.html" class="carousel-card">
            <img class="carousel-card-img" src="${imgPath}" alt="${trans.title}" loading="lazy">
            <div class="carousel-card-overlay"></div>
            <div class="carousel-card-content">
              <h3 class="carousel-card-title">${trans.title}</h3>
              <p class="carousel-card-desc">${trans.description}</p>
              <span class="carousel-card-more">
                ${locale.viewDetails}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </span>
            </div>
          </a>
        </div>
        `;
      }).join('\n')}
    </div>
  </div>
  
  <div class="carousel-dots">
    ${projectsMeta.map((_, idx) => `
    <button class="carousel-dot ${idx === 0 ? 'active' : ''}" aria-label="Slide ${idx + 1}"></button>
    `).join('\n')}
  </div>
</section>
`;

  // 2. Home Page (/ko/index.html or /en/index.html)
  const homeContent = `
<section class="flex flex-col gap-6 pt-6 md:pt-12">
  <h1 class="name-title">${homeData.title}</h1>
  <div class="meta-info-row">
    <span class="inline-flex items-center gap-1.5">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
      <span>${homeData.location}</span>
    </span>
  </div>
  
  <div class="intro-paragraph">
    ${homeData.bio}
  </div>

  <div class="social-row-container">
    <div class="social-icons-group">
      <a href="https://linkedin.com/in/junseo-oh" target="_blank" rel="noopener noreferrer" class="social-icon-link" aria-label="LinkedIn" data-tooltip="${locale.linkedinTooltip}">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
      </a>
      <a href="mailto:junseo.oh.kr@gmail.com" class="social-icon-link" aria-label="Email" data-tooltip="${locale.emailTooltip}">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
      </a>
      <a href="https://portfolio-tau-five-85.vercel.app" target="_blank" rel="noopener noreferrer" class="social-icon-link" aria-label="Website" data-tooltip="${locale.websiteTooltip}">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
      </a>
      <a href="https://github.com/oasunryo/portfolio-website" target="_blank" rel="noopener noreferrer" class="social-icon-link" aria-label="GitHub" data-tooltip="${locale.githubTooltip}">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
      </a>
    </div>
    <a href="./blog/index.html" class="blog-text-link">
      ${locale.blogLinkText}
    </a>
  </div>
</section>

<section class="space-y-6" style="margin-top: 4rem;">
  <h2 class="section-title">${locale.careerTitle}</h2>
  <div class="list-container">
    ${homeData.timeline}
  </div>
</section>
`;

  fs.writeFileSync(path.join(dirLang, 'index.html'), compilePage(homeContent, locale.homeTitle, locale.homeDesc, 'home', lang, 1));
  console.log(`Generated /${lang}/index.html`);


  // 3. Blog List & Individual Blog Articles
  const blogPosts = [
    {
      slug: 'semiconductor-packaging-whitepaper',
      date: '2026-06-03',
      category: 'Architecture',
      ko: {
        title: '이력서를 시스템 아키텍처로 엔지니어링하다',
        description: 'Figma 스타일의 반응형 웹 포트폴리오 기획 의도와 Zero-Dependency 아키텍처 설계 과정을 기술한 시스템 엔지니어링 백서입니다.',
        content: `
          <h2>이력서도 결국엔 하나의 제품이어야 하니까</h2>
          <p>맨날 똑같은 스크롤 방식이나 이력서 템플릿 양식은 정말 재미도 없고 한계도 명확해요. 특히 나처럼 반도체 후공정(Packaging & Test)처럼 입체적인 공정 설계 데이터를 보여줘야 하는 사람한테는 더 그렇죠. 그래서 고민을 하다가 <strong>"나의 기술적 커리어와 학부 프로젝트 기록들을 피그마 컴포넌트 설계판처럼 구성해보면 어떨까?"</strong>라는 질문에서 이 프로젝트가 시작되었습니다.</p>
          <p>가장 중요한 설계 원칙은 <strong>프레임워크(React, Vue 등)의 도움 없이 Zero-Dependency(Pure HTML5, Vanilla CSS, Clientside JavaScript)로만 핵심 뷰포트와 줌-스케일링 렌더러를 만드는 것</strong>이었습니다. 괜히 무거운 프레임워크 얹어서 초기 로딩 무겁게 하거나 불필요한 번들링 과정을 다 빼고, 코드로 직접 성능과 크로스 브라우징을 제어하고 싶었습니다.</p>
          
          <hr>
          
          <h2>Figma 3-Stage Layout & 오토 줌 엔진</h2>
          <p>단순 나열을 버리고 Stage 1(아날로그/HW), Stage 2(디지털/Verilog), Stage 3(OSAT/후공정 실무)로 구획을 나눠 피그마 특유의 보라색 컴포넌트 세트(border: 2px dashed #9333EA) 안에 집어넣었습니다. 뷰포트 크기에 따라 화면이 깨지거나 잘리는 현상을 방지하기 위해 가로폭과 세로폭을 조율해 정비율로 리사이징하는 축척 엔진을 main.js에 구현해서, 어느 기기에서 접속하든 마치 피그마 캔버스를 들여다보는 듯한 느낌을 줍니다.</p>
          
          <hr>
          
          <h2>치열했던 트러블슈팅 세 가지</h2>
          <ul>
            <li><strong>Case 1. 중첩 트리 뷰 붕괴 버그</strong>: 하위 계층을 접었을 때 글자가 화면 밖으로 밀려나오는 심각한 레이아웃 버그가 있었습니다. CSS의 자손 선택자가 문제였는데, 직계 자식 결합자(&gt;)로 교체해 하위 상자의 overflow 상태 전이를 완벽하게 차단하면서 끝냈습니다.</li>
            <li><strong>Case 2. 다국어 번역 누수</strong>: KO/EN 전환 시 일부 피그마 컴포넌트의 라벨 번역이 누락되었습니다. 탐색 범위를 특정 탭 영역에서 document 전체([data-ko])로 풀면서 해결했습니다.</li>
            <li><strong>Case 3. 상세 패널 스크롤 캐싱</strong>: 긴 상세 설명을 스크롤해서 읽은 다음 닫고 다른 카드를 열면 이전 스크롤 깊이가 그대로 남아있었습니다. 모달이 열릴 때 scrollTop = 0으로 매번 리셋 코드를 명시해 깔끔하게 원천 초기화시켰습니다.</li>
            <li><strong>Case 4. Safari 뷰포트 안전영역 및 오버레이 끊김 버그</strong>: iOS Safari에서 헤더 상단이 뚫려 보이거나 모달 개방 시 상/하단 툴바에 흰색 여백이 분리되어 뒷배경이 노출되는 버그가 있었습니다. \`viewport-fit=cover\` 설정과 safe-area 패딩 연산을 가미하고, 모달 개방 시 body 배경을 블랙(\`background-color: #000000 !important\`)으로 강제 전이시키는 JS-CSS 동기화를 거쳐 사파리 특유의 여백 끊김 현상을 원천 방지했습니다.</li>
            <li><strong>Case 5. 소셜 웹 링크 연동 및 파비콘 다국어 크로스 브라우징 버그</strong>: 포트폴리오 메인 화면의 지구본 아이콘 툴팁을 '동적 포트폴리오 방문'으로 수정하고 전용 도메인 배포 링크(\`https://portfolio-tau-five-85.vercel.app\`)로 연동을 업데이트했습니다. 추가적으로 영문 버전에서는 파비콘(Favicon.svg)이 노출되나 한글 버전 하위 경로 및 특정 로컬 환경에서 노출되지 않는 절대 경로 버그가 있어, 빌드 스크립트(build.js)에서 파비콘을 상대 경로(\`\${relPath}logo/favicon.svg?v=1.0.1\`)로 치환 컴파일하도록 수정했습니다. 또한 Safari 브라우저의 파비콘 캐시 고착 현상을 우회하도록 캐시 무력화(Cache Busting) 버전을 추가하여 다국어 페이지 전반의 파비콘 정합성을 완전히 맞췄습니다.</li>
          </ul>
        `
      },
      en: {
        title: 'Engineering a Resume into a System Architecture',
        description: 'A system engineering whitepaper outlining the design intent and Zero-Dependency architecture of a Figma-style interactive web portfolio.',
        content: `
          <h2>A resume is ultimately a product to be engineered</h2>
          <p>Standard chronological resumes are boring and cannot show multi-dimensional structures. For semiconductor packaging engineers who need to show complex 3-stage process flow configurations, it is even worse. This portfolio was born with a single question: <strong>"What if I package my entire undergrad engineering career into a visual Figma-blueprint workspace?"</strong></p>
          <p>My primary rule was to build a <strong>Zero-Dependency core (pure HTML, CSS, client-side JS)</strong> without depending on heavy modern frameworks (React or Vue). This kept initial load speeds instant and removed build complexities, putting rendering performance directly under vanilla control.</p>
          
          <hr>
          
          <h2>Figma 3-Stage Layout & Auto-Zoom Engine</h2>
          <p>I structured projects into Stage 1 (Analog & HW Core), Stage 2 (Digital & Data), and Stage 3 (OSAT & Packaging), enclosing them in border: 2px dashed #9333EA component blocks. To prevent layout clip errors, I coded a dynamic scaling formula in main.js to keep aspect ratios pixel-perfect on any device.</p>
          
          <hr>
          
          <h2>Resolving Visual Bugs</h2>
          <ul>
            <li><strong>Case 1. Nested Tree Collapses</strong>: Collapsed child tree elements leaked text. Using child combinators (&gt;) instead of broad sibling rules kept overflow states localized.</li>
            <li><strong>Case 2. Dynamic Translation Leaks</strong>: Canvas labels missed KO/EN locale updates. Broadening the query selector to document-wide [data-ko] targets solved it.</li>
            <li><strong>Case 3. Detail Peek Scroll Cash</strong>: Reopening peek panels kept scrolled offset positions. Forcing a clear scrollTop = 0 trigger reset it clean.</li>
            <li><strong>Case 4. Safari Viewport Gap & Overlay Cutoff</strong>: In iOS Safari, the top of the header appeared hollow, and opening modals left white borders at the top/bottom bars. By injecting \`viewport-fit=cover\`, safe-area-inset padding calculations, and forcing a black body background (\`background-color: #000000 !important\`) during modal active states, we resolved Safari's safe area layout clipping and achieved seamless glassmorphic overlays.</li>
            <li><strong>Case 5. Social Website Link Integration & Favicon Path Optimization</strong>: Updated the globe social icon tooltip to 'Visit Dynamic Portfolio' and pointed its link to the new production deployment (\`https://portfolio-tau-five-85.vercel.app\`). Additionally, solved an issue where the favicon (favicon.svg) would not display on Korean locale pages or specific localized subpaths due to absolute path references. By programmatically converting the favicon URL to a relative path with cache busting query (\`\${relPath}logo/favicon.svg?v=1.0.1\`) during compile time in build.js, we bypassed Safari's aggressive favicon cache and ensured robust rendering across all subfolders.</li>
          </ul>
        `
      }
    },
    {
      slug: 'amkor-technology-joining-2026',
      date: '2026-05-20',
      category: 'Insight',
      ko: {
        title: '글로벌 OSAT 앰코테크놀로지 합류를 준비하며',
        description: '2026년 7월 앰코테크놀로지 코리아 후공정(Packaging & Test) 분야에 입사하기 전, 학부생으로서 쌓아온 전/후공정 전공 지식과 성장 목표를 되돌아봅니다.',
        content: `
          <h2>반도체 기술의 중심이 후공정으로 옮겨가고 있다</h2>
          <p>미세 전공정(Front-end)이 물리적 한계에 봉착하면서, 적층과 물리적 연결을 최적화하는 후공정(Advanced Packaging) 기술이 반도체 패러다임을 이끄는 핵심 윈도우가 되었습니다. 저는 글로벌 OSAT 1티어인 앰코테크놀로지 합류를 결정하고, 현장 엔지니어가 되기 위한 실무적 기본기를 갖추기 위해 많이 노력했습니다.</p>
          <p>학부 과정에서 와이어 본딩 캐필러리(Capillary) 형상 변수가 미세 단락(Short)과 First Bond 인장 성능에 미치는 영향력을 통계적으로 규명해보고, HBM 적층을 위한 TSV 기술, Warpage 휨 제어, SI-PI 임피던스 매칭 등을 개인 리서치로 공부했습니다.</p>
          
          <hr>
          
          <h2>입사 후 내가 채워가고 싶은 미션</h2>
          <p>50μm 이하의 극미세 파인 피치(Fine-pitch) 본딩 라인에서 나타날 수 있는 기계적 불량 매커니즘을 빠르게 추적하고, Spotfire나 OriginPro 같은 데이터 툴을 적재적소에 활용해 전위/결함 상관관계를 시각화하는 데이터 기반의 후공정 트러블슈터가 되고 싶습니다. 단순 설비 관리자가 아닌, 공정 데이터를 읽고 아키텍처적 개선안을 제안하는 똑똑한 엔지니어로 성장할 생각입니다.</p>
        `
      },
      en: {
        title: 'Preparing to Join Global OSAT Amkor Technology',
        description: 'Reflecting on backend process packaging and testing knowledge built as an undergraduate before joining Amkor Technology Korea in July 2026.',
        content: `
          <h2>Semiconductor packaging is now leading performance scaling</h2>
          <p>As front-end lithography hits physical boundaries, packaging technologies hold the key to performance boosts. I chose to join Amkor Technology Korea, a premier global OSAT leader, and have focused on laying down practical backend fundamentals.</p>
          <p>I researched capillary dimensions in wire bonding to see how variables affect first-bond reliability, studied TSV interconnections for HBM, and modeled high-frequency signal integrity impedance matchings on PCBs.</p>
          
          <hr>
          
          <h2>My Mission at Amkor</h2>
          <p>I will target defect rates in ultra-fine pitch bond lines under 50μm. By utilizing statistics and data tools like Spotfire and OriginPro, I aim to map parameter correlations to improve manufacturing yields, growing into a data-driven troubleshooter.</p>
        `
      }
    },
    {
      slug: 'fpga-verilog-digital-design',
      date: '2026-04-18',
      category: 'Hardware',
      ko: {
        title: 'Verilog HDL 디바운싱 필터 설계와 게이트 딜레이 검증',
        description: 'FPGA 보드 실습 시 기계적 노이즈인 Bouncing/Glitch 현상을 다단 시프트 플립플롭 Debouncer로 원천 제어하고 5ns의 배선 게이트 전파 지연을 ModelSim으로 검증해 봅니다.',
        content: `
          <h2>물리적 스위치와 디지털 시스템의 마찰</h2>
          <p>하드웨어 푸시 버튼은 누를 때 우리 눈엔 깔끔하게 작동하는 것 같아도, 실제 회로상으로는 접점이 닿으며 수 밀리초(ms) 간 무수히 튀는 바운싱(Bouncing/Glitch) 잡음을 만들어냅니다. 클럭 주파수가 50MHz에 이르는 FPGA 보드에서는 이 찰나의 흔들림을 여러 번 입력한 것으로 오작동해버리죠.</p>
          <p>이를 막으려면 아날로그 노이즈를 걸러내는 디지털 필터링 회로가 필수적입니다.</p>
          
          <hr>
          
          <h2>디바운서 설계 및 게이트 전파 지연 검증</h2>
          <p>이 문제를 해결하기 위해 Verilog HDL로 D플립플롭(D-FF)을 3단으로 연결한 시프트 레지스터 기반의 Debouncer를 구현했습니다. 입력 신호가 50클럭 이상 안정된 상태를 유지할 때에만 신호 레벨을 전환하도록 필터링해 스위칭 오작동을 완전히 잡았습니다.</p>
          <p>Altera Cyclone II 보드와 ModelSim 환경에서 타이밍 시뮬레이션을 돌려, 물리적인 게이트와 배선 길이로 인해 발생하는 약 5ns의 게이트 전파 지연(Propagation Delay)을 포착하고 타이밍 마진을 정상 검증해냈습니다.</p>
        `
      },
      en: {
        title: 'Verilog HDL Debouncer Design & Gate Propagation Delay Verification',
        description: 'Using a multi-stage shift register debouncer to eliminate switch bounce noise on a Cyclone II FPGA board and verifying a 5ns gate propagation delay with ModelSim.',
        content: `
          <h2>Physical switches are incredibly noisy</h2>
          <p>When you press a tactile switch, the metal contacts bounce rapidly for milliseconds. On a 50MHz FPGA, this mechanical chatter is read as hundreds of rapid inputs. An analog-to-digital filtering buffer is required.</p>
          
          <hr>
          
          <h2>Debouncer Architecture & ModelSim Timing</h2>
          <p>I designed a 3-stage D-FF shift register debouncer in Verilog HDL. It delays the switch logic until the signal remains stable for a set clock duration, suppressing mechanical bounce.</p>
          <p>Using gate-level simulations in ModelSim, I verified a 5ns wire propagation delay, confirming how physical lines affect digital signals.</p>
        `
      }
    },
    {
      slug: 'vibe-coding-to-harness-engineering',
      date: '2026-06-04',
      category: 'Architecture',
      ko: {
        title: '바이브 코딩에서 하네스 엔지니어링으로: AI 개발의 한계 뚫기',
        description: '자연어로 대충 부탁하는 "바이브 코딩"을 넘어, AI 에이전트가 안전하고 정확하게 동작할 수밖에 없도록 통제 환경(Harness)을 만드는 패러다임을 제안합니다.',
        content: `
          <h2>그냥 자연어로 부탁만 해서는 한계가 뻔하다</h2>
          <p>프롬프트 창에 대충 "이것 좀 구현해줘"라고 명령해서 그럴듯한 코드를 받아내는 것을 안드레이 카파시는 <strong>'바이브 코딩(Vibe Coding)'</strong>이라고 불렀어요. 바이브 코딩은 개발을 모르는 사람들의 바닥(Floor)을 끌어올려주는 데는 탁월하지만, 복잡하고 실무적인 대형 프로젝트를 정교하게 완성해야 하는 시점에서는 천장(Ceiling)을 올리지 못합니다. AI가 계속 실수를 반복하거나 엉뚱한 파일을 망가뜨리기 때문이죠.</p>
          <p>이 지점에서 개발의 질을 바꾸려면 <strong>'하네스 엔지니어링(Harness Engineering)'</strong>이 필요합니다.</p>
          
          <hr>
          
          <h2>AI가 마음대로 탈주하지 못하게 하는 안전망</h2>
          <p>하네스(Harness)는 마차의 말에게 씌우는 마구처럼, AI 에이전트가 지정된 경로 밖으로 나가지 못하게 통제하는 <strong>'안전 샌드박스와 통제 장치'</strong>를 의미해요. 에이전트에게 너무 광범위한 권한이나 애매한 지시를 주기보다, 자동 테스트 파이프라인(TDD)을 엮어주거나, 프로젝트의 파일 규칙 및 스키마 가이드를 세워 제한된 도구만 쥐여줄 때 AI는 비로소 예측 가능하고 안전하게 기능합니다.</p>
          <p>AI 모델이 내뱉은 결과에 분노하며 프롬프트를 고칠 시간에, AI가 잘 작동할 수밖에 없는 명확한 시스템 구조와 통제망을 구축하는 것이 앞으로의 현대 개발자가 해야 할 진짜 프로그래밍입니다.</p>
        `
      },
      en: {
        title: 'From Vibe Coding to Harness Engineering: Pushing AI Coding Limits',
        description: 'Moving past lazy chat-based vibe coding to design rigorous execution sandboxes (Harnesses) that force AI agents to perform reliably.',
        content: `
          <h2>Natural language pleas have clear limits</h2>
          <p>Asking an LLM chat screen to "write this code" is what Andrej Karpathy calls <strong>"Vibe Coding."</strong> Vibe coding lifts the entry floor for non-developers, but fails to raise the execution ceiling when engineering large-scale enterprise systems, as agents repeatedly commit logic bugs.</p>
          <p>This is where we need <strong>"Harness Engineering."</strong></p>
          
          <hr>
          
          <h2>Force AI agents to stay on course</h2>
          <p>A harness acts like a horse\'s reins, locking the AI agent within a controlled execution sandbox. Instead of giving agents unlimited scope and vague requests, we must build automated test runners (TDD) and strict code structure guidelines. Designing constraint architectures is the modern software developer\'s real role.</p>
        `
      }
    },
    {
      slug: 'thinking-vs-understanding-karpathy',
      date: '2026-06-03',
      category: 'Insight',
      ko: {
        title: '생각은 아웃소싱할 수 있지만, 이해는 아웃소싱할 수 없다',
        description: 'AI가 생각의 과정을 대신해주는 소프트웨어 3.0 시대, 인간 엔지니어에게 남아있는 대체 불가능한 역량이 무엇인지에 대해.',
        content: `
          <h2>Thinking은 위임하되, Understanding은 쥐고 있어라</h2>
          <p>안드레이 카파시가 남긴 아주 인상 깊은 통찰이 있어요. <strong>"Thinking can be outsourced, but Understanding cannot."</strong></p>
          <p>코드를 한 줄씩 타이핑하고, 버그가 생겼을 때 트러블슈팅 라인을 짜거나, 대규모 데이터를 분석하고 정형화하는 복잡하고 고된 '생각의 흐름'은 AI 에이전트에게 전적으로 아웃소싱할 수 있는 시대에 도달했습니다. 2026년은 이미 AI가 인간보다 빠르고 정교하게 코드를 뱉고 있죠.</p>
          
          <hr>
          
          <h2>진짜 엔지니어링의 본질</h2>
          <p>그렇다면 인간 엔지니어는 무엇을 해야 할까요? 바로 <strong>'이해와 의사결정'</strong>입니다. 이 시스템이 왜 이렇게 설계되어야 하는지, 비즈니스의 수수료 아키텍처나 사용자 약관 동의 등 현실의 요구사항이 공학 디자인과 어떻게 얽히는지에 대한 '깊은 맥락의 이해'는 AI에게 맡길 수 없습니다.</p>
          <p>단순 코더는 도태되겠지만, 전체 시스템을 조망하고 조율하는 '이해' 능력을 갖춘 사람은 AI 아키텍트를 지휘하며 개발 생산성을 기하급수적으로 확장시킬 수 있습니다.</p>
        `
      },
      en: {
        title: 'Thinking Can Be Outsourced, But Understanding Cannot',
        description: 'In the Software 3.0 era where LLMs handle coding logistics, what is the irreplaceable value of a human engineer?',
        content: `
          <h2>Outsource the coding logistics, keep the system vision</h2>
          <p>Andrej Karpathy delivered a powerful quote: <strong>"Thinking can be outsourced, but Understanding cannot."</strong> The heavy cognitive load of writing boilerplate, fixing logic errors, and compiling data can now be shifted to AI. In 2026, AI coders write syntax faster than humans.</p>
          
          <hr>
          
          <h2>The core of real engineering</h2>
          <p>What is left for the human engineer? It is <strong>"Systemic Understanding."</strong> Why this architecture fits the business logic, how real-world safety policies map to database schemas—this cannot be delegated. Engineers who master this understanding will orchestrate teams of AI agents.</p>
        `
      }
    },
    {
      slug: 'agent-tool-diet-strategy',
      date: '2026-06-01',
      category: 'Architecture',
      ko: {
        title: 'AI 에이전트의 효율을 극대화하는 "도구 다이어트" 설계 전략',
        description: '에이전트에게 너무 많은 스킬과 권한을 주면 왜 망가지는지, 왜 도구를 덜 쥐어주는 미니멀리즘이 작동하는지 알아봅니다.',
        content: `
          <h2>선택장애는 AI 에이전트도 겪는다</h2>
          <p>보통 AI 에이전트에게 터미널 명령어 실행, 웹 검색, 파일 읽기/쓰기, 데이터베이스 조회 등 가능한 모든 도구(Tool/API)를 다 제공해주면 뭐든 척척 다 해결할 것 같지만, 실제 에이전트를 가동해보면 전혀 그렇지 않습니다. 선택지가 지나치게 많아지면 모델은 현재 맥락에서 굳이 필요 없는 도구를 순회하고 고민하느라 정작 풀고자 하는 본래의 추론 능력을 낭비하게 됩니다.</p>
          <p>사람과 똑같아요. 눈앞에 도구상자가 너무 화려하게 놓여있으면 어떤 것부터 써야 할지 몰라 헤매는 법이죠.</p>
          
          <hr>
          
          <h2>적게 줄수록 똑똑해지는 이유</h2>
          <p>이를 방지하려면 <strong>'도구 다이어트(Tool Diet)'</strong>가 필수적입니다. 현재 당면한 특정 서브 태스크에 필수적인 2~3개의 핵심 도구만 쥐여주고 나머지는 가차 없이 차단하는 구조가 좋습니다. 도구가 작아지면 AI의 의사결정 트리가 극도로 단순해져 모델이 온전히 코드의 내부 추론과 정확성에만 집중하게 됩니다.</p>
          <p>더 많은 기능을 얹어주려 애쓰기보다, 적절한 통제망을 씌워 필요한 상황에만 필요한 도구가 켜지게 설계하는 디자이너가 진짜 생산성 높은 AI 워크스페이스를 만듭니다.</p>
        `
      },
      en: {
        title: 'Maximizing AI Agent Efficiency via the "Tool Diet" Strategy',
        description: 'Why overloading LLM agents with too many APIs degrades performance, and how minimalist toolkits build smarter assistants.',
        content: `
          <h2>AI agents suffer from choice overload too</h2>
          <p>Giving a developer agent terminal access, web searching, file editing, and databases all at once seems optimal, but it is counter-productive. With too many tool choices, agents waste tokens choosing which tools to use rather than thinking about the coding task. Decisional paralysis happens in silicon too.</p>
          
          <hr>
          
          <h2>Fewer tools yield smarter reasoning</h2>
          <p>Applying a <strong>"Tool Diet"</strong> improves success rates. By provisioning only 2 or 3 critical APIs needed for the immediate sub-task, we keep decision trees small. This focuses the LLM\'s reasoning purely on logical verification and output quality.</p>
        `
      }
    },
    {
      slug: 'clean-folder-structure-as-prompt',
      date: '2026-05-29',
      category: 'Architecture',
      ko: {
        title: '깨진 유리창 이론과 AI 코딩: 폴더 구조 자체가 거대한 프롬프트다',
        description: '지저분한 파일 구조에서는 AI도 쓰레기 코드를 뱉습니다. 프로젝트의 물리적 환경을 정돈해야 하는 진짜 이유.',
        content: `
          <h2>지저분한 방에서 AI는 아무렇게나 어지럽힌다</h2>
          <p>AI 에이전트를 불러와 프로젝트에 작업을 지시할 때, 프로젝트의 루트 폴더에 온갖 임시 파일(scratch, temp)이 굴러다니고 폴더명이나 파일 네이밍 룰이 엉망이면 AI가 작성하는 코드 역시 가독성이 떨어지고 엉망이 됩니다. 이는 <strong>'깨진 유리창 이론(Broken Windows Theory)'</strong>이 AI 영역에도 그대로 통용되기 때문이에요.</p>
          <p>AI 에이전트는 작업을 시작하는 순간 전체 디렉토리 트리 구조와 파일 구성 자체를 하나의 거대한 물리적 '맥락(Context/Prompt)'으로 흡수하여 인지합니다.</p>
          
          <hr>
          
          <h2>환경 정돈이 성능을 결정한다</h2>
          <p>프로젝트 디렉토리가 규칙적이고 깔끔하게 설계되어 있으면, AI는 "아, 이 프로젝트는 정교한 유지보수가 필요한 규칙적인 코드를 작성해야 하는구나" 하고 그 구조적 템플릿과 톤을 그대로 학습해 정갈한 코드를 구현합니다. 폴더 구조, CSS 변수 정의 파일, 리팩토링 스키마를 정갈하게 통일하는 것 자체가 에이전트의 오작동율을 30% 이상 떨어뜨리는 강력한 보이지 않는 프롬프트 역할을 합니다.</p>
        `
      },
      en: {
        title: 'Folder Structure is a Giant Prompt: The Broken Windows Theory in AI Coding',
        description: 'Dirty workspace directories breed messy code generations. Why neat physical architectures dictate AI quality.',
        content: `
          <h2>A messy workspace guides AI to generate messy code</h2>
          <p>If your project root is littered with temp files and inconsistent naming conventions, the AI agent will follow suit and generate poor quality code. The <strong>Broken Windows Theory</strong> applies directly to AI development. Agents absorb the workspace layout as context before beginning their task.</p>
          
          <hr>
          
          <h2>Clean files drive high-quality outputs</h2>
          <p>Keeping directory structures logical acts as a continuous silent prompt. When an agent reads clean components and unified CSS variables, it mimics that neat coding style. Tidying up your directories is the highest leverage prompt engineering.</p>
        `
      }
    },
    {
      slug: 'private-notebooklm-safari-obsidian',
      date: '2026-06-01',
      category: 'Insight',
      ko: {
        title: '8GB 램 맥북에서 쌩쌩 돌아가는 프라이빗 로컬 "NotebookLM" 구축기',
        description: 'Zotero 7 + Safari + Obsidian (Copilot + Gemini API) 연동을 통해 리소스를 쓰지 않고 완벽한 개인 지식 데이터 분석 파이프라인을 구축하는 방법.',
        content: `
          <h2>무겁게 로컬 LLM을 돌릴 필요가 없다</h2>
          <p>연구 논문이나 전공 PDF 수백 장을 분석할 때 로컬 LLM(Ollama 등)을 직접 돌리면 맥북 쿨러가 폭발하고 8GB 램 기기에서는 시스템이 뻗어버리기 십상입니다. 그렇다고 브라우저로 매번 외부에 파일을 하나씩 업로드해서 질의하는 것은 보안 유출 문제도 있고 관리하기도 몹시 번거롭죠.</p>
          <p>이 한계를 극복하기 위해 <strong>Zotero 7(논문 수집) ➡️ Safari ➡️ Obsidian(Copilot 플러그인 + Gemini API)</strong>을 엮은 무부하 개인 리서치 파이프라인을 구성했습니다.</p>
          
          <hr>
          
          <h2>수집부터 분석까지 끊김 없는 3단계 루프</h2>
          <ol>
            <li><strong>Zotero 7 수집 & Stoplight 하이라이트</strong>: Safari에서 마음에 드는 프리프린트나 자료를 원클릭 저장하고 Zotero 뷰어로 읽으면서 빨강(핵심), 노랑(의문), 초록(배경)으로 형광펜 칠을 해둡니다.</li>
            <li><strong>Obsidian 색상 동기화 호출</strong>: Zotero Integration 플러그인과 직접 짠 CSS 스니펫을 통해 Zotero의 형광펜 데이터가 옵시디언 문서 내에 예쁜 콜아웃(Callouts) 형태로 고스란히 끌려옵니다.</li>
            <li><strong>Copilot + Gemini 대형 컨텍스트 추론</strong>: 옵시디언 내 Copilot 플러그인에 구글 Gemini 2.0 API를 연동합니다. Gemini는 컨텍스트 윈도우가 100만~200만 토큰에 달해, 내 로컬 옵시디언 전체 문서를 싹 얹어 질의해도 렉 없이 1초 만에 논리적 초안과 요약을 뱉어냅니다.</li>
          </ol>
          <p>이 구성이면 내 맥북의 로컬 램과 SSD 수명을 전혀 갉아먹지 않으면서도, 세상에서 가장 빠르고 안전한 나만의 개인 비서(NotebookLM)를 100% 무료로 가동할 수 있습니다.</p>
        `
      },
      en: {
        title: 'Building a Private Local "NotebookLM" on an 8GB RAM MacBook',
        description: 'How to build a low-resource private research pipeline by integrating Zotero 7, Safari, and Obsidian (Copilot + Gemini API).',
        content: `
          <h2>No need to exhaust your local GPU for LLM inference</h2>
          <p>Running heavy offline models on an 8GB RAM Mac causes thermal throttling and lags your workflow. Alternatively, uploading intellectual property to third-party web apps is tedious. The solution is integrating <strong>Zotero 7, Safari, and Obsidian with Gemini APIs</strong>.</p>
          
          <hr>
          
          <h2>The 3-Step Research Loop</h2>
          <ol>
            <li><strong>Zotero 7 & Stoplight Reading</strong>: Save articles in Safari directly to Zotero, highlighting critical sections in Red (foundational), Yellow (citation candidate), or Green (context).</li>
            <li><strong>Obsidian Sync</strong>: Pull annotations dynamically using Zotero integration and local CSS snippets, syncing highlighted notes directly into neat callouts.</li>
            <li><strong>Gemini Reasoning</strong>: Wire your free Gemini 2.0 API key to Obsidian Copilot. With a 1-to-2 million token context window, Gemini reads your entire note library, generating outlines in seconds without using local memory.</li>
          </ol>
        `
      }
    },
    {
      slug: 'creator-business-strategy-roadmap',
      date: '2026-06-02',
      category: 'Insight',
      ko: {
        title: 'AI 시대의 진로 멘토 브랜드: "반도체 신입의 AI 생존기" 기획기',
        description: 'AI가 일자리를 없앤다는 막연한 불안감 속에서, 2030 대학생 및 취준생들에게 현실적인 엔지니어 생존법을 제시하는 브랜드 포지셔닝 전략을 공유합니다.',
        content: `
          <h2>신입 엔지니어라는 포지셔닝의 무기</h2>
          <p>시중에 널려있는 거창한 AI 전문가들의 담론은 취업 준비생들이나 저학년 대학생들에게 오히려 거리감이 느껴지고 막연한 불안감만 더하기 쉽습니다. 오히려 1~2년 먼저 반도체 대기업(OSAT 등)에 성공적으로 안착해서 현업 AI 사용법을 부딪히며 터득하고 있는 '현역 신입사원 선배'의 리얼한 목소리가 대중에게 가장 현실적이고 든든하게 와닿을 수 있습니다.</p>
          <p>그래서 브랜드 아이덴티티를 <strong>"반도체 신입의 AI 생존기"</strong>로 포지셔닝하고 진로 멘토링 채널을 설계했습니다.</p>
          
          <hr>
          
          <h2>인문학적 소통 역량과 기술의 융합</h2>
          <p>저의 강점은 전기공학을 전공한 전형적인 엔지니어에 머물지 않고, 비영리 커뮤니티(계단뿌셔클럽)나 진로상담 스타트업 창업(경험세공소) 같은 사람들과의 인문학적 교류를 꾸준히 겪어왔다는 것입니다. 퇴근 후에 방 한편에서 덤덤하고 진솔하게 건네는 날것의 조언들(Raw Value)을 기반으로, 실제 2030 대학생들의 가려운 커리어 고민들을 날카롭게 짚어내 처방해주는 1분 요약 기반의 수익 모델들을 실체화할 로드맵을 밟아나가고자 합니다.</p>
        `
      },
      en: {
        title: 'Building "A Semiconductor Rookie\'s AI Survival Log" Brand Strategy',
        description: 'Positioning a mentoring brand for tech students by leveraging career counseling backgrounds and real-world engineer reality.',
        content: `
          <h2>The advantage of positioning as a rookie engineer</h2>
          <p>Vague declarations by tech prophets often alienate engineering students. In contrast, hearing a career mentor who recently entered Amkor Technology share their day-to-day AI toolsets is practical. I created <strong>"A Semiconductor Rookie's AI Survival Log"</strong> around this approach.</p>
          
          <hr>
          
          <h2>Merging engineering with storytelling</h2>
          <p>My strength is combining Electrical Engineering with my background at Stairs Crusher Club and experiences founding a career clinic. I will structure content around 1-minute career solutions, guiding students on surviving in the AI era.</p>
        `
      }
    },
    {
      slug: 'build-with-not-for-philosophy',
      date: '2026-05-28',
      category: 'Insight',
      ko: {
        title: '"Build with, not for" — 사람 중심의 공학 철학이 중요한 이유',
        description: '어떤 제품이나 아키텍처를 설계할 때 기술 자체의 화려함보다 실제 사용자의 가려운 곳을 긁어주는 공학적 태도에 대하여.',
        content: `
          <h2>기술의 대단함보다 중요한 것은 사용자의 불편함 해결 속도다</h2>
          <p>과거 스타트업이나 여러 제품 프로젝트를 기획하고 설계해보면서 절실히 배운 문장이 있습니다. <strong>"Build with, not for (그들을 위해 만들지 말고, 그들과 함께 만들어라)."</strong></p>
          <p>엔지니어들은 종종 본인이 사용하는 기술이나 알고리즘의 세련됨에 도취해, 정작 최종 사용자가 느낄 복잡한 인터페이스나 불필요한 번거로움을 간과하고 '자신만의 세계'를 구축하곤 합니다. 하지만 기술이 진짜 가치를 발휘하는 시점은 그 복잡도를 꽁꽁 숨긴 채 사용자의 일상적인 문제나 고장 상황을 가장 직관적이고 빠르게 조율해줄 때입니다.</p>
          
          <hr>
          
          <h2>공학도의 진짜 태도</h2>
          <p>현재 반도체 후공정 라인에서 나타나는 불량 데이터를 Spotfire로 분석할 때도, 대단한 AI 모형을 자랑하는 것보다 현장 오퍼레이터들과 라인 엔지니어들이 즉시 불량 요인을 파악하고 직관적으로 액션할 수 있는 대시보드 환경을 짜주는 것이 진짜 의미 있는 엔지니어링입니다. 사용자와 끊임없이 대화하며 그들의 사소한 가려움을 긁어주는 사람만이 세상을 바꿀 진짜 의미 있는 시스템을 탄생시킵니다.</p>
        `
      },
      en: {
        title: '"Build with, not for": Why Human-Centered Engineering Matters',
        description: 'Focusing on solving real user inconveniences rather than showing off technical complexity.',
        content: `
          <h2>Speed of solving pain points beats technology hype</h2>
          <p>My guiding rule is: <strong>"Build with, not for."</strong> Developers often fall in love with complex algorithms, ignoring the user\'s friction. Technology holds value only when complexity is hidden, delivering a fast solution to the operator.</p>
          
          <hr>
          
          <h2>The engineer\'s true mindset</h2>
          <p>Whether tracing defect trends or visualizing yield diagnostics on a factory line, creating a dashboard that machine operators can action instantly is far more impactful than pitching deep neural networks. Engineering is always about human utility.</p>
        `
      }
    }
  ];

  const allBlogPosts = [...blogPosts, ...newBlogPosts];
  globalAllBlogPosts = allBlogPosts;

  // Extract unique categories dynamically
  const categories = Array.from(new Set(allBlogPosts.map(p => p.category))).filter(Boolean);
  categories.sort();

  const categoryButtons = [
    `<button class="tag-filter-btn active" data-category="all">All</button>`,
    ...categories.map(cat => `<button class="tag-filter-btn" data-category="${cat}">${cat}</button>`)
  ].join('\n');

  // Generate individual blog post pages for this language
  allBlogPosts.forEach(post => {
    const postDir = path.join(dirBlog, post.slug);
    if (!fs.existsSync(postDir)) {
      fs.mkdirSync(postDir, { recursive: true });
    }

    const langData = post[lang];
    const cleanBody = langData.content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    const mdContent = `# ${langData.title}\n\n${langData.description}\n\n${cleanBody}`;
    const mdJson = JSON.stringify(mdContent);

    // Reading time calculation
    const readingTime = calculateReadingTime(langData.content, lang);
    const readingTimeLabel = lang === 'ko' ? `${readingTime}분 분량` : `${readingTime} min read`;

    // TOC and ID-processed content
    const { content: processedContent, tocHtml } = generateTocAndProcessContent(langData.content, lang);

    // Cross-language details mapping
    const targetOppositeLang = (lang === 'ko') ? 'en' : 'ko';
    const hasOppositePost = post[targetOppositeLang] ? true : false;
    const oppositeLangSwitchHref = hasOppositePost 
      ? `../../../${targetOppositeLang}/blog/${post.slug}/index.html` 
      : `../../../${targetOppositeLang}/blog/index.html`;

    const postContent = `
      <article class="prose-article">
        <a href="../index.html" class="blog-back-link">
          ${locale.backToBlog}
        </a>
        <header class="article-header">
          <h1 class="article-main-title">${langData.title}</h1>
          <div class="article-meta-row" style="margin-top: 1rem;">
            <div class="article-meta-info">
              <span class="article-category-badge">${post.category}</span>
              <span class="divider-pipe">•</span>
              <time class="tabular-nums" datetime="${post.date}">${post.date}</time>
              <span class="divider-pipe">•</span>
              <span class="tabular-nums">${readingTimeLabel}</span>
            </div>
            
            <div class="ai-dropdown-container">
              <button class="icon-btn ai-dropdown-trigger" onclick="toggleAiDropdown(event)" data-tooltip="${locale.shareTooltip}">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                <span>${locale.shareAndCopy}</span>
              </button>
              <div class="ai-dropdown-menu">
                <button class="ai-dropdown-item" onclick="copyPostMarkdown(event, '${post.slug}')">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                  <span>${locale.copyForLlm}</span>
                </button>
                <a class="ai-dropdown-item" href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://junseo.site/' + lang + '/blog/' + post.slug + '/')}" target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  <span>${locale.shareOnLinkedin}</span>
                </a>
                <a class="ai-dropdown-item" href="mailto:?subject=${encodeURIComponent(langData.title)}&body=${encodeURIComponent('오준서 님의 블로그 글을 공유합니다: https://junseo.site/' + lang + '/blog/' + post.slug + '/')}" style="text-decoration: none;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  <span>${locale.sendViaEmail}</span>
                </a>
              </div>
            </div>
          </div>
        </header>
        <div class="article-layout-container">
          <div class="article-body-wrapper">
            <div class="article-body-content">
              ${processedContent}
            </div>
          </div>
          ${tocHtml}
        </div>
        
        <!-- Recommended Posts Section -->
        <hr style="margin: 4rem 0 2rem 0; border: 0; border-top: 1px solid var(--border-color);">
        <section class="recommended-section">
          <h3 class="recommended-title">${lang === 'ko' ? '다른 글 읽어보기' : 'Read More Articles'}</h3>
          <div class="recommended-grid" id="recommended-posts-grid"></div>
        </section>

        <!-- Embedded markdown database for LLM text copying -->
        <script type="application/json" id="markdown-${post.slug}">
          ${mdJson}
        </script>

        <script>
          document.addEventListener('DOMContentLoaded', () => {
            const allPosts = ${JSON.stringify(allBlogPosts.map(p => ({
              slug: p.slug,
              date: p.date,
              category: p.category,
              title: p[lang].title,
              description: p[lang].description
            })))};
            const currentSlug = "${post.slug}";
            const recommendedGrid = document.getElementById('recommended-posts-grid');
            
            if (recommendedGrid) {
              const filtered = allPosts.filter(p => p.slug !== currentSlug);
              const shuffled = filtered.sort(() => 0.5 - Math.random());
              const selected = shuffled.slice(0, 3);
              
              recommendedGrid.innerHTML = selected.map(p => \`
                <a href="../\${p.slug}/index.html" class="recommended-card">
                  <div class="recommended-card-meta">
                    <span class="recommended-card-category">\${p.category}</span>
                    <span class="recommended-card-date">\${p.date}</span>
                  </div>
                  <h4 class="recommended-card-title">\${p.title}</h4>
                  <p class="recommended-card-desc">\${p.description}</p>
                </a>
              \`).join('');
            }
          });
        </script>
      </article>
    `;

    fs.writeFileSync(path.join(postDir, 'index.html'), compilePage(postContent, `${langData.title} ${locale.titleSuffix}`, langData.description, 'blog', lang, 3, oppositeLangSwitchHref));
    console.log(`Generated /${lang}/blog/${post.slug}/index.html`);
  });

  // Generate /lang/blog/index.html (Blog listing page)
  let blogListings = allBlogPosts.map(post => {
    const trans = post[lang];
    const cleanContent = trans.content.replace(/<[^>]*>/g, ' ').replace(/"/g, '&quot;').toLowerCase();
    const readingTime = calculateReadingTime(trans.content, lang);
    const readingTimeLabel = lang === 'ko' ? `${readingTime}분 분량` : `${readingTime} min read`;
    return `
    <div class="list-item" data-category="${post.category}" data-date="${post.date}" data-title="${trans.title.toLowerCase()}" data-search-content="${cleanContent}" style="border-bottom: 1px solid var(--border-color); padding-bottom: 1.5rem;">
      <a href="./${post.slug}/index.html" class="item-title-link">${trans.title}</a>
      <div class="item-meta-row" style="margin-top: 0.25rem;">
        <span class="status-badge">${post.category}</span>
        <span class="item-date-text tabular-nums">${post.date} &middot; ${readingTimeLabel}</span>
      </div>
      <p class="item-description" style="margin-top: 0.5rem;">${trans.description}</p>
    </div>
    `;
  }).join('\n');

  const blogIndexContent = `
  <div class="py-8">
    <a href="../index.html" class="blog-back-link">
      ${locale.backToHome}
    </a>
    <header class="mb-10" style="margin-bottom: 2.5rem;">
      <h1 style="font-family: var(--font-serif); font-size: 2.2rem; font-weight: 500; margin-bottom: 0.5rem;">Blog</h1>
      <p style="font-size: 1.1rem; color: var(--text-secondary);">${locale.blogGreeting}</p>
    </header>
    
    <input type="text" id="blog-search" class="search-input-box" placeholder="${locale.searchPlaceholder}" style="margin-bottom: 1.25rem;">
    
    <div class="blog-controls-row">
      <div class="blog-tags-container">
        ${categoryButtons}
      </div>
      <div class="blog-sort-container">
        <select id="blog-sort" class="sort-select-box" aria-label="Sort blog posts">
          <option value="latest">${lang === 'ko' ? '최신순' : 'Latest'}</option>
          <option value="oldest">${lang === 'ko' ? '오래된순' : 'Oldest'}</option>
          <option value="alphabetical">${lang === 'ko' ? '제목순' : 'Alphabetical'}</option>
        </select>
      </div>
    </div>
    
    <div class="list-container" id="blog-posts-list">
      ${blogListings}
    </div>
    <div id="blog-pagination-wrapper" class="blog-pagination-wrapper"></div>
  </div>
  `;

  fs.writeFileSync(path.join(dirBlog, 'index.html'), compilePage(blogIndexContent, locale.blogTitle, locale.blogDesc, 'blog', lang, 2));
  console.log(`Generated /${lang}/blog/index.html`);


  // 4. Projects Page (/lang/projects/index.html)
  let designGridContent = projectsMeta.map(p => {
    const trans = p[lang];
    const imgPath = p.image.startsWith('/') ? '../../' + p.image.substring(1) : p.image;
    return `
    <a class="design-card-item" href="./${p.slug}/index.html" style="text-decoration: none; color: inherit;">
      <div class="design-card-thumbnail">
        <img src="${imgPath}" alt="${trans.title}" loading="lazy">
      </div>
      <div class="design-card-header">
        <h3 class="design-card-title">${trans.title}</h3>
      </div>
      <p class="design-card-description">${trans.description}</p>
      <div class="design-card-tags">
        ${p.tags.map(tag => `<span class="design-card-tag">${tag}</span>`).join('')}
      </div>
    </a>
    `;
  }).join('\n');

  const designIndexContent = `
  <div class="py-8">
    <a href="../index.html" class="blog-back-link">
      ${locale.backToHome}
    </a>
    <header class="mb-10" style="margin-bottom: 2.5rem;">
      <h1 style="font-family: var(--font-serif); font-size: 2.2rem; font-weight: 500; margin-bottom: 0.5rem;">Projects</h1>
      <p style="font-size: 1.1rem; color: var(--text-secondary);">${locale.projectsDesc}</p>
    </header>
    
    <div class="design-grid-container">
      ${designGridContent}
    </div>
  </div>
  `;

  fs.writeFileSync(path.join(dirProjects, 'index.html'), compilePage(designIndexContent, locale.projectsTitle, locale.projectsDesc, 'projects', lang, 2));
  console.log(`Generated /${lang}/projects/index.html`);

  // Generate individual project detail pages
  projectsMeta.forEach(proj => {
    const projDir = path.join(dirProjects, proj.slug);
    if (!fs.existsSync(projDir)) {
      fs.mkdirSync(projDir, { recursive: true });
    }

    const proseGroup = projectProseData[lang];
    const projDetail = proseGroup[proj.id];

    if (!projDetail) {
      console.warn(`Project prose details not found for ID: ${proj.id}`);
      return;
    }

    const cleanBody = projDetail.prose.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    const mdContent = `# ${projDetail.title}\n\n${projDetail.meta}\n\n${cleanBody}`;
    const mdJson = JSON.stringify(mdContent);

    // Reading time calculation
    const readingTime = calculateReadingTime(projDetail.prose, lang);
    const readingTimeLabel = lang === 'ko' ? `${readingTime}분 분량` : `${readingTime} min read`;

    // TOC and ID-processed content
    const { content: processedContent, tocHtml } = generateTocAndProcessContent(projDetail.prose, lang);

    // Cross-language details mapping
    const targetOppositeLang = (lang === 'ko') ? 'en' : 'ko';
    const oppositeLangSwitchHref = `../../../${targetOppositeLang}/projects/${proj.slug}/index.html`;

    const projectContent = `
      <article class="prose-article">
        <a href="../index.html" class="blog-back-link">
          ${lang === 'ko' ? '← 프로젝트 목록으로' : '← Back to Projects list'}
        </a>
        <header class="article-header">
          <h1 class="article-main-title">${projDetail.title}</h1>
          <div class="article-meta-row" style="margin-top: 1rem;">
            <div class="article-meta-info">
              <span class="article-category-badge">${projDetail.meta}</span>
              <span class="divider-pipe">•</span>
              <time class="tabular-nums">${projDetail.date || ''}</time>
              <span class="divider-pipe">•</span>
              <span class="tabular-nums">${readingTimeLabel}</span>
            </div>
            
            <div class="ai-dropdown-container">
              <button class="icon-btn ai-dropdown-trigger" onclick="toggleAiDropdown(event)" data-tooltip="${locale.shareTooltip}">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                <span>${locale.shareAndCopy}</span>
              </button>
              <div class="ai-dropdown-menu">
                <button class="ai-dropdown-item" onclick="copyPostMarkdown(event, '${proj.slug}')">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                  <span>${locale.copyForLlm}</span>
                </button>
                <a class="ai-dropdown-item" href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://junseo.site/' + lang + '/projects/' + proj.slug + '/')}" target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  <span>${locale.shareOnLinkedin}</span>
                </a>
                <a class="ai-dropdown-item" href="mailto:?subject=${encodeURIComponent(projDetail.title)}&body=${encodeURIComponent('오준서 님의 프로젝트 레포트를 공유합니다: https://junseo.site/' + lang + '/projects/' + proj.slug + '/')}" style="text-decoration: none;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  <span>${locale.sendViaEmail}</span>
                </a>
              </div>
            </div>
          </div>
        </header>
        <div class="article-layout-container">
          <div class="article-body-wrapper">
            <div class="article-body-content">
              ${processedContent}
            </div>
          </div>
          ${tocHtml}
        </div>

        <!-- Recommended Projects Section -->
        <hr style="margin: 4rem 0 2rem 0; border: 0; border-top: 1px solid var(--border-color);">
        <section class="recommended-section">
          <h3 class="recommended-title">${lang === 'ko' ? '다른 프로젝트 둘러보기' : 'Read More Projects'}</h3>
          <div class="recommended-grid" id="recommended-projects-grid"></div>
        </section>

        <!-- Embedded markdown database for LLM text copying -->
        <script type="application/json" id="markdown-${proj.slug}">
          ${mdJson}
        </script>

        <script>
          document.addEventListener('DOMContentLoaded', () => {
            const allProjects = ${JSON.stringify(projectsMeta.map(p => ({
              slug: p.slug,
              category: p[lang].category,
              title: p[lang].title,
              description: p[lang].description
            })))};
            const currentSlug = "${proj.slug}";
            const recommendedGrid = document.getElementById('recommended-projects-grid');
            
            if (recommendedGrid) {
              const filtered = allProjects.filter(p => p.slug !== currentSlug);
              const shuffled = filtered.sort(() => 0.5 - Math.random());
              const selected = shuffled.slice(0, 3);
              
              recommendedGrid.innerHTML = selected.map(p => \`
                <a href="../\${p.slug}/index.html" class="recommended-card">
                  <div class="recommended-card-meta">
                    <span class="recommended-card-category">\${p.category}</span>
                  </div>
                  <h4 class="recommended-card-title">\${p.title}</h4>
                  <p class="recommended-card-desc">\${p.description}</p>
                </a>
              \`).join('');
            }
          });
        </script>
      </article>
    `;

    fs.writeFileSync(path.join(projDir, 'index.html'), compilePage(projectContent, `${projDetail.title} ${locale.titleSuffix}`, proj[lang].description, 'projects', lang, 3, oppositeLangSwitchHref));
    console.log(`Generated /${lang}/projects/${proj.slug}/index.html`);
  });
});

// Sitemap Generator
function generateSitemap(allPosts) {
  const baseUrl = 'https://junseo.site';
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  const staticPaths = [
    '',
    '/ko/index.html',
    '/ko/blog/index.html',
    '/ko/projects/index.html',
    '/en/index.html',
    '/en/blog/index.html',
    '/en/projects/index.html'
  ];

  staticPaths.forEach(p => {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}${p}</loc>\n`;
    xml += `    <changefreq>daily</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  });

  allPosts.forEach(post => {
    ['ko', 'en'].forEach(lang => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/${lang}/blog/${post.slug}/index.html</loc>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.6</priority>\n`;
      xml += `  </url>\n`;
    });
  });

  projectsMeta.forEach(proj => {
    ['ko', 'en'].forEach(lang => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/${lang}/projects/${proj.slug}/index.html</loc>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.6</priority>\n`;
      xml += `  </url>\n`;
    });
  });

  xml += `</urlset>\n`;
  fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), xml);
  console.log('Generated /sitemap.xml');
}

// RSS Feed Generator
function generateRss(allPosts) {
  const baseUrl = 'https://junseo.site';
  
  ['ko', 'en'].forEach(lang => {
    const isKo = lang === 'ko';
    let xml = `<?xml version="1.0" encoding="UTF-8" ?>\n`;
    xml += `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n`;
    xml += `<channel>\n`;
    xml += `  <title>${isKo ? '오준서 기술 블로그' : 'Junseo Oh Tech Blog'}</title>\n`;
    xml += `  <link>${baseUrl}/${lang}/blog/index.html</link>\n`;
    xml += `  <description>${isKo ? '반도체 패키징 및 테스트 엔지니어 오준서의 기술 블로그' : 'Technical insights of Junseo Oh, Semiconductor Packaging & Test Engineer'}</description>\n`;
    xml += `  <language>${isKo ? 'ko-KR' : 'en-US'}</language>\n`;
    xml += `  <atom:link href="${baseUrl}/${lang}/blog/feed.xml" rel="self" type="application/rss+xml" />\n`;

    const sortedPosts = [...allPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    sortedPosts.slice(0, 20).forEach(post => {
      const trans = post[lang];
      xml += `  <item>\n`;
      xml += `    <title><![CDATA[${trans.title}]]></title>\n`;
      xml += `    <link>${baseUrl}/${lang}/blog/${post.slug}/index.html</link>\n`;
      xml += `    <guid>${baseUrl}/${lang}/blog/${post.slug}/index.html</guid>\n`;
      xml += `    <pubDate>${new Date(post.date).toUTCString()}</pubDate>\n`;
      xml += `    <description><![CDATA[${trans.description}]]></description>\n`;
      xml += `  </item>\n`;
    });

    xml += `</channel>\n`;
    xml += `</rss>\n`;
    
    const feedDir = path.join(__dirname, lang, 'blog');
    if (!fs.existsSync(feedDir)) {
      fs.mkdirSync(feedDir, { recursive: true });
    }
    fs.writeFileSync(path.join(feedDir, 'feed.xml'), xml);
    console.log(`Generated /${lang}/blog/feed.xml`);
  });
}

// Generate sitemap and RSS feeds
generateSitemap(globalAllBlogPosts);
generateRss(globalAllBlogPosts);

console.log('Static site compilation complete!');
