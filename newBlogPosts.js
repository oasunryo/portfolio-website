module.exports = [
  // Semiconductor (10 posts)
  {
    slug: 'tsv-hbm-technology',
    date: '2026-05-15',
    category: 'Semiconductor',
    ko: {
      title: 'HBM 적층의 핵심, TSV(관통전극) 공정 매커니즘과 불량 유형',
      description: '고대역폭 메모리(HBM)에서 D램을 수직으로 쌓아 올리는 실리콘관통전극(TSV)의 전공정 에칭부터 후공정 본딩 단계까지의 핵심 공정 및 불량 이슈를 해부합니다.',
      content: `
        <h2>HBM 성능을 좌우하는 3D 적층과 TSV</h2>
        <p>HBM(High Bandwidth Memory)은 D램 다이(Die)를 수직으로 적층하여 데이터 전송 대역폭을 극대화한 메모리입니다. 이때 다이 간 신호를 주고받는 수천 개의 미세 통로를 뚫는 기술이 바로 TSV(Through Silicon Via, 실리콘관통전극)입니다. 전통적인 와이어 본딩 방식에 비해 경로가 극도로 단축되어 저전력 고속 동작이 가능해집니다.</p>
        <hr>
        <h2>TSV 주요 공정 흐름</h2>
        <ul>
          <li><strong>Via Etching:</strong> DRIE(Deep Reactive Ion Etching) 기법을 사용하여 실리콘 웨이퍼에 높은 종횡비(Aspect Ratio)의 미세 구멍을 균일하게 뚫습니다.</li>
          <li><strong>Insulation & Barrier Layer:</strong> 구멍 내벽에 누설 전류를 막는 절연막(SiO2)과 구리(Cu) 확산을 방지하는 배리어 메탈(Ti/TiN)을 증착합니다.</li>
          <li><strong>Cu Filling:</strong> 전기도금(Electroplating) 방식을 이용하여 구멍 내부를 Cu로 완벽히 채웁니다. 이때 Void(빈 공간)가 생기지 않도록 도금액 조성을 정밀 제어해야 합니다.</li>
          <li><strong>CMP & Reveal:</strong> 웨이퍼 배면을 얇게 갈아내어(Backside Thinning) 내부에 묻혀있던 Cu 전극을 표면으로 노출(Via Reveal)시킵니다.</li>
        </ul>
        <hr>
        <h2>불량 유형 및 극복 과제</h2>
        <p>가장 빈번하게 발생하는 불량은 도금 과정에서 발생하는 <strong>Cu Void</strong>와 CMP 후 돌출된 전극의 평탄도 불균형입니다. Void가 발생하면 고주파 신호 전송 시 임피던스 불연속성으로 인해 반사 손실이 생기거나, 열팽창계수(CTE) 차이로 인해 팽창 응력이 발생하여 칩 크랙의 원인이 됩니다. 이를 방지하기 위한 지속적인 공정 파라미터 튜닝이 필수적입니다.</p>
      `
    },
    en: {
      title: 'TSV Process Mechanisms and Defect Modes in HBM Stacking',
      description: 'An analysis of Through Silicon Via (TSV) etching, deposition, plating, and bonding processes critical for High Bandwidth Memory (HBM) stacking.',
      content: `
        <h2>3D Stacking and TSV Dictating HBM Performance</h2>
        <p>High Bandwidth Memory (HBM) stacks DRAM dies vertically to maximize data transfer bandwidth. Through Silicon Via (TSV) technology etches thousands of micro-channels through these dies to connect them. Compared to traditional wire bonding, TSV shortens signal paths, enabling low-power and high-speed operation.</p>
        <hr>
        <h2>Key TSV Process Flow</h2>
        <ul>
          <li><strong>Via Etching:</strong> Deep Reactive Ion Etching (DRIE) is used to drill high-aspect-ratio micro-holes uniformly into silicon.</li>
          <li><strong>Insulation & Barrier Layer:</strong> Depositing insulation oxide (SiO2) to prevent current leakage and barrier metal (Ti/TiN) to block copper diffusion.</li>
          <li><strong>Cu Filling:</strong> Filling vias with copper using electroplating. Precise chemistry control is required to prevent void formation.</li>
          <li><strong>CMP & Reveal:</strong> Backside thinning grinds the wafer down to expose the buried copper vias.</li>
        </ul>
        <hr>
        <h2>Defect Modes and Process Challenges</h2>
        <p>Common failures include <strong>Cu voids</strong> in plated vias and uneven protrusion heights after CMP. Voids cause impedance mismatches at high frequencies, leading to return losses or thermo-mechanical cracking due to Coefficient of Thermal Expansion (CTE) mismatches.</p>
      `
    }
  },
  {
    slug: 'wire-bonding-capillary-mechanism',
    date: '2026-05-10',
    category: 'Semiconductor',
    ko: {
      title: '와이어 본딩 공정에서 캐필러리 형상과 불량 제어 매커니즘',
      description: '금(Au) 또는 구리(Cu) 와이어를 본딩 패드에 접합할 때 사용되는 초음파 열압착 캐필러리(Capillary) 형상 변수와 본드 신뢰성 분석.',
      content: `
        <h2>와이어 본딩의 핵심 툴, 캐필러리(Capillary)</h2>
        <p>전통적인 반도체 패키징에서 와이어 본딩은 여전히 넓은 영역을 차지하고 있습니다. 이때 초음파 진동과 열, 압력을 동시에 전달하며 금속 와이어를 패드에 비벼 붙이는 정밀 세라믹 노즐을 <strong>캐필러리(Capillary)</strong>라고 부릅니다. 캐필러리의 내부 직경(Hole size), 챔퍼(Chamfer) 각도, 면면 반경 등 아주 미세한 기하학적 치수가 접합 신뢰성을 결정짓는 핵심 변수입니다.</p>
        <hr>
        <h2>초음파 열압착(Thermosonic) 접합 원리</h2>
        <p>본딩 루프는 먼저 높은 전압으로 와이어 끝을 녹여 둥근 공 모양(Free Air Ball, FAB)을 만든 뒤, 캐필러리로 이를 누르며 초음파를 인가하여 패드의 Al 박막과 원자 간 확산(Intermetallic Compound, IMC) 접합을 형성합니다. 이를 First Bond(Ball Bond)라고 하며, 반대편 리드프레임에 와이어를 칼날 모양으로 끊어내 붙이는 과정을 Second Bond(Stitch Bond)라고 합니다.</p>
        <hr>
        <h2>캐필러리 마모와 불량 제어</h2>
        <p>캐필러리가 마모되면 초음파 에너지가 FAB에 고르게 전달되지 않아 접합 강도가 약해지는 <strong>Non-Stick on Pad (NSOP)</strong> 불량이 생깁니다. 또한 챔퍼 내부 각도가 마모되면 루프 형상이 변형되어 인접 와이어끼리 쇼트(Short)를 일으킬 수 있습니다. 정기적인 캐필러리 팁 청소와 교체 주기 최적화, 그리고 공정 파라미터(Force, Time, Power)의 미세 조정이 수율 향상에 매우 직관적인 영향을 줍니다.</p>
      `
    },
    en: {
      title: 'Capillary Geometry and Defect Mechanisms in Wire Bonding',
      description: 'Analyzing capillary design parameters and thermosonic bonding process conditions for gold and copper wire interconnects.',
      content: `
        <h2>The Core Tool: Capillary Ceramic Nozzle</h2>
        <p>In traditional semiconductor packaging, wire bonding remains widely utilized. The <strong>capillary</strong> is a ceramic nozzle that transfers ultrasonic energy, force, and heat to bond wire onto metal pads. Geometric tolerances like hole size, inner chamfer, and face angle dictate contact quality.</p>
        <hr>
        <h2>Thermosonic Bonding Mechanism</h2>
        <p>The wire bonder fires an electric flame-off to melt the wire tip into a Free Air Ball (FAB). The capillary presses the FAB onto the pad while applying ultrasonic vibration to form an Intermetallic Compound (IMC) junction. This is the First Bond. The wire is then dragged and sheared onto the leadframe to form the Second Bond.</p>
        <hr>
        <h2>Defect Control & Capillary Wear</h2>
        <p>Wear on the capillary tip degrades ultrasonic energy transfer, causing **Non-Stick on Pad (NSOP)** failures. Worn chamfer angles alter looping heights, risking short circuits. Monitoring capillary life cycles and tuning force, time, and power parameters is critical for production yields.</p>
      `
    }
  },
  {
    slug: 'bga-vs-wlcsp-packaging',
    date: '2026-05-05',
    category: 'Semiconductor',
    ko: {
      title: 'BGA vs WLCSP: 모바일 AP와 IoT 칩 패키징 설계 비교',
      description: '볼 그리드 어레이(BGA)와 웨이퍼 레벨 칩 스케일 패키지(WLCSP)의 구조적 차이와 열전도, 전기적 특성 비교 분석.',
      content: `
        <h2>서브스트레이트 유무가 가르는 폼팩터의 한계</h2>
        <p>모바일 기기와 초소형 IoT 센서 시장의 팽창은 패키징 소형화 경쟁을 가속해왔습니다. 대표적인 두 패키지 기술인 <strong>BGA(Ball Grid Array)</strong>와 <strong>WLCSP(Wafer Level Chip Scale Package)</strong>는 기판(Substrate) 사용 여부에서 가장 본질적인 차이를 보입니다.</p>
        <ul>
          <li><strong>BGA:</strong> 반도체 칩을 인쇄회로기판(PCB) 형태의 서브스트레이트에 얹고 와이어나 플립칩 범프로 연결한 뒤 에폭시(EMC)로 성형하는 구조입니다. 신호 입출력(I/O) 핀이 수백 개 이상 필요한 고성능 모바일 AP에 적합합니다.</li>
          <li><strong>WLCSP:</strong> 별도의 기판이나 와이어 없이, 실리콘 웨이퍼 상태에서 패드 위에 직접 재배선층(RDL)과 범프(Solder Ball)를 올려 칩을 그대로 패키지화하는 궁극의 소형 폼팩터입니다. 전력반도체(PMIC)나 센서류에 많이 쓰입니다.</li>
        </ul>
        <hr>
        <h2>열 및 전기적 신호 특성 비교</h2>
        <p>BGA는 기판 내부 배선층 덕분에 회로 배치 자유도가 높고 외부 충격에 강하지만, 패키지 두께가 두껍고寄생 인덕턴스가 상대적으로 큽니다. 반면 WLCSP는 기판이 없어 경로가 매우 짧아 고주파 신호 손실이 극도로 적지만, 칩 외곽 테두리가 실리콘 그대로 외부 노출되므로 기계적 크랙과 물리적 충격에 취약하며 보드 레벨 낙하 테스트(Drop Test) 통과가 더 까다롭습니다.</p>
      `
    },
    en: {
      title: 'BGA vs WLCSP: Packaging Architectures for Mobile AP and IoT Chips',
      description: 'Comparing Ball Grid Array (BGA) and Wafer-Level Chip Scale Package (WLCSP) architectures in terms of signal routing, thermal transfer, and footprint.',
      content: `
        <h2>Substrate Elimination Reshaping the Footprint</h2>
        <p>Form factor constraints in mobile devices and IoT sensors have driven packaging minimization. **Ball Grid Array (BGA)** and **Wafer Level Chip Scale Package (WLCSP)** differ fundamentally on substrate use.</p>
        <ul>
          <li><strong>BGA:</strong> Mounts the silicon die onto a laminated PCB substrate, connecting them via wire bonding or flip-chip bumps, encapsulated in Mold Compound (EMC). Ideal for high I/O density application processors (AP).</li>
          <li><strong>WLCSP:</strong> Routes signals directly on the wafer using Redistributed Layers (RDL) and solder bumps without a substrate. Offers the smallest footprint for PMICs and RF ICs.</li>
        </ul>
        <hr>
        <h2>Thermal & Electrical Integrity</h2>
        <p>BGA design offers flexible routing through substrate layers but introduces higher parasitic inductance. WLCSP minimizes trace loops for lower insertion loss but exposes bare silicon edges, making it fragile to dynamic drops and thermo-mechanical stress on printed boards.</p>
      `
    }
  },
  {
    slug: 'yield-analysis-spotfire',
    date: '2026-04-28',
    category: 'Semiconductor',
    ko: {
      title: 'Spotfire와 통계 분석을 활용한 웨이퍼 테스트 수율(Yield) 개선 사례',
      description: '단위 엔지니어가 생산 데이터 분석 도구인 TIBCO Spotfire를 활용하여 EDS 테스트 원시 데이터를 분석하고 이상 수율의 패턴을 추적한 방법.',
      content: `
        <h2>엔지니어의 무기: 데이터 시각화와 상관관계 분석</h2>
        <p>반도체 양산 라인은 하루에도 수백만 건의 파라메트릭 데이터(WAT)와 EDS 테스트 계측 결과를 내놓습니다. 이 방대한 데이터를 엑셀로 정렬해서는 공정 이상 징후를 알아채기 어렵습니다. 수율 엔지니어는 <strong>Spotfire</strong>를 사용해 수십 매의 웨이퍼 맵(Wafer Map)을 시각화하고 통계적 이상치(Outliers)를 색출합니다.</p>
        <hr>
        <h2>수율 저하 유발 인자 역추적 단계</h2>
        <ol>
          <li><strong>Wafer Map Stacked Bin Analysis:</strong> 불량 발생 칩의 빈 좌표를 겹쳐서 불량이 집중된 영역(Edge 집중, Centered Ring 등)의 형태를 시각화합니다.</li>
          <li><strong>Multi-vari Analysis:</strong> 설비 교차 분석을 통해 특정 챔버(Chamber)나 특정 스텝의 포토 장비가 불량률과 인과관계가 있는지 ANOVA 기법으로 통계적 유의성을 검정합니다.</li>
          <li><strong>Inline Parameter Correlation:</strong> EDS 테스트에서 탈락한 칩들의 물리적 파라미터(게이트 산화막 두께, 메탈 선폭) 계측값과 EDS 테스트 측정값 사이의 상관 계수(Correlation Coefficient)를 뽑아 주원인을 좁힙니다.</li>
        </ol>
        <p>실제 엣지(Edge) 영역의 링 모양 수율 저하 현상이 특정 식각 설비의 클램프 마모로 인한 플라즈마 밀도 불균형이었음을 규명하여 정기 교체 주기를 재조정한 바 있습니다.</p>
      `
    },
    en: {
      title: 'Wafer Test Yield Optimization Using TIBCO Spotfire Data Analytics',
      description: 'Using statistical visualization and bin maps in Spotfire to trace semiconductor production outliers back to faulty inline equipment steps.',
      content: `
        <h2>The Power of Yield Data Analytics</h2>
        <p>Foundries generate millions of parametric test values (WAT) and Electrical Die Sorting (EDS) bin maps daily. Analyzing this data via spreadsheets is impossible. Yield engineers leverage **Spotfire** dashboards to stack wafer maps and uncover anomalous patterns.</p>
        <hr>
        <h2>Root-Cause Tracing Workflow</h2>
        <ol>
          <li><strong>Stacked Bin Maps:</strong> Overlaying bin coordinates reveals spatial failure modes, such as edge rings or radial damage.</li>
          <li><strong>Multi-vari ANOVA Analysis:</strong> Splitting wafer data by tool chambers and photolithography scanners checks if specific assets correlate with defect outliers.</li>
          <li><strong>Inline Correlation:</strong> Mapping electrical failures against physical measurements (gate oxide thickness, trace width) isolates critical process parameters.</li>
        </ol>
      `
    }
  },
  {
    slug: 'euv-photoresist-mechanism',
    date: '2026-04-20',
    category: 'Semiconductor',
    ko: {
      title: 'EUV 노광 공정과 극미세 패턴 해상도를 위한 포토레지스트(PR) 메커니즘',
      description: '13.5nm 극자외선(EUV) 파장을 이용한 미세 패터닝 시 광학 한계 극복을 위한 화학 증폭형 PR(CAR)과 금속 산화물 PR(MOR)의 발전 방향.',
      content: `
        <h2>EUV 노광의 도입과 파장의 한계 돌파</h2>
        <p>반도체 집적도를 올리기 위한 노광 파장의 단축은 DUV(193nm)에서 마침내 EUV(13.5nm)까지 도달했습니다. 파장이 극도로 짧아짐에 따라 광자의 에너지는 매우 강해졌지만, 단위 면적당 도달하는 광자 수(Photon Shot Noise)가 줄어들어 패턴이 찌그러지거나 거칠어지는 Line Edge Roughness(LER) 불량이 핵심 이슈로 떠올랐습니다.</p>
        <hr>
        <h2>화학 증폭형 레지스트(CAR)의 한계</h2>
        <p>기존에 사용되던 화학 증폭형 포토레지스트(CAR)는 빛을 받은 산 발생제(PAG)가 화학 반응을 증폭시켜 용해도를 바꾸는 원리입니다. 하지만 산의 확산 거리(Acid Diffusion Length)가 패턴 크기보다 커지면서, 10nm 이하 극미세 공정에서는 경계면이 뭉개지는 한계에 도달했습니다.</p>
        <hr>
        <h2>차세대 메탈 산화물 PR(MOR)의 부상</h2>
        <p>이를 해결하기 위해 분자 크기가 작고 흡수 계수가 큰 주석(Sn) 기반의 <strong>금속 산화물 포토레지스트(Metal Oxide PR, MOR)</strong>가 급부상하고 있습니다. MOR은 산의 확산 공정이 없어 LER 특성이 매우 뛰어나고, 훨씬 얇은 두께로도 단단한 마스크 역할을 수행하여 초미세 회로 패턴의 수직 프로파일을 정교하게 세울 수 있게 해줍니다.</p>
      `
    },
    en: {
      title: 'EUV Photolithography & Photoresist Molecular Processing Mechanisms',
      description: 'Comparing Chemically Amplified Resists (CAR) and Tin-based Metal Oxide Resists (MOR) for high-resolution 13.5nm EUV patterning.',
      content: `
        <h2>EUV Lithography Photon Shot Noise Limits</h2>
        <p>Transitioning from 193nm DUV to 13.5nm Extreme Ultraviolet (EUV) light enabled sub-10nm circuit features. However, higher photon energy means fewer photons land per unit area, exacerbating Photon Shot Noise and causing Line Edge Roughness (LER) anomalies.</p>
        <hr>
        <h2>Limits of Chemically Amplified Resists (CAR)</h2>
        <p>CAR relies on Photoacid Generators (PAG) to trigger a chemical reaction cascade. But as pattern sizes shrink below the acid diffusion length, the borders blur, hindering fine resolution.</p>
        <hr>
        <h2>Metal Oxide Resists (MOR) Resolution</h2>
        <p>Tin (Sn)-based Metal Oxide Resists (MOR) offer a solution. Lacking acid diffusion steps, MOR molecules resolve finer boundaries, acting as a sturdy mask for vertical etching profiles.</p>
      `
    }
  },
  {
    slug: 'warpage-thermo-analysis',
    date: '2026-04-12',
    category: 'Semiconductor',
    ko: {
      title: '온도 변화에 따른 패키지 Warpage(휨) 현상과 대책 설계',
      description: '반도체 패키지 재료(Silicon, Substrate, EMC) 간의 열팽창계수(CTE) 불일치로 인한 Warpage 메커니즘과 Shadow Moire 계측 분석법.',
      content: `
        <h2>온도가 가르는 물리적 균열, Warpage</h2>
        <p>반도체 칩은 실리콘(CTE: 3 ppm/°C), 서브스트레이트 기판(CTE: 12~17 ppm/°C), 성형 수지(EMC, CTE: 8~12 ppm/°C) 등 열팽창 계수가 완전히 다른 이종 재료의 집합체입니다. 리플로우(Reflow) 공정처럼 260°C에 이르는 고온을 거치고 상온으로 식는 과정에서 재료별로 늘어나고 줄어드는 양이 달라 패키지가 바가지 모양으로 휘는 <strong>Warpage</strong> 현상이 발생합니다.</p>
        <hr>
        <h2>Warpage 계측: Shadow Moire 기법</h2>
        <p>패키지의 변형 거동을 정밀 측정하기 위해 격자 무늬의 간섭 패턴을 이용하는 Shadow Moire 장비가 널리 쓰입니다. 온도 변화에 따른 3D 휨 분포(Smile & Cry 형상)를 리얼타임으로 추출하여, 리플로우 온도 프로파일 전반에서 기준 휨 허용치(일반적으로 80~100μm 이내)를 초과하지 않는지 프로파일링합니다.</p>
        <hr>
        <h2>설계 단계에서의 극복 대책</h2>
        <p>Warpage를 억제하기 위해 기판의 동박 배치 밀도를 균일하게 맞추는 잔동률(Copper Balance) 보정을 반영하거나, 저열팽창성 EMC 물질을 개발 도입합니다. 공정적으로는 다이를 언더필(Underfill) 봉지재로 접합한 뒤 경화 속도를 단계적으로 조율해 잔류 응력(Residual Stress)을 방지하는 설계가 현업에서 대단히 중요하게 다루어집니다.</p>
      `
    },
    en: {
      title: 'Thermo-Mechanical Warpage Failure Modes and Material Engineering',
      description: 'Analyzing warpage behavior in packages due to Coefficient of Thermal Expansion (CTE) mismatch and using Shadow Moire profiling.',
      content: `
        <h2>Unraveling Thermal Warpage in Layered Materials</h2>
        <p>A semiconductor package aggregates disparate materials: Silicon (CTE ~3 ppm/°C), organic substrates (~15 ppm/°C), and Mold Compound (~10 ppm/°C). Thermal cycling through 260°C reflow ovens triggers differential expansion, resulting in bow and twist warpage.</p>
        <hr>
        <h2>Measuring Warpage: Shadow Moire Interferometry</h2>
        <p>We trace out-of-plane displacement using Shadow Moire. Projecting grating patterns onto packages at high temperatures extracts Real-Time thermal profiles, charting smile (concave) and cry (convex) transitions.</p>
        <hr>
        <h2>Engineering Solutions for Flat Packages</h2>
        <p>To curb warpage, layout engineers balance copper distribution within substrate layers. Selecting low-shrinkage Underfill epoxies and step-curing EMC reduces residual stress.</p>
      `
    }
  },
  {
    slug: 'si-pi-impedance-basics',
    date: '2026-04-05',
    category: 'Semiconductor',
    ko: {
      title: '고주파 반도체 패키지의 Signal & Power Integrity (SI-PI) 입문',
      description: '반도체 동작 주파수가 GHz 영역에 접어들며 발생하는 신호 왜곡(Crosstalk)과 전원 노이즈(PDN Impedance)를 억제하는 PCB 패키지 설계 이론.',
      content: `
        <h2>동작 속도가 올라갈 때 배선은 단순 도선이 아니다</h2>
        <p>신호 클럭 주파수가 수백 MHz를 넘어 GHz 급에 이르면, 메탈 패턴 배선은 단순한 전선의 개념을 벗어나 저항, 인덕턴스, 캐패시턴스가 분포된 고주파 <strong>전송선로(Transmission Line)</strong>로 취급되어야 합니다. 임피던스 매칭이 깨지면 신호가 리시버 단에서 반사되어 파형이 깨지는 신호 무결성(Signal Integrity, SI) 붕괴가 일어납니다.</p>
        <hr>
        <h2>SI와 PI의 정의와 해결 방향</h2>
        <ul>
          <li><strong>Signal Integrity (SI):</strong> 인접 신호 라인 간의 전자기적 간섭(Crosstalk), 주파수 감쇠, 반사 노이즈를 억제해 수신 칩에 전송된 파형 눈 모양(Eye Diagram)의 마진을 확보하는 것입니다. 라우팅 배선 간격을 넓히고 50옴 임피던스 매칭을 준수합니다.</li>
          <li><strong>Power Integrity (PI):</strong> 수백만 개의 트랜지스터가 동시에 온/오프 스위칭할 때 발생하는 전류 변동(di/dt)으로 전원 라인이 출렁이는 동적 전압 강하(IR Drop)를 막는 것입니다. 타겟 임피던스를 낮추기 위해 다이 및 패키지 내부에 디커플링 캐패시터(Decap)를 밀집 배치합니다.</li>
        </ul>
      `
    },
    en: {
      title: 'Signal & Power Integrity (SI-PI) Design Foundations in High-Speed Packaging',
      description: 'Understanding high-speed transmission lines, impedance matching, decoupling capacitor loops, and crosstalk reduction on package substrates.',
      content: `
        <h2>Traces are Transmission Lines at GHz Speeds</h2>
        <p>When system clocks scale into GHz bands, copper lines cease to act as simple wires; they behave as distributed **transmission lines**. Any impedance mismatch reflects signals, degrading signal integrity (SI).</p>
        <hr>
        <h2>Resolving SI & PI Issues</h2>
        <ul>
          <li><strong>Signal Integrity (SI):</strong> Focuses on securing high eye diagram margins. Guard traces and matching 50-ohm impedances limit Crosstalk.</li>
          <li><strong>Power Integrity (PI):</strong> Suppresses transient IR drop from simultaneous switching. Placing Decoupling Capacitors (Decaps) near the die lowers Power Distribution Network (PDN) impedance.</li>
        </ul>
      `
    }
  },
  {
    slug: 'osat-industry-overview',
    date: '2026-03-25',
    category: 'Semiconductor',
    ko: {
      title: '글로벌 OSAT 산업 생태계와 2.5D/3D 첨단 패키징 최신 동향',
      description: 'ASE, Amkor, JCET 등 주요 OSAT 업체의 포지셔닝과 인공지능 가속기 칩 양산에 핵심이 된 CoWoS 형태의 이종 집적(Heterogeneous Integration) 트렌드.',
      content: `
        <h2>반도체 가치사슬의 수직 분업과 OSAT</h2>
        <p>종합 반도체 기업(IDM)과 파운드리가 전공정에 집중하는 사이, 조립과 최종 테스트를 대행하는 후공정 전문 기업인 <strong>OSAT(Outsourced Semiconductor Assembly and Test)</strong>의 역할이 비대하게 확대되었습니다. AI 칩 연산 파워 요구량의 폭발로 더는 칩 하나로 성능을 낼 수 없게 됨에 따라, 여러 다이를 한 패키지로 엮는 첨단 이종 집적 기술이 OSAT 생태계의 판도를 바꾸고 있습니다.</p>
        <hr>
        <h2>2.5D 실리콘 인터포저와 CoWoS</h2>
        <p>가장 주목받는 아키텍처는 TSMC의 CoWoS(Chip-on-Wafer-on-Substrate)로 대변되는 2.5D 패키징입니다. 얇은 실리콘 인터포저(Silicon Interposer) 기판 위에 모듈러 칩렛(Chiplet)들과 HBM을 오밀조밀 배치하여 마이크로 범프로 상호 연결한 구조입니다. 이는 데이터 송수신 지연 시간을 나노초 단위 이하로 묶어 AI 데이터센터 카드 구축의 핵심 기둥이 되었습니다.</p>
      `
    },
    en: {
      title: 'Global OSAT Market Trends and 2.5D/3D Advanced Stacking Solutions',
      description: 'Analyzing the OSAT supply chain landscape and 2.5D silicon interposer scaling critical for high-performance computing cards.',
      content: `
        <h2>The Semiconductor Value Chain and OSAT</h2>
        <p>As IDMs and Foundries offload final processing steps, **OSAT (Outsourced Semiconductor Assembly and Test)** suppliers have grown vital. Integrating multi-die modules inside a single package is key to AI scaling.</p>
        <hr>
        <h2>2.5D Stacking and Silicon Interposers</h2>
        <p>2.5D packaging stacks functional chiplets and HBMs side-by-side over a micro-routed Silicon Interposer. By linking micro-bumps with high spatial density, physical routing delays drop, powering high-performance hardware.</p>
      `
    }
  },
  {
    slug: 'advanced-packaging-roadmap',
    date: '2026-03-18',
    category: 'Semiconductor',
    ko: {
      title: '국제 반도체 로드맵(IRDS)으로 읽는 2030 후공정 기술 로드맵',
      description: '미세 피치 축소 한계와 이를 극복하기 위한 하이브리드 본딩(Hybrid Bonding)의 도입 일정 및 패키징 기판의 차세대 유리 기판(Glass Substrate) 전환 연구.',
      content: `
        <h2>무어의 법칙 한계를 이어가는 패키징 혁신</h2>
        <p>반도체 미세 패턴 형성이 나노미터 초반으로 들어서며 천문학적인 비용 상승을 초래하자, 대안으로 제시되는 첨단 패키징 로드맵(IRDS)이 매년 급변하고 있습니다. 2030년대를 내다보는 후공정의 최종 지향점은 기계적 범프를 아예 없애는 <strong>하이브리드 본딩(Cu-to-Cu Direct Bonding)</strong>과 유리기판입니다.</p>
        <hr>
        <h2>범프 없는 세상: 하이브리드 본딩</h2>
        <p>기존 솔더볼 접합은 피치(Pitch)를 10μm 이하로 좁히면 솔더가 뭉쳐 합선이 일어납니다. 반면 하이브리드 본딩은 화학적으로 극도로 평탄화된 산화막과 구리 단면을 밀착하여 범프 없이 구리와 산화막을 원자간 접합합니다. 피치를 1μm 이하 수준으로 압축해 성능을 극대화합니다.</p>
        <hr>
        <h2>유리 기판(Glass Substrate)의 등장 배경</h2>
        <p>전통적인 유기 기판(Organic Substrate)은 대형화될 때 열변형으로 휨 제어가 불가능해집니다. 유리는 표면 조도가 극도로 매끄럽고 물리적 열 변형률이 낮아 미세 선폭 RDL 형성이 쉽고, 두께가 얇아 고대역폭 신호 전송 효율이 우수하여 인텔, 삼성 등 메이저 제조사가 적극 개발 중입니다.</p>
      `
    },
    en: {
      title: 'IRDS Roadmap: Emerging Packaging Milestones Towards 2030',
      description: 'Understanding Hybrid Cu-to-Cu bonding integrations and the shift to Glass Substrates for ultra-dense packaging layers.',
      content: `
        <h2>Continuing Moore\'s Law via Packaging Innovation</h2>
        <p>With front-end lithography scaling costs soaring, the International Roadmap for Devices and Systems (IRDS) highlights advanced packaging. Key inflection points are **Hybrid Bonding** and **Glass Substrates**.</p>
        <hr>
        <h2>Bumpless Connectivity: Hybrid Bonding</h2>
        <p>Solder ball connections fail when scaled below a 10μm pitch. Hybrid bonding directly joins dielectric oxide and copper surfaces atomically, bringing pitches sub-1μm for maximum density.</p>
        <hr>
        <h2>The Case for Glass Substrates</h2>
        <p>Organic substrates suffer from warp deflections at scale. Glass offers excellent flatness and low thermal expansion coefficient (CTE), enabling ultra-fine line routing and thin, high-performance designs.</p>
      `
    }
  },
  {
    slug: 'chiplet-disaggregation-trend',
    date: '2026-03-08',
    category: 'Semiconductor',
    ko: {
      title: '모놀리식 다이의 해체: 칩렛(Chiplet) 아키텍처와 UCIe 표준 규격',
      description: '거대한 단일 칩 대신 저렴하고 수율이 우수한 소형 기능별 칩 조각(Chiplets)을 패키지 레벨에서 엮는 설계 기법과 다이 간 상호 연결 표준 UCIe의 중요성.',
      content: `
        <h2>하나의 거대한 다이(Die)가 비효율적인 이유</h2>
        <p>전체 회로를 단일 반도체 칩에 다 집어넣는 모놀리식(Monolithic) 공정은 칩 크기(Die Area)가 커질수록 결함 밀도에 따른 수율 저하가 지수함수적으로 늘어나는 심각한 물리적 단점이 있습니다. 칩 크기가 800mm²를 넘어가면 웨이퍼 한 장에서 건질 수 있는 정상 칩 개수가 급감합니다.</p>
        <hr>
        <h2>칩렛(Chiplet) 분할 전략</h2>
        <p>성능에 민감한 코어(CPU) 부분만 최첨단 3nm 공정으로 칩을 작게 만들고, 성능 영향이 적은 I/O 컨트롤러나 메모리 채널은 가성비 좋은 7nm/14nm 공정으로 별도 칩렛을 구현한 뒤 이들을 후공정 패키지 레벨에서 엮으면 수율과 원가를 크게 개선할 수 있습니다.</p>
        <hr>
        <h2>UCIe(Universal Chiplet Interconnect Express) 표준</h2>
        <p>제조사가 다른 칩렛들을 조립 장난감처럼 끼워 맞추기 위해서는 다이 간 인터페이스 표준 규격이 절대적으로 필요합니다. Intel, AMD, TSMC, Samsung 등 거물들이 뭉쳐 확립한 <strong>UCIe</strong>는 패키지 내부 다이 간 통신 지연 시간을 줄이고 넓은 전송 대역폭을 저전력으로 확보할 수 있는 상호 동기화 전용 표준 규약입니다.</p>
      `
    },
    en: {
      title: 'De-aggregating Monolithic Silicon: Chiplet Design and UCIe Interconnect Standard',
      description: 'Dividing silicon into optimized modular dies (chiplets) connected via the Universal Chiplet Interconnect Express (UCIe) standard.',
      content: `
        <h2>Yield Challenges of Large Monolithic Dies</h2>
        <p>In traditional monolithic designs, yield decreases exponentially as the die area expands. Manufacturing dies exceeding 800mm² is highly cost-inefficient due to defect distribution.</p>
        <hr>
        <h2>The Chiplet Disaggregation Strategy</h2>
        <p>By routing core compute blocks on expensive 3nm nodes and keeping auxiliary I/O interfaces on cheaper 7nm processes, designers cut costs and boost production reliability.</p>
        <hr>
        <h2>Universal Chiplet Interconnect Express (UCIe)</h2>
        <p>For chiplets from different fabs to talk, a common communication standard is needed. **UCIe** defines die-to-die signals inside the package, ensuring seamless, low-latency interoperability.</p>
      `
    }
  },

  // Hardware (7 posts)
  {
    slug: 'cc-cv-charger-adc-precision',
    date: '2026-05-12',
    category: 'Hardware',
    ko: {
      title: '리튬이온 배터리 충전기 설계를 위한 CC-CV 루프 제어와 ADC 정밀도',
      description: '배터리 관리 시스템(BMS)에서 정전류(CC)에서 정전압(CV) 충전 모드로 안전하게 전환하기 위한 고해상도 ADC 전류 측정 회로 설계.',
      content: `
        <h2>리튬 배터리 폭발을 막는 안전한 충전 주기</h2>
        <p>리튬이온 배터리는 조금이라도 과충전되거나 잘못된 전압이 지속적으로 인가되면 내부 열 폭주(Thermal Runaway)를 일으킵니다. 이를 방지하기 위해 충전 IC는 초기에 일정한 전류로 충전하는 <strong>정전류(CC, Constant Current)</strong> 모드를 유지하다가, 배터리 단자 전압이 만충 한계(보통 4.2V)에 도달하면 일정한 전압을 유지하며 전류량을 점점 줄여나가는 <strong>정전압(CV, Constant Voltage)</strong> 충전 방식으로 변환 루프를 돌아야 합니다.</p>
        <hr>
        <h2>ADC 전류 센싱 회로 설계 포인트</h2>
        <p>이 스위칭 마진을 정밀하게 잡으려면 션트 저항(Shunt Resistor) 양단에 생기는 미세 수 밀리볼트(mV) 전압 강하를 차동 증폭기(Current Sense Amplifier)로 키운 뒤, MCU의 높은 해상도 ADC 포트에서 수집해야 합니다. 노이즈 차단을 위한 로우패스 필터(RC Filter) 시정수를 배터리 셀 화학 반응 특성과 매칭하고 오프셋 에러를 상쇄하는 보정 로직을 포함시켜야 안전성이 확보됩니다.</p>
      `
    },
    en: {
      title: 'CC-CV Battery Charger Control Loops & Precision Current Sensing',
      description: 'Designing constant-current constant-voltage switching algorithms and differential shunt amplifier layouts for Li-ion battery chargers.',
      content: `
        <h2>Preventing Thermal Runaways via CC-CV Staging</h2>
        <p>Li-ion batteries require rigorous charge profiling to avoid explosions. Charge ICs drive high currents in **Constant Current (CC)** mode, switching to **Constant Voltage (CV)** mode as cells approach maximum terminal voltages (4.2V), ramping current down.</p>
        <hr>
        <h2>Analog-to-Digital Current Sensing Layout</h2>
        <p>This threshold transition relies on tracking small millivolt drops across a low-resistance shunt. Differentially amplifying this voltage and filtering out switching noise with passive RC networks allows microcontrollers to read stable values.</p>
      `
    }
  },
  {
    slug: 'sallen-key-audio-filter-design',
    date: '2026-05-02',
    category: 'Hardware',
    ko: {
      title: 'Op-Amp를 활용한 2차 Sallen-Key 액티브 로우패스 필터 설계 매뉴얼',
      description: '오디오 신호 전처리 단에서 고주파 노이즈를 커팅하기 위한 차단 주파수(Fc) 공식 도출과 패시브 소자(R, C) 오차값에 따른 전달함수 변화 검증.',
      content: `
        <h2>아날로그 오디오 잡음의 필터링</h2>
        <p>센서 신호 입력부나 오디오 출력단에서 가청주파수 바깥의 원치 않는 초고주파 잡음을 유연하게 깎아내기 위해 2차 능동 필터 회로가 널리 채택됩니다. 그 중 소자 수가 적고 전압 이득 제어가 용이한 <strong>Sallen-Key 토폴로지</strong>는 OP-AMP를 이용하여 설계 신뢰도가 높은 필터 모델을 확보하기에 최적입니다.</p>
        <hr>
        <h2>필터 설계 공식 도출</h2>
        <p>차단 주파수 $F_c = 1 / (2\\pi \\sqrt{R_1 R_2 C_1 C_2})$에 따라 부품 용량을 결정합니다. 만약 회로 단순화를 위해 $R_1=R_2=R$, $C_1=C_2=C$로 설정하면 필터의 감쇠 응답 품질 계수(Q-factor)가 고정되므로, 버터워스(Butterworth) 응답(Q=0.707)을 얻기 위해서는 통과 대역 이득을 OP-AMP 궤환 저항비로 정밀 보상해주어야 리플 없는 부드러운 차단 곡선을 만들 수 있습니다.</p>
      `
    },
    en: {
      title: 'Designing a 2nd-Order Sallen-Key Active Low-Pass Filter with Op-Amps',
      description: 'Deriving cut-off frequency formulations and analyzing component tolerance effects on transfer functions in audio signal paths.',
      content: `
        <h2>Filtering Out-of-Band Audio Noise</h2>
        <p>To roll off high-frequency noise from audio DAC outputs, engineers choose active filters. The **Sallen-Key topology** balances low component counts with customizable gain settings.</p>
        <hr>
        <h2>Mathematical Modeling and Q-Factor Control</h2>
        <p>Cutoff points follow $F_c = 1 / (2\\pi \\sqrt{R_1 R_2 C_1 C_2})$. Using matching resistor and capacitor values simplifies component sourcing, but requires careful tuning of feed-forward ratios to secure flat Butterworth passbands (Q=0.707).</p>
      `
    }
  },
  {
    slug: 'battery-soc-ocv-ccv',
    date: '2026-04-25',
    category: 'Hardware',
    ko: {
      title: '배터리 잔량 측정(SoC): OCV 방식과 쿨롱 카운팅 알고리즘의 결합',
      description: '배터리 무부하 개방 전압(OCV) 측정의 히스테리시스 문제를 극복하기 위해 전류 적산법(Coulomb Counting)을 함께 혼합하는 하이브리드 보정 방법.',
      content: `
        <h2>정확한 배터리 퍼센트 측정의 어려움</h2>
        <p>우리가 스마트폰 화면에서 흔히 보는 배터리 잔량(State of Charge, SoC)은 실시간 측정이 몹시 어렵습니다. 배터리 단자 전압은 충전이나 방전 부하가 걸리는 순간 급격하게 출렁이기 때문입니다. 전형적인 두 가지 잔량 산출 방식인 OCV와 쿨롱 카운팅은 각각 장단점이 명확합니다.</p>
        <hr>
        <h2>두 방식의 한계와 혼합형 보정 알고리즘</h2>
        <ul>
          <li><strong>개방 전압 (OCV, Open Circuit Voltage):</strong> 부하가 완전히 차단된 평형 상태의 전압으로 SoC 테이블과 매칭해 잔량을 예측합니다. 정확하지만 부하가 걸린 운전 상황에서는 전압 강하 때문에 사용이 불가능하며, 리튬 인산철(LFP)의 경우 OCV 곡선이 지나치게 평평해 오차가 극대화됩니다.</li>
          <li><strong>쿨롱 카운팅 (Coulomb Counting):</strong> 배터리로 흐르는 실시간 입출력 전류량을 계속 적산(시간 곱)하여 충전량을 더하고 뺍니다. 반응 속도가 빠르지만, 전류 센서 오차가 시간 경과에 따라 누적되어 나중에는 실제 잔량과 크게 틀어집니다.</li>
        </ul>
        <p>따라서 상용 BMS에서는 전류량을 지속적으로 적산하다가, 부하가 낮아지는 무부하 정지(Rest) 시간이 생길 때 OCV 전압을 관측하여 적산 누적 오차를 제로 포인트로 자동 칼리브레이션해주는 결합형 알고리즘을 사용합니다.</p>
      `
    },
    en: {
      title: 'State of Charge (SoC) Calculation: Hybrid OCV and Coulomb Counting',
      description: 'Solving current sensor drift errors by combining Open-Circuit Voltage profiling with time-based charge integration.',
      content: `
        <h2>Challenges of Real-Time SoC Estimation</h2>
        <p>Estimating a cell\'s State of Charge (SoC) is tricky. Voltage drops dynamically under load, corrupting raw voltage readings. Engineers combine **Open Circuit Voltage (OCV)** lookup and **Coulomb Counting**.</p>
        <hr>
        <h2>Implementing Hybrid Correction Loops</h2>
        <p>Integrating current over time tracks short-term capacity changes but drifts due to sensor resolution. When cells rest, the system measures stable OCV to reset the current accumulator, preventing offset drifts.</p>
      `
    }
  },
  {
    slug: 'ac-power-sensing-calibration',
    date: '2026-04-10',
    category: 'Hardware',
    ko: {
      title: 'AC 교류 전력량 측정을 위한 비접촉 CT 센서 회로 및 ADC 캘리브레이션',
      description: '송전선이나 가전제품 교류 전류 측정을 위해 변류기(CT) 센서를 연동하고 오프셋 바이어스 회로를 설계해 MCU로 계측하는 과정.',
      content: `
        <h2>위험한 고압 AC 전력량의 비접촉 계측</h2>
        <p>실제 교류 220V 송전 전선에 멀티미터 프롭을 대는 것은 위험합니다. 전류가 흐르면 그 전선 주변으로 비례적인 유도 자기장이 발생하는데, 이 전자기 유도 효과를 이용하는 <strong>CT(Current Transformer, 변류기) 센서</strong>를 감싸주면 전선을 단선시키지 않고도 2차측에 비례 전류를 만들어낼 수 있습니다.</p>
        <hr>
        <h2>AC 전압 클램핑과 ADC 읽기 기법</h2>
        <p>CT 센서 출력은 교류이므로 음(-)의 영역 전압도 포함하고 있습니다. 하지만 단일 전원(0~3.3V)을 쓰는 임베디드 MCU의 ADC 포트는 음의 전압이 인가되면 하드웨어적으로 손상되거나 값을 읽지 못합니다. 따라서 두 개의 저항으로 1.65V 중간 바이어스 전압(Offset Voltage) 분배기를 만들고, CT 출력을 여기에 실어 공중으로 띄운 뒤(AC Coupling) 샘플링하여 실시간 RMS 전압과 위상차를 역산합니다.</p>
      `
    },
    en: {
      title: 'AC Power Sensing: Non-Contact CT Sensor Circuits and Analog Calibration',
      description: 'Designing current transformer bias networks for single-supply microcontrollers to measure high-voltage alternating currents safely.',
      content: `
        <h2>Safe Measurement of High-Voltage Alternating Currents</h2>
        <p>Tapping directly into AC power lines is hazardous. Using a **Current Transformer (CT) sensor** leverages induction fields to scale down alternating currents proportionally, without stripping wires.</p>
        <hr>
        <h2>DC Biasing & ADC Sample Routines</h2>
        <p>Because CT outputs are sinusoidal, they swing below 0V. Standard 3.3V microcontrollers cannot process negative inputs. An offset bias network shifts the AC wave midpoint to 1.65V, keeping the signal within safe boundaries.</p>
      `
    }
  },
  {
    slug: 'fpga-bcd-counter-clock-divider',
    date: '2026-03-30',
    category: 'Hardware',
    ko: {
      title: 'FPGA FSM 설계 기초: 클럭 분주기(Clock Divider)와 BCD 카운터',
      description: '50MHz 기본 고속 클럭을 나누어 1Hz 타이머 이벤트를 발생시키고, 이를 7세그먼트 LED에 출력하기 위한 BCD 디코더 로직 설계 및 타이밍 시뮬레이션.',
      content: `
        <h2>시스템 고속 클럭에서 인간의 시간으로</h2>
        <p>반도체 논리 소자 설계 교육 보드의 클럭 주파수는 수십 MHz에 달하지만, 사람이 인지해야 하는 시계나 타이머 신호는 1초(1Hz) 혹은 1밀리초(ms) 단위여야 합니다. 고주파 클럭을 카운터 카운트로 감산하여 원하는 저주파 신호를 만들어내는 설계 모듈을 <strong>클럭 분주기(Clock Divider)</strong>라고 합니다.</p>
        <hr>
        <h2>Verilog BCD 카운터 및 7세그먼트 매핑</h2>
        <p>1Hz 클럭 이벤트를 트리거로 삼아 0부터 9까지 카운트하고 캐리(Carry) 아웃을 방출하는 BCD(Binary Coded Decimal) 카운터 유닛을 설계합니다. 이 4비트 출력값을 7세그먼트 디스플레이 LED의 8핀 데이터(A~G, DP)로 디코딩하여 켜주는 Logic 회로를 Behavioral 모델로 Verilog 파일에 구현하고 실제 FPGA 하드웨어 핀 맵에 할당해 가동합니다.</p>
      `
    },
    en: {
      title: 'FPGA Logic Foundations: Clock Dividers and BCD Counters in Verilog',
      description: 'Slowing down 50MHz board clocks to 1Hz pulses using counter registers to drive a seven-segment digital display.',
      content: `
        <h2>Scaling MHz Down to Human Time</h2>
        <p>FPGA oscillators run in the megahertz range, but humans interact with seconds. A **Clock Divider** counts system pulses up to a threshold to emit a slower 1Hz trigger.</p>
        <hr>
        <h2>Verilog BCD Decoder & Seven-Segment Pin Maps</h2>
        <p>We build a 4-bit Binary Coded Decimal (BCD) counter that increments on 1Hz signals. A combinational decoder routes the output to the cathode pins of seven-segment displays.</p>
      `
    }
  },
  {
    slug: 'analog-filter-frequency-separation',
    date: '2026-03-15',
    category: 'Hardware',
    ko: {
      title: '아날로그 주파수 분할 필터(Crossover)의 임피던스 임팩트 분석',
      description: '스피커 유닛 조합 시 저음역(Woofer)과 고음역(Tweeter) 신호를 가르는 패시브 L-C 크로스오버 네트워킹과 로드 임피던스 틀어짐 대응책.',
      content: `
        <h2>오디오 주파수를 가르는 하드웨어 벽</h2>
        <p>고품질 스피커는 하나의 유닛이 모든 저주파와 고주파를 완벽히 낼 수 없으므로, 저음 전문 우퍼와 고음 전문 트위터를 조합합니다. 이때 들어오는 아날로그 음향 주파수 성분을 쪼개주는 인덕터(L)와 커패시터(C) 기반의 <strong>크로스오버(Crossover) 필터 네트워크</strong>가 필수적입니다.</p>
        <hr>
        <h2>임피던스 틀어짐과 보상 필터의 설계</h2>
        <p>간단한 계산에서는 스피커가 고정된 8옴 저항이라고 가정하지만, 실제 스피커는 보이스 코일 인덕턴스 때문에 주파수가 올라갈수록 임피던스가 올라갑니다. 이로 인해 설계했던 필터의 차단 주파수 지점이 틀어져 중음역대 음향 공백이 생깁니다. 이를 상쇄하기 위해 스피커 유닛에 병렬로 임피던스를 보정하는 <strong>조벨 필터(Zobel Network)</strong> 저항/커패시터 결합 회로를 추가하는 설계를 거칩니다.</p>
      `
    },
    en: {
      title: 'Analog Frequency Crossover Networks and Load Impedance Correction',
      description: 'Designing passive LC crossover filters and matching Zobel networks to compensate for dynamic speaker impedance shifts.',
      content: `
        <h2>Splitting Audio Frequencies In Analog</h2>
        <p>Speakers combine multi-driver arrays: Woofers for bass and Tweeters for treble. A passive **Crossover network** utilizing inductors (L) and capacitors (C) splits the source signal.</p>
        <hr>
        <h2>Dynamic Impedance & Zobel Compensation</h2>
        <p>Loudspeakers are not static resistors; their impedance spikes at high frequencies due to voice coil inductance. This shifts filter cutoff points. Adding a parallel **Zobel network** flattens the load curve for smooth frequency transitions.</p>
      `
    }
  },
  {
    slug: 'mcu-firmware-optimization',
    date: '2026-03-02',
    category: 'Hardware',
    ko: {
      title: 'MCU 펌웨어 최적화: 정밀 오버클럭 없는 초절전 슬립 모드와 인터럽트 설계',
      description: '배터리 구동 센서 하드웨어에서 전력 소모를 최소화하기 위해 CPU를 절전(Deep Sleep) 모드로 두고, 하드웨어 타이머와 외부 핀 인터럽트(ISR)로 구동하는 저전력 설계 기법.',
      content: `
        <h2>항상 켜져 있는 코드는 배터리의 적이다</h2>
        <p>배터리로 작동하는 소형 무선 온도 센서 노드 등에서 메인 루프를 <code>while(1)</code> 문 안에서 딜레이 함수로 멍하니 지연시키면, MCU는 계속 수십 밀리암페어(mA) 전력을 낭비하며 수일 내에 배터리가 소진됩니다. 전력 효율을 올리려면 <strong>슬립 모드(Sleep/Deep Sleep Mode)</strong> 전환이 중심이 되어야 합니다.</p>
        <hr>
        <h2>인터럽트 기반 휴면 상태 해제(Wakeup ISR)</h2>
        <p>센서 데이터를 송신하는 짧은 0.1초 동안만 MCU 코어와 무선 RF칩을 켜고, 나머지 9.9초 동안은 소모 전류가 수 마이크로암페어(μA) 수준으로 미미한 딥 슬립 상태에 머물게 합니다. 내부 저전력 타이머(WDT) 카운트 오버플로우 이벤트 혹은 외부 핀 센서 상태 변경 시그널이 도달하는 찰나에만 <strong>인터럽트 서비스 루틴(ISR)</strong>을 깨우는 아키텍처를 도입해야 장비가 배터리 하나로 1년 이상 동작합니다.</p>
      `
    },
    en: {
      title: 'MCU Firmware Optimization: Implementing Interrupt-Driven Deep Sleep States',
      description: 'Structuring firmware loops around low-power wake-up interrupts rather than polling delays to extend battery lifetimes.',
      content: `
        <h2>Constant CPU Polling Drains Battery Life</h2>
        <p>In low-power IoT hardware, running a busy-wait loop inside ` + "`while(1)`" + ` keeps the MCU core drawing milliamperes constantly, draining cells in days. The solution is sleeping.</p>
        <hr>
        <h2>Interrupt-Driven Execution Cycles</h2>
        <p>The MCU spends 99% of its runtime in a microampere Deep Sleep state. On internal Low-Power Timer overflows or GPIO events, hardware triggers an Interrupt Service Routine (ISR) to wake up the system briefly.</p>
      `
    }
  },

  // Career (7 posts)
  {
    slug: 'kwangwoon-ee-semiconductor-focus',
    date: '2026-05-18',
    category: 'Career',
    ko: {
      title: '광운대 전자공학과에서 반도체 후공정 엔지니어로 타겟 진로를 정한 여정',
      description: '전자공학 전공생으로서 무수한 갈래(회로 설계, 통신, 임베디드) 속에서 반도체 후공정(OSAT) 패키징 분야를 타겟팅하게 된 커리어 스토리.',
      content: `
        <h2>수많은 전자공학 진로 속에서의 방황</h2>
        <p>전자공학과는 대단히 넓은 스펙트럼의 과목을 배웁니다. 아날로그/디지털 회로 설계, 초고주파 통신(RF), 신호 처리, 임베디드 펌웨어 등 공부할 것들이 도처에 널려있죠. 저 역시 전공 공부를 따라가며 무엇을 나의 평생 직업군으로 삼을지 고민이 깊었습니다. 그 흐름 속에서 학부 연구 활동과 세미나를 통해 <strong>반도체 후공정(Advanced Packaging)</strong> 분야의 잠재력을 포착했습니다.</p>
        <hr>
        <h2>후공정이 품은 하드웨어 엔지니어링의 매력</h2>
        <p>전공정 미세화가 한계에 다다른 현 상황에서 패키지 내부의 신호 무결성(SI), 열팽창에 따른 구조적 변형, 초음파 금속 접합 등은 전자공학, 신소재공학, 기계공학이 물리적으로 맞닿는 융복합 엔지니어링의 정수입니다. 광운대학교 전공 수업 중 전자회로 실험 및 반도체 공학 시간에 배운 패러데이 법칙과 확산 계수들이 후공정 와이어 본딩이나 범프 형성 실무에 직관적으로 맞아떨어지는 점에 깊이 몰입하게 되었습니다.</p>
      `
    },
    en: {
      title: 'Focusing on Semiconductor Packaging Engineering at Kwangwoon University',
      description: 'Navigating through electrical engineering paths to target packaging technology inside the semiconductor supply chain.',
      content: `
        <h2>Navigating Career Paths in Electrical Engineering</h2>
        <p>EE students face choices: circuit design, wireless communications, embedded systems, etc. I found my focus when studying the physics behind **Semiconductor Advanced Packaging**.</p>
        <hr>
        <h2>The Multidisciplinary Appeal of Packaging</h2>
        <p>Advanced packaging deals with signal routing, thermal expansion, and mechanical stresses. Applying classroom electrical physics directly to cleanroom process yield analysis drove my choice.</p>
      `
    }
  },
  {
    slug: 'amkor-osat-interview-prep',
    date: '2026-05-08',
    category: 'Career',
    ko: {
      title: '글로벌 1티어 OSAT 앰코코리아 취업 준비와 직무 면접 기출 정리',
      description: '반도체 패키징 전문 기업 면접을 준비하며 분석한 주요 직무 질문들과 학부 수준에서 대답할 수 있는 모범 가이드라인.',
      content: `
        <h2>OSAT 공정 엔지니어 면접의 핵심 평가 요소</h2>
        <p>앰코코리아와 같은 OSAT 제조 엔지니어 면접에서는 단순히 "반도체 8대 공정을 외웠는가"를 묻지 않습니다. 실제 팹 라인에서 장비 오작동이나 수율 이상이 생겼을 때, 데이터를 어떻게 읽어내고 해결할 것인가에 대한 실무형 엔지니어링 역량을 평가합니다.</p>
        <hr>
        <h2>핵심 기출 키워드 및 대비 전략</h2>
        <ul>
          <li><strong>Q. 와이어 본딩 시 NSOP(Non-Stick on Pad) 해결 방안은?</strong> - 단순히 초음파 세기만 올리는 것이 아니라, 패드 표면 오염 상태(화학 세정 상태), 캐필러리 팁 노화도, 접착 타겟 금속간 IMC 형성을 위한 공정 온도 제어가 입체적으로 맞물려야 함을 설명해야 합니다.</li>
          <li><strong>Q. 리플로우(Reflow) 공정 시 Warpage 최소화 대책은?</strong> - 패키지 원소재별 열팽창계수(CTE) 미스매치를 인지하고 있음을 보여주며, 기판 잔동률 디자인 조정과 에폭시 언더필 액션 타이밍의 상관관계를 통계적으로 짚어 답변을 전개하는 것이 합격의 지름길입니다.</li>
        </ul>
      `
    },
    en: {
      title: 'Amkor Technology Interview Preparation and Job-Specific Q&A Guidelines',
      description: 'Organizing packaging and test engineer interview topics including bonding failures, warpage, and statistical analysis.',
      content: `
        <h2>Key Selection Criteria for OSAT Process Engineers</h2>
        <p>Interviews at major OSAT firms test real troubleshooting skill. They look for logical diagnostics rather than simple definitions of front-end steps.</p>
        <hr>
        <h2>Core Technical Interview Q&As</h2>
        <ul>
          <li><strong>Q. How do you resolve Non-Stick on Pad (NSOP) issues?</strong> - Mention looking beyond ultrasonic power to check pad oxidation levels, capillary degradation, and thermal intermetallic growth profiles.</li>
          <li><strong>Q. How is reflow warpage reduced?</strong> - Contrast substrate/die CTE mismatches and outline how balancing copper traces across substrate layers prevents deformations.</li>
        </ul>
      `
    }
  },
  {
    slug: 'ai-tools-study-efficiency',
    date: '2026-04-30',
    category: 'Career',
    ko: {
      title: '전공 공부의 치트키: AI 에이전트와 함께 10배 속도로 논문 공부하는 법',
      description: '단순 질답을 넘어 AI 에이전트에게 전공 텍스트북 피드들을 학습시키고, 가상 인터뷰 질문을 받으며 고체물리 학과 시험을 돌파한 비결.',
      content: `
        <h2>더는 텍스트를 무식하게 읽지 마라</h2>
        <p>전공 서적의 복잡한 수식과 수십 페이지의 영어 논문을 처음부터 끝까지 다 읽고 요약하는 구시대적 공부법은 이제 효율이 극도로 떨어집니다. AI 번역과 요약 기술을 나만의 맞춤형 교수진으로 구성하는 스마트한 파이프라인 설계법을 정착시켜야 합니다.</p>
        <hr>
        <h2>AI 페어 러닝(Pair Learning) 루틴</h2>
        <p>저는 옵시디언 노트에 공부할 챕터 PDF를 업로드한 뒤, AI 비서에게 <strong>"이 챕터에서 학과 시험에 출제될 만한 3대 킬러 개념을 뽑아내고, 내가 모순되게 설명하는 부분을 날카롭게 파고드는 면접관 모드로 내게 말을 걸어줘"</strong>라고 가이드라인 프롬프트를 줍니다. 단순 내용을 요약해달라는 명령보다, 내 논리적 취약점을 공격하게 함으로써 메타인지(내가 아는 것과 모르는 것을 아는 능력)를 순식간에 깨우고 지식을 내 것으로 만들 수 있습니다.</p>
      `
    },
    en: {
      title: 'Study Hack: Learning Complex Engineering Concepts 10x Faster with AI Agents',
      description: 'How to use AI assistants to generate dynamic Q&As and run active recall loops for solid-state physics and packaging tests.',
      content: `
        <h2>Ditch the Passive Reading Mentality</h2>
        <p>Highlighting textbook pages blindly is inefficient. Instead, transform AI agents into personal interactive professors using structured prompts.</p>
        <hr>
        <h2>The AI Pair Learning Routine</h2>
        <p>Provide the AI with your course syllabus and ask: "Act as a strict professor. Probe my knowledge on chapter 3, flag my logical gaps, and challenge my answers." This active recall loop builds solid mental models fast.</p>
      `
    }
  },
  {
    slug: 'new-engineer-first-90-days',
    date: '2026-04-15',
    category: 'Career',
    ko: {
      title: '신입 엔지니어가 회사 입사 직후 첫 90일 동안 존재감을 드러내는 3가지 습관',
      description: '부서 배치 이후 눈치만 보며 잡무에 지치기 쉬운 초년생들에게 현업 선배들이 강조하는 셀프 트래킹 업무법.',
      content: `
        <h2>시키는 일만 해서는 아무것도 안 남는다</h2>
        <p>인턴이나 신입 엔지니어로 입사하면 초반 3개월 동안은 어버버하며 대기하거나, 자료 복사, 포맷 변환 같은 단순 서류 정리성 작업 위주로 시간이 가버리기 일상입니다. 하지만 이 시기야말로 주니어 엔지니어의 커리어 성패와 부서 내 신뢰도를 결정짓는 골든 아워입니다.</p>
        <hr>
        <h2>첫 90일을 장악하는 주니어의 자세</h2>
        <ol>
          <li><strong>문서 정돈의 규칙 확립:</strong> 선배가 파일 하나 던져달라고 했을 때, 5초 만에 잘 정돈된 로컬 디렉토리에서 문서를 뽑아내 링크를 전달해주는 즉각적인 환경 정리 능력을 보여주세요. 신뢰의 절반은 정돈된 태도에서 나옵니다.</li>
          <li><strong>질문은 옵션(Option) 형태로:</strong> 선배에게 "이거 어떻게 해요?"라고 단순 물어보는 것은 금물입니다. "A와 B 안이 있는데, 장단점 비교해봤을 때 우리 공정 환경에선 A가 타당해 보입니다. 어떤 방향이 좋을까요?" 형태로 본인의 생각(Thinking)을 덧붙여 질문해야 능력을 드러낼 수 있습니다.</li>
          <li><strong>작업 로그(Log)의 매일 기록:</strong> 퇴근 전 15분, 오늘 만진 장비 파라미터나 발견된 불량 빈 코드를 비공개 로컬 위키에 기록해두세요. 시간이 흐르면 이것이 부서 내 독보적인 트러블슈팅 매뉴얼이 됩니다.</li>
        </ol>
      `
    },
    en: {
      title: 'First 90 Days: Habits for Rookie Engineers to Build Credibility',
      description: 'Practical advice for newly hired engineers to manage task logs, structure questions, and optimize documentation.',
      content: `
        <h2>Survival Guide for the Critical Onboarding Phase</h2>
        <p>New engineers often get bogged down in simple file formatting. However, the first 90 days establish your reputation in the team.</p>
        <hr>
        <h2>Three Rules for Early Career Success</h2>
        <ol>
          <li><strong>Organized Repositories:</strong> Keep your internal project logs clean. Being able to retrieve references instantly signals competence.</li>
          <li><strong>Structure Questions with Options:</strong> Don\'t just ask "What do I do?" Present options: "I evaluated options A and B. I recommend A because of reason X. Do you agree?"</li>
          <li><strong>Document a Daily Worklog:</strong> Spend 10 minutes recording parameters adjusted or errors resolved. This becomes your personal handbook.</li>
        </ol>
      `
    }
  },
  {
    slug: 'portfolio-seo-for-engineers',
    date: '2026-03-28',
    category: 'Career',
    ko: {
      title: '취업 프리패스를 위한 엔지니어용 포트폴리오 웹사이트 SEO 최적화 가이드',
      description: '단순 링크 복사 전달용이 아닌, 채용 담당자가 구글 검색을 통해 내 기술 블로그와 포트폴리오를 직접 찾아 들어오게 만드는 SEO 기술.',
      content: `
        <h2>인사담당자만 타겟으로 삼는 포트폴리오는 아깝다</h2>
        <p>우리가 링크드인이나 구글에 내 이력서 링크를 뿌리는 것은 전형적인 아웃바운드 방식입니다. 하지만 내가 겪은 트러블슈팅 경험이나 반도체 전공 공부 기록을 검색 친화적으로 마크업해두면, 특정 에러 코드를 해결하려 구글을 헤매던 실무 팀장이나 리크루터가 내 사이트를 타고 들어와 제안을 건네는 인바운드 통로가 열립니다.</p>
        <hr>
        <h2>실무 키워드 SEO 공략법</h2>
        <p>블로그 제목을 단순히 '실험 일지 1'로 짓지 마세요. <code>"Cyclone II FPGA Verilog Debouncing Filter Design"</code>처럼 구체적인 칩 모델명과 기술 표준 명칭을 제목(H1)과 메타 태그(Meta description)에 고스란히 노출시켜야 합니다. 이미지 마크업 시 alt 속성으로 키워드를 박아두고 검색 엔진이 내 사이트 사이트맵(sitemap.xml)을 긁어갈 수 있도록 간단히 정비해두는 것만으로도, 구글 검색 유입량이 3배 이상 폭증합니다.</p>
      `
    },
    en: {
      title: 'SEO Strategy for Engineers: Getting Recruited via Organic Google Searches',
      description: 'Configuring metadata, structured headers, and specific keyword taglines on your technical blog to attract engineering recruiters.',
      content: `
        <h2>Turn Your Portfolio Into an Inbound Job Funnel</h2>
        <p>Instead of cold-emailing links, optimize your tech blog so managers looking for solutions to niche errors find your write-ups.</p>
        <hr>
        <h2>Technical Keyword Optimization</h2>
        <p>Avoid generic titles like "My Project." Use exact terms such as "Cyclone II FPGA Verilog Debouncing Filter Design" in H1 headers and meta descriptions. Registering a sitemap.xml ensures search bots crawl your write-ups.</p>
      `
    }
  },
  {
    slug: 'creator-brand-semiconductor-rookie',
    date: '2026-03-10',
    category: 'Career',
    ko: {
      title: '퇴근 후 퍼스널 브랜드 구축: 주니어 엔지니어의 1인 미디어 생존 전략',
      description: '회사 명함 안의 직함에 갇히지 않고, 반도체 분야 콘텐츠 크리에이터이자 주니어 멘토로서 내 이름 석 자를 알리는 디지털 채널 기획.',
      content: `
        <h2>직급이 아닌, 나만의 온전한 채널의 필요성</h2>
        <p>아무리 좋은 대기업에 다녀도, 명함의 로고가 지워지면 직장인에게 남는 알맹이는 무엇일까요? 주니어 시절부터 자신의 성장 기록과 전공 스터디를 외부 소셜 미디어나 개인 사이트에 아카이빙해야 하는 이유는, 회사 밖에서도 독립적으로 가치를 생산할 수 있는 '퍼스널 브랜드'의 씨앗을 뿌려야 하기 때문입니다.</p>
        <hr>
        <h2>부담 없는 엔지니어 크리에이터 포지셔닝</h2>
        <p>엄청난 인사이트를 주려 애쓰지 마세요. 본인이 어제 공부한 HBM 기술 문서 분석, 오늘 겪은 전력량 계측 오차 트러블슈팅 일지처럼 날것의 기록이 같은 대학생 후배들에게는 최고의 스터디 교재가 됩니다. 콘텐츠 하나를 카드뉴스로 가공해 링크드인에 올리고, 상세 코드는 깃허브에 적재하는 멀티 채널 배포 체계를 습관화할 때 커리어 확장성이 기하급수적으로 터져 나옵니다.</p>
      `
    },
    en: {
      title: 'Building a Personal Brand After Hours: Junior Engineer Strategies',
      description: 'Creating a digital presence beyond your day job title by archiving your learning curves and tech notes online.',
      content: `
        <h2>Your Brand Beyond Your Corporate Business Card</h2>
        <p>Employment is temporary; your professional brand is permanent. Documenting your learning curves and engineering notes creates a digital paper trail that opens doors outside standard corporate ladders.</p>
        <hr>
        <h2>Low-Friction Tech Content Creation</h2>
        <p>Don\'t wait until you are an expert. Summarize HBM papers or detail a hardware debugging case study. Publishing this logs your expertise, attracting peers and future collaborators.</p>
      `
    }
  },
  {
    slug: 'community-manager-engineer-story',
    date: '2026-03-01',
    category: 'Career',
    ko: {
      title: '비영리 단체 커뮤니티 매니저 활동이 엔지니어 협업 역량에 미친 영향',
      description: '계단뿌셔클럽 등 시민 참여 커뮤니티에서 활동하며 배운 비개발 팀원들과의 소통 문법과 공학적 트러블슈팅의 교차점.',
      content: `
        <h2>코드와 회로 바깥에 존재하는 협업의 언어</h2>
        <p>뛰어난 엔지니어가 되기 위해 필요한 것은 정교한 코딩 스킬뿐만이 아닙니다. 제품과 공정이 굴러가기 위해서는 마케터, 재무 담당자, 현장 오퍼레이터 등 공학 백그라운드가 전혀 없는 다양한 이들과 상호 소통하여 협력을 이끌어내는 능력이 필수적입니다. 저는 계단뿌셔클럽 비영리 단체의 커뮤니티 코디네이터로 활동하며 이 소중한 소통 문법을 갈고 닦았습니다.</p>
        <hr>
        <h2>비기술적 맥락을 기술적 아키텍처로 변환하기</h2>
        <p>활동가들의 현장 민원과 운영진의 요구사항을 수렴하여 모바일 동선 가이드라인 개선에 반영할 때, 비개발자의 투박한 피드백을 시스템 요구사항(Functional Requirement)으로 명확히 추상화하여 개발팀에 전달해 주었던 경험은 공학도의 가장 큰 무기였습니다. 공정 불량 데이터를 정리해 타 부서 선배들을 설득하고 협력을 받아내는 직무 실무 상황에서도 이 소통 역량은 강력한 무기로 작동하고 있습니다.</p>
      `
    },
    en: {
      title: 'How Non-Profit Community Management Enhanced My EE Collaboration Skills',
      description: 'Translating human feedback into system requirements: Lessons learned from community coordinating roles.',
      content: `
        <h2>Collaboration Languages Beyond Code and Circuits</h2>
        <p>Engineering doesn\'t happen in a vacuum. Projects succeed when we translate technical specs to clients, line operators, and business partners. Coordinating volunteers in non-profits honed my human-centric problem-solving skills.</p>
        <hr>
        <h2>Translating Human Feedback into Systems</h2>
        <p>Converting chaotic field feedback into structured system requirements for development teams taught me clear communication, a trait that makes engineers invaluable on cross-functional factory teams.</p>
      `
    }
  },

  // Architecture (6 posts)
  {
    slug: 'zero-dependency-portfolio-zoom-engine',
    date: '2026-05-24',
    category: 'Architecture',
    ko: {
      title: 'Zero-Dependency 포트폴리오 줌-스케일링 캔버스 렌더러 설계 백서',
      description: 'React나 외부 캔버스 엔진 없이, 바닐라 Javascript와 CSS transform-matrix 연산만으로 피그마 스타일 줌 엔진을 브라우저에 이식한 과정.',
      content: `
        <h2>외부 프레임워크에 대한 집착을 버릴 때 열리는 성능</h2>
        <p>웹에서 피그마와 같은 3단 구성 인터랙티브 캔버스를 구현하겠다고 결심했을 때, 흔히 React Flow 같은 대형 라이브러리 도입을 검토하곤 합니다. 하지만 이들은 코어 번들 크기를 부풀리고 렌더링 프레임 레이트를 가라앉히는 주범입니다. 저는 어떠한 종속성도 없는 <strong>Zero-Dependency 바닐라 JS 스케일 엔진</strong>을 직접 구축하기로 결정했습니다.</p>
        <hr>
        <h2>수학적 transform-origin 보정과 줌 수식</h2>
        <p>브라우저 리사이징 시 요소들의 겹침이나 마진 왜곡을 원천 봉쇄하기 위해, 뷰포트 너비와 높이를 고정된 가상의 캔버스 크기(1440x960)에 대응시켜 <code>ScaleRatio = Math.min(windowWidth/1440, windowHeight/960)</code> 공식을 연동했습니다. 이를 부모 랩 컨테이너의 <code>transform: scale()</code> 속성에 삽입하고 flex 정렬 마진을 동적 계산하여, 화면 크기가 급변해도 마치 피그마 뷰포트 내에서 줌 비율이 매끄럽게 조정되는 듯한 연출을 유도했습니다.</p>
      `
    },
    en: {
      title: 'Building a Zero-Dependency Zoom-Scaling Canvas Renderer from Scratch',
      description: 'Implementing custom aspect-ratio scaling and transform-matrix properties using vanilla JavaScript without external web-flow engines.',
      content: `
        <h2>Discarding Framework Bloat for Clean Performance</h2>
        <p>Instead of loading third-party layout libraries that bloat your bundle size, writing a custom **Zero-Dependency Scaling Engine** yields instant page loads.</p>
        <hr>
        <h2>Mathematical Resizing and Center Proportions</h2>
        <p>By mapping layout coordinates against a virtual 1440x960 canvas and applying ` + "`ScaleRatio = Math.min(width/1440, height/960)`" + `, we dynamically compute CSS transforms in main.js, keeping the visual board aligned on any monitor.</p>
      `
    }
  },
  {
    slug: 'ai-design-harness-4-documents',
    date: '2026-05-14',
    category: 'Architecture',
    ko: {
      title: 'AI 에이전트의 완전 폭주를 제어하는 "하네스 통제설계 4대 문서"',
      description: '구조화된 가이드 문서(implementation_plan, task, walkthrough)가 에이전트의 맥락을 어떻게 가이드하고 버그율을 낮추는지 분석합니다.',
      content: `
        <h2>AI에게 빈 텍스트창을 주지 마라</h2>
        <p>AI 에이전트에게 복잡한 코딩 태스크를 아무 조율 문서 없이 던져주면 높은 확률로 엉뚱한 로직을 추가하거나 멀쩡한 코드를 지워버립니다. AI 모델의 자의적 해석 폭주를 막기 위해 우리 개발 환경에는 4대 통제 하네스 문서를 유지 관리해야 합니다.</p>
        <hr>
        <h2>하네스 4대 문서의 역할 분담</h2>
        <ul>
          <li><strong>implementation_plan.md:</strong> 작업 실행 전 설계 아키텍처와 수정 영역을 미리 조율하는 설계 승인 서류입니다.</li>
          <li><strong>task.md:</strong> 작업 중 실시간 TODO 리스트를 마크하며 진행 상황을 추적하는 동적 스케줄 보드입니다.</li>
          <li><strong>walkthrough.md:</strong> 작업이 끝난 뒤 변경된 영역과 테스트 코드를 검증하는 검수 증빙서입니다.</li>
          <li><strong>newBlogPosts.js 와 같은 데이터 파일 분리 가이드:</strong> 부피가 큰 코드 데이터를 분할 보관하여 AI가 읽고 쓰는 맥락 윈도우 크기를 절약하는 전략적 데이터 세그먼트입니다.</li>
        </ul>
      `
    },
    en: {
      title: 'The AI Design Harness: Using 4-Document Frameworks to Contain LLMs',
      description: 'Structuring execution steps in implementation plans, tasks, and walkthroughs to prevent context drifts and coding errors.',
      content: `
        <h2>Preventing LLM Hallucinations via Documentation Anchors</h2>
        <p>Without structured guardrails, AI agents write messy code. A **4-Document Harness** establishes strict boundaries, forcing predictable completions.</p>
        <hr>
        <h2>Roles of the Four Control Documents</h2>
        <p>The ` + "`implementation_plan.md`" + ` locks down the code architecture. The ` + "`task.md`" + ` serves as a real-time progress tracker. The ` + "`walkthrough.md`" + ` documents verification tests. Isolating dataset files like ` + "`newBlogPosts.js`" + ` preserves token counts, reducing API timeouts.</p>
      `
    }
  },
  {
    slug: 'gemini-api-personal-assistant',
    date: '2026-04-24',
    category: 'Architecture',
    ko: {
      title: '구글 Gemini API를 활용한 옵시디언 개인 리서치 대시보드 설계',
      description: 'API 키 하나로 내 지식창고를 긁어 연동하고, 질문에 따라 최적의 지식 노트를 발굴 및 추천해주는 지식 매니저 구현 방법.',
      content: `
        <h2>나만을 위한 프라이빗 AI 뇌</h2>
        <p>인터넷의 일반적인 지식을 알려주는 범용 챗봇은 편리하지만 정작 '내가 메모해두었던 독자적인 전공 정리'나 '나만의 일기장' 데이터는 접근하지 못합니다. 구글 Gemini API의 방대한 200만 토큰 컨텍스트 능력을 내 옵시디언(Obsidian) 폴더 데이터베이스에 결합하면, 나만을 위한 진정한 개인 비서가 구현됩니다.</p>
        <hr>
        <h2>대용량 컨텍스트 윈도우의 적극적 활용</h2>
        <p>과거에는 노트를 잘게 쪼개어 임베딩하고 검색(RAG)해야 했기에 개발이 복잡하고 매칭률이 떨어졌습니다. 하지만 Gemini API는 내 로컬 지식 위키 폴더 내의 마크다운 텍스트 20~30개를 통째로 한 번에 컨텍스트로 집어넣어 질의할 수 있습니다. "내가 정리했던 반도체 후공정 휨 대책 중, 기판 Residual Stress 관련 내용만 3줄 요약해줘" 같은 정교한 인덱스 발굴이 복잡한 데이터베이스 세팅 없이 손쉽게 이루어집니다.</p>
      `
    },
    en: {
      title: 'Designing an Obsidian Knowledge Dashboard via Gemini API Integration',
      description: 'Leveraging Gemini\'s million-token context windows to read and summarize entire markdown vaults without RAG pipelines.',
      content: `
        <h2>Creating Your Private External Brain</h2>
        <p>Generic web chatbots lack access to your personal study logs. Feeding your Obsidian markdown notes into **Gemini API** instances creates a localized knowledge retrieval assistant.</p>
        <hr>
        <h2>Harnessing 2M Token Window Scaling</h2>
        <p>RAG pipelines are complex to set up. With Gemini\'s 2-million-token window, you can upload your entire semester\'s engineering notes as context. Asking for cross-references between class notes yields instantaneous results.</p>
      `
    }
  },
  {
    slug: 'dark-mode-fouc-prevention',
    date: '2026-04-08',
    category: 'Architecture',
    ko: {
      title: '다크모드 적용 시 깜빡임(FOUC) 현상을 원천 방지하는 렌더링 최적화',
      description: '웹페이지 첫 로드 시 시스템 설정 다크모드 값이 DOM 파싱 전에 적용되지 않아 흰 화면이 잠깐 보였다 사라지는 레이아웃 깜빡임 제어 기법.',
      content: `
        <h2>눈부신 섬광탄: FOUC(Flash of Unstyled Content)</h2>
        <p>다크모드를 지원하는 포트폴리오를 만들 때 흔히 자바스크립트의 <code>document.addEventListener('DOMContentLoaded', ...)</code> 내부에서 로컬 스토리지 값을 읽어 다크 테마 클래스를 주입합니다. 하지만 이럴 경우 브라우저가 HTML 본문을 먼저 흰색 기본 테마로 다 그려놓은 뒤에 테마 클래스가 뒤늦게 붙어, 사용자는 페이지 진입 시 눈이 시린 '흰색 섬광'을 맞이하게 됩니다.</p>
        <hr>
        <h2>원천 봉쇄 솔루션: 인라인 렌더링 블로킹 스크립트</h2>
        <p>이 깜빡임을 막기 위해서는 테마 적용 스크립트가 <code>&lt;body&gt;</code> 태그 바로 아래, 혹은 <code>&lt;head&gt;</code> 섹션의 가장 윗부분에 <strong>인라인 스크립트</strong> 형태로 위치해야 합니다. 이 스크립트는 DOM 파싱을 일시 차단(Blocking)하고 즉시 로컬 스토리지와 시스템 선호 다크 테마 설정을 읽어 <code>&lt;html&gt;</code> 태그에 클래스를 미리 심어둡니다. 이리 하면 브라우저가 화면을 그리는 첫 프레임부터 완전한 다크 테마로 렌더링하여 눈 피로 없는 완벽한 UX가 제공됩니다.</p>
      `
    },
    en: {
      title: 'Eliminating Dark-Mode Flash (FOUC) via Blocking Head Scripts',
      description: 'Injecting inline system theme checks before browser render trees compile to prevent irritating white flashes on startup.',
      content: `
        <h2>The White Flash of Unstyled Content (FOUC)</h2>
        <p>Waiting for DOMContentLoaded to check dark mode classes causes the browser to render a white screen first, followed by a sudden black inversion. This flash harms the UX.</p>
        <hr>
        <h2>The Solution: Inline Blocking Class Injections</h2>
        <p>To eliminate this, place a tiny, dependency-free inline script at the top of your ` + "`<head>`" + `. It reads localStorage and media preferences, applying classes to documentElement before rendering the body.</p>
      `
    }
  },
  {
    slug: 'obsidian-second-brain-tips',
    date: '2026-03-22',
    category: 'Architecture',
    ko: {
      title: '옵시디언(Obsidian)을 활용한 개발자 세컨드 브레인 구축의 핵심 노하우',
      description: '수많은 폴더 분류의 덫에서 탈피해, 태그(#)와 문서 간 링크([[Link]])만으로 유기적인 지식 네트워크 메모리를 확장하는 방법.',
      content: `
        <h2>폴더 분류 체계의 늪에서 탈피하기</h2>
        <p>옵시디언을 처음 시작할 때 개발자들은 마치 프로젝트 소스 디렉토리를 나누듯 '1. 공부', '2. 일기', '3. 독후감' 등 계층적 폴더 분류에 많은 노력을 쏟아붓습니다. 하지만 이 구조는 노트를 작성할 때마다 "이 글은 어느 폴더에 분류해 넣어야 하지?"라는 쓸데없는 고민을 자극해 기록 행위 자체를 주저하게 만듭니다.</p>
        <hr>
        <h2>태그와 백링크(Backlinks)로 연결하는 뉴런망</h2>
        <p>폴더는 최소화(Inbox, Archive 단 2개)로 유지하세요. 대신 작성하는 문서 내에 <code>[[TSV 공정 정리]]</code>와 같은 상호 연결 링크를 적극적으로 걸고, 관련된 성격에 <code>#semiconductor</code> 태그만 다세요. 문서와 문서가 유기적으로 엮여 생성되는 '그래프 뷰(Graph View)'는 우리의 뇌 속 시냅스가 아이디어를 연상해 나가는 방식과 완전히 일치하여, 잊혔던 옛 메모들을 직관적으로 복원해주고 새로운 영감을 선물합니다.</p>
      `
    },
    en: {
      title: 'Building a Developers Second Brain in Obsidian: Principles and Tips',
      description: 'Moving away from hierarchical folder structures to link-based associative memory structures in local markdown vaults.',
      content: `
        <h2>The Trap of Complex Folder Structures</h2>
        <p>Structuring notes into rigid nested folders breeds friction: "Which directory does this note belong in?" This hesitation halts the writing flow.</p>
        <hr>
        <h2>Associative Backlinks Over Folders</h2>
        <p>Reduce folders to an Inbox and Archive. Instead, use double bracket ` + "`[[Backlinks]]`" + ` to tie relevant notes together. This builds a web of concepts that mirrors cognitive thinking.</p>
      `
    }
  },
  {
    slug: 'prompt-vs-harness-engineering-diff',
    date: '2026-03-05',
    category: 'Architecture',
    ko: {
      title: '프롬프트 엔지니어링 vs 하네스 엔지니어링: 기술적 깊이의 차이',
      description: '단순히 프롬프트 문구를 조절해 결과를 유도하는 방식과 AI 에이전트의 구동 환경에 물리적 경계를 짓는 소프트웨어 아키텍처적 통제 기술 비교.',
      content: `
        <h2>프롬프트 튜닝만으로는 대규모 시스템을 통제할 수 없다</h2>
        <p>"명확하게 대답해줘", "역할은 시니어 엔지니어야" 같은 마법의 프롬프트 문구를 찾는 <strong>프롬프트 엔지니어링(Prompt Engineering)</strong>은 단발성 답변 유도에는 유용하지만, 깃허브 저장소를 다루는 대규모 자율주행 코딩 에이전트를 안전하게 돌리기에는 역부족입니다. 에이전트의 폭주와 코어 코드 소실 위험이 항상 존재하기 때문입니다.</p>
        <hr>
        <h2>소프트웨어 통제망으로서의 하네스 엔지니어링</h2>
        <p>하네스 엔지니어링은 AI 에이전트가 딛고 서는 '런타임 환경 자체를 프로그래밍'합니다. 파일 읽기/쓰기 샌드박스 설정, 자동 린터(Linter)와 테스트 파이프라인의 에이전트 연동, 에이전트가 수정 전후의 코드를 직접 diff 비교하게 강제하는 컴파일 통제 등을 수행합니다. 프롬프트가 '부드러운 권고'라면, 하네스는 '물리적 법칙'으로서 AI의 오작동 확률을 극단적으로 낮춥니다.</p>
      `
    },
    en: {
      title: 'Prompt Engineering vs Harness Engineering: Architectural Control of LLMs',
      description: 'Differentiating between soft natural language instructions and hard software constraints configured inside agent sandboxes.',
      content: `
        <h2>Vague Prompts Cannot Control Large Repositories</h2>
        <p>Adding phrases like "be concise" is what we call **Prompt Engineering**. It lacks the teeth needed to control autonomous agents that modify enterprise codebases.</p>
        <hr>
        <h2>Harness Engineering as Hard Architectural Constraints</h2>
        <p>Harness Engineering constructs the execution environment itself. It sets up strict workspace sandboxes, ties real-time compilers to the agent loop, and runs automatic linters after edits. Harnesses act as physical boundaries, keeping AI actions safe.</p>
      `
    }
  }
];
