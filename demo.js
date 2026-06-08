/**
 * 포트폴리오 웹사이트 데모 자동화 스크립트
 * 사용법: node demo.js
 *
 * Tella로 화면 녹화를 시작한 뒤 이 스크립트를 실행하세요.
 */

const { chromium } = require('playwright');

const PAGE_TIMEOUT = 60000;
const BASE_URL = 'https://portfoliowebstiebuilerv2.vercel.app';

// ─── 유틸 함수들 ────────────────────────────────────────────────
const CURSOR_SCRIPT = `
  // Inject custom macOS cursor overlay
  const style = document.createElement('style');
  style.innerHTML = "html, body, * { cursor: url('file:///Users/oasunryo/문서/Antigravity/portfolio_webstie_builer_v2/mac_cursor_1780638290465.png'), auto !important; }";
  document.head.appendChild(style);
`;


const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// ─── 시각적 마우스 커서 주입 스크립트 ───────────────────────────
// context.addInitScript()로 모든 페이지에 자동 삽입됨

// ─── easeInOutCubic 스무스 스크롤 ───────────────────────────────
async function smoothScroll(page, targetY, durationMs = 750) {
  await page.evaluate(({ target, duration }) => {
    return new Promise((resolve) => {
      const start    = window.scrollY;
      const distance = target - start;
      const startTime = performance.now();

      function step(now) {
        const elapsed  = Math.min(now - startTime, duration);
        const progress = elapsed / duration;
        // easeInOutCubic
        const ease = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        window.scrollTo(0, start + distance * ease);
        if (elapsed < duration) requestAnimationFrame(step);
        else resolve();
      }
      requestAnimationFrame(step);
    });
  }, { target: targetY, duration: durationMs });
  await wait(250);
}

async function scrollToTop(page) {
  await smoothScroll(page, 0, 600);
}

// ─── 요소 클릭 (hover → 잠깐 정지 → click) ──────────────────────
async function smoothClick(page, selector, delayAfter = 900) {
  const el = page.locator(selector).first();
  await el.waitFor({ state: 'visible', timeout: PAGE_TIMEOUT });
  await el.scrollIntoViewIfNeeded();
  await wait(150);
  await el.hover();
  await wait(350);
  await el.click();
  await wait(delayAfter);
}

// ─── 안전한 호버 (없으면 스킵) ──────────────────────────────────
async function safeHover(locator, delayAfter = 600) {
  try {
    await locator.waitFor({ state: 'visible', timeout: 4000 });
    await locator.hover();
    await wait(delayAfter);
  } catch (_) {}
}

// ─── 메인 시나리오 ────────────────────────────────────────────────
(async () => {
  console.log('🎬 포트폴리오 데모 자동화 시작...');
  const browser = await chromium.launch({
    headless: false,
    slowMo: 0,
    args: ['--window-size=1280,800'],
  });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  // 모든 페이지에 커서 자동 주입
  await context.addInitScript(CURSOR_SCRIPT);
  const page = await context.newPage();
  page.setDefaultTimeout(PAGE_TIMEOUT);
  // 홈 페이지 열기 (녹화 준비용)
  await page.goto(`${BASE_URL}/index.html`, { waitUntil: 'domcontentloaded' });
  console.log('Chrome 창이 열렸습니다. 녹화 시작 준비가 되면 "시작"을 입력하고 Enter 를 눌러 진행하세요: ');
  const rl = require('readline').createInterface({ input: process.stdin, output: process.stdout });
  await new Promise(resolve => rl.question('', input => {
    rl.close();
    if (input.trim() === '시작') resolve(); else { console.log('입력이 "시작"이 아닙니다. 스크립트를 종료합니다.'); process.exit(1); }
  }));
  // continue IIFE
  console.log('⏱ 15초 대기 중...');
  await wait(15000);
  // ── Scene 1: 홈 페이지 진입 ─────────────────────────────────────
  console.log('📍 Scene 1: 홈 페이지 진입');
  await wait(2500);



  // 소셜 아이콘 순서대로 호버 (툴팁 노출)
  console.log('  → 소셜 아이콘 호버');
  const socialLinks = page.locator('.social-icon-link');
  const socialCount = await socialLinks.count();
  console.log(`  → 소셜 아이콘 ${socialCount}개 발견`);
  for (let i = 0; i < Math.min(socialCount, 4); i++) {
    await safeHover(socialLinks.nth(i), 750);
  }

  // ── Scene 2: Career & Education 스크롤 ──────────────────────────
  console.log('📍 Scene 2: Career & Education 스크롤');
  await smoothScroll(page, 500, 900);
  await wait(1500);

  // ── Scene 3: 다크모드 토글 ─────────────────────────────────────
  console.log('📍 Scene 3: 다크모드 토글');
  await scrollToTop(page);
  await wait(500);
  await smoothClick(page, '#theme-toggle-btn', 1400); // → 다크
  await smoothClick(page, '#theme-toggle-btn', 1200); // → 라이트

  // ── Scene 4: 언어 전환 EN ──────────────────────────────────────
  console.log('📍 Scene 4: 언어 전환 EN');
  await smoothClick(page, '#lang-switch-btn', 2000);
  await smoothScroll(page, 300, 700);
  await wait(1200);
  await scrollToTop(page);
  await wait(300);
  await smoothClick(page, '#lang-switch-btn', 1800); // KO 복귀

  // ── Scene 5: 프로젝트 페이지 ────────────────────────────────────
  console.log('📍 Scene 5: 프로젝트 페이지');
  await smoothClick(page, '#nav-projects', 500);
  await page.waitForLoadState('domcontentloaded');
  await wait(1000);

  // 프로젝트 카드 호버 → 블러 효과 시연
  // 실제 클래스: .design-card-item
  const projectCards = page.locator('.design-card-item');
  const projectCount = await projectCards.count();
  console.log(`  → 프로젝트 카드 ${projectCount}개 발견`);

  for (let i = 0; i < Math.min(projectCount, 4); i++) {
    await safeHover(projectCards.nth(i), 500);
    if (i < 3) await smoothScroll(page, (i + 1) * 200, 500);
  }

  await wait(400);

  // 첫 번째 카드 클릭 → 모달 패널 열기
  console.log('  → 첫 번째 프로젝트 클릭 (모달)');
  await scrollToTop(page);
  await wait(300);
  try {
    const firstCard = projectCards.first();
    await firstCard.waitFor({ state: 'visible', timeout: 8000 });
    await firstCard.hover();
    await wait(400);
    await firstCard.click();
    await wait(1800); // 모달 애니메이션 대기

    // 모달 패널 내부 스크롤
    console.log('  → 모달 패널 내부 스크롤');
    const panelBody = page.locator('#project-detail-body');
    const panelExists = await panelBody.count();
    if (panelExists > 0) {
      for (const targetScroll of [300, 700, 1200, 1800, 2500]) {
        await page.evaluate((y) => {
          const el = document.getElementById('project-detail-body');
          if (el) {
            const start = el.scrollTop;
            const distance = y - start;
            const duration = 700;
            const startTime = performance.now();
            function step(now) {
              const elapsed = Math.min(now - startTime, duration);
              const progress = elapsed / duration;
              const ease = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
              el.scrollTop = start + distance * ease;
              if (elapsed < duration) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
          }
        }, targetScroll);
        await wait(850);
      }
    }

    // 모달 닫기
    await wait(600);
    await smoothClick(page, '.side-peek-close-btn', 1200);
  } catch (e) {
    console.log('  ⚠️  프로젝트 카드 클릭 실패:', e.message.split('\n')[0]);
  }

  // ── Scene 6: 블로그 페이지 ──────────────────────────────────────
  console.log('📍 Scene 6: 블로그 페이지');
  await smoothClick(page, '#nav-blog', 500);
  await page.waitForLoadState('domcontentloaded');
  await wait(1000);

  // 1. 카테고리 필터 클릭 테스트
  console.log('  → 카테고리 필터 "Semiconductor" 클릭');
  await smoothClick(page, '.tag-filter-btn[data-category="Semiconductor"]', 1500);
  await smoothScroll(page, 400, 600);
  await wait(1000);
  await scrollToTop(page);
  await wait(500);

  console.log('  → 카테고리 필터 "All" 클릭 (초기화)');
  await smoothClick(page, '.tag-filter-btn[data-category="all"]', 1200);

  // 2. 블로그 페이지 2페이지로 이동
  console.log('  → 블로그 페이지 2페이지 클릭');
  // 2페이지 버튼 위치로 부드럽게 스크롤
  const paginationY = await page.evaluate(() => {
    const el = document.getElementById('blog-pagination-wrapper');
    return el ? el.getBoundingClientRect().top + window.scrollY - 350 : 1800;
  });
  await smoothScroll(page, paginationY, 1500);
  await wait(500);
  await smoothClick(page, '.blog-pagination .page-btn[data-page="2"]', 1800);

  // 3. 2페이지 블로그 포스트 클릭하여 진입
  console.log('  → 2페이지의 첫 번째 블로그 포스트 클릭');
  const blogItems = page.locator('.list-item:visible');
  const blogLinks = page.locator('.list-item:visible a');
  
  await safeHover(blogItems.first(), 400);
  await blogLinks.first().click();
  await wait(2000);

  // 4. 포스트 내부에서 공유 및 복사 버튼 클릭
  console.log('  → 포스트 내부 공유 및 복사 버튼 클릭');
  await smoothClick(page, '.ai-dropdown-trigger', 2000); // 드롭다운 열림 상태 유지

  // 5. 하단으로 스크롤하여 "다른 글 읽어보기"로 이동
  console.log('  → 본문 스크롤 및 다른 글 읽어보기 섹션으로 이동');
  await smoothScroll(page, 800, 800);
  await wait(800);
  await smoothScroll(page, 1800, 800);
  await wait(800);
  
  // 추천 카드 그리드로 부드럽게 이동
  const recommendedY = await page.evaluate(() => {
    const el = document.querySelector('.recommended-section');
    return el ? el.getBoundingClientRect().top + window.scrollY - 200 : 2500;
  });
  await smoothScroll(page, recommendedY, 1200);
  await wait(800);

  // 6. 다른 게시물 보러 가기 카드 클릭
  console.log('  → 추천 게시물 카드 클릭');
  const recommendedCards = page.locator('.recommended-card');
  const recommendedCount = await recommendedCards.count();
  console.log(`  → 추천 카드 ${recommendedCount}개 발견`);
  if (recommendedCount > 0) {
    // 추천 카드들의 호버링 동작 시연
    for (let i = 0; i < Math.min(recommendedCount, 3); i++) {
      console.log(`    → 추천 카드 ${i + 1} 호버링`);
      await safeHover(recommendedCards.nth(i), 1000);
    }
    // 첫 번째 추천 카드 클릭
    await recommendedCards.first().click();
    await wait(2500); // 새 글 로딩 대기
    
    // 새 글 스크롤 시연
    await smoothScroll(page, 600, 700);
    await wait(1000);
  } else {
    console.log('  ⚠️ 추천 카드가 발견되지 않았습니다.');
  }

  // ── 마무리: 홈으로 복귀 ─────────────────────────────────────────
  console.log('📍 마무리: 홈으로 복귀');
  await page.goto(`${BASE_URL}/index.html`, { waitUntil: 'domcontentloaded' });
  await wait(2500);

  console.log('✅ 데모 완료! Tella 녹화를 중지해주세요.');
console.log('브라우저는 열려 있으며, 필요에 따라 수동으로 닫으세요.');
})();
