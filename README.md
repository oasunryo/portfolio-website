# Junseo Oh — Personal Portfolio

> 반도체 후공정 엔지니어 오준서의 개인 포트폴리오 웹사이트

**🌐 Live:** [junseo.site](https://junseo.site)

---

## Overview

광운대학교 전기공학과 학부생 오준서의 포트폴리오입니다.  
반도체 전/후공정, 회로 설계, FPGA Verilog 등 9개의 핵심 프로젝트와 기술적 여정을 담고 있습니다.  
2026년 7월 **앰코테크놀로지(Amkor Technology)** 후공정 엔지니어로 합류 예정입니다.

## Features

- **한국어 / English** 이중 언어 지원 (`/ko`, `/en`)
- **다크 / 라이트 모드** 토글 (localStorage 기반 테마 유지)
- **블로그 (40+ 기술 포스트)** — 반도체(Semiconductor) 및 커리어(Career) 카테고리로 전문화된 40여 개의 기술 포스트. 모듈 독립성 확보를 위해 `newBlogPosts.js`로 분리하여 빌드 시스템에 통합.
- **usePagination 기반 페이지네이션** — 블로그 글을 페이지당 10개씩 똑똑하게 쪼개어 노출하며, 5페이지 미만일 때는 말줄임표(`…`)가 노출되지 않도록 디테일한 에러 핸들링이 가미된 렌더링 지원.
- **Zero-Gravity Kinetic Scroll (무중력 스크롤)** — 각 페이지네이션 동작 또는 헤더 스크롤링 시, 5차 감속 곡선(`easeOutQuint`)과 1.6초(`1600ms`) 듀레이션이 결합된 커스텀 이징 수식을 구동하여 부드럽고 세련된 무중력 부유 스크롤 메커니즘을 지원.
- **Glassmorphic Floating Header** — 상단 탭 위에 항상 밀착되어 반투명 블러 효과를 제공하는 플로팅 헤더와 상단 화면 영역 이탈 방지형 리버스 툴팁(Reverse Tooltip, 하향 및 우측 밀착 노출) 설계.
- **Terracotta & Obsidian Custom Scrollbar** — 웹사이트의 고유 악센트 컬러(테라코타 오렌지 및 다크 모드 오렌지 glow)를 그대로 이식하고 트랙과의 대조를 최적화하여 스크롤링 가독성을 향상한 고감도 커스텀 스크롤바 탑재.
- **프로젝트** — 9개 핵심 프로젝트의 상세 기술 분석 (SEM 이미지, 시뮬레이션 데이터 포함)
- **정적 사이트** — 빠른 로딩, 프레임워크 미사용 순수 HTML/CSS/JS 및 `build.js` 빌더 통합
- **MathJax** 수식 렌더링 지원

## Projects

| # | 프로젝트 | 분야 |
|---|---------|------|
| 01 | Capillary in Wire Bonding | 반도체 후공정 |
| 02 | Semiconductor Packaging Test Fundamentals | 패키징 테스트 |
| 03 | FPGA Verilog Digital Design | 디지털 회로 설계 |
| 04 | EUV Photoresist Innovation | 반도체 전공정 |
| 05 | Semiconductor Data Analytics (Spotfire) | 데이터 분석 |
| 06 | Digital AC Power Meter | 회로 설계 |
| 07 | Audio Level Meter | 회로 설계 |
| 08 | Battery Charger with MCU | 임베디드 |
| 09 | Battery SOC Tester | 임베디드 |

## Tech Stack

- **HTML5** — 시맨틱 마크업
- **CSS3** — 커스텀 디자인 시스템 (`index.css`) 및 모던 반응형 레이아웃
- **Vanilla JavaScript** — 테마 토글, 언어 전환, 무중력 스크롤 엔진, 페이지네이션 훅
- **MathJax 3** — LaTeX 수식 렌더링
- **Lucide Icons** — 아이콘
- **Vercel** — 배포 (GitHub 연동 자동 배포)

## Project Structure

```
portfolio-website/
├── index.html              # 루트 (ko/index.html 로 리다이렉트)
├── index.css               # 전체 디자인 시스템 및 커스텀 스크롤바
├── main.js                 # 공통 JavaScript (테마, 언어 전환, 무중력 스크롤)
├── newBlogPosts.js         # 블로그 포스트 데이터셋 (40+ 포스트)
├── projectsData.js         # 프로젝트 데이터
├── build.js                # 정적 사이트 빌더 (템플릿 삽입 및 다국어 렌더링)
├── assets/
│   └── projects/           # 프로젝트 썸네일 이미지
├── ko/                     # 한국어 버전
│   ├── index.html
│   ├── blog/
│   └── projects/
├── en/                     # English version
│   ├── index.html
│   ├── blog/
│   └── projects/
├── projects/               # 프로젝트 원본 자료 (PDF, Markdown)
└── templates/              # HTML 템플릿 (header, footer 등)
```

## Deployment

GitHub `main` 브랜치에 push 하면 Vercel이 자동으로 프로덕션 배포합니다.
Vercel 빌드 설정에서 `node build.js`가 자동으로 트리거되도록 구성되어 있어 정적 페이지를 동적으로 빌드해 냅니다.

```bash
node build.js
git add -A
git commit -m "your message"
git push origin main
```

## Contact

- **Email:** junseo.oh.kr@gmail.com
- **LinkedIn:** [linkedin.com/in/junseokorea](https://linkedin.com/in/junseokorea)
- **Website:** [junseo.site](https://junseo.site)

---

© 2026 오준서 (Junseo Oh). All rights reserved.
