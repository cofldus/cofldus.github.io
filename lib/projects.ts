export interface Decision {
  tech: string;
  reason: string;
  refs?: { label: string; url: string }[];
}

export interface Experiment {
  id: string;
  hypothesis: string;
  result: string;
  conclusion: string;
}

export interface Project {
  slug: string;
  num: string;
  title: string;
  period: string;
  goal?: string;
  myRole?: string;
  desc: string;
  bullets: string[];
  highlights: { value: string; label: string }[];
  tags: string[];
  decisions: Decision[];
  experiments?: Experiment[];
  troubleshooting?: string[];
  insight?: string;
  award?: string;
  repoUrl?: string;
  repoName?: string;
  videoUrl?: string;
  thumbBg?: string;
  readmeImage?: string;
  /** /arch/ 경로의 아키텍처 다이어그램 이미지 목록 */
  archImages?: string[];
}

export const projects: Project[] = [
  {
    slug: "airpa",
    num: "01",
    title: "AiRPA: 학생 진로 탐색 자동화 시스템",
    period: "한국지능정보사회진흥원 해커톤",
    goal: "진로 상담 교사의 학과 탐색·요약 시간을 인당 30분 → 즉시로 단축, 학생 가치관 기반 개인화 추천 리포트 자동 생성",
    myRole: "전체 아키텍처 설계 · UiPath RPA 시나리오 구현 · T5 요약 모델 연동 · 개인화 추천 로직 및 엑셀 리포트 출력 개발",
    desc: "진로 상담 교사가 학생 한 명을 위해 교육부 포털·대학알리미·졸업생 블로그를 수동 탐색·요약하는 데 인당 30분 이상을 소비한다는 현장 관찰에서 시작했습니다. 문제의 본질은 소스마다 로그인 방식·동적 로딩 구조·데이터 포맷이 달라 단일 스크래퍼로 통합 불가하다는 이질성이었습니다. RPA로 소스 이질성을 흡수하고, T5 모델로 수집된 비정형 텍스트를 일관된 요약으로 압축한 뒤, 학생 가치관 설문 기반 5개 시나리오로 개인화 추천까지 연결했습니다.",
    bullets: [
      "UiPath RPA로 로그인·동적 로딩 포함 3개 이질적 소스에서 학과 정보·졸업생 후기 평균 200건 자동 수집",
      "TF-IDF 대비 문장 자연도 23% 향상, 학과 100개 처리 시간 8h→3h 단축; T5의 추상 요약이 핵심 차이",
      "설문 기반 '안정성 중시형·성장 지향형' 등 5가지 시나리오로 개인화 추천, 전체 자동화율 95%+",
    ],
    highlights: [
      { value: "95%+", label: "자동화율" },
      { value: "8h→3h", label: "처리 시간" },
      { value: "200건", label: "수집량/회" },
    ],
    decisions: [
      {
        tech: "UiPath RPA vs Python 스크래퍼",
        reason:
          "소스마다 로그인 방식이 다르고 JavaScript 동적 로딩 구조도 제각각이라 단일 스크래퍼로 추상화할 수 없었습니다. RPA는 실제 브라우저를 구동하기 때문에 이 이질성을 코드 변경 없이 흡수합니다. 스크래퍼는 소스마다 별도 구현이 필요했고 해커톤 일정상 유지보수 비용을 감당할 수 없었습니다.",
      },
      {
        tech: "HuggingFace T5 추상 요약 vs TF-IDF 추출 요약",
        reason:
          "학과 설명, 졸업생 후기, 취업률 데이터는 문서 구조가 소스마다 완전히 달랐습니다. 추출 요약은 중요 문장을 그대로 뽑아내기 때문에 소스 구조에 의존하고 일관성이 낮았습니다. T5의 추상 요약은 내용을 재구성해 균일한 포맷으로 압축—비교 가능한 출력이 핵심 요구 사항이었습니다.",
        refs: [
          { label: "T5 (Raffel et al., 2020)", url: "https://arxiv.org/abs/1910.10683" },
        ],
      },
      {
        tech: "설문 기반 5개 시나리오 개인화",
        reason:
          "개인화를 협업 필터링으로 구현하려면 과거 사용 데이터가 필요한데, 학생 진로 데이터는 수집 경로가 없었습니다. 콜드 스타트 문제를 우회하려면 설문으로 가치관을 직접 수집하는 것이 가장 현실적이었습니다. 5개 시나리오는 현장 교사 인터뷰에서 반복 등장한 유형을 클러스터링해 도출했습니다.",
      },
    ],
    experiments: [
      {
        id: "A1",
        hypothesis: "Python 크롤러만으로 3개 소스를 통합할 수 있다",
        result: "소스마다 로그인 방식과 JavaScript 동적 로딩 구조가 달라 단일 스크래퍼로 추상화가 불가능했다. 페이지 구조가 조금만 바뀌어도 전체 수집이 실패했다.",
        conclusion: "코드 변경 없이 브라우저를 직접 구동하는 UiPath RPA로 전환"
      },
      {
        id: "A2",
        hypothesis: "UiPath 플로우 내에서 Python 스크립트를 직접 호출해 T5 요약을 실행할 수 있다",
        result: "라이브러리 경로·Python 버전 불일치로 플로우 전체가 예기치 않게 붕괴됐다. 두 환경의 런타임이 격리되어 있어 직접 호출 자체가 불안정했다.",
        conclusion: "CSV 파일을 경계로 삼아 RPA↔Python 역할을 완전히 분리"
      },
      {
        id: "A3",
        hypothesis: "더 좋은 요약 모델로 교체하면 출력 품질이 올라간다",
        result: "학과명·기관명 같은 고유명사가 손실되고, 문장 길이가 소스마다 달라 비교가 어려웠다. 모델을 바꿔도 전후처리 없이는 구조적으로 같은 문제가 반복됐다.",
        conclusion: "고유명사 보호·길이 제약·줄바꿈 규칙을 담당하는 전후처리 레이어 필수화"
      },
      {
        id: "A4",
        hypothesis: "100개 학과를 순차적으로 처리해도 허용 가능한 시간 내에 끝난다",
        result: "RPA 직렬 실행 시 8시간 이상 소요. 특정 사이트의 응답 지연이 전체 파이프라인을 블로킹했다.",
        conclusion: "독립 학과 단위 배치 처리 + 조건 대기 삽입으로 병렬성 확보, 처리 시간 8h→3h"
      },
      {
        id: "A5",
        hypothesis: "예외 처리는 핵심 기능 완성 후 추가해도 늦지 않다",
        result: "단 한 건의 수집 실패가 전체 파이프라인을 멈춰 세웠다. 해커톤 환경에서 예외 없는 구조는 운에 의존하는 것과 같았다.",
        conclusion: "학과 단위로 예외를 캡처·격리해 나머지 파이프라인이 계속 실행되는 구조를 먼저 설계"
      },
    ],
    troubleshooting: [
      "RPA 선택자가 사이트 구조 변경이나 팝업 등장에 취약했다. 강성 선택자 하나에 의존하면 페이지 레이아웃이 조금만 바뀌어도 전체가 멈췄다. CSS 선택자에 우선순위 계층을 두고, 예상 외 요소 등장 시 분기 처리하는 예외 흐름을 세분화했다.",
      "블로그 후기에 광고성 문구와 실제 경험담이 뒤섞여 있었다. 그대로 요약하면 홍보 문구가 진로 정보처럼 제시되는 왜곡이 생겼다. 반복 패턴 감지 규칙과 키워드 필터를 추가해 신호 대 잡음비를 높였다.",
      "T5 요약문이 엑셀 셀 최대 길이를 초과하면 최종 리포트가 깨졌다. 수집 단계에서는 보이지 않다가 문서 생성 직전에 터지는 문제였다. 문장 길이 상한과 강제 줄바꿈 규칙을 요약 후처리 단계에 추가했다.",
      "동일 학과 정보가 교육부 공식 포털과 졸업생 후기에서 상충하는 경우가 있었다. 통합 기준 없이 병합하면 신뢰도가 낮은 정보가 전면에 나올 수 있었다. 공식 데이터 > 졸업생 후기 > 보조 설명 순서의 우선순위 정책을 명문화했다.",
    ],
    insight: "자동화 시스템은 '가장 잘 작동할 때'가 아니라 '가장 자주 깨질 때'를 기준으로 설계해야 한다는 것을 배웠다. T5 요약 품질을 0.1% 올리는 것보다, RPA 선택자가 실패했을 때 해당 학과만 건너뛰고 나머지를 계속 수집하는 격리 설계가 실제 안정성에 훨씬 큰 영향을 미쳤다. 처음엔 단일 크롤러로 3개 사이트를 추상화하려 했지만, 사이트마다 로그인 방식과 JS 로딩 구조가 달라 추상화 자체가 불가능했다. 도구를 먼저 정하고 문제에 맞추는 게 아니라, 실패 모드를 먼저 열거하고 그 위에 도구를 얹는 순서가 맞았다. 요약 모델의 토큰 한계, 엑셀 셀 길이 제약, RPA 선택자 취약성은 개별 버그가 아니었다. 모두 단계 간 '중간 표현의 계약'을 명확히 정의하지 않아 생긴 결과였다. 계약이 명확하면 어느 단계가 깨져도 나머지가 살아남는다.",
    tags: ["UiPath RPA", "Python", "HuggingFace T5", "TF-IDF", "Excel 자동화"],
    award: "한국지능정보사회진흥원 해커톤 특별상",
    videoUrl: "/airpa_demo.mp4",
    thumbBg: "#FFFFFF",
    archImages: ["/arch/RPA.svg"],
  },
  {
    slug: "medical-chatbot",
    num: "02",
    title: "이지스-바이오 센티넬스 의료자문봇",
    period: "멋쟁이사자처럼 AI 자연어처리 집중과정 · 팀 프로젝트",
    goal: "Naive RAG의 낮은 Recall 한계를 하이브리드 검색 + 리랭커로 극복, 전문 의학 5.5만 건 코퍼스 기반 고정밀 자문봇 구축",
    myRole: "BM25+FAISS 하이브리드 파이프라인 설계 · bge-reranker 통합 · 평가 지표(Accuracy, BERTScore) 실험 및 분석",
    desc: "Naive RAG로 프로토타입을 올리고 국가고시 기출 문제로 실제 테스트를 돌렸을 때, 표면적으로는 '작동'했습니다. 문제는 정밀도였습니다. '폐색전증 항응고 치료 시작 기준'을 물으면 벡터 검색이 '항응고제 일반 개요'나 '혈전예방 가이드라인 서문' 같은 의미적으로 유사하지만 임상 수치가 없는 문서를 상위에 올렸습니다. 실제 D-dimer·INR 수치 기준이 담긴 핵심 문서는 순위 밖이었습니다. 임베딩 공간에서 전문 의학 용어의 유사도는 의미 유사성이지 용어 정합성이 아니기 때문에 발생하는 Recall 상한 문제였습니다. 반대로 BM25만 단독으로 쓰면 원문이 영문 번역체인 문서—'anticoagulation initiation threshold'를 한국어로 풀어쓴 데이터—는 정확한 표면 매칭이 없어 완전히 누락됐습니다. 두 검색 방식이 서로 다른 방향의 빈틈을 채운다는 걸 확인한 뒤 하이브리드 병렬 구조로 전환했고, 40개 후보를 reranker로 Top-5로 압축하는 2단계 파이프라인을 설계했습니다. 40개를 전부 LLM에 주면 컨텍스트 길이가 늘어날수록 LLM이 핵심 문서보다 노이즈 문서를 참조하는 비율이 올라가는 현상이 BERTScore에서도 수치로 확인됐습니다. '많이 뽑고, 리랭킹으로 압축하고, LLM엔 최소한만 준다'는 원칙이 이 파이프라인의 핵심입니다.",
    bullets: [
      "하이브리드 검색 설계: BM25(k=20, 용어 매칭) + FAISS(k=20, 의미 검색) 병렬 수행으로 Recall 상한 제거",
      "BAAI/bge-reranker-v2-m3 재순위: 40개 후보→Top-5 압축으로 LLM 컨텍스트 노이즈 최소화",
      "ReRanker 전후 비교: 객관식 정확도 +0.04, 서술형 BERTScore +0.16 향상, 단일 벡터 RAG 대비 명확한 개선",
    ],
    highlights: [
      { value: "+0.04", label: "Accuracy" },
      { value: "+0.16", label: "BERTScore" },
      { value: "5.5만건", label: "코퍼스" },
    ],
    decisions: [
      {
        tech: "BM25 + FAISS 하이브리드 vs 단일 벡터 검색",
        refs: [
          { label: "RAG (Lewis et al., 2020)", url: "https://arxiv.org/abs/2005.11401" },
          { label: "FAISS (Johnson et al., 2017)", url: "https://arxiv.org/abs/1702.08734" },
          { label: "BM25 (Robertson & Zaragoza, 2009)", url: "https://dl.acm.org/doi/10.1561/1500000019" },
        ],
        reason:
          "단일 FAISS 벡터 검색부터 시작했고, 전문 의학 용어에서 Recall 한계가 드러났습니다. '폐색전증 항응고 치료 시작 기준'을 질의하면 임베딩 공간에서 의미적으로 유사한 '혈전예방 일반 가이드라인' 문서가 상위에 올라오는데, 임상 수치 기준이 담긴 문서는 순위 밖으로 밀렸습니다. 임베딩은 '혈전 관련 치료'라는 대분류에서 두 문서가 가깝다고 보지만, '구체적 기준치'라는 임상 핵심은 벡터 표현에 충분히 담기지 않습니다. 반대로 BM25 단독 전환도 코퍼스 특성상 문제가 있었습니다. 영문 원문에서 번역·재구성된 데이터는 한국어 표면 표현이 다양해 정확한 키워드 매칭이 안 되는 경우가 생겼습니다. 두 방식이 서로 다른 방향의 빈틈을 갖는다는 걸 직접 비교로 확인하고, BM25(k=20) + FAISS(k=20) 병렬 합산으로 최대 40개 후보를 확보하는 하이브리드 구조로 전환했습니다. 단독 검색 대비 정답 문서가 후보풀에 포함되는 비율이 명확히 개선됐고, 이 풀에서 리랭킹으로 Top-5를 추려내는 2단계 구조로 파이프라인이 확정됐습니다.",
      },
      {
        tech: "bge-reranker vs 단순 Top-K 점수 절삭",
        refs: [
          { label: "bge-reranker-v2-m3 (BAAI)", url: "https://huggingface.co/BAAI/bge-reranker-v2-m3" },
        ],
        reason:
          "BM25+FAISS로 40개 후보를 확보한 뒤, 전부 LLM 컨텍스트에 넣으면 BERTScore가 오히려 더 적게 넣었을 때보다 낮아졌습니다. 관련성이 낮은 문서가 컨텍스트 중간에 섞이면 LLM 어텐션이 분산되는 현상이었습니다. 단순 Top-K 절삭(각 검색 점수 상위 N개 선택)도 시도했는데, BM25 고점 문서와 FAISS 고점 문서가 상당 부분 겹쳐 후보 다양성이 낮아졌습니다. 근본적으로, 검색 점수는 '문서 자체의 독립 랭킹'이지 '이 질문에 이 문서가 얼마나 정합한가'를 직접 평가하지 않습니다. bge-reranker-v2-m3는 질문과 후보 문서를 쌍으로 교차 인코딩해 질문-문서 정합성을 재평가하기 때문에 검색 점수 기반 절삭보다 정밀하게 노이즈를 걸러냅니다. Top-5 압축 시 BERTScore +0.16이 나왔고, Top-10에서는 개선폭이 절반 이하였습니다. 컨텍스트를 줄일수록 성능이 오르는 역직관적 결과가 리랭킹 도입의 실증 근거였습니다.",
      },
      {
        tech: "EXAONE-3.5 vs Qwen2.5-Instruct",
        refs: [
          { label: "EXAONE 3.5 (LG AI Research, 2024)", url: "https://arxiv.org/abs/2412.04862" },
          { label: "Qwen2.5 (Qwen Team, 2024)", url: "https://arxiv.org/abs/2412.15115" },
        ],
        reason:
          "로컬 추론 가능한 한국어 지원 모델 중 EXAONE-3.5와 Qwen2.5-Instruct를 동일 평가셋으로 비교했습니다. 평가 기준은 객관식 Accuracy, 서술형 BERTScore, 지시문 적합도(답변 형식·한국어 의학 용어 준수)였습니다. Qwen2.5-Instruct는 영어·다국어에서 범용 성능이 높지만, 한국어 의학 전문 용어 생성과 지시문 형식 준수에서 EXAONE-3.5보다 낮은 점수를 보였습니다. EXAONE-3.5는 지시문 적합도와 한국어 서술형 답변 자연도에서 더 안정적이었고, 5.5만 건 코퍼스를 대상으로 파이프라인 변수를 바꿔가며 평가를 반복해야 하는 구조에서 로컬 추론이 가능하다는 점이 실험 비용을 제어하는 데 결정적이었습니다.",
      },
    ],
    experiments: [
      {
        id: "M1",
        hypothesis: "단일 FAISS 벡터 검색으로 전문 의학 용어 Recall을 충분히 확보할 수 있다",
        result: "'폐색전증 D-dimer 기준치'처럼 의학 전문어는 임베딩 공간에서 일반 단어와 거리가 좁아, 벡터 검색만으로는 관련 문서를 놓치는 경우가 많았다.",
        conclusion: "BM25(정확 용어 매칭)와 FAISS(의미 유사성)를 병렬로 실행하는 하이브리드 구조로 전환"
      },
      {
        id: "M2",
        hypothesis: "40개 후보 문서를 전부 컨텍스트에 넣으면 LLM 답변 품질이 올라간다",
        result: "관련 없는 문서가 섞이면 LLM이 노이즈에 흔들려 오히려 답변이 불안정해졌다. 컨텍스트 길이가 늘어날수록 정합성이 떨어졌다.",
        conclusion: "bge-reranker로 질문-문서 교차 인코딩해 Top-5로 압축. BERTScore +0.16 확인"
      },
      {
        id: "M3",
        hypothesis: "Top-10으로 압축해도 Top-5와 성능 차이가 없을 것이다",
        result: "Top-10에서의 BERTScore 개선폭이 Top-5 대비 절반 이하였다. 컨텍스트 크기가 클수록 노이즈 영향이 더 강하게 작용했다.",
        conclusion: "Top-5가 품질·속도 균형의 최적점으로 확정"
      },
    ],
    tags: ["EXAONE-3.5", "BM25", "FAISS", "RAG", "bge-reranker-v2-m3", "LangChain", "Python"],
    videoUrl: "/medical-chatbot_demo.mp4",
    repoUrl: "https://github.com/cofldus/medical-chatbot_aegis-bio-sentinels",
    repoName: "medical-chatbot_aegis-bio-sentinels",
    archImages: ["/arch/medical-chatbot.svg"],
  },
  {
    slug: "korean-noise-restoration",
    num: "03",
    title: "난독화된 한글 리뷰 복원 AI",
    period: "2026.01 · AI 자연어처리 집중 과정 3기",
    goal: "자음·모음 치환, 받침 탈락 등 의도적 난독화로 필터를 우회하는 악성 리뷰를 원형 한글로 복원, 콘텐츠 모더레이션 신뢰도 향상",
    myRole: "노이즈 패턴 분석 · Seq2Seq 복원 모델 설계 및 학습 · 음소 토크나이저 커스터마이징 · 평가 파이프라인 구축",
    desc: "야민정음(시각 유사도 기반 변형: '머 → 뫄')과 음운 오류(발음 유사 변형: '됩니다 → 됩니당')는 복원 방향이 근본적으로 다릅니다. 전자는 자모 그래픽 매핑 규칙이, 후자는 음성 전사 역변환이 필요합니다. 단일 모델은 두 방향 사이에서 최적점을 찾지 못해 출력이 불안정해집니다. 문제를 '모델 성능 부족'이 아닌 '태스크 정의 오류'로 재진단하고, 유형 분류 → 전용 복원 분기로 구조 자체를 바꿨습니다.",
    bullets: [
      "KoELECTRA Noise Classifier로 입력 유형 판별 후 야민정음·음운오류 전용 KoBART 모델로 분기 처리",
      "핵심 선행 과제: BPE 토크나이저가 야민정음 자모를 분해 실패 → JAMO(초·중·종성) 전처리로 토큰 손상 원천 차단",
      "BERTScore 0.9812 · CER 0.0426 달성, 분기 설계 도입 전 베이스라인 대비 +5.6%p 개선",
    ],
    highlights: [
      { value: "0.9812", label: "BERTScore F1" },
      { value: "0.0426", label: "CER" },
      { value: "+5.6%p", label: "개선폭" },
    ],
    decisions: [
      {
        tech: "분기 설계(분류 → 전담 복원 모델) vs 단일 seq2seq 모델",
        refs: [
          { label: "KoBART (SKT-AI)", url: "https://github.com/SKT-AI/KoBART" },
        ],
        reason:
          "처음에는 그래픽형 노이즈(시각 유사도 기반 변형: '대머리→머머리', 'ㄱr자→가자')와 음운형 노이즈(발음 유사도 기반 변형: '됩니다→됩니당')를 하나의 KoBART seq2seq 모델로 동시에 처리하려 했습니다. 데이터를 늘리고 학습을 반복해도 두 유형이 혼재하는 문장에서 출력이 불안정했습니다. 원인은 두 노이즈 유형의 복원 기제가 근본적으로 다르다는 데 있었습니다. 그래픽형은 시각 형태 매핑 규칙이, 음운형은 음성 전사 역변환이 복원의 핵심입니다. 단일 모델이 두 방향의 손실을 동시에 최소화하려 하면 학습 과정에서 두 방향의 기울기가 서로 간섭합니다. 데이터를 3배 늘려도 혼합 케이스 오류율이 줄지 않는 걸 확인하고 이것이 데이터 문제가 아닌 구조 설계 문제임을 인식했습니다. 분류기가 유형을 먼저 판별하고 각 유형 전용 모델로 라우팅하는 구조로 바꾸자, 각 모델이 한 방향에만 집중해 기울기 간섭이 사라지고 BERTScore가 베이스라인 대비 +5.6%p 개선됐습니다.",
      },
      {
        tech: "JAMO 전처리 vs 기본 BPE 토크나이저",
        reason:
          "모델 구조를 설계하기 전에 토크나이저 단계부터 문제가 생긴다는 걸 입력 데이터를 직접 확인하고 나서야 파악했습니다. '뫄', '띰' 같은 그래픽형 변형 자모는 기본 KoBART BPE 어휘에 없거나 OOV로 처리되어 [UNK] 토큰이 됩니다. 토크나이저 단계에서 정보가 유실되면 이후 어떤 모델을 써도 복원 자체가 불가능한 구조입니다. 자음·모음을 초·중·종성으로 완전 분리하는 JAMO 전처리를 적용하면 변형된 자모도 기존 어휘의 조합으로 표현되어 [UNK] 없이 인코딩됩니다. 단, JAMO 분리를 단독으로 적용하면 의미 공간이 희박해져 긴 입력에서 원문과 무관한 문장을 생성하는 부작용이 실험에서 확인됐기 때문에, 이 전처리는 분기형 구조 안에서 그래픽형 노이즈 복원 경로에만 선택적으로 적용되는 전제조건으로 설계됐습니다.",
      },
      {
        tech: "KoELECTRA 학습 분류기 vs 규칙 기반 분기",
        refs: [
          { label: "KoELECTRA (monologg)", url: "https://github.com/monologg/KoELECTRA" },
        ],
        reason:
          "분기 구조를 확정한 뒤 다음 문제는 유형 판별 방식이었습니다. 그래픽형 노이즈는 특정 자모 변형 패턴을 정규식으로 감지하고 그 외는 음운형으로 처리하는 규칙 기반 분기를 먼저 시도했습니다. 문제는 두 유형이 한 문장에 혼재하거나 경계가 모호한 경우가 실제 리뷰 데이터에서 예상보다 훨씬 많았다는 것입니다. 규칙이 늘어날수록 케이스 간 충돌이 발생했고, 새로운 변형 패턴이 등장할 때마다 규칙을 추가해야 하는 유지보수 부담이 컸습니다. KoELECTRA 기반 분류기는 문장 전체 문맥을 양방향으로 보고 판별하기 때문에 혼합 케이스에서 규칙 기반보다 안정적이었습니다. 분류기 학습 데이터에 혼합 케이스를 충분히 포함시키는 것이 전체 파이프라인 성능의 핵심 변수가 됐습니다.",
      },
    ],
    experiments: [
      {
        id: "R1",
        hypothesis: "학습 데이터를 늘리면 단일 모델도 두 노이즈 유형을 동시에 안정적으로 처리할 수 있다",
        result: "단일 유형 수치는 소폭 개선됐지만, 야민정음과 음운 오류가 혼재하는 실제 문장에서는 여전히 불안정했다. 데이터 문제가 아니라 구조 문제였다.",
        conclusion: "데이터 증량만으로는 혼합 노이즈 대응이 근본적으로 불가능; 아키텍처 분리로 방향 전환"
      },
      {
        id: "R2",
        hypothesis: "문자 정보를 보강(Char-CNN)하면 그래픽 노이즈 복원이 개선된다",
        result: "혼합 케이스와 그래픽 오류에서 여전히 실패했다. 보조 신호를 추가해도 단일 모델이 복원 방향을 판단하는 문제는 해결되지 않았다.",
        conclusion: "입력 표현 보강이 아닌, 판단 자체를 분리하는 구조가 필요"
      },
      {
        id: "R3",
        hypothesis: "자모 분리(JAMO) 입력으로 야민정음 복원 정확도를 높일 수 있다",
        result: "형태 복원은 강화됐지만, 의미 공간이 희박해져 긴 입력에서 원문과 무관한 새 문장을 생성하는 부작용이 발생했다.",
        conclusion: "JAMO 전처리는 아키텍처 분리의 전제조건으로, 단독으로는 오히려 품질이 저하될 수 있음"
      },
      {
        id: "R4",
        hypothesis: "KoELECTRA 분류기로 노이즈 유형을 먼저 판별하면 전담 모델 라우팅이 가능하다",
        result: "분류기 + 경로 분기 구조에서 가장 안정적인 출력을 얻었다. 각 모델이 한 방향에만 집중하자 손실 함수 상충이 사라졌다.",
        conclusion: "분기형 구조 확정 채택. BERTScore 0.9812, CER 0.0426 달성"
      },
      {
        id: "R5",
        hypothesis: "프롬프트보다 special tag로 유형을 내재화하는 것이 운영상 더 낫다",
        result: "일부 케이스에서 운영 복잡도가 줄었지만, tag 의미 학습 품질이 통합 구조 전체의 핵심 변수가 됐다.",
        conclusion: "Tag 품질 관리가 분기형 구조의 실질적 병목임을 확인"
      },
    ],
    troubleshooting: [
      "기본 난독화와 야민·그래픽형이 한 문장에 동시에 섞이면, 단일 모델은 어느 복원 전략을 먼저 적용할지 일관되게 결정하지 못했다.",
      "자모 분리 입력은 형태 복원에 유리했지만, 의미 공간이 희박해져 긴 입력에서 새로운 문장을 만들어내는 부작용이 있었다.",
      "프롬프트는 즉각적인 제약 효과가 있었으나 토큰을 소모하고 긴 리뷰에서는 오히려 집중력 저하처럼 작동했다. 최종 통합 구조는 프롬프트를 제거하고 학습 내재화를 택했다.",
      "EOS 이후 과생성이 모델 학습만으로 해결되지 않아, 입력 문장 수 기준 출력 제한 Lock과 1.3배 초과 시 강제 컷 규칙을 후처리로 추가했다.",
    ],
    insight: "성능 지표가 오르는 것과 모델이 실제로 '이해'하는 것은 다르다는 사실을 이 프로젝트에서 가장 크게 배웠다. 데이터를 3배 늘리면 성능은 오르지만, 모델이 어떤 판단 근거로 복원하는지는 블랙박스 그대로였다. 야민정음과 기본 난독화가 한 문장에 섞이면, 단일 seq2seq 모델은 어느 규칙을 먼저 적용할지 일관되게 결정하지 못했다. 이 문제는 데이터나 학습법이 아니라 아키텍처 설계에 있었다. 모델 하나에 판단 책임을 모두 몰아준 것 자체가 오류였다. Classifier가 노이즈 유형을 먼저 분리하거나, special tag로 복원 의도를 의미 공간에 녹여 주입하는 방식, 어느 쪽이든 '판단 책임을 분산하는 구조'가 핵심이었다. 프롬프트와 데이터로 풀 수 없는 문제가 있고, 그것은 아키텍처를 바꿔야 풀린다.",
    tags: ["KoBART", "KoELECTRA", "JAMO", "Noise Classifier", "PyTorch", "HuggingFace"],
    videoUrl: "/korean-noise-restoration_demo.mp4",
    repoUrl: "https://github.com/cofldus/korean-noise-restoration",
    repoName: "korean-noise-restoration",
    archImages: ["/arch/korean-noise-restoration.svg"],
  },
  {
    slug: "killkong",
    num: "04",
    title: "KillKong: 콩글리쉬 교정 AI Agent",
    period: "2025.07–08 · 포스코 AI·BigData 아카데미 30기",
    goal: "14GB 다국어 LLM을 3GB로 압축해 CPU에서 0.47초 이내 응답, 모바일 환경에서도 콩글리쉬 실시간 교정 가능한 Agent 구현",
    myRole: "LoRA + 4-bit 양자화 + 토큰 Pruning 조합 설계 · FAISS/SQLite 하이브리드 메모리 구현 · 응답 지연 최적화 전 과정",
    desc: "'블랙 컨슈머', 'after 신청'처럼 한국인 특화 콩글리쉬는 GPT 학습 분포에서 극히 희소해 교정 품질이 불안정합니다. 온디바이스 목표를 설정하자 두 번째 제약이 즉시 발생했습니다: 14GB 모델을 스마트폰 CPU에서 실시간 추론해야 한다는 것. 모델 압축과 지식 분리를 동시에 설계해 해결했습니다. LLM은 문법·문맥 판단만, 콩글리쉬 용례 검색은 전용 벡터 DB가 담당하는 역할 분업입니다.",
    bullets: [
      "모델 압축: LoRA + 4-bit NF4 양자화 + 멀티링구얼 토큰 Pruning(~10%) 조합으로 14GB→3.0GB(76%), ARM CPU(Snapdragon 865 기준) 추론 0.3s 달성",
      "지식 분리: FAISS(IVF) + SQLite LRU 캐시 하이브리드로 630개 콩글리쉬 패턴 DB를 0.02초 내 검색; 콩글리쉬 패턴 DB는 SNS·커뮤니티 크롤링 + 팀 수기 검수로 구축",
      "응답 지연 2.3s→0.47s(5배 단축, Snapdragon 865 ARM CPU 측정), 모바일 일관성 92%+ 확보; cProfile로 병목이 LLM이 아닌 FAISS(0.21s)·SQLite(0.12s)임을 실측 후 최적화",
    ],
    highlights: [
      { value: "76%", label: "모델 경량화" },
      { value: "0.47s", label: "응답 지연" },
      { value: "92%+", label: "모바일 일관성" },
    ],
    decisions: [
      {
        tech: "LoRA + 4-bit NF4 + 토큰 Pruning 세 기법 조합",
        refs: [
          { label: "LoRA (Hu et al., 2021)", url: "https://arxiv.org/abs/2106.09685" },
          { label: "QLoRA/NF4 (Dettmers et al., 2023)", url: "https://arxiv.org/abs/2305.14314" },
        ],
        reason:
          "온디바이스 목표(CPU 추론, 메모리 3GB 이하)를 설정하고 압축 기법을 하나씩 적용해봤습니다. 4-bit NF4 양자화만 적용하면 모델 크기는 절반 수준으로 줄지만 3GB 목표에 도달하지 못했고, 일부 긴 콩글리쉬 설명 문장에서 문법 메타언어가 흔들리는 품질 저하가 생겼습니다. LoRA만 단독으로 적용하면 파인튜닝 파라미터는 줄지만 베이스 모델 가중치 크기 자체가 그대로여서 추론 메모리에 큰 차이가 없었습니다. 토큰 Pruning으로 한국어·영어 외 어휘를 제거하면 어휘 테이블 크기가 줄고 메모리가 추가로 확보됩니다. 세 기법이 각각 다른 레이어(파라미터 수, 비트폭, 어휘 크기)의 병목을 공략한다는 걸 확인하고 조합했을 때 비로소 14GB → 3.0GB(76%) 압축과 CPU 추론 0.3s를 동시에 달성했습니다. 단일 기법으로 목표에 도달하려면 각 기법을 너무 과도하게 적용해야 해서 품질 손실이 허용 범위를 벗어났습니다. 각 기법이 서로 보완적으로 병목을 분담하는 구조가 핵심이었습니다.",
      },
      {
        tech: "전용 FAISS 벡터 DB로 콩글리쉬 지식 분리",
        reason:
          "처음에는 630개 콩글리쉬 패턴을 SFT로 LLM에 직접 학습시키는 방향을 시도했습니다. 문제는 희소성이었습니다. '블랙 컨슈머', 'after 신청'처럼 한국인 특화 콩글리쉬는 LLM 학습 데이터에서 출현 빈도가 극히 낮아, 파인튜닝 후에도 비슷한 패턴이 등장하면 교정하지 못하거나 전혀 다른 표현으로 교정하는 경우가 반복됐습니다. 희소 패턴은 모델 파라미터에 안정적으로 녹아들지 않는다는 걸 실험으로 확인했습니다. RAG로 매번 전체 패턴 DB를 검색하는 방식도 고려했는데, 추론 시 FAISS 검색 지연이 전체 응답 지연에 직접 더해지는 구조라 온디바이스 목표와 충돌했습니다. 결국 콩글리쉬 지식을 전용 FAISS DB에 분리하고 LLM은 문법·문맥 판단에만 집중하도록 역할을 나눴습니다. 모델이 '이 표현이 콩글리쉬인가'를 판단하는 일과, '어떤 패턴에 해당하는가'를 검색하는 일을 분리하자 각자에서 더 안정적인 결과가 나왔습니다.",
      },
      {
        tech: "SQLite LRU 캐시 레이어 추가",
        reason:
          "cProfile로 전체 응답 지연을 분석했을 때, 병목이 LLM 추론이 아니라 FAISS 검색(0.21s)과 SQLite I/O(0.12s)에 있다는 걸 발견했습니다. 직관과 반대였습니다. FAISS IVF 인덱스 구조 변경으로 검색 지연을 0.07s로 줄였지만, 모바일 환경에서 동일한 콩글리쉬 패턴이 반복 조회되는 경우가 많아 매번 벡터 연산을 실행하는 것은 중복 비용이었습니다. SQLite에 최근 조회 결과를 LRU 방식으로 캐싱하면 히트율 높은 패턴은 0.001s 이하로 처리됩니다. 캐시 레이어 추가 후 평균 응답 지연이 추가로 35% 단축됐습니다. '무엇이 병목인지 측정 먼저, 최적화는 그다음'이라는 원칙을 이 과정에서 실감했습니다.",
      },
    ],
    experiments: [
      { id: "E1", hypothesis: "Flan-T5면 충분할 수 있다", result: "정답 교정은 가능하나 설명이 단조롭고 한국어·영어 혼합 표현에서 과보수적", conclusion: "태스크 재정의 후 베이스 재검토" },
      { id: "E2", hypothesis: "Qwen은 회화 자연화에 유리하다", result: "대안 표현 다양성과 맥락 확장 우수", conclusion: "Qwen 채택, 단 경량화 연구가 따라붙는 결정" },
      { id: "E3", hypothesis: "LoRA rank를 높이면 설명 품질이 오른다", result: "rank 16에서 비용 대비 이득 최대, rank 8은 설명 다양성 감소", conclusion: "LoRA rank=16, alpha=32 채택" },
      { id: "E4", hypothesis: "4-bit NF4 양자화만으로 충분하다", result: "모델 크기 급감, 일부 희귀 표현 설명 품질 저하", conclusion: "일부 레이어 8bit 유지 + pruning으로 품질 손실 완화" },
      { id: "E5", hypothesis: "병목은 모델 추론이다", result: "cProfile 결과 FAISS 검색 0.21s, SQLite 조회 0.12s가 LLM 추론보다 컸다", conclusion: "FAISS IVF 재구성 + SQLite 인덱스 + LRU 캐시로 검색 병목 우선 해소" },
    ],
    troubleshooting: [
      "양자화 강도를 높이면 교정문은 유지되어도 설명 문장의 문법 메타언어가 흔들렸다. 학습자 서비스에서 이 부분이 체감 품질을 크게 해쳤다. lm head와 일부 attention 경로를 보수적으로 유지했다.",
      "RAG에서 너무 비슷한 예문만 주면 모델이 패턴을 복사해 사용자 문장을 과수정하는 현상이 있었다. 검색 다양성 제약을 추가했다.",
      "개인화 메모리가 강하게 개입하면 이전 오류 유형이 현재 문장에도 과도하게 적용되는 메모리 오염 문제가 있었다. 세션 감쇠 규칙을 추가해 완화했다.",
      "UiPath에서 Python을 직접 호출하는 방식은 라이브러리 경로·버전 차이로 잦은 실패를 일으켰다. FAISS HNSW → IVF 구조로 변경 후 유사 예문 검색 0.21s → 0.07s로 단축됐다.",
    ],
    insight: "온디바이스 LLM 프로젝트에서 가장 큰 착각은 '모델이 병목'이라는 전제였다. cProfile로 실측해보니 FAISS 검색 0.21s, SQLite 조회 0.12s가 LLM 추론 시간보다 훨씬 컸다. 직관과 반대 방향으로 최적화를 시작했던 것이다. 두 번째 배움은 '지식'과 '언어 생성'의 책임 분리다. 630개 콩글리쉬 패턴을 파인튜닝으로 모델에 주입하면 희소 패턴은 필연적으로 망각된다. 모델이 언어·문맥 판단에만 집중하고 지식은 별도 벡터 DB가 관리하는 구조가, 두 책임을 하나의 모델에 합치는 것보다 훨씬 안정적이었다. 경량화는 단일 기법으로 목표에 도달하지 못했다. LoRA, NF4, 토큰 Pruning이 각각 다른 병목(파라미터 수, 비트폭, 어휘 크기)을 공략하기 때문에, 세 기법의 조합이 필요했다. '무엇이 병목인지 실제로 측정한 뒤 최적화하는 것'이 이 프로젝트 전체를 관통하는 교훈이었다.",
    tags: ["Qwen2.5", "LoRA", "4-bit 양자화", "FAISS", "BM25", "SQLite", "LangChain", "FastAPI", "Docker"],
    award: "포스코 인재창조원 장려상 · 팀 리더",
    videoUrl: "/killkong_demo.mp4",
    repoUrl: "https://github.com/cofldus/killkong_konglish-corrector",
    repoName: "killkong_konglish-corrector",
    archImages: ["/arch/KillKong.svg"],
  },
  {
    slug: "finview",
    num: "05",
    title: "FinView: 생성형 AI 재무보고서 시스템",
    period: "2024.09–11 · 성신여자대학교 · 팀장",
    goal: "500개 상장사 재무제표를 자동 분석해 환각 없는 AI 재무보고서를 5분 → 30초에 생성, 전문가 수준의 리포트 자동화",
    myRole: "팀장 · ETL 파이프라인 설계 · XGBoost/KMeans 모델링 · GPT-4 환각 차단 아키텍처 · D3.js 시각화 인터페이스 개발",
    desc: "LLM에게 '삼성전자의 부채비율이 높은가?'를 직접 물으면 환각이 발생합니다. 수치 계산 책임을 LLM에 주는 것 자체가 설계 오류입니다. 역할을 명확히 분리했습니다: XGBoost가 500개 상장사 재무지표를 A~D 등급으로 분류하고, KMeans가 유사 기업을 군집화합니다. GPT-4는 이미 통계 모델이 계산·태깅한 결과를 받아 서사적 해설만 생성합니다. 수치 연산을 LLM 바깥으로 완전히 빼낸 아키텍처입니다.",
    bullets: [
      "ETL 파이프라인: DART API(500개 상장사 재무제표) + 네이버 뉴스 200건 자동 수집 → XGBoost 신용 등급 분류(91%) + KMeans 군집화",
      "환각 차단 설계: 군집 평균 패턴·리스크 태깅을 GPT-4 컨텍스트에 주입, LLM은 해설 전담 → 환각 80% 감소 (GPT-4 응답 내 수치 직접 연산 포함 비율을 Before/After 50건 수동 샘플링으로 측정)",
      "리포트 생성 5분→30초(10배 단축), 사용자 만족도 4.4/5.0; 수치와 언어의 역할 분리가 핵심",
    ],
    highlights: [
      { value: "91%", label: "신용등급 분류" },
      { value: "10배", label: "생성 속도" },
      { value: "4.4/5", label: "만족도" },
    ],
    decisions: [
      {
        tech: "XGBoost 분류 + GPT-4 해설 분리 아키텍처",
        refs: [
          { label: "XGBoost (Chen & Guestrin, 2016)", url: "https://arxiv.org/abs/1603.02754" },
          { label: "SHAP (Lundberg & Lee, 2017)", url: "https://arxiv.org/abs/1705.07874" },
        ],
        reason:
          "GPT-4에 직접 '이 회사 부채비율이 높나요?'를 물으면 학습 시점 데이터를 기반으로 수치를 지어내거나, 계산 과정에서 오류가 발생합니다. XGBoost가 실시간 DART 재무지표를 처리해 A~D 등급과 리스크 태그를 먼저 결정하고, 그 결과를 GPT-4 프롬프트에 구조화해 넣으면 LLM은 해설만 담당합니다. 수치 연산을 LLM 바깥으로 빼는 것이 환각 차단의 핵심이었습니다.",
      },
      {
        tech: "KMeans 군집화로 비교 컨텍스트 제공",
        reason:
          "단일 기업의 지표만 보여주면 LLM이 '높다/낮다'를 판단할 기준이 없어 애매한 해설이 나옵니다. 동종 업종·규모 유사 기업 군집의 평균 패턴을 컨텍스트에 함께 주입하면 GPT-4가 상대적 위치를 명확히 서술할 수 있었습니다. 군집화는 비교 기준을 자동으로 생성해주는 역할을 했습니다.",
      },
      {
        tech: "SMOTE로 클래스 불균형 해결",
        refs: [
          { label: "SMOTE (Chawla et al., 2002)", url: "https://arxiv.org/abs/1106.1813" },
        ],
        reason:
          "500개 상장사 중 D등급(부실) 기업은 극히 소수라 학습 데이터가 불균형했습니다. XGBoost는 불균형 데이터에서 다수 클래스 편향이 생기고 소수 클래스 분류 성능이 떨어집니다. SMOTE로 D등급 합성 샘플을 생성했을 때 전체 분류 정확도 91%를 달성했고, 특히 부실 기업 감지율이 크게 올라갔습니다.",
      },
    ],
    experiments: [
      { id: "F1", hypothesis: "GPT가 계산까지 해도 충분하다", result: "동일 수치도 업종이 바뀌면 해석이 달라지는데 프롬프트만으로 통제 불가, 수치 오독과 비교 오류 다수", conclusion: "계산 모듈과 언어 생성 모듈 분리 필수" },
      { id: "F2", hypothesis: "업종 평균만 넣으면 된다", result: "분위수·규모 차이 누락; 동일 부채비율이라도 스타트업과 대기업의 맥락이 달라 단순 비교 불가", conclusion: "기준선 다층화 필요 (절사평균 + 분위수 + 규모별 비교군)" },
      { id: "F3", hypothesis: "뉴스 원문을 많이 넣을수록 좋다", result: "중요도 없는 기사까지 일반화, GPT가 기사 몇 건의 분위기를 과대해석", conclusion: "위험 키워드/긍정 이벤트/불확실 이슈로 구조화된 중간 산출물 필요" },
      { id: "F4", hypothesis: "XGBoost 등급만으로 충분하다", result: "비슷한 기업과의 비교 부재, LLM이 '높다/낮다'를 판단할 기준이 없어 애매한 해설 생성", conclusion: "KMeans 군집화로 비교 컨텍스트 자동 제공" },
      { id: "F5", hypothesis: "빠른 리포트가 사용자 만족에 중요하다", result: "캐싱·비동기 처리 적용으로 30초 내 생성 안정화", conclusion: "시스템 UX는 모델만큼 중요" },
    ],
    troubleshooting: [
      "DART API 필드 누락과 회계 기준 차이 때문에 일부 기업은 비율 계산 자체가 실패했다. 결측값 보정과 기업별 스킵 규칙을 추가해 파이프라인 전체 중단을 막았다.",
      "뉴스 크롤링에서 같은 이슈가 여러 기사로 중복되는 문제가 있어, 제목·본문 유사도 기반 중복 제거를 넣지 않으면 리스크가 과장되었다.",
      "XGBoost 분류 결과가 그럴듯해도 GPT가 이를 지나치게 단정적으로 표현하는 경우가 있어, '추정', '시사', '가능성' 같은 hedge 표현 규칙을 프롬프트에 추가했다.",
      "대시보드에서 숫자와 서술이 엇갈리면 신뢰도가 급격히 떨어져, 최종 표시 전 structured payload checksum 검증을 넣었다.",
    ],
    insight: "LLM에게 숫자를 주고 분석하게 두면 설득력 있는 문장이 나온다. 문제는 그 문장이 틀렸을 때 검증할 방법이 없다는 것이었다. XGBoost 등급, KMeans 군집 평균, 리스크 태그를 비LLM 단계에서 먼저 계산하고, 그 결과를 구조화된 컨텍스트로 GPT에 주입하면 모델은 해설만 담당하게 된다. 수치 연산을 LLM 바깥으로 완전히 빼는 것이 환각을 80% 줄인 결정적 요인이었다. 뉴스 원문을 많이 넣는 것도 처음엔 좋아 보였지만, 중요도 없는 기사까지 포함하면 GPT가 분위기를 과대해석해 오히려 신뢰를 해쳤다. 위험 키워드·긍정 이벤트·불확실 이슈로 사전 분류된 구조적 요약만 넣는 것이 원문 전체보다 나았다. LLM 시스템 설계에서 핵심은 모델 자체가 아니라 모델 앞단의 중간 표현 설계다. 컨텍스트를 잘 설계할수록 LLM이 잘하는 일과 못하는 일이 명확해진다.",
    tags: ["GPT-4", "XGBoost", "KMeans", "SHAP", "SMOTE", "DART API", "Flask", "D3.js"],
    videoUrl: "/finview_demo.mp4",
    thumbBg: "#FFFFFF",
    repoUrl: "https://github.com/cofldus/finview_generative-ai-report",
    repoName: "finview_generative-ai-report",
    archImages: ["/arch/FinView.svg"],
  },
  {
    slug: "ct-mri-cyclegan",
    num: "06",
    title: "CycleGAN 기반 CT→MRI 교차-모달리티 변환",
    period: "2023.06–09 · 딥러닝연구개발소 (한성대학교 단기근무 연구원)",
    goal: "페어 데이터 없이 CT↔MRI 교차 변환 모델을 연구, 부족한 의료 모달리티를 AI로 보완할 수 있는 가능성 탐구 및 논문 기여",
    myRole: "CycleGAN 모델 구현 및 학습 · 데이터 전처리 파이프라인 구축 · FID/SSIM 평가 · 연구원 단기 근무로 논문 작성 참여",
    desc: "CT·MRI 도메인 간 Cycle-Consistency Loss 기반 비지도 교차-모달리티 변환 연구입니다. 임상 환경의 핵심 제약—1:1 Paired 데이터 획득 불가—를 Unpaired Image-to-Image Translation으로 극복하고, Generator·Discriminator 학습 불균형이라는 GAN 고유 불안정성을 실험적으로 탐색·해소했습니다.",
    bullets: [
      "Loss 조합 실험: ResNet-9 + VGG Perceptual Loss + Identity Loss로 저주파 구조(뼈·장기 경계) 보존, Spectral Norm으로 학습 안정성 확보",
      "GAN 학습 불균형 해소: G·D 학습률 분리(2e-4/1e-4) + 업데이트 비율 G:D=2:1 설계로 모드 콜랩스 없이 수렴",
      "정량 평가: SSIM 0.82→0.88(+6.2%p), 해부학적 구조 유실률 30% 감소 · 의료진 맹검 평가 80% '진단 보조 가치 있음'",
    ],
    highlights: [
      { value: "0.88", label: "SSIM" },
      { value: "+6.2%p", label: "SSIM 개선" },
      { value: "80%", label: "의료진 평가" },
    ],
    decisions: [
      {
        tech: "CycleGAN (Unpaired) vs Pix2Pix (Paired)",
        refs: [
          { label: "CycleGAN (Zhu et al., 2017)", url: "https://arxiv.org/abs/1703.10593" },
        ],
        reason:
          "실제 임상에서 동일 환자의 CT와 MRI를 같은 시점에 동시 촬영하는 경우는 거의 없습니다. Paired 데이터셋 구축은 비용과 윤리적 제약이 커서 현실적이지 않았습니다. CycleGAN의 Cycle-Consistency Loss는 페어 없이 두 도메인 간 변환을 학습할 수 있어 임상 제약을 우회하는 유일한 방법이었습니다.",
      },
      {
        tech: "VGG Perceptual Loss 추가",
        refs: [
          { label: "Perceptual Loss (Johnson et al., 2016)", url: "https://arxiv.org/abs/1603.08155" },
          { label: "Spectral Normalization (Miyato et al., 2018)", url: "https://arxiv.org/abs/1802.05957" },
        ],
        reason:
          "Pixel-level L1 Loss만 사용하면 이미지가 전반적으로 블러해지면서 뼈 경계나 장기 윤곽 같은 고주파 구조가 뭉개졌습니다. VGG 중간 레이어의 feature map을 비교하는 Perceptual Loss는 픽셀 단위가 아닌 의미적 구조를 보존합니다. 의료 이미지에서 해부학적 경계 보존은 진단 가치와 직결되기 때문에 이 Loss를 추가하는 것이 핵심이었습니다.",
      },
      {
        tech: "G:D 학습률 분리 및 업데이트 비율 2:1",
        reason:
          "GAN 학습에서 Discriminator가 Generator보다 빠르게 수렴하면 Generator가 Gradient를 받지 못해 모드 콜랩스가 발생합니다. Generator 학습률을 2배 높이고 업데이트 비율도 2:1로 설정해 두 네트워크가 균형 있게 경쟁하도록 조정했습니다. 이 설계 없이는 훈련 초기에 반복적으로 붕괴했습니다.",
      },
    ],
    tags: ["CycleGAN", "ResNet-9", "PatchGAN", "VGG Perceptual Loss", "Spectral Norm", "PyTorch", "OpenCV"],
    repoUrl: "https://github.com/cofldus/medical_image_translation",
    repoName: "medical_image_translation",
    archImages: ["/arch/CT-MRI.svg", "/arch/proj05_arch2.svg"],
  },
  {
    slug: "hunchgame",
    num: "07",
    title: "눈치게임: 위치 기반 인파 분산 서비스",
    period: "성신여자대학교 IT경진대회",
    goal: "축제·행사 시 특정 장소에 인파가 밀집되는 현상을 실시간 위치 데이터로 분산 유도, 안전사고 예방 서비스 구현",
    myRole: "위치 기반 혼잡도 알고리즘 설계 · 게이미피케이션 인센티브 시스템 개발 · 팀 기획 및 발표 리드",
    desc: "압사 사고의 공통 선행 조건은 '군중이 대안을 인지하지 못한 채 단일 지점에 집중된다'는 것입니다. 경고만으로는 부족하고, 사람들이 실제로 이동할 구체적인 대안 장소를 즉시 제시해야 합니다. FP-Growth로 10만 건 이동 로그에서 잠재 이동 패턴을 추출하고, 혼잡도·거리·장소 유사도·시간대 4개 가중치로 개인화 추천을 설계했습니다. 재난 상황의 네트워크 불안정을 고려해 오프라인 SQLite 캐시 아키텍처를 반드시 포함시켰습니다.",
    bullets: [
      "FP-Growth로 10만 건 이동 로그 패턴 분석 → '홍대 방문객 70%는 이태원으로 이동' 등 잠재 이동 연관 규칙 추출",
      "추천 점수 엔진: 혼잡도(40%)·거리(30%)·장소 유사도(20%)·시간대(10%) 정규화 가중치 설계",
      "오프라인 내성: SQLite 기기 내 캐시로 히트맵·추천 오프라인 동작을 보장, 실시간 밀집도 예측 84%·혼잡 회피율 87% 달성",
    ],
    highlights: [
      { value: "84%", label: "밀집도 예측" },
      { value: "87%", label: "혼잡 회피율" },
      { value: "10만건", label: "이동 로그" },
    ],
    decisions: [
      {
        tech: "FP-Growth vs 단순 거리 기반 추천",
        reason:
          "거리만 기준으로 삼으면 가장 가까운 장소를 추천하게 되는데, 현실에서 사람들은 단순 거리가 아니라 목적지 유형·과거 방문 패턴에 따라 이동합니다. FP-Growth로 이동 로그의 연관 규칙을 추출하면 '홍대에 있던 사람들이 실제로 어디로 갔는가'라는 잠재 선호를 데이터에서 직접 뽑을 수 있습니다. 이 패턴이 추천의 설득력을 높였습니다.",
      },
      {
        tech: "SQLite 오프라인 캐시 필수화",
        reason:
          "이 서비스가 가장 필요한 시점은 대규모 이벤트나 비상 상황입니다. 그 순간 네트워크는 폭증하거나 끊길 가능성이 높습니다. 평상시에 히트맵·추천 결과를 기기 내 SQLite에 캐싱해두면, 서버가 응답하지 않아도 마지막 업데이트 상태 기준으로 동작할 수 있습니다. 오프라인 내성은 기능이 아니라 이 서비스의 존재 이유입니다.",
      },
      {
        tech: "4개 가중치 추천 스코어 설계",
        reason:
          "단일 지표로 추천하면 극단적 결과가 나옵니다. 혼잡도만 보면 사막을 추천하고, 거리만 보면 목적이 다른 장소를 추천합니다. 4개 지표를 정규화해 가중합으로 점수를 계산하면 균형 잡힌 후보가 나옵니다. 가중치(혼잡도 40%)는 이 서비스의 핵심 목적이 분산임을 반영했고, 나머지는 이동 수용성을 높이기 위한 보조 지표입니다.",
      },
    ],
    tags: ["FP-Growth", "SQLite", "Python", "위치 API", "히트맵", "추천 엔진"],
    award: "성신여자대학교 IT경진대회 장려상",
    videoUrl: "/hunchgame_demo.mp4",
    repoUrl: "https://github.com/cofldus/hunchgame_density-predict-service",
    repoName: "hunchgame_density-predict-service",
    archImages: ["/arch/HunchGame.svg"],
  },
  {
    slug: "lovelop",
    num: "08",
    title: "lovelop: 상권 분석 AI 시뮬레이션 SaaS",
    period: "2026.02 · AI 자연어처리 집중 과정 3기",
    goal: "GPT-4.1 멀티 에이전트로 실제 상권 데이터를 기반으로 한 B2B 상권 분석 시뮬레이션 SaaS 구현, 창업 의사결정 지원",
    myRole: "LLM Agent 오케스트레이션 설계 · Gemma-2-9b/EXAONE 역할 분담 구조 · Flask API + React 프론트 연동 전 과정",
    desc: "자영업자 15명 현장 인터뷰에서 반복적으로 나온 말은 '예측 정확도보다 내 매장 조건이 바뀌면 어떻게 되는지 미리 보고 싶다'였습니다. 예측 모델이 아닌 시뮬레이션 엔진이 필요했습니다. GPT-4.1을 단일 호출하면 창의성과 신뢰성을 동시에 얻을 수 없어 Temperature를 분리한 2-Stage 구조를 설계했고, 다양한 실제 고객 유형을 재현하기 위해 160개 AI 페르소나가 5단계 Agent 의사결정으로 시나리오를 독립 검증하는 구조를 구축했습니다.",
    bullets: [
      "2-Stage GPT: Temp 0.1 '분석가' 모듈(신뢰성)→ Temp 0.7 '전략가' 모듈(창의성) 순차 처리로 신뢰+창의 동시 확보",
      "160 페르소나 시뮬레이션: 방문 목적 4유형 × 세대 5종 × 성별·인원 구성으로 실제 고객 분포 재현, Agent 5단계 의사결정",
      "Before/After 11지표 검증 리포트로 조건 변경 시나리오를 정량화, 자영업자 사용 의향 80% 확인",
    ],
    highlights: [
      { value: "160명", label: "AI 페르소나" },
      { value: "80%", label: "사용 의향" },
      { value: "11개", label: "검증 지표" },
    ],
    decisions: [
      {
        tech: "2-Stage Temperature 분리 vs 단일 GPT 호출",
        reason:
          "Temperature 0.1에서는 데이터 기반 분석이 정확하지만 전략 제안이 뻔합니다. Temperature 0.7에서는 아이디어가 다양하지만 사실 오류가 섞입니다. 단일 호출로는 두 특성을 동시에 얻을 수 없습니다. 분석가 모듈이 먼저 수치·패턴을 구조화하고, 전략가 모듈이 그 결과를 입력받아 창의적 전략을 제안하도록 순서를 고정했더니 두 가지가 양립됐습니다.",
      },
      {
        tech: "160 AI 페르소나 시뮬레이션",
        reason:
          "상권 분석에서 '고객 반응'을 설문으로 수집하면 샘플 수가 적고 자영업자가 직접 설계하기 어렵습니다. AI 페르소나를 방문 목적·세대·성별·인원 구성의 조합으로 정의하면 실제 고객 분포를 통계적으로 재현할 수 있습니다. 각 페르소나가 5단계 Agent 의사결정(인지→관심→방문검토→결정→재방문)을 거치면 단순 설문보다 행동 패턴이 세밀하게 나왔습니다.",
      },
      {
        tech: "시뮬레이션 엔진 vs 예측 모델",
        reason:
          "예측 모델은 '현재 조건에서 매출이 얼마'를 알려주지만, 자영업자가 실제로 원하는 것은 '영업시간을 늘리면 어떻게 달라지는가'입니다. 조건 변경 시나리오를 정량화하려면 모델이 아니라 시뮬레이션 구조가 필요합니다. 이 차이를 15명 현장 인터뷰에서 발견하고 설계 방향 자체를 바꿨습니다.",
      },
    ],
    tags: ["GPT-4.1", "LLM Agent", "Gemma-2-9b", "EXAONE", "Python", "React", "Flask"],
    videoUrl: "/lovelop_demo.mp4",
    thumbBg: "#FFFFFF",
    repoUrl: "https://github.com/cofldus/lovelop_commerce-agent-simulation",
    repoName: "lovelop_commerce-agent-simulation",
    archImages: ["/arch/lovelop.svg", "/arch/lovelop_step.svg", "/arch/lovelop_lop진단.svg", "/arch/lovelop_lop분석.svg"],
  },
  {
    slug: "llm-for-science",
    num: "09",
    title: "LLM for Science: 과학 도메인 특화 CPT·GDPO 연구",
    period: "Pseudo Lab · 오픈 리서치 커뮤니티 · 진행 중",
    goal: "과학 도메인(arXiv·PubMed) 특화 LLM 개발을 위한 CPT·SFT·GDPO 파이프라인 리서치, 수식·표 무손실 처리 방법론 탐구",
    myRole: "Nougat/Marker 기반 파싱 파이프라인 분석 · CPT/SFT 데이터 생성 구조 스터디 · GDPO 멀티 리워드 RL 실험 참여",
    desc: "과학 도메인 LLM 구축에는 세 개의 독립적인 병목이 있습니다: ① 일반 텍스트 파서가 수식·표를 손실시키는 파싱 문제, ② 도메인 특화 학습이 일반 언어 능력을 훼손하는 Catastrophic Forgetting, ③ 사실 정확도·형식 준수·응답 간결성 세 지표가 동일 보상 스칼라에서 상충하는 보상 붕괴. 이 세 병목을 하나의 파이프라인이 아닌 각기 다른 기술로 타겟팅하는 3단계 연구에 참여 중입니다.",
    bullets: [
      "Phase 1: Nougat/Marker(VLM 파서)로 arXiv·PubMed·OpenStax 수식(LaTeX)·표(Markdown) 무손실 파싱 파이프라인 이해 및 GPT-4o Teacher 기반 SFT 합성 데이터 생성 구조 분석",
      "Phase 2 (Nemotron CPT): 과학 데이터 80~85% / 일반 도메인 15~20% 혼합 전략으로 Catastrophic Forgetting 억제 원리 및 next-token prediction 기반 도메인 지식 주입 실험 참여",
      "Phase 3 (GDPO): Rubric(RaR)·Format·Length 세 보상 신호의 그룹 내 독립 정규화로 보상 붕괴 없이 다차원 정렬을 달성하는 메커니즘 분석 및 실험 중",
    ],
    highlights: [
      { value: "3단계", label: "연구 구조" },
      { value: "CPT", label: "Phase 2" },
      { value: "GDPO", label: "Phase 3" },
    ],
    decisions: [
      {
        tech: "Nougat/Marker VLM 파서 vs 일반 텍스트 파서",
        refs: [
          { label: "Nougat (Blecher et al., 2023)", url: "https://arxiv.org/abs/2308.13418" },
        ],
        reason:
          "arXiv 논문에서 수식을 일반 PDF 텍스트 파서로 추출하면 LaTeX가 깨지거나 누락됩니다. 수식이 손실된 데이터로 학습하면 모델이 과학 표기법을 제대로 배울 수 없습니다. VLM 기반 파서는 이미지로 렌더링된 수식을 인식해 LaTeX로 복원하기 때문에 데이터 품질의 상한이 다릅니다.",
      },
      {
        tech: "과학 80~85% + 일반 15~20% 혼합 CPT 전략",
        reason:
          "과학 데이터만으로 훈련하면 Catastrophic Forgetting이 발생해 기초 언어 능력이 퇴화합니다. 일반 도메인 데이터를 일정 비율로 혼합하면 기존 능력을 유지하면서 과학 지식을 추가로 주입할 수 있습니다. 15~20% 혼합 비율은 Forgetting 억제와 도메인 특화 사이의 실험적 균형점입니다.",
      },
      {
        tech: "GDPO 그룹 내 독립 정규화 vs 단일 보상 스칼라 RLHF",
        reason:
          "사실 정확도·형식 준수·응답 간결성을 단일 스칼라로 합산하면 하나가 올라갈 때 다른 것이 내려가는 보상 붕괴가 발생합니다. GDPO는 각 보상 신호를 그룹 내에서 독립적으로 정규화해 상충을 방지합니다. 세 지표를 동시에 최적화할 수 있어 과학 도메인처럼 형식과 정확도 모두 중요한 태스크에 적합합니다.",
      },
    ],
    tags: ["Nemotron", "CPT", "SFT", "GDPO", "arXiv/PubMed", "Nougat/Marker", "HuggingFace", "Multi-Reward RL", "Python"],
    archImages: ["/arch/llm-for-science.svg"],
  },
  {
    slug: "rocketan",
    num: "10",
    title: "STT 강의 스크립트 퀴즈·학습 가이드 자동 생성기",
    period: "2026.03–04 · 멋쟁이사자처럼 로켓단 인턴십",
    goal: "강의 영상·자료 업로드만으로 퀴즈·학습 가이드를 자동 생성, 강사의 반복 출제 시간을 RAG 파이프라인으로 완전 자동화",
    myRole: "RAG 파이프라인 전체 설계 · FAISS 청크 전략 실험 · LangChain RetrievalQA 체인 구현 · 재현성 확보를 위한 캐싱 레이어 개발",
    desc: "강의 영상과 자료를 업로드하면 핵심 개념 퀴즈와 학습 가이드를 자동으로 생성하는 시스템입니다. 강사가 수업 자료를 반복 정리·출제하는 데 소요하는 시간을 RAG 파이프라인으로 자동화했습니다. FAISS 벡터 검색과 LangChain 기반 체인 설계로 강의 맥락을 정확히 반영한 문제·해설을 생성합니다.",
    bullets: [
      "강의 문서 → FAISS 벡터 인덱싱 → 관련 청크 검색 → LLM 퀴즈·해설 자동 생성 파이프라인 구축",
      "LangChain RetrievalQA 체인으로 강의 맥락 기반 객관식·서술형 혼합 문제 생성, 난이도 조절 프롬프트 설계",
      "학습 가이드 자동 요약: 핵심 개념 추출 → 마인드맵 구조 텍스트로 재구성, 수강생 복습 효율 개선",
    ],
    highlights: [
      { value: "RAG", label: "파이프라인" },
      { value: "FAISS", label: "벡터 검색" },
      { value: "자동화", label: "퀴즈·가이드" },
    ],
    decisions: [
      {
        tech: "RAG vs Fine-tuning",
        reason:
          "인턴십 초반 Fine-tuning 방향도 검토했습니다. 강의 자료로 LLM을 파인튜닝하면 해당 강의 도메인에 특화된 문항을 만들 수 있다는 논리였습니다. 문제는 운영 구조였습니다. 강의는 매 학기 새로 업로드되고 내용도 완전히 달라지는데, Fine-tuning은 새 강의가 들어올 때마다 재학습이 필요합니다. 재학습 비용과 시간이 실제 운영에서 수용 가능한 수준이 아니었습니다. 또한 Fine-tuning은 학습에 사용되지 않은 새 강의 자료에 대한 일반화가 보장되지 않습니다. RAG는 강의 문서를 청크로 분할해 FAISS 인덱스를 구축하면 새 강의는 인덱스 교체만으로 즉시 적응할 수 있고, 재학습 없이 도메인이 달라도 동일한 파이프라인이 작동합니다. 인덱스 구축 시간은 수 분 이내였고, 강의 단위 업데이트가 실제 운영 요구사항에 정확히 맞았습니다.",
      },
      {
        tech: "FAISS 단독 의미 검색 (BM25 미사용)",
        reason:
          "의료 도메인 프로젝트에서 BM25+FAISS 하이브리드를 경험한 뒤, 강의 자료에서도 하이브리드를 먼저 시도했습니다. 그런데 강의 자료는 의학 코퍼스와 특성이 달랐습니다. 의학 코퍼스는 '폐색전증 D-dimer 기준치'처럼 특정 전문 용어의 정확한 매칭이 중요한 반면, 강의 자료는 동일 개념을 강사마다 다른 표현으로 설명하는 경우가 많습니다. '경사하강법', '그레디언트 디센트', 'gradient descent'가 같은 개념을 가리키는 경우처럼, 표면 표현이 달라도 의미가 같은 문단을 찾아야 문항 품질이 올라갑니다. BM25는 표면 단어가 다른 이런 경우에 관련 문단을 놓쳤고, FAISS 의미 검색 단독으로도 문항 완성도가 충분했습니다. 청크 크기와 overlap 설정이 검색 품질에 더 큰 영향을 줬기 때문에, 파이프라인 복잡도를 늘리지 않고 FAISS 단독 + 청크 전략 최적화 방향으로 확정했습니다.",
      },
      {
        tech: "LangChain RetrievalQA 체인",
        reason:
          "초기에는 검색 결과를 직접 프롬프트 문자열에 삽입하는 방식으로 구현했습니다. 기능은 작동했지만 청크 수, 검색 결과 순서, 난이도 지시 등 변수가 하나씩 추가될 때마다 프롬프트 조립 코드 전체를 수정해야 했습니다. 퀴즈 생성, 학습 가이드 요약, 핵심 개념 추출처럼 동작이 다른 여러 기능을 만들면서 프롬프트 코드가 분산되고 일관성이 무너졌습니다. LangChain RetrievalQA는 검색 결과 삽입과 프롬프트 템플릿 관리를 추상화하기 때문에, 기능별로 프롬프트 템플릿만 교체하면 동일한 검색·생성 흐름을 유지할 수 있었습니다. 파이프라인 구조를 코드 레벨에서 일관되게 관리할 수 있게 되면서 실험 반복 속도도 올라갔습니다.",
      },
    ],
    experiments: [
      {
        id: "RK1",
        hypothesis: "청크 크기를 크게 하면 LLM이 더 많은 맥락을 보게 되어 문항 품질이 올라간다",
        result: "청크가 커질수록 LLM이 핵심 개념을 찾지 못하고 무관한 내용을 섞어 문항을 생성했다. 청크 하나의 응집도를 높이는 것이 크기를 늘리는 것보다 효과적이었다.",
        conclusion: "청크 크기 512 → 256 토큰으로 축소, overlap 32 토큰으로 문단 경계 유지",
      },
      {
        id: "RK2",
        hypothesis: "모든 강의 문서를 하나의 FAISS 인덱스로 통합하면 관리가 쉽다",
        result: "다른 강의 자료끼리 의미가 유사한 청크가 검색에 혼입돼 엉뚱한 강의 내용으로 퀴즈가 생성되는 오염이 발생했다.",
        conclusion: "강의별 독립 인덱스로 분리해 수업 단위 네임스페이스 관리 구조로 전환",
      },
      {
        id: "RK3",
        hypothesis: "퀴즈 난이도를 LLM이 자유롭게 판단하면 자연스러운 분포가 나온다",
        result: "LLM이 항상 중간 난이도로 수렴하는 경향이 있었다. 쉬운 문항과 어려운 문항이 거의 생성되지 않아 학습 단계별 활용이 불가능했다.",
        conclusion: "'기초 확인·심화 적용·추론' 3단계 난이도를 프롬프트에 명시적으로 지정하는 구조화 프롬프팅 도입",
      },
    ],
    troubleshooting: [
      "강의 PDF 파싱 시 표와 수식이 깨져 의미 없는 기호 열이 됐다. PyMuPDF 대신 레이아웃 분석을 지원하는 pdfplumber로 교체하고, 수식 포함 셀은 플래그를 달아 퀴즈 생성 대상에서 제외했다.",
      "동일한 질문에 매번 다른 퀴즈가 생성돼 강사 검토·재활용이 불가능했다. temperature를 0.3으로 낮추고 동일 청크 결과를 캐싱하는 레이어를 추가해 재현성을 확보했다.",
      "학습 가이드 요약이 강의 자료를 단순 반복하는 수준에 머물렀다. '핵심 개념 → 이유·원리 → 예시' 순서로 재구성하도록 프롬프트 구조를 명세화하고 출력 형식을 JSON으로 강제했다.",
    ],
    insight: "RAG의 품질은 검색 모델보다 청크 설계에 달려 있다는 것을 배웠습니다. 더 좋은 임베딩 모델을 탐색하는 것보다 청크 크기와 경계 설정을 바꿨을 때 문항 품질이 가장 크게 달라졌습니다. LLM은 좋은 컨텍스트를 주면 알아서 잘 하지만, 나쁜 컨텍스트에서는 프롬프트를 정교하게 짜도 한계가 있었습니다. 또한 자동화 시스템에서 재현성 확보가 실제 사용률에 직결된다는 것을 실감했습니다. 결과가 매번 달라지면 강사가 신뢰하지 않고, 신뢰받지 못하는 도구는 사용되지 않습니다. 기술 완성도보다 사용자가 믿고 쓸 수 있는 일관성이 실용 시스템의 핵심 조건입니다.",
    tags: ["LangChain", "FAISS", "RAG", "Python", "OpenAI API", "LLM"],
    videoUrl: "/rocketan_demo.mp4",
    repoUrl: "https://github.com/orgs/Mutsa-Rocketdan/repositories",
    repoName: "Mutsa-Rocketdan",
    archImages: ["/arch/rocketan.svg"],
  },
  {
    slug: "moim",
    num: "11",
    title: "MOIM: 실시간 채팅 기반 모임 플랫폼",
    period: "2024.12–2025.03 · 경기대학교 LINKVERSE · 팀 프로젝트",
    goal: "약속 잡기의 모든 흐름(장소 검색 → 후보 핀 등록 → 투표 → 확정)을 실시간 채팅 안에서 완결, 외부 앱 전환 없이 모임 성사",
    myRole: "장소 검색 쿼리 스토어 설계(Zustand) · Kakao Maps PinMap 연동 · SSR Hydration 이슈 해결 · 모바일 터치 이벤트 처리",
    desc: "약속 잡기 앱이 있음에도 카카오톡 단톡방으로 돌아가는 이유는 '채팅이 끊기기 때문'입니다. 카카오맵 링크를 공유하고, 투표 링크를 따로 보내고, 다시 채팅으로 돌아오는 컨텍스트 분산이 가장 큰 마찰입니다. MOIM은 장소 검색 → 후보 핀 등록 → 실시간 투표 → 모임 확정 전체 흐름을 채팅 안에서 완결합니다. Next.js 15 App Router + STOMP WebSocket으로 실시간성을 확보하고, Kakao Maps API로 장소 핀 공유를 채팅 메시지와 동일한 인터페이스로 통합했습니다.",
    bullets: [
      "STOMP/WebSocket 기반 실시간 채팅: 채팅 메시지 · 장소 핀 공유 · 투표 현황을 단일 소켓 채널에서 실시간 동기화",
      "Kakao Maps API PinMap: 후보 장소를 지도 핀으로 등록·공유, 투표 결과와 지도 마커를 실시간 연동",
      "Zustand + Next.js 15 App Router: 장소 검색 쿼리 스토어를 SSR Hydration 충돌 없이 클라이언트 전용 초기화로 설계",
    ],
    highlights: [
      { value: "1,124", label: "커밋 수" },
      { value: "STOMP", label: "실시간 채팅" },
      { value: "Kakao Maps", label: "PinMap" },
    ],
    decisions: [
      {
        tech: "Zustand SSR Hydration 이슈 — 클라이언트 전용 초기화",
        reason:
          "Next.js 15 App Router에서 Zustand 스토어를 서버 컴포넌트가 렌더링하는 시점에 접근하면, 서버와 클라이언트의 초기 상태가 달라 Hydration Mismatch가 발생합니다. 장소 검색 쿼리 스토어는 URL 파라미터에서 초기 상태를 읽어와야 하는데, 서버 렌더링 시점에는 window 객체가 없어 초기값이 undefined로 떨어지고 클라이언트 mount 이후 실제 값이 세팅되는 불일치가 생겼습니다. Zustand의 createWithEqualityFn + useShallow 조합으로 shallow 비교를 활성화해 불필요한 리렌더를 줄이고, 스토어 초기화 로직을 useEffect 안에서 클라이언트 전용으로 격리해 서버 렌더링 경로가 스토어를 건드리지 않도록 구조화했습니다. 이후 Hydration 에러가 완전히 사라졌습니다.",
      },
      {
        tech: "Kakao Maps PinMap — 명령형 SDK와 선언형 React 통합",
        reason:
          "채팅 메시지로 장소 핀이 공유되면 지도의 마커가 즉시 업데이트되어야 합니다. Kakao Maps SDK는 명령형 API 구조라 React 선언형 렌더링과 직접 충돌합니다. 마커 인스턴스를 useRef로 관리하고, WebSocket 메시지로 새 핀이 들어올 때 마커를 동적으로 생성·제거하는 명령형 로직을 useEffect 안에 캡슐화했습니다. 지도 인스턴스를 재생성하지 않고 마커만 갱신하는 구조로 화면 깜빡임 없이 실시간 동기화를 달성했습니다. 컴포넌트 언마운트 시 마커 레퍼런스를 정리하는 클린업도 함께 설계해 메모리 누수를 방지했습니다.",
      },
      {
        tech: "모바일 터치 이벤트 — 탭과 스크롤 충돌 분리",
        reason:
          "지도 핀 선택과 채팅 스크롤이 같은 컨테이너에 있어, 모바일에서 touchstart→touchmove 시퀀스가 핀 클릭 이벤트와 충돌했습니다. 일반 onClick은 touchend 이후 300ms 지연이 발생해 반응이 느리고, 스크롤 중 핀이 의도치 않게 선택되는 오작동이 있었습니다. 터치 시작 좌표와 종료 좌표의 이동 거리가 임계값(10px) 이하일 때만 tap으로 처리하는 델타 필터를 구현했습니다. 스크롤 의도와 탭 의도를 좌표 델타로 명확히 분리하자 모바일 환경에서 핀 선택 오작동이 사라졌습니다.",
      },
    ],
    tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "Zustand", "WebSocket/STOMP", "Kakao Maps API", "Docker", "React 19"],
    repoUrl: "https://github.com/cofldus/MOIM-Client",
    repoName: "MOIM-Client",
    readmeImage: "/moim_client_readme.png",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
