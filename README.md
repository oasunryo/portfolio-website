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
- **블로그** — 기술 인사이트 및 개인 에세이
- **프로젝트** — 9개 핵심 프로젝트의 상세 기술 분석 (SEM 이미지, 시뮬레이션 데이터 포함)
- **정적 사이트** — 빠른 로딩, 프레임워크 미사용 순수 HTML/CSS/JS
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
- **CSS3** — 커스텀 디자인 시스템 (`index.css`)
- **Vanilla JavaScript** — 테마 토글, 언어 전환, 인터랙션
- **MathJax 3** — LaTeX 수식 렌더링
- **Lucide Icons** — 아이콘
- **Vercel** — 배포 (GitHub 연동 자동 배포)

## Project Structure

```
portfolio-website/
├── index.html              # 루트 (ko/index.html 로 리다이렉트)
├── index.css               # 전체 디자인 시스템
├── main.js                 # 공통 JavaScript (테마, 언어 전환)
├── projectsData.js         # 프로젝트 데이터
├── build.js                # 정적 사이트 빌더
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

```bash
git add -A
git commit -m "your message"
git push origin main
```

## Contact

- **Email:** junseo.oh.kr@gmail.com
- **LinkedIn:** [linkedin.com/in/junseo-oh](https://linkedin.com/in/junseo-oh)
- **Website:** [junseo.site](https://junseo.site)

---

© 2026 오준서 (Junseo Oh). All rights reserved.
