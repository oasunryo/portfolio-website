# Web Portfolio Cross-Browsing & Safari Troubleshooting Guide

이 문서는 오준서 개인 포트폴리오 웹사이트 개발 과정에서 발생한 크로스 브라우징 이슈(특히 iOS/macOS Safari 환경)와 파비콘 캐시 누수 현상에 대한 원인 분석 및 해결 방안을 기록한 개발자 트러블슈팅 가이드입니다.

---

## 1. Safari 뷰포트 안전영역(Safe Area) 및 오버레이 여백 끊김 현상

### 🚨 Issue Description
* **현상**: iOS Safari 브라우저에서 화면을 볼 때 최상단 헤더(sticky-nav) 위쪽이 투명하게 뚫려서 밑에 있는 콘텐츠가 겹쳐 보이거나, 상세 보기 모달을 열었을 때 최상단(상태 표시줄)과 최하단(홈 바 영역) 툴바에 흰색(투명) 여백이 분리되어 뒷배경의 흰 화면이 노출되는 버그가 발생함.
* **원인**: 
  1. 기본 뷰포트 설정이 물리적 스크린 경계(Safe Area) 안쪽에 갇혀 있어 고정 요소(`position: fixed`)가 노치 및 하단 홈 바 영역까지 확장되지 못함.
  2. 상세 모달이 열려 화면을 어둡게 블러 처리하더라도, Safari 브라우저는 `html` 또는 `body`의 배경색을 기준으로 상/하단 시스템 영역의 테두리 색상을 칠함. 이때 본문 배경이 투명하거나 흰색이면 모달이 켜져도 툴바 영역에 투명 여백이 띄워져 시각적으로 끊겨 보임.

### 💡 Resolution (해결 조치)
1. **뷰포트 속성 확장 (`viewport-fit=cover`)**
   * [templates/head.html](templates/head.html) 내의 viewport 메타 태그에 `viewport-fit=cover`를 주입하여 브라우저 뷰포트가 화면 전체 영역(물리 경계선 끝까지)을 칠하도록 강제했습니다.
   * `HTML`
     ```html
     <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
     ```
2. **다이내믹 Safe Area 패딩 연산 주입**
   * 플로팅 네비게이션이 장치의 노치에 겹치지 않도록 [index.css](index.css)에서 CSS 환경 변수(`env(safe-area-inset-top)`)를 사용하여 안전 영역만큼 상단 패딩을 밀어주도록 수식을 가미했습니다.
   * `CSS`
     ```css
     header.sticky-nav {
       padding-top: calc(1.25rem + env(safe-area-inset-top, 0px));
     }
     .pt-24 {
       padding-top: calc(6rem + env(safe-area-inset-top, 0px)); /* 헤더 팽창 대응 */
     }
     ```
3. **오버레이 영역의 뷰포트 물리 경계 밖 팽창 확장 (Negative Margin Spanning)**
   * 모달 뒷배경을 흐리게 채우는 오버레이 요소(`.side-peek-overlay`)의 물리적 상하좌우 크기를 스크린 가로세로 범위 밖인 `-10vh` / `-10vw` 수준으로 대폭 연장하여, Safari 브라우저 내부 스크롤 바운스나 노치 등으로 인해 발생하는 흰색 투명 틈새가 원천적으로 모달 뒷배경 오버레이에 의해 다 가려지도록 처리했습니다.
   * `CSS`
     ```css
     .side-peek-overlay {
       position: fixed;
       top: -10vh;
       bottom: -10vh;
       left: -10vw;
       right: -10vw;
       background-color: rgba(0, 0, 0, 0.8);
       backdrop-filter: blur(8px);
       -webkit-backdrop-filter: blur(8px);
     }
     ```

---

## 2. Safari 파비콘(Favicon) 다국어 Subpath 누락 및 캐시 고착화 버그

### 🚨 Issue Description
* **현상**: 포트폴리오 사이트 접속 시 영문 홈 화면(`/en/index.html`)과 하위 블로그 및 프로젝트 페이지에서는 파비콘이 정상적으로 출력되나, 한글 홈 화면(`/ko/index.html` 또는 `/ko/`)으로 진입하거나 언어를 전환하는 경우 파비콘 아이콘이 노출되지 않고 깨지는 현상이 발생함.
* **원인**:
  1. **절대 경로의 한계**: 기존 파비콘 선언이 `/logo/favicon.svg` 절대 경로로 구성되어 있었으나, 로컬 파일 시스템(`file:///`)으로 테스트할 때나 특정 배포 서브디렉토리 깊이 및 리다이렉트 과정에서 호스트 명 유실 시 정상 경로를 탐색하지 못함.
  2. **루트 리다이렉터 내 선언 부재**: 최초 도메인 접속 시 동작하는 루트 `index.html`에 파비콘 태그가 없어 브라우저가 자동으로 `/favicon.ico`를 검색하다 404 에러를 유발함.
  3. **Safari의 악성 파비콘 에러 캐싱**: Safari 브라우저는 특정 도메인의 동일 서브패스에서 파비콘을 1회라도 읽어 들이지 못하면 에러 상태를 메모리에 고착화(Sticky)시켜 이후 경로를 정상화해도 다시 파비콘을 요청하지 않는 버그가 있음. 한글 홈 화면만 최초 리다이렉트 오류 이력으로 인해 파비콘 캐시가 영구 오염되었던 것임.

### 💡 Resolution (해결 조치)
1. **컴파일 타임 상대 경로 동적 치환**
   * [build.js](build.js)의 `compilePage` 템플릿 컴파일러가 페이지의 폴더 깊이(`depth`)에 맞추어 상대 경로(예: `../logo/favicon.svg` 또는 `../../../logo/favicon.svg`)로 유연하게 치환하여 정적 HTML을 내뱉도록 설계 수정했습니다.
2. **캐시 무력화(Cache Busting) 쿼리 파라미터 적용**
   * Safari의 캐시 고착화 버그를 깨뜨리기 위해 파비콘 리소스 주소 뒤에 버전 파라미터(`?v=1.0.1`)를 부착하여 완전히 새로운 파일로 인지시켜 강제 새로고침되도록 처리했습니다.
   * `HTML (head.html)`
     ```html
     <link rel="icon" type="image/svg+xml" href="/logo/favicon.svg?v=1.0.1">
     ```
   * `JS (build.js)`
     ```javascript
     let head = headTpl
       .replace('href="/index.css"', `href="${relPath}index.css"`)
       .replace('href="/logo/favicon.svg?v=1.0.1"', `href="${relPath}logo/favicon.svg?v=1.0.1"`)
     ```
3. **루트 리다이렉터(index.html)에 파비콘 선행 탑재**
   * 한글 페이지로 분기(Redirect)시키기 전에 동작하는 루트 [index.html](index.html) 파일의 헤더에도 동일한 버전의 파비콘 링크를 삽입하여, 최초 진입 순간부터 파비콘이 정상적으로 브라우저 캐시에 탑재되도록 처리했습니다.
   * `HTML (index.html)`
     ```html
     <head>
       <meta charset="UTF-8">
       <link rel="icon" type="image/svg+xml" href="./logo/favicon.svg?v=1.0.1">
       <meta http-equiv="refresh" content="0; url=./ko/index.html">
       <script>window.location.replace("./ko/index.html");</script>
     </head>
     ```

---

## 3. 요약 및 시각 자료

이러한 프론트엔드 및 브라우저 파편화 버그들은 프레임워크나 외부 종속성(Dependency) 없이 Vanilla 환경에서 직접 JS와 CSS 엔진의 스펙을 제어함으로써 깔끔히 해결되었습니다. 

상세한 빌드 과정과 줌-스케일링 캔버스 렌더러에 관한 추가적인 백서는 웹사이트 상의 **[이력서를 시스템 아키텍처로 엔지니어링하다](/ko/blog/semiconductor-packaging-whitepaper/index.html)** 기술 블로그 글에서 열람하실 수 있습니다.
