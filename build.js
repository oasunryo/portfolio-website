const fs = require('fs');
const path = require('path');

// Load environment variables from local .env file if it exists
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split(/\r?\n/).forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const parts = trimmed.split('=');
      const key = parts[0].trim();
      const value = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
      if (key && value) {
        process.env[key] = value;
      }
    }
  });
}

const newBlogPosts = require('./newBlogPosts');
const blogPosts = require('./blogPosts');
const projectProseData = require('./projectsData');
const { computeRecommendations } = require('./embeddingHelper');

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
    date: "2026-05-01",
    period: "2026. 05. 01. ~ 2026. 05. 18.",
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
    date: "2026-04-01",
    period: "2026. 04. 01. ~ 2026. 05. 28.",
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
    date: "2026-03-01",
    period: "2026. 03. 01. ~ 2026. 06. 30.",
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
    date: "2025-11-17",
    period: "2025. 11. 17. ~ 2025. 12. 04.",
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
    date: "2025-10-20",
    period: "2025. 10. 20. ~ 2025. 11. 09.",
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
    date: "2025-09-01",
    period: "2025. 09. 01. ~ 2025. 12. 31.",
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
    date: "2025-03-01",
    period: "2025. 03. 01. ~ 2025. 06. 30.",
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
    date: "2024-09-01",
    period: "2024. 09. 01. ~ 2024. 12. 31.",
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
    date: "2024-03-01",
    period: "2024. 03. 01. ~ 2024. 06. 30.",
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
  },
  {
    id: 10,
    slug: "ito-oled-analysis",
    initials: "10",
    image: "/assets/projects/ito_oled_analysis.png",
    tags: ["OLED", "Thin-Film", "Blade-Coating", "Optoelectronic", "Chart.js"],
    date: "2026-03-01",
    period: "2026. 03. 01. ~ 2026. 06. 30.",
    ko: {
      title: "ITO-based OLED Fabrication",
      category: "반도체 소자 & 공정",
      hostname: "OLED Optoelectronic Analysis",
      description: "ITO 투명 전극 가공, 유기 발광층 Blade Coating 및 열처리를 통해 OLED 소자를 직접 제작하고 J-V-L 전기광학적 성능을 정량 분석한 프로젝트입니다."
    },
    en: {
      title: "ITO-based OLED Fabrication",
      category: "Devices & Process",
      hostname: "OLED Optoelectronic Analysis",
      description: "Fabricating ITO anodes, blade-coating emitting layers, and optimizing thermal annealing to profile J-V-L optoelectronic performance curves."
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
    featuredSubtitle: "반도체 전/후공정, 디지털/아날로그 회로설계, 임베디드 핵심 프로젝트 10선",
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
    featuredSubtitle: "10 core engineering projects across semiconductor manufacturing, digital circuits, and embedded systems.",
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
        본 포트폴리오는 학부생 오준서가 실무 현장의 주니어 엔지니어로 성장하기까지 수행한 10대 핵심 프로젝트와 기술적 여정을 담고 있습니다. 
        각 프로젝트에 관한 세부 실증 분석 데이터와 SEM 비교표, 설계 시뮬레이션 결과 등은 <a href="/ko/projects/" style="color: var(--accent-color); font-weight: 500;">프로젝트 탭</a>에서 시각적으로 열람하실 수 있습니다.
      </p>
    `,
    timeline: `
      <div class="list-item">
        <div class="item-header-row">
          <div class="item-title-badge">
            <span style="font-family: var(--font-sans); font-size: 1.15rem; font-weight: 600;">Amkor Technology</span>
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
            <span style="font-family: var(--font-sans); font-size: 1.15rem; font-weight: 600;">광운대학교 (Kwangwoon University)</span>
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
        This portfolio details 10 key engineering projects and technical journeys that highlight my progression as a junior engineer.
        The exact analysis logs, SEM comparison tables, and design verification waveforms can be visually browsed in the <a href="/en/projects/" style="color: var(--accent-color); font-weight: 500;">Projects tab</a>.
      </p>
    `,
    timeline: `
      <div class="list-item">
        <div class="item-header-row">
          <div class="item-title-badge">
            <span style="font-family: var(--font-sans); font-size: 1.15rem; font-weight: 600;">Amkor Technology</span>
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
            <span style="font-family: var(--font-sans); font-size: 1.15rem; font-weight: 600;">Kwangwoon University</span>
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
    .replace('href="/logo/favicon-32x32.png?v=1.0.1"', `href="${relPath}logo/favicon-32x32.png?v=1.0.1"`)
    .replace('href="/logo/apple-touch-icon.png?v=1.0.1"', `href="${relPath}logo/apple-touch-icon.png?v=1.0.1"`)
    .replace('href="/site.webmanifest"', `href="${relPath}site.webmanifest"`)
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
  <link rel="alternate icon" type="image/png" href="./logo/favicon-32x32.png?v=1.0.1">
  <link rel="apple-touch-icon" sizes="180x180" href="./logo/apple-touch-icon.png?v=1.0.1">
  <link rel="manifest" href="./site.webmanifest">
  <meta name="theme-color" content="#c2410c">
  <meta http-equiv="refresh" content="0; url=./ko/index.html">
  <script>window.location.replace("./ko/index.html");</script>
</head>
<body>
</body>
</html>`;
fs.writeFileSync(path.join(__dirname, 'index.html'), rootIndexContent);
console.log('Generated /index.html');

let globalAllBlogPosts = [];

async function buildAll() {
  const allBlogPosts = [...blogPosts, ...newBlogPosts];
  globalAllBlogPosts = allBlogPosts;

  const allItems = [];
  allBlogPosts.forEach(post => {
    ['ko', 'en'].forEach(lang => {
      const langData = post[lang];
      if (langData) {
        allItems.push({
          slug: post.slug,
          title: langData.title,
          category: post.category || '',
          description: langData.description || '',
          content: (langData.content || '').replace(/<[^>]*>/g, ' '),
          date: post.date,
          lang: lang,
          type: 'blog'
        });
      }
    });
  });

  projectsMeta.forEach(proj => {
    ['ko', 'en'].forEach(lang => {
      const langData = proj[lang];
      const proseData = projectProseData[lang] && projectProseData[lang][proj.id];
      const content = proseData ? (proseData.prose || '') : '';
      if (langData) {
        allItems.push({
          slug: proj.slug,
          title: langData.title,
          category: langData.category || '',
          description: langData.description || '',
          content: content.replace(/<[^>]*>/g, ' '),
          date: proj.date,
          lang: lang,
          type: 'project'
        });
      }
    });
  });

  console.log("🧠 Calculating content semantic similarities via Gemini Embeddings...");
  const recommendationsMap = await computeRecommendations(allItems);

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
      <a href="https://www.linkedin.com/in/junseokorea" target="_blank" rel="noopener noreferrer" class="social-icon-link" aria-label="LinkedIn" data-tooltip="${locale.linkedinTooltip}">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
      </a>
      <a href="mailto:junseo.oh.kr@gmail.com" class="social-icon-link" aria-label="Email" data-tooltip="${locale.emailTooltip}">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
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
          
          <details class="similarity-info-details">
            <summary class="similarity-info-summary">
              <svg class="info-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="position: relative; top: 1.5px; margin-right: 4px;"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              <span>${lang === 'ko' ? '연관도 계산 방식 알아보기' : 'How similarity is calculated'}</span>
            </summary>
            <div class="similarity-info-content">
              <p>${lang === 'ko' ? '본 포트폴리오의 추천 콘텐츠는 <strong>Google Gemini API(gemini-embedding-2 모델)</strong>를 활용해 추출한 <strong>다차원 텍스트 임베딩 벡터 간의 코사인 유사도(Cosine Similarity)</strong>를 기준으로 정렬됩니다.' : 'Recommended content on this portfolio is sorted based on the <strong>Cosine Similarity</strong> between <strong>multi-dimensional text embedding vectors</strong> extracted using the <strong>Google Gemini API (gemini-embedding-2 model)</strong>.'}</p>
              <p>${lang === 'ko' ? '글의 제목, 카테고리, 요약 설명 및 전체 본문을 종합 분석하여 단순한 키워드 일치를 넘어선 의미론적 연관성(Semantic Similarity)을 판별합니다. API 호출이 불가한 환경에서는 <strong>로컬 TF-IDF 기반의 단어 빈도 분석 알고리즘</strong>으로 자동 전환(Fallback)되어 연관도를 계산합니다.' : 'By analyzing the title, category, description, and full body text, it evaluates semantic relevance beyond simple keyword matching. If the API is unavailable, it automatically falls back to a <strong>local TF-IDF term frequency analysis algorithm</strong>.'}</p>
            </div>
          </details>
        </section>

        <!-- Embedded markdown database for LLM text copying -->
        <script type="application/json" id="markdown-${post.slug}">
          ${mdJson}
        </script>

        <script>
          document.addEventListener('DOMContentLoaded', () => {
            const recommended = ${JSON.stringify(recommendationsMap[post.slug]?.slice(0, 3) || [])};
            const recommendedGrid = document.getElementById('recommended-posts-grid');
            
            if (recommendedGrid) {
              recommendedGrid.innerHTML = recommended.map(p => \`
                <a href="../\${p.slug}/index.html" class="recommended-card">
                  <div class="recommended-card-meta">
                    <div style="display: flex; align-items: center; gap: 0.4rem;">
                      <span class="recommended-card-category">\${p.category}</span>
                      <div class="similarity-donut-wrapper">
                        <svg class="similarity-donut" width="12" height="12" viewBox="0 0 20 20" style="vertical-align: middle; opacity: 0.85;">
                          <circle cx="10" cy="10" r="8" fill="transparent" stroke="var(--border-color, #e5e7eb)" stroke-width="3"></circle>
                          <circle cx="10" cy="10" r="8" fill="transparent" stroke="var(--accent-color)" stroke-width="3" 
                                  stroke-dasharray="50.24" stroke-dashoffset="\${50.24 - (50.24 * p.score) / 100}" stroke-linecap="round" transform="rotate(-90 10 10)"></circle>
                        </svg>
                        <span class="similarity-tooltip">${lang === 'ko' ? '해당 글과의 연관성' : 'Similarity'}: \${p.score}%</span>
                      </div>
                    </div>
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
    const readingTimeLabel = lang === 'ko' ? `${readingTime}분` : `${readingTime} min`;
    return `
    <div class="blog-table-row blog-hover-item" data-category="${post.category}" data-date="${post.date}" data-title="${trans.title.toLowerCase()}" data-description="${trans.description.replace(/"/g, '&quot;')}" data-search-content="${cleanContent}">
      <div class="col-title">
        <a href="./${post.slug}/index.html" class="item-title-link">${trans.title}</a>
      </div>
      <div class="col-category">
        <span class="status-badge badge-${post.category.toLowerCase()}">${post.category}</span>
      </div>
      <div class="col-date tabular-nums">${post.date}</div>
      <div class="col-reading-time tabular-nums">${readingTimeLabel}</div>
    </div>
    `;
  }).join('\n');

  const blogIndexContent = `
  <div class="py-8">
    <a href="../index.html" class="blog-back-link">
      ${locale.backToHome}
    </a>
    <header class="mb-10" style="margin-bottom: 2.5rem;">
      <h1 style="font-family: var(--font-sans); font-size: 2.2rem; font-weight: 600; margin-bottom: 0.5rem;">Blog</h1>
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
    
    <div class="blog-table-container">
      <div class="blog-table-header">
        <div class="col-title">TITLE</div>
        <div class="col-category">CATEGORY</div>
        <div class="col-date">DATE</div>
        <div class="col-reading-time">READ TIME</div>
      </div>
      <div class="blog-table-body" id="blog-posts-list">
        ${blogListings}
      </div>
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
    const tagHTML = p.tags ? p.tags.map(t => `<span class="design-card-tag">${t.trim()}</span>`).join('') : '';
    return `
    <a class="design-card-item" href="./${p.slug}/index.html" data-date="${p.date}" data-title="${trans.title.toLowerCase()}" data-image="${imgPath}" data-description="${trans.description}" data-tags="${p.tags.join(',')}" style="text-decoration: none; color: inherit;">
      <div class="design-card-thumbnail" style="background-image: url(${imgPath});">
        <img src="${imgPath}" alt="${trans.title}" loading="lazy">
      </div>
      <div class="design-card-content">
        <div class="design-card-main-info">
          <span class="recommended-card-category">${trans.category}</span>
          <h3 class="design-card-title">${trans.title}</h3>
          <p class="design-card-desc">${trans.description}</p>
          <div class="design-card-tags">
            ${tagHTML}
          </div>
        </div>
        <div class="design-card-sub-info">
          <span class="design-card-date">${p.period}</span>
        </div>
      </div>
    </a>
    `;
  }).join('\n');

  const designIndexContent = `
  <div class="py-8">
    <a href="../index.html" class="blog-back-link">
      ${locale.backToHome}
    </a>
    <header style="margin-bottom: 2.5rem; display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem;">
      <div>
        <h1 style="font-family: var(--font-sans); font-size: 2.2rem; font-weight: 600; margin-bottom: 0.5rem;">Projects</h1>
        <p style="font-size: 1.1rem; color: var(--text-secondary);">${locale.projectsDesc}</p>
      </div>
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <div class="projects-sort-container">
          <select id="projects-sort" class="sort-select-box" aria-label="Sort projects">
            <option value="latest">${lang === 'ko' ? '최신순' : 'Latest'}</option>
            <option value="oldest">${lang === 'ko' ? '오래된순' : 'Oldest'}</option>
            <option value="alphabetical">${lang === 'ko' ? '제목순' : 'Alphabetical'}</option>
          </select>
        </div>
        <div class="view-toggle-buttons" style="display: flex; gap: 0.25rem; background-color: var(--bg-secondary); border: 1px solid var(--border-color); padding: 0.25rem; border-radius: 2rem; align-items: center;">
          <button id="toggle-grid-btn" class="toggle-view-btn" aria-label="Grid View" style="outline: none;">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          </button>
          <button id="toggle-list-btn" class="toggle-view-btn active" aria-label="List View" style="outline: none;">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          </button>
        </div>
      </div>
    </header>
    
    <div class="design-grid-container" id="projects-grid">
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
          
          <details class="similarity-info-details">
            <summary class="similarity-info-summary">
              <svg class="info-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="position: relative; top: 1.5px; margin-right: 4px;"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              <span>${lang === 'ko' ? '연관도 계산 방식 알아보기' : 'How similarity is calculated'}</span>
            </summary>
            <div class="similarity-info-content">
              <p>${lang === 'ko' ? '본 포트폴리오의 추천 콘텐츠는 <strong>Google Gemini API(gemini-embedding-2 모델)</strong>를 활용해 추출한 <strong>다차원 텍스트 임베딩 벡터 간의 코사인 유사도(Cosine Similarity)</strong>를 기준으로 정렬됩니다.' : 'Recommended content on this portfolio is sorted based on the <strong>Cosine Similarity</strong> between <strong>multi-dimensional text embedding vectors</strong> extracted using the <strong>Google Gemini API (gemini-embedding-2 model)</strong>.'}</p>
              <p>${lang === 'ko' ? '글의 제목, 카테고리, 요약 설명 및 전체 본문을 종합 분석하여 단순한 키워드 일치를 넘어선 의미론적 연관성(Semantic Similarity)을 판별합니다. API 호출이 불가한 환경에서는 <strong>로컬 TF-IDF 기반의 단어 빈도 분석 알고리즘</strong>으로 자동 전환(Fallback)되어 연관도를 계산합니다.' : 'By analyzing the title, category, description, and full body text, it evaluates semantic relevance beyond simple keyword matching. If the API is unavailable, it automatically falls back to a <strong>local TF-IDF term frequency analysis algorithm</strong>.'}</p>
            </div>
          </details>
        </section>

        <!-- Embedded markdown database for LLM text copying -->
        <script type="application/json" id="markdown-${proj.slug}">
          ${mdJson}
        </script>

        <script>
          document.addEventListener('DOMContentLoaded', () => {
            const recommended = ${JSON.stringify(recommendationsMap[proj.slug]?.slice(0, 3) || [])};
            const recommendedGrid = document.getElementById('recommended-projects-grid');
            
            if (recommendedGrid) {
              recommendedGrid.innerHTML = recommended.map(p => \`
                <a href="../\${p.slug}/index.html" class="recommended-card">
                  <div class="recommended-card-meta">
                    <div style="display: flex; align-items: center; gap: 0.4rem;">
                      <span class="recommended-card-category">\${p.category}</span>
                      <div class="similarity-donut-wrapper">
                        <svg class="similarity-donut" width="12" height="12" viewBox="0 0 20 20" style="vertical-align: middle; opacity: 0.85;">
                          <circle cx="10" cy="10" r="8" fill="transparent" stroke="var(--border-color, #e5e7eb)" stroke-width="3"></circle>
                          <circle cx="10" cy="10" r="8" fill="transparent" stroke="var(--accent-color)" stroke-width="3" 
                                  stroke-dasharray="50.24" stroke-dashoffset="\${50.24 - (50.24 * p.score) / 100}" stroke-linecap="round" transform="rotate(-90 10 10)"></circle>
                        </svg>
                        <span class="similarity-tooltip">${lang === 'ko' ? '해당 글과의 연관성' : 'Similarity'}: \${p.score}%</span>
                      </div>
                    </div>
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
}

buildAll().catch(console.error);
