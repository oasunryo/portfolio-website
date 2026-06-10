// Clientside interactive logic for Oh Junseo Portfolio

document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initTheme();
  initCopyHandlers();
  initBlogSearch();
  initCarousel();
  initTocHighlight();
  initProjectsSort();
  initProjectHoverPreview();
  initOledDashboard();
  initAllProjectCharts();
});

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
  if (totalPages <= paginationItemsToDisplay) {
    return {
      pages: Array.from({ length: totalPages }, (_, i) => i + 1),
      showLeftEllipsis: false,
      showRightEllipsis: false,
    };
  }

  const showLeftEllipsis = currentPage - 1 > paginationItemsToDisplay / 2;
  const showRightEllipsis = totalPages - currentPage + 1 > paginationItemsToDisplay / 2;

  function calculatePaginationRange() {
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

function zeroGravityScrollTo(element) {
  if (!element) return;
  const start = window.pageYOffset || document.documentElement.scrollTop;
  const headerOffset = 90; // height of fixed header + safety margin
  const elementPosition = element.getBoundingClientRect().top;
  const target = start + elementPosition - headerOffset;
  const distance = target - start;
  const duration = 1600; // 1.6s for highly pronounced, floating zero-gravity kinetic glide
  let startTime = null;

  // Quintic ease-out timing function for extremely smooth, floating deceleration
  function easeOutQuint(t) {
    return 1 - Math.pow(1 - t, 5);
  }

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const run = easeOutQuint(progress) * distance + start;
    window.scrollTo(0, run);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

function initBlogSearch() {
  const searchInput = document.getElementById('blog-search');
  const postsList = document.getElementById('blog-posts-list');
  const tagButtons = document.querySelectorAll('.tag-filter-btn');
  const sortSelect = document.getElementById('blog-sort');
  const paginationWrapper = document.getElementById('blog-pagination-wrapper');
  if (!searchInput || !postsList) return;

  const blogHeader = document.querySelector('.py-8 header') || searchInput;

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
      const bodyContent = post.getAttribute('data-search-content') || '';
      const postCategory = post.getAttribute('data-category') || '';
      const matchesQuery = !query || title.includes(query) || desc.includes(query) || bodyContent.includes(query);
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
          // Zero-gravity kinetic smooth scroll to top of blog header
          zeroGravityScrollTo(blogHeader);
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

// Global Escape key event listener to close modal peek view
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectDetail();
  }
});

// Highlight Table of Contents links based on scroll position
function initTocHighlight() {
  const tocLinks = document.querySelectorAll('.toc-link');
  const headings = Array.from(document.querySelectorAll('.article-body-content h2, .article-body-content h3'));
  if (tocLinks.length === 0 || headings.length === 0) return;

  function updateActiveToc() {
    const scrollPosition = window.scrollY + 120; // offset for sticky header
    let currentHeading = null;

    for (let i = 0; i < headings.length; i++) {
      if (headings[i].offsetTop <= scrollPosition) {
        currentHeading = headings[i];
      } else {
        break;
      }
    }

    if (currentHeading) {
      const activeId = currentHeading.id;
      tocLinks.forEach(link => {
        const isCurrent = link.getAttribute('data-heading-id') === activeId;
        link.classList.toggle('active', isCurrent);
      });
    } else {
      tocLinks.forEach(link => link.classList.remove('active'));
    }
  }

  window.addEventListener('scroll', updateActiveToc);
  updateActiveToc();
}

// 5. Projects Grid Clientside Sort
function initProjectsSort() {
  const sortSelect = document.getElementById('projects-sort');
  const grid = document.getElementById('projects-grid');
  if (!sortSelect || !grid) return;

  const cards = Array.from(grid.children);

  function sortProjects() {
    const sortBy = sortSelect.value;

    cards.sort((a, b) => {
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

    // Re-append to DOM in sorted order
    cards.forEach(card => grid.appendChild(card));
    
    // Smooth grid transition
    grid.style.opacity = 0.5;
    void grid.offsetWidth; // trigger reflow
    grid.style.transition = 'opacity 0.15s ease';
    grid.style.opacity = 1;
  }

  sortSelect.addEventListener('change', sortProjects);
  
  // Initial sort (default is 'latest')
  sortProjects();
}

// 5.1. Projects Hover Preview for Desktop
function initProjectHoverPreview() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  // Create floating preview element
  let preview = document.getElementById('project-hover-preview');
  if (!preview) {
    preview = document.createElement('div');
    preview.id = 'project-hover-preview';
    preview.className = 'project-hover-preview';
    document.body.appendChild(preview);
  }

  const items = grid.querySelectorAll('.design-card-item');
  items.forEach(item => {
    const imgUrl = item.getAttribute('data-image');
    if (!imgUrl) return;

    item.addEventListener('mouseenter', () => {
      if (window.innerWidth > 768 && window.matchMedia('(pointer: fine)').matches) {
        preview.style.backgroundImage = `url(${imgUrl})`;
        preview.classList.add('active');
      }
    });

    item.addEventListener('mouseleave', () => {
      preview.classList.remove('active');
    });

    item.addEventListener('mousemove', (e) => {
      if (window.innerWidth > 768 && window.matchMedia('(pointer: fine)').matches) {
        preview.style.left = `${e.clientX + 20}px`;
        preview.style.top = `${e.clientY + 20}px`;
      }
    });
  });
}

/**
 * OLED 대시보드 차트 제어 모듈
 * 10번째 프로젝트인 'ito-oled-analysis' 상세 페이지 로드 시에만 동적 실행
 */
function initOledDashboard() {
  const chartCanvas = document.getElementById("mainChart");
  if (!chartCanvas) return; // 차트 캔버스가 없으면 실행 취소

  // 1. Chart.js CDN 동적 로드
  if (typeof Chart === 'undefined') {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/chart.js";
    script.onload = () => buildChartLogic();
    document.head.appendChild(script);
  } else {
    buildChartLogic();
  }

  function buildChartLogic() {
    // OJ 측정 데이터 셋
    const ojData = {
      v: [0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0, 11.5, 12.0],
      j: [0.0, 0.004564, 0.016503, 0.031231, 0.050447, 0.092100, 0.193742, 0.383047, 0.702408, 1.176845, 1.878700, 2.892761, 4.234863, 6.091335, 8.505679, 11.515195, 15.202113, 19.779861, 25.327582, 32.259401, 41.910835, 52.327868, 58.565672, 62.284898, 64.333864],
      l: [0.0, 0.638, 0.470, 0.0, 0.055, 0.702, 0.235, 1.690, 4.757, 11.736, 32.016, 64.560, 119.249, 203.390, 328.789, 460.553, 752.729, 1079.713, 1525.262, 2199.473, 3429.953, 4071.006, 1920.930, 591.107, 276.757],
      eqeV: [4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0, 11.5, 12.0],
      eqe: [0.0598, 0.1022, 0.1339, 0.1690, 0.2003, 0.2319, 0.2400, 0.2971, 0.3275, 0.3613, 0.4091, 0.4910, 0.4668, 0.1968, 0.0569, 0.0258],
      ce: [0.0418, 0.0642, 0.0765, 0.0885, 0.0968, 0.1041, 0.1005, 0.1167, 0.1211, 0.1261, 0.1353, 0.1543, 0.1397, 0.0562, 0.0156, 0.0068],
      cieV: [4.0, 6.0, 8.0, 10.0, 12.0],
      cieX: [0.5487, 0.5555, 0.5456, 0.5149, 0.4830],
      cieY: [0.3982, 0.4417, 0.4536, 0.4830, 0.5136]
    };

    let currentChart = null;

    const renderChart = (type) => {
      if (currentChart) currentChart.destroy();
      const ctx = chartCanvas.getContext("2d");
      
      // 포트폴리오 테마 변수 획득
      const isDark = document.documentElement.classList.contains('dark');
      const gridColor = isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.06)";
      const textColor = isDark ? "#94a3b8" : "#475569";
      
      let config = {};

      if (type === 'jvl') {
        config = {
          type: 'line',
          data: {
            labels: ojData.v,
            datasets: [
              {
                label: isDark ? '전류밀도 J (mA/cm²)' : 'Current Density J',
                data: ojData.j,
                borderColor: isDark ? '#a78bfa' : '#7c3aed',
                backgroundColor: isDark ? 'rgba(167, 139, 250, 0.08)' : 'rgba(124, 58, 237, 0.08)',
                yAxisID: 'yJ',
                tension: 0.3,
                borderWidth: 2.5
              },
              {
                label: isDark ? '휘도 L (cd/m²)' : 'Luminance L',
                data: ojData.l,
                borderColor: isDark ? '#fbbf24' : '#d97706',
                backgroundColor: isDark ? 'rgba(251, 191, 36, 0.08)' : 'rgba(217, 119, 6, 0.08)',
                yAxisID: 'yL',
                tension: 0.3,
                borderWidth: 2.5
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: { grid: { color: gridColor }, ticks: { color: textColor } },
              yJ: { type: 'linear', position: 'left', grid: { color: gridColor }, ticks: { color: textColor } },
              yL: { type: 'linear', position: 'right', grid: { drawOnChartArea: false }, ticks: { color: textColor } }
            }
          }
        };
      } else if (type === 'eqece') {
        config = {
          type: 'line',
          data: {
            labels: ojData.eqeV,
            datasets: [
              { label: 'EQE (%)', data: ojData.eqe, borderColor: isDark ? '#34d399' : '#059669', borderWidth: 2.5, yAxisID: 'yEqe' },
              { label: 'CE (cd/A)', data: ojData.ce, borderColor: isDark ? '#60a5fa' : '#2563eb', borderWidth: 2.5, yAxisID: 'yCe' }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: { grid: { color: gridColor }, ticks: { color: textColor } },
              yEqe: { type: 'linear', position: 'left', grid: { color: gridColor }, ticks: { color: textColor } },
              yCe: { type: 'linear', position: 'right', grid: { drawOnChartArea: false }, ticks: { color: textColor } }
            }
          }
        };
      } else if (type === 'cie') {
        config = {
          type: 'scatter',
          data: {
            datasets: [{
              label: 'CIE x, y (4V ➔ 12V)',
              data: ojData.cieX.map((x, idx) => ({ x: x, y: ojData.cieY[idx] })),
              borderColor: isDark ? '#f472b6' : '#db2777',
              showLine: true,
              borderWidth: 2.5,
              pointBackgroundColor: ojData.cieV.map(v => v === 6.0 ? (isDark ? '#fbbf24' : '#d97706') : (isDark ? '#f472b6' : '#db2777')),
              pointRadius: 6
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: { min: 0.45, max: 0.60, grid: { color: gridColor }, ticks: { color: textColor } },
              y: { min: 0.35, max: 0.55, grid: { color: gridColor }, ticks: { color: textColor } }
            }
          }
        };
      }

      currentChart = new Chart(ctx, config);
    };

    // 초기 차트 로드
    renderChart('jvl');

    // 셀렉터 버튼 리스너 연동
    const buttons = document.querySelectorAll(".selector-btn");
    buttons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        buttons.forEach(b => {
          b.classList.remove("active");
          b.style.background = "none";
          b.style.color = "var(--text-secondary)";
        });
        e.currentTarget.classList.add("active");
        e.currentTarget.style.background = "var(--primary)";
        e.currentTarget.style.color = "#fff";

        const chartType = e.currentTarget.getAttribute("data-chart");
        renderChart(chartType);

        // 자막 변경
        const caption = document.getElementById("chartCaption");
        if (chartType === 'jvl') {
          caption.innerText = "OJ(Junseo Oh) 샘플의 전압 Sweep에 따른 전류밀도(J) 및 휘도(L) 곡선입니다.";
        } else if (chartType === 'eqece') {
          caption.innerText = "유효 휘도 구간(L > 10 cd/m²)에서의 외부양자효율(EQE) 및 전류효율(CE) 특성 곡선입니다.";
        } else if (chartType === 'cie') {
          caption.innerText = "전압 상승에 따른 CIE 1931 색상 좌표의 황색 영역 이동 궤적을 확인합니다.";
        }
      });
    });

    // 다크 모드 갱신 감지 리스너 바인딩 (main.js의 기존 theme-toggle 이벤트와 연동 처리)
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        setTimeout(() => {
          const activeBtn = document.querySelector(".selector-btn.active");
          if (activeBtn) renderChart(activeBtn.getAttribute("data-chart"));
        }, 100); // DOM 테마 Attribute 적용 완료 대기
      });
    }
  }
}

/**
 * 1~9번 프로젝트 상세 페이지용 차트 통합 로드 모듈
 */
function initAllProjectCharts() {
  const chartCanvases = [];
  for (let i = 1; i <= 9; i++) {
    const el = document.getElementById(`projectChart${i}`);
    if (el) {
      chartCanvases.push({ id: i, el: el });
    }
  }

  if (chartCanvases.length === 0) return;

  if (typeof Chart === 'undefined') {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/chart.js";
    script.onload = () => buildAllCharts();
    document.head.appendChild(script);
  } else {
    buildAllCharts();
  }

  function buildAllCharts() {
    const activeCharts = {};

    const generateSineData = (phaseShiftDeg) => {
      const phaseRad = (phaseShiftDeg * Math.PI) / 180;
      const labels = [];
      const voltage = [];
      const current = [];
      for (let deg = 0; deg <= 360; deg += 10) {
        labels.push(`${deg}°`);
        voltage.push(Math.sin((deg * Math.PI) / 180));
        current.push(Math.sin((deg * Math.PI) / 180 - phaseRad) * 0.8);
      }
      return { labels, voltage, current };
    };

    const getThemeColors = () => {
      const isDark = document.documentElement.classList.contains('dark');
      return {
        gridColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)",
        textColor: isDark ? "#94a3b8" : "#475569",
        isDark: isDark
      };
    };

    const renderSingleChart = (item) => {
      const { gridColor, textColor, isDark } = getThemeColors();
      const ctx = item.el.getContext('2d');
      const chartId = item.id;

      if (activeCharts[chartId]) {
        activeCharts[chartId].destroy();
      }

      let config = {};

      if (chartId === 1) {
        config = {
          type: 'line',
          data: {
            labels: ['26μm', '33μm', '41μm'],
            datasets: [
              {
                label: isDark ? '인장 강도 Pull Strength (g)' : 'Pull Strength (g)',
                data: [5.2, 11.26, 7.8],
                borderColor: isDark ? '#818cf8' : '#4f46e5',
                backgroundColor: isDark ? 'rgba(129, 140, 248, 0.1)' : 'rgba(79, 70, 229, 0.1)',
                tension: 0.1,
                borderWidth: 3,
                yAxisID: 'y'
              },
              {
                label: isDark ? '전단 강도 Shear Strength (g)' : 'Shear Strength (g)',
                data: [8.1, 14.85, 10.4],
                borderColor: isDark ? '#34d399' : '#059669',
                backgroundColor: isDark ? 'rgba(52, 211, 153, 0.1)' : 'rgba(5, 150, 105, 0.1)',
                tension: 0.1,
                borderWidth: 3,
                yAxisID: 'y'
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: { grid: { color: gridColor }, ticks: { color: textColor } },
              y: { grid: { color: gridColor }, ticks: { color: textColor } }
            }
          }
        };
      } else if (chartId === 2) {
        config = {
          type: 'line',
          data: {
            labels: ['1G', '2G', '3G', '4G', '5G', '6G', '7G', '8G', '9G', '10G'],
            datasets: [
              {
                label: 'S21 Transmission (Matched 50Ω)',
                data: [-0.1, -0.2, -0.3, -0.4, -0.5, -0.6, -0.7, -0.8, -0.9, -1.0],
                borderColor: isDark ? '#60a5fa' : '#2563eb',
                borderWidth: 2.5,
                fill: false,
                tension: 0.2
              },
              {
                label: 'S21 Transmission (Mismatched)',
                data: [-0.5, -1.2, -2.1, -3.5, -4.8, -6.2, -8.1, -10.5, -13.2, -15.8],
                borderColor: isDark ? '#f87171' : '#dc2626',
                borderWidth: 2.5,
                borderDash: [5, 5],
                fill: false,
                tension: 0.2
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: { grid: { display: false }, ticks: { color: textColor } },
              y: { grid: { color: gridColor }, ticks: { color: textColor }, title: { display: true, text: 'Gain (dB)', color: textColor } }
            }
          }
        };
      } else if (chartId === 3) {
        config = {
          type: 'line',
          data: {
            labels: Array.from({length: 21}, (_, i) => `${i}μs`),
            datasets: [
              {
                label: 'Glitch Switch Input',
                data: [0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                borderColor: isDark ? '#fbbf24' : '#d97706',
                stepped: true,
                borderWidth: 2
              },
              {
                label: 'Cleaned Output',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                borderColor: isDark ? '#34d399' : '#059669',
                stepped: true,
                borderWidth: 3
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: { grid: { color: gridColor }, ticks: { color: textColor } },
              y: { min: -0.2, max: 1.2, grid: { color: gridColor }, ticks: { color: textColor, stepSize: 1 } }
            }
          }
        };
      } else if (chartId === 4) {
        config = {
          type: 'line',
          data: {
            labels: [10, 15, 20, 25, 30, 32, 35, 40, 50, 60, 80, 100, 120],
            datasets: [
              {
                label: 'TinNO3 (New PR)',
                data: [1.0, 0.98, 0.95, 0.85, 0.40, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
                borderColor: isDark ? '#c084fc' : '#7e22ce',
                backgroundColor: isDark ? 'rgba(192, 132, 252, 0.15)' : 'rgba(126, 34, 206, 0.15)',
                fill: true,
                tension: 0.2,
                borderWidth: 3
              },
              {
                label: 'TinTos (Conventional)',
                data: [1.0, 1.0, 1.0, 0.99, 0.98, 0.97, 0.95, 0.92, 0.85, 0.70, 0.35, 0.05, 0.0],
                borderColor: isDark ? '#9ca3af' : '#4b5563',
                fill: false,
                tension: 0.2
              },
              {
                label: 'TinOH (Reference)',
                data: [1.0, 1.0, 0.98, 0.95, 0.92, 0.90, 0.88, 0.82, 0.75, 0.65, 0.50, 0.30, 0.15],
                borderColor: isDark ? '#60a5fa' : '#2563eb',
                fill: false,
                tension: 0.2
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: { grid: { color: gridColor }, ticks: { color: textColor }, title: { display: true, text: 'Dose (mJ/cm²)', color: textColor } },
              y: { grid: { color: gridColor }, ticks: { color: textColor }, title: { display: true, text: 'Normalized Thickness', color: textColor } }
            }
          }
        };
      } else if (chartId === 5) {
        config = {
          type: 'bubble',
          data: {
            datasets: [{
              label: 'Chamber Defect Density',
              data: [
                {x: 10, y: 50, r: 4},
                {x: 12, y: 55, r: 6},
                {x: 15, y: 60, r: 8},
                {x: 20, y: 65, r: 12},
                {x: 25, y: 70, r: 18},
                {x: 30, y: 75, r: 28},
                {x: 32, y: 80, r: 40}
              ],
              backgroundColor: isDark ? 'rgba(248, 113, 113, 0.6)' : 'rgba(220, 38, 38, 0.6)',
              borderColor: isDark ? '#f87171' : '#dc2626'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: { grid: { color: gridColor }, ticks: { color: textColor }, title: { display: true, text: 'Reflected Power (W)', color: textColor } },
              y: { grid: { color: gridColor }, ticks: { color: textColor }, title: { display: true, text: 'Chamber Temp (°C)', color: textColor } }
            }
          }
        };
      } else if (chartId === 6) {
        const initialData = generateSineData(0);
        config = {
          type: 'line',
          data: {
            labels: initialData.labels,
            datasets: [
              {
                label: 'Voltage V(t)',
                data: initialData.voltage,
                borderColor: isDark ? '#f87171' : '#dc2626',
                borderWidth: 2.5,
                tension: 0.4,
                pointRadius: 0
              },
              {
                label: 'Current I(t) (Phase Shifted)',
                data: initialData.current,
                borderColor: isDark ? '#60a5fa' : '#2563eb',
                borderWidth: 2.5,
                tension: 0.4,
                pointRadius: 0
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: { grid: { color: gridColor }, ticks: { color: textColor, maxTicksLimit: 12 } },
              y: { grid: { color: gridColor }, ticks: { color: textColor } }
            }
          }
        };
      } else if (chartId === 7) {
        config = {
          type: 'line',
          data: {
            labels: ['10Hz', '20Hz', '50Hz', '100Hz', '200Hz', '500Hz', '1kHz', '2kHz', '5kHz', '10kHz', '20kHz'],
            datasets: [
              {
                label: 'Low Pass (Cutoff 400Hz)',
                data: [0, 0, -0.5, -3, -12, -24, -36, -48, -60, -72, -84],
                borderColor: isDark ? '#f87171' : '#dc2626',
                borderWidth: 2,
                tension: 0.2
              },
              {
                label: 'Mid Band Channel',
                data: [-40, -26, -12, -3, 0, -3, -12, -26, -40, -52, -64],
                borderColor: isDark ? '#34d399' : '#059669',
                borderWidth: 2,
                tension: 0.2
              },
              {
                label: 'High Pass (Cutoff 3.2kHz)',
                data: [-84, -72, -60, -48, -36, -24, -12, -3, -0.5, 0, 0],
                borderColor: isDark ? '#60a5fa' : '#2563eb',
                borderWidth: 2,
                tension: 0.2
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: { grid: { color: gridColor }, ticks: { color: textColor } },
              y: { grid: { color: gridColor }, ticks: { color: textColor }, title: { display: true, text: 'Attenuation (dB)', color: textColor } }
            }
          }
        };
      } else if (chartId === 8) {
        config = {
          type: 'line',
          data: {
            labels: ['0m', '10m', '20m', '30m', '40m', '50m', '60m', '70m', '80m', '90m', '100m'],
            datasets: [
              {
                label: 'Cell Voltage (V)',
                data: [3.0, 3.4, 3.7, 3.9, 4.1, 4.2, 4.2, 4.2, 4.2, 4.2, 4.2],
                borderColor: isDark ? '#f472b6' : '#db2777',
                yAxisID: 'yV',
                borderWidth: 3,
                tension: 0.2
              },
              {
                label: 'Charge Current (mA)',
                data: [250, 250, 250, 250, 250, 210, 150, 90, 40, 15, 0],
                borderColor: isDark ? '#22d3ee' : '#0891b2',
                yAxisID: 'yI',
                borderWidth: 3,
                tension: 0.2
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: { grid: { color: gridColor }, ticks: { color: textColor } },
              yV: { type: 'linear', position: 'left', grid: { color: gridColor }, ticks: { color: textColor }, title: { display: true, text: 'Voltage (V)', color: textColor } },
              yI: { type: 'linear', position: 'right', grid: { drawOnChartArea: false }, ticks: { color: textColor }, title: { display: true, text: 'Current (mA)', color: textColor } }
            }
          }
        };
      } else if (chartId === 9) {
        config = {
          type: 'line',
          data: {
            labels: ['0%', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
            datasets: [
              {
                label: 'Open Circuit Voltage (OCV)',
                data: [4.2, 4.15, 4.08, 4.0, 3.92, 3.85, 3.79, 3.73, 3.68, 3.6, 3.0],
                borderColor: isDark ? '#60a5fa' : '#2563eb',
                borderWidth: 2.5,
                tension: 0.2
              },
              {
                label: 'Closed Circuit Voltage (CCV under 10Ω Load)',
                data: [4.02, 3.97, 3.90, 3.82, 3.74, 3.67, 3.61, 3.55, 3.50, 3.42, 2.75],
                borderColor: isDark ? '#fb7185' : '#e11d48',
                borderWidth: 2.5,
                tension: 0.2
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: { grid: { color: gridColor }, ticks: { color: textColor }, title: { display: true, text: 'Depth of Discharge (DOD)', color: textColor } },
              y: { grid: { color: gridColor }, ticks: { color: textColor }, title: { display: true, text: 'Cell Voltage (V)', color: textColor } }
            }
          }
        };
      }

      const inst = new Chart(ctx, config);
      activeCharts[chartId] = inst;

      // Handle interactive phase slider for Project 6
      if (chartId === 6) {
        const setupSlider = (sliderId, valId) => {
          const slider = document.getElementById(sliderId);
          const valDisplay = document.getElementById(valId);
          if (slider && valDisplay) {
            const updateSlider = () => {
              const deg = parseInt(slider.value, 10);
              valDisplay.innerText = deg >= 0 ? `+${deg}` : deg;
              const newData = generateSineData(deg);
              inst.data.datasets[1].data = newData.current;
              inst.update('none'); // silent update
            };
            slider.addEventListener('input', updateSlider);
          }
        };
        setupSlider('phaseSlider', 'phaseVal');
        setupSlider('phaseSliderEn', 'phaseValEn');
      }
    };

    // Render all detected canvases
    chartCanvases.forEach(renderSingleChart);

    // Dynamic update on theme-toggle
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        setTimeout(() => {
          chartCanvases.forEach(renderSingleChart);
        }, 100);
      });
    }
  }
}
