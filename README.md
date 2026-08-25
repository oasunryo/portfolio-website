# Junseo Oh — Personal Portfolio

> 반도체 후공정 엔지니어 오준서의 개인 포트폴리오 웹사이트

**🌐 Live:** [junseo.site](https://junseo.site)

---

## Overview

광운대학교 전기공학과 학부 졸업(2027년 2월 예정) 및 글로벌 OSAT 기업인 **앰코테크놀로지(Amkor Technology)**의 DP(Die Preparation) 공정 엔지니어(Process Engineer) 오준서의 포트폴리오 사이트입니다.  
반도체 전/후공정 이론, 회로 설계, FPGA Verilog 및 빅데이터 수율 분석 등 11개의 핵심 엔지니어링 프로젝트와 기술 블로그 글들을 담고 있습니다.

## Features

- **한국어 / English 이중 언어 지원** (`/ko`, `/en`)
- **다크 / 라이트 모드 토글** (localStorage 기반 테마 유지)
- **Gemini Embeddings Similarity Recommendation System (임베딩 기반 콘텐츠 연관 추천)** — Google Gemini API (`gemini-embedding-2` 모델)를 통해 다차원 텍스트 임베딩 벡터를 추출하여 각 글/프로젝트 간의 코사인 유사도(Cosine Similarity)를 사전 계산하고, 의미론적으로 가장 연관도가 높은 상위 3개 콘텐츠를 자동 추천 (블로그 탭에서는 블로그 글만, 프로젝트 탭에서는 프로젝트만 각각 분리하여 정합성 있게 매칭).
- **Incremental Language-Prefixed Caching & Free-Tier Rate Limiting** — API 호출 제한(100 RPM) 극복을 위해 650ms 딜레이를 적용하고, 성공 시 즉시 파일 시스템에 캐싱(`ko_`, `en_` 접두사 분리)하여 100% 캐시 적중률을 달성. API 단절 시 로컬 TF-IDF 연산으로 자동 전환되는 회복성(Fallback) 탑재.
- **Collapsible Details Explanation (연관도 계산 정보 컴포넌트)** — 추천 리스트 하단에 누르면 연관도가 계산되는 과정(Gemini 임베딩, 코사인 유사도, TF-IDF 로컬 대체 기준 등)을 상세하고 깔끔하게 설명하는 아코디언 컴포넌트 내장.
- **소셜 채널 및 Notion 이력서 연동** — LinkedIn, GitHub, Email 링크와 함께 **Notion 원페이지 이력서 링크**(호버 시 '한 페이지로 구성된 이력서 확인' 툴팁 표시)를 제공하며 모던 브랜딩 아이콘 탑재.
- **주요 소속 공식 홈페이지 연동** — 경력 및 학력 사항의 Amkor Technology 및 광운대학교 타이틀 클릭 시 해당 공식 홈페이지로 즉시 연결.
- **블로그 (120+ 기술 포스트)** — 반도체(Semiconductor) 및 커리어(Career) 카테고리로 전문화된 129개의 기술 포스트 제공.
- **usePagination 기반 페이지네이션** — 블로그 글을 페이지당 10개씩 똑똑하게 쪼개어 노출하며, 5페이지 미만일 때는 말줄임표(`…`)가 노출되지 않도록 디테일한 에러 핸들링이 가미된 렌더링 지원.
- **Zero-Gravity Kinetic Scroll (무중력 스크롤)** — 각 페이지네이션 동작 또는 헤더 스크롤링 시, 5차 감속 곡선(`easeOutQuint`)과 1.6초(`1600ms`) 듀레이션이 결합된 커스텀 이징 수식을 구동하여 부드럽고 세련된 무중력 부유 스크롤 메커니즘을 지원.
- **Glassmorphic Floating Header** — 상단 탭 위에 항상 밀착되어 반투명 블러 효과를 제공하는 플로팅 헤더와 상단 화면 영역 이탈 방지형 리버스 툴팁(Reverse Tooltip, 하향 및 우측 밀착 노출) 설계.
- **Terracotta & Obsidian Custom Scrollbar** — 웹사이트의 고유 악센트 컬러(테라코타 오렌지 및 다크 모드 오렌지 glow)를 그대로 이식하고 트랙과의 대조를 최적화하여 스크롤링 가독성을 향상한 고감도 커스텀 스크롤바 탑재.
- **프로젝트** — 11개 핵심 프로젝트의 상세 기술 분석 (SEM 이미지, 시뮬레이션 데이터 포함)
- **정적 사이트** — 빠른 로딩, 프레임워크 미사용 순수 HTML5/Vanilla CSS/Pure ES6+ JS 및 `build.js` 빌더 통합
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
| 10 | ITO-based OLED Fabrication | 반도체 소자 |
| 11 | Context Relay System | AI 에이전트 스킬 |

## Tech Stack

- **HTML5** — 시맨틱 마크업
- **CSS3** — 커스텀 디자인 시스템 (`index.css`) 및 모던 반응형 레이아웃
- **Vanilla JavaScript** — 테마 토글, 언어 전환, 무중력 스크롤 엔진, 페이지네이션 훅
- **MathJax 3** — LaTeX 수식 렌더링
- **Vercel** — 배포 (GitHub 연동 자동 배포)

## Project Structure

```
portfolio-website/
├── index.html              # 루트 (ko/index.html 로 리다이렉트)
├── index.css               # 전체 디자인 시스템 및 커스텀 스크롤바
├── main.js                 # 공통 JavaScript (테마, 언어 전환, 무중력 스크롤)
├── projectsData.js         # 프로젝트 메타데이터 정의
├── build.js                # 정적 사이트 컴파일러 (템플릿 삽입, 임베딩 연산 및 다국어 렌더링)
├── embeddingHelper.js      # Gemini API 기반 텍스트 임베딩/유사도 연산 헬퍼
├── data/                   # 원본 데이터 디렉터리
│   ├── blog/
│   │   ├── new/            # 신규 블로그 포스트 데이터 (JSON)
│   │   └── old/            # 기존 블로그 포스트 데이터 (JSON)
│   └── projects/           # 프로젝트 상세 상세 데이터 (JSON)
├── ko/                     # 컴파일 출력: 한국어 버전
│   ├── index.html
│   ├── blog/
│   └── projects/
├── en/                     # 컴파일 출력: English version
│   ├── index.html
│   ├── blog/
│   └── projects/
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
