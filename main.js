// Clientside interactive logic for Oh Junseo Portfolio

document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initTheme();
  initCopyHandlers();
  initBlogSearch();
  initCarousel();
  checkProjectQueryParam();
});

// Deep-link to project detail from query parameter
function checkProjectQueryParam() {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('project');
  if (projectId) {
    // Wait a brief moment for projectsData.js/prose to be ready
    setTimeout(() => {
      openProjectDetail(parseInt(projectId, 10));
    }, 100);
  }
}

// Carousel Ticker/Controller (Gallery4 Style)
function initCarousel() {
  const container = document.querySelector('.carousel-container');
  const prevBtn = document.getElementById('carousel-prev-btn');
  const nextBtn = document.getElementById('carousel-next-btn');
  const dots = document.querySelectorAll('.carousel-dot');

  if (!container) return;

  const getScrollStep = () => {
    const item = container.querySelector('.carousel-item');
    return item ? item.offsetWidth + 20 : 360; // card width + gap
  };

  const updateControls = () => {
    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    if (prevBtn) prevBtn.disabled = scrollLeft <= 5;
    if (nextBtn) nextBtn.disabled = scrollLeft >= maxScroll - 5;

    // Update active dot
    const step = getScrollStep();
    const activeIndex = Math.round(scrollLeft / step);
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === activeIndex);
    });
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      container.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      container.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
    });
  }

  // Dots click handler
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      container.scrollTo({ left: index * getScrollStep(), behavior: 'smooth' });
    });
  });

  // Scroll event listener to update controls
  container.addEventListener('scroll', updateControls);
  window.addEventListener('resize', updateControls);
  
  // Initial check
  updateControls();
}

// 1. Seoul Time Ticker (KST)
function initClock() {
  const clockEl = document.getElementById('seoul-time');
  if (!clockEl) return;

  function updateClock() {
    const options = {
      timeZone: 'Asia/Seoul',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    const formatter = new Intl.DateTimeFormat('ko-KR', options);
    clockEl.textContent = formatter.format(new Date());
  }

  updateClock();
  setInterval(updateClock, 1000);
}

// 2. Dark/Light Theme Switching
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (!toggleBtn) return;

  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
  }

  function updateThemeIcon(isDark) {
    toggleBtn.innerHTML = isDark
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon-dark"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon-light"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
  }

  // Set initial state
  const isDark = document.documentElement.classList.contains('dark');
  updateThemeIcon(isDark);

  toggleBtn.addEventListener('click', toggleTheme);
}

// 3. Clipboard Copy Handlers
function initCopyHandlers() {
  document.querySelectorAll('.copy-icon-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const text = btn.getAttribute('data-copy');
      const toast = btn.querySelector('.tooltip-toast');
      
      try {
        await navigator.clipboard.writeText(text);
        if (toast) {
          const originalText = toast.textContent;
          toast.textContent = '복사됨!';
          setTimeout(() => {
            toast.textContent = originalText;
          }, 2000);
        }
      } catch (err) {
        console.error('Clipboard copy failed:', err);
      }
    });
  });
}

// 4. Blog Search Engine + Pagination (usePagination pattern)
const POSTS_PER_PAGE = 10;
const PAGINATION_ITEMS_TO_DISPLAY = 5;

function usePagination({ currentPage, totalPages, paginationItemsToDisplay }) {
  const showLeftEllipsis = currentPage - 1 > paginationItemsToDisplay / 2;
  const showRightEllipsis = totalPages - currentPage + 1 > paginationItemsToDisplay / 2;

  function calculatePaginationRange() {
    if (totalPages <= paginationItemsToDisplay) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfDisplay = Math.floor(paginationItemsToDisplay / 2);
    const initialRange = {
      start: currentPage - halfDisplay,
      end: currentPage + halfDisplay,
    };

    const adjustedRange = {
      start: Math.max(1, initialRange.start),
      end: Math.min(totalPages, initialRange.end),
    };

    if (adjustedRange.start === 1) {
      adjustedRange.end = paginationItemsToDisplay;
    }
    if (adjustedRange.end === totalPages) {
      adjustedRange.start = totalPages - paginationItemsToDisplay + 1;
    }

    if (showLeftEllipsis) adjustedRange.start++;
    if (showRightEllipsis) adjustedRange.end--;

    return Array.from(
      { length: adjustedRange.end - adjustedRange.start + 1 },
      (_, i) => adjustedRange.start + i,
    );
  }

  return {
    pages: calculatePaginationRange(),
    showLeftEllipsis,
    showRightEllipsis,
  };
}

function initBlogSearch() {
  const searchInput = document.getElementById('blog-search');
  const postsList = document.getElementById('blog-posts-list');
  const tagButtons = document.querySelectorAll('.tag-filter-btn');
  const sortSelect = document.getElementById('blog-sort');
  const paginationWrapper = document.getElementById('blog-pagination-wrapper');
  if (!searchInput || !postsList) return;

  const allPosts = Array.from(postsList.children);
  let currentPage = 1;

  function getFilteredSortedPosts() {
    const query = searchInput.value.toLowerCase().trim();
    const activeTagBtn = document.querySelector('.tag-filter-btn.active');
    const activeCategory = activeTagBtn ? activeTagBtn.getAttribute('data-category') : 'all';
    const sortBy = sortSelect ? sortSelect.value : 'latest';

    // Filter
    let filtered = allPosts.filter(post => {
      const title = post.querySelector('.item-title-link')?.textContent.toLowerCase() || '';
      const desc = post.querySelector('.item-description')?.textContent.toLowerCase() || '';
      const postCategory = post.getAttribute('data-category') || '';
      const matchesQuery = !query || title.includes(query) || desc.includes(query);
      const matchesCategory = activeCategory === 'all' || postCategory === activeCategory;
      return matchesQuery && matchesCategory;
    });

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.getAttribute('data-date')) - new Date(a.getAttribute('data-date'));
      } else if (sortBy === 'oldest') {
        return new Date(a.getAttribute('data-date')) - new Date(b.getAttribute('data-date'));
      } else if (sortBy === 'alphabetical') {
        const titleA = a.getAttribute('data-title') || '';
        const titleB = b.getAttribute('data-title') || '';
        return titleA.localeCompare(titleB, undefined, { sensitivity: 'base' });
      }
      return 0;
    });

    return filtered;
  }

  function renderPage() {
    const filtered = getFilteredSortedPosts();
    const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));

    // Clamp currentPage
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
    const pageItems = new Set(filtered.slice(startIdx, startIdx + POSTS_PER_PAGE));

    // Show/hide all posts
    allPosts.forEach(post => {
      post.style.display = pageItems.has(post) ? 'block' : 'none';
    });

    // Re-append visible posts in sorted order (preserves DOM order = sorted order)
    filtered.forEach(post => postsList.appendChild(post));

    // Trigger fade-in animation on list container
    postsList.classList.remove('blog-page-transition');
    void postsList.offsetWidth; // force reflow
    postsList.classList.add('blog-page-transition');

    // Render pagination UI
    renderPagination(filtered.length, totalPages);
  }

  function renderPagination(totalCount, totalPages) {
    if (!paginationWrapper) return;

    const isKo = document.documentElement.lang === 'ko';
    const countLabel = isKo
      ? `총 ${totalCount}개 · ${currentPage} / ${totalPages} 페이지`
      : `${totalCount} posts · Page ${currentPage} of ${totalPages}`;

    const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
      currentPage,
      totalPages,
      paginationItemsToDisplay: PAGINATION_ITEMS_TO_DISPLAY,
    });

    // Build pagination HTML
    let html = `<div class="blog-post-count">${countLabel}</div>`;

    if (totalPages > 1) {
      html += `<nav class="blog-pagination" aria-label="Blog pagination">`;

      // Prev button
      html += `<button class="page-btn page-prev" ${currentPage === 1 ? 'disabled' : ''} data-page="${currentPage - 1}" aria-label="Previous page">‹</button>`;

      // First page + left ellipsis
      if (showLeftEllipsis) {
        html += `<button class="page-btn" data-page="1" aria-label="Page 1">1</button>`;
        html += `<span class="page-ellipsis" aria-hidden="true">…</span>`;
      }

      // Page number buttons
      pages.forEach(page => {
        const isActive = page === currentPage;
        html += `<button class="page-btn${isActive ? ' active' : ''}" data-page="${page}" aria-label="Page ${page}" ${isActive ? 'aria-current="page"' : ''}>${page}</button>`;
      });

      // Right ellipsis + last page
      if (showRightEllipsis) {
        html += `<span class="page-ellipsis" aria-hidden="true">…</span>`;
        html += `<button class="page-btn" data-page="${totalPages}" aria-label="Page ${totalPages}">${totalPages}</button>`;
      }

      // Next button
      html += `<button class="page-btn page-next" ${currentPage === totalPages ? 'disabled' : ''} data-page="${currentPage + 1}" aria-label="Next page">›</button>`;

      html += `</nav>`;
    }

    paginationWrapper.innerHTML = html;

    // Bind click events to pagination buttons
    paginationWrapper.querySelectorAll('.page-btn[data-page]').forEach(btn => {
      btn.addEventListener('click', () => {
        const page = parseInt(btn.getAttribute('data-page'), 10);
        if (!isNaN(page) && page !== currentPage) {
          currentPage = page;
          renderPage();
          // Smooth scroll to top of blog list
          postsList.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // Reset to page 1 on filter/search/sort change
  function resetAndRender() {
    currentPage = 1;
    renderPage();
  }

  searchInput.addEventListener('input', resetAndRender);

  tagButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tagButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      resetAndRender();
    });
  });

  if (sortSelect) {
    sortSelect.addEventListener('change', resetAndRender);
  }

  // Initial render
  renderPage();
}

// 5. Side Peek Detail View (Design Tab)
function openProjectDetail(projectId) {
  const overlay = document.getElementById('project-peek-overlay');
  const panel = document.getElementById('project-peek-panel');
  const body = document.getElementById('project-detail-body');

  if (!overlay || !panel || !body) return;

  // Check if projectProseData is available
  if (typeof projectProseData === 'undefined') {
    console.error('projectProseData is not loaded. Make sure projectsData.js is loaded.');
    body.innerHTML = '<p>데이터를 로드하는 중 오류가 발생했습니다.</p>';
    return;
  }

  const lang = document.documentElement.lang || 'ko';
  const langGroup = projectProseData[lang] || projectProseData.ko;
  const project = langGroup[projectId];
  
  if (!project) {
    body.innerHTML = lang === 'en' 
      ? '<p>Project detail report not found.</p>' 
      : '<p>해당 프로젝트 상세 리포트를 찾을 수 없습니다.</p>';
    return;
  }

  const dateLabel = lang === 'en' ? 'Duration:' : '진행 기간:';

  // Format content
  const contentHtml = `
    <header style="margin-bottom: 2rem;">
      <div style="font-size: 0.9rem; color: var(--text-tertiary); text-transform: uppercase; margin-bottom: 0.5rem;">
        ${project.meta}
      </div>
      <h1 style="font-family: var(--font-serif); font-size: 2.2rem; font-weight: 500; line-height: 1.2; margin-bottom: 0.5rem; color: var(--text-primary);">
        ${project.title}
      </h1>
      <div style="font-size: 0.85rem; color: var(--text-secondary);">
        ${dateLabel} ${project.date}
      </div>
    </header>
    <div>
      ${project.prose}
    </div>
  `;

  body.innerHTML = contentHtml;

  // Reset scroll pos
  body.scrollTop = 0;

  // Open overlay & panel
  overlay.classList.add('open');
  panel.classList.add('open');

  // Trigger MathJax rendering
  if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
    window.MathJax.typesetPromise([body]).catch(err => console.error('MathJax typeset error:', err));
  }
  
  // Re-run lucide icons if they exist in prose
  if (window.lucide) {
    lucide.createIcons();
  }
}

function closeProjectDetail() {
  const overlay = document.getElementById('project-peek-overlay');
  const panel = document.getElementById('project-peek-panel');
  
  if (overlay && panel) {
    overlay.classList.remove('open');
    panel.classList.remove('open');
  }
}

// Make functions global for inline events
window.openProjectDetail = openProjectDetail;
window.closeProjectDetail = closeProjectDetail;

// AI Dropdown controls
function toggleAiDropdown(event) {
  event.stopPropagation();
  const trigger = event.currentTarget;
  const menu = trigger.nextElementSibling;
  
  const isOpen = menu.style.display === 'flex';
  
  // Close all other AI menus
  document.querySelectorAll('.ai-dropdown-menu').forEach(m => {
    m.style.display = 'none';
  });

  if (!isOpen) {
    menu.style.display = 'flex';
  }
}

// Copy page markdown content
async function copyPostMarkdown(event, slug) {
  event.stopPropagation();
  const scriptEl = document.getElementById(`markdown-${slug}`);
  if (!scriptEl) return;

  try {
    // Parse json block to get raw markdown
    const md = JSON.parse(scriptEl.textContent || '""');
    await navigator.clipboard.writeText(md);
    alert('본문 마크다운이 클립보드에 복사되었습니다! ChatGPT나 Claude 같은 AI 모델에 바로 붙여넣어 요약/질문해 보세요.');
  } catch (err) {
    console.error('Failed to copy markdown:', err);
    alert('마크다운 복사에 실패했습니다.');
  }
}

// Global click handler to close active menus
document.addEventListener('click', () => {
  document.querySelectorAll('.ai-dropdown-menu').forEach(m => {
    m.style.display = 'none';
  });
});

window.toggleAiDropdown = toggleAiDropdown;
window.copyPostMarkdown = copyPostMarkdown;
