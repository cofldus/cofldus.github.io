// ─────────────────────────────────────────────────────────────────
// 홈 화면 콘텐츠 (프로젝트 외). UI 컴포넌트는 이 파일의 데이터만 그린다.
//
// 원칙
// - 확인된 사실만 쓴다. 확인되지 않은 항목은 화면에 내지 않고 TODO 로 남긴다.
// - 고객사명·내부 시스템 구조·내부 수치는 공개하지 않는다 (익명화).
// ─────────────────────────────────────────────────────────────────

export const site = {
  name: "이채연",
  nameEn: "Chaeyeon Lee",
  url: "https://cofldus.github.io",
  title: "이채연 — Applied AI Engineer · Document Intelligence",
  description:
    "비정형 문서 이해부터 OCR·VLM 기반 정보 추출, RAG 검색 품질 평가, AI 서비스 구현까지 연결하는 Applied AI Engineer 이채연의 포트폴리오.",
  resumeUrl: "/resume_v1.html",
  githubUrl: "https://github.com/cofldus",
};

// ─── Hero ────────────────────────────────────────────────────────
export const hero = {
  eyebrow: "Applied AI Engineer · Document Intelligence",
  headline: ["문서를 이해하고,", "신뢰할 수 있는 AI 시스템으로 연결합니다."],
  sub: "비정형 데이터 이해부터 OCR·VLM 기반 정보 추출, RAG 검색 품질 개선, AI 서비스 구현까지 연결하는 엔지니어입니다.",
  focus: [
    { label: "Document AI", href: "#cap-document" },
    { label: "RAG & Evaluation", href: "#cap-retrieval" },
    { label: "AI Backend", href: "#cap-systems" },
  ],
  /** 첫 방문자가 먼저 볼 프로젝트 */
  startHere: { label: "금융 증빙서류 Document AI", href: "/projects/doc-extraction" },
};

// ─── Selected Work ───────────────────────────────────────────────
/** 대표 프로젝트 3개. 나머지는 More Projects 로 간다. */
export const selectedSlugs = ["doc-extraction", "medical-chatbot", "killkong"];

/** More Projects 노출 순서 (여기 없는 프로젝트도 뒤에 자동으로 붙는다) */
export const moreOrder = [
  "korean-noise-restoration",
  "finview",
  "lovelop",
  "ct-mri-cyclegan",
  "llm-for-science",
  "rocketan",
  "airpa",
  "hunchgame",
  "moim",
];

// ─── Professional Experience ─────────────────────────────────────
export interface ExperienceItem {
  company: string;
  /** 회사 성격 한 줄 */
  companyNote?: string;
  /** 직함. 확인되지 않았으면 비워 둔다 (화면에는 area 만 보인다). */
  role?: string;
  /** 담당 문제 영역 */
  area: string;
  period: string;
  current?: boolean;
  summary: string;
  /** 주요 업무 — 본인이 직접 수행한 범위만 */
  points: string[];
  links?: { label: string; href: string }[];
  tech?: string[];
}

export const experience: ExperienceItem[] = [
  {
    company: "아키브소프트",
    companyNote: "문서 AI 기업",
    // TODO(확인 필요): 직함·고용 형태. 볼트·이력서 어디에도 기록이 없어 비워 둠.
    area: "Document AI · 문서 검색 엔진",
    period: "2026.07 – 현재",
    current: true,
    summary:
      "금융·공공기관 문서를 처리하는 OCR·VLM 추출 엔진과 문서 검색 엔진의 품질을 측정하고, 측정 결과를 근거로 구조와 설정을 바꾸는 일을 합니다.",
    points: [
      "금융 공공기관 증빙서류 추출 엔진의 단계별 손실 측정 체계와 정답 좌표가 포함된 합성 테스트셋을 만들고, 측정 결과를 근거로 VLM 기반 추출로 전환",
      "처음 보는 서식을 억지로 분류하지 않고 '미등록'으로 돌려주는 open-set 서식 분류기 설계",
      "개인정보 문서 처리 기준 수립: 마스킹된 값은 인쇄된 그대로 두고, 가려진 칸은 빈값으로 반환하며, 원문은 변경하지 않음",
      "기관 담당자용 백오피스 검수 화면의 원칙 수립: 담당자가 고친 값은 어떤 재처리에도 보존",
      "공공기관 문서 검색 엔진에서 Dense 단독 검색을 BM25 결합 Hybrid 검색으로 전환하고, 개발용과 최종 시험용 골든셋을 분리해 평가",
    ],
    // TODO(확인 필요): ROI 기반 템플릿 처리, 개인정보 탐지 모델 구현, FastAPI 백오피스 구현 중
    //   본인이 직접 구현한 범위. 확인 전까지 화면에 쓰지 않는다.
    // TODO(회사 확인 필요): 검색 엔진·서식 분류기의 내부 수치 공개 여부.
    tech: ["Qwen-VL", "vLLM", "PaddleOCR", "BM25 · Dense Hybrid"],
    links: [{ label: "Case Study: 증빙서류 추출 정확도 개선", href: "/projects/doc-extraction" }],
  },
  {
    company: "멋쟁이사자처럼",
    companyNote: "로켓단 인턴십",
    role: "인턴",
    area: "LLM 애플리케이션 · RAG",
    period: "2026.03 – 2026.04",
    summary: "강의 자료를 근거로 퀴즈와 학습 가이드를 생성하는 RAG 기반 도구를 개발했습니다.",
    points: [
      "강의 문서를 FAISS로 인덱싱하고, 검색된 청크를 근거로 퀴즈·해설을 생성하는 RAG 파이프라인 설계와 청크 전략 실험",
    ],
    tech: ["LangChain", "FAISS", "pdfplumber"],
    links: [{ label: "Case Study", href: "/projects/rocketan" }],
  },
  {
    company: "(주)딥러닝연구개발 · 한성대학교",
    companyNote: "단기 연구원",
    role: "연구원",
    area: "의료 영상 AI",
    period: "2023.06 – 2023.09",
    summary: "CT 영상을 MRI 영상으로 변환하는 교차 모달리티 생성 모델을 연구하고 논문을 작성했습니다.",
    points: ["Paired 데이터 없이 학습하는 CycleGAN 모델 구현·학습, 데이터 전처리, FID/SSIM 평가, 논문 작성 참여"],
    tech: ["CycleGAN", "PyTorch", "DICOM"],
    links: [{ label: "Case Study", href: "/projects/ct-mri-cyclegan" }],
  },
];

// ─── Core Capabilities ───────────────────────────────────────────
export interface Capability {
  id: string;
  title: string;
  keywords: string;
  /** 해결할 수 있는 문제 */
  problems: string[];
  /** 검증 가능한 대표 경험 (링크) */
  evidence: { label: string; detail: string; href: string }[];
}

export const capabilities: Capability[] = [
  {
    id: "cap-document",
    title: "Document Understanding",
    keywords: "OCR · VLM · Layout Analysis · Structured Extraction",
    problems: [
      "서식마다 배치가 다른 문서에서 필요한 항목을 구조화 데이터로 추출",
      "추출 오류가 위치 탐지·글자 인식·항목 연결 중 어디서 생기는지 분리해 측정",
      "개인정보 문서에서 원문과 마스킹 값을 바꾸지 않는 처리 기준 설계",
    ],
    evidence: [
      { label: "금융 증빙서류 추출", detail: "34.1% → 91.7% · 합성 테스트셋 기준", href: "/projects/doc-extraction" },
      { label: "아키브소프트 실무", detail: "서식 분류 · 개인정보 처리 기준", href: "#experience" },
      { label: "한글 난독화 복원", detail: "자모 단위 전처리 · 분기형 복원", href: "/projects/korean-noise-restoration" },
    ],
  },
  {
    id: "cap-retrieval",
    title: "Retrieval & Language Models",
    keywords: "LLM · RAG · Hybrid Search · Reranking · Evaluation",
    problems: [
      "단일 검색 방식이 놓치는 근거 문서를 하이브리드 검색과 재정렬로 회수",
      "개발용과 최종 시험용 평가셋을 분리해 검색·응답 품질을 검증",
      "LoRA·양자화로 도메인 LLM을 제한된 실행 환경에 맞춤",
    ],
    evidence: [
      { label: "의료 문서 Hybrid RAG", detail: "서술형 BERTScore 0.731 → 0.886 · 벡터 검색 단독 대비", href: "/projects/medical-chatbot" },
      { label: "KillKong", detail: "LoRA · 4-bit 양자화 · 검색 메모리 분리", href: "/projects/killkong" },
      { label: "공공기관 문서 검색 (실무)", detail: "Dense → Hybrid 전환 · 골든셋 분리 평가", href: "#experience" },
    ],
  },
  {
    id: "cap-systems",
    title: "AI Systems Engineering",
    keywords: "Python · FastAPI · Model Serving · Optimization · Data Pipelines",
    problems: [
      "프로파일링으로 지연 병목을 먼저 찾고 해당 구간만 최적화",
      "추론 서버 설정을 스윕 실험으로 확정하고 조건과 함께 기록",
      "학습·추론의 메모리 문제를 원인별로 분리해 해결",
    ],
    evidence: [
      { label: "KillKong 병목 분석", detail: "cProfile 측정 후 검색 인덱스 HNSW → IVF 전환", href: "/projects/killkong" },
      { label: "추론 설정 스윕", detail: "출력 토큰 상한 1,100 → 4,096 단계 측정", href: "/projects/doc-extraction" },
      { label: "GPU 메모리 디버깅", detail: "27.16GB → 12.2GB · 원인 3가지 분리", href: "/projects/doc-extraction" },
    ],
  },
];

/** 핵심 분야와 직접 관계없는 보조 기술 */
export const supportingTools = [
  "PyTorch", "HuggingFace", "LangChain", "Docker", "SQLite", "PostgreSQL",
  "Flask", "React · Next.js", "TypeScript", "D3.js",
];

// ─── Background ──────────────────────────────────────────────────
export interface BackgroundRow {
  title: string;
  org?: string;
  period: string;
}

export const education: BackgroundRow[] = [
  // TODO(확인 필요): 2026-10 기준 졸업 여부. 원본 표기 그대로 유지.
  { title: "AI융합학부", org: "성신여자대학교", period: "2026.08 졸업 예정" },
];

export const research: BackgroundRow[] = [
  {
    title: "Scientific LLM · CPT · SFT · GDPO 리서치",
    org: "가짜연구소 (Pseudo Lab) 12기 러너 · 오픈 리서치 커뮤니티",
    period: "2026.03 – 진행 중",
  },
  {
    title: "정부지원 사업 Pre-TIPS 최종 합격 · 프로젝트 'MOIM' 개발",
    org: "중소벤처기업부",
    period: "2025.01",
  },
];

export const awards: BackgroundRow[] = [
  { title: "AI 프로젝트 대회 장려상 (KillKong)", org: "포스코 인재창조원", period: "2025.08" },
  { title: "Bias-A-Thon Track 2 리더보드 3위", org: "성균관대 지능형멀티미디어연구센터 · 딥페이크연구센터", period: "2025.05" },
  { title: "AiRPA 해커톤 특별상", org: "한국지능정보사회진흥원", period: "2023.11" },
  { title: "소프트웨어 경진대회 장려상", org: "성신여자대학교", period: "2023.09" },
  { title: "학생창업경진대회 A등급", org: "교육부 · 연세대학교", period: "2022.08" },
];

export const certifications: BackgroundRow[] = [
  { title: "ADsP (데이터분석 준전문가)", org: "한국데이터산업진흥원", period: "2026.03" },
  { title: "빅데이터분석기사", org: "한국데이터산업진흥원", period: "2025.12" },
  { title: "OPIc IH", org: "ACTFL", period: "2025.08" },
];

export const training: BackgroundRow[] = [
  { title: "AI NLP 엔지니어 집중과정 3기 수료", org: "멋쟁이사자처럼", period: "2025.12 – 2026.02" },
  { title: "청년 AI·BigData 아카데미 30기 수료", org: "포스코 인재창조원", period: "2025.06 – 2025.08" },
  { title: "정보보안과정 수료", org: "Microsoft", period: "2024.10" },
  { title: "MQL 데이터 기반 B2B 영업 기회 창출 예측 모델 개발", org: "LG Aimers 4기 · LG AI Research", period: "2024.01 – 2024.02" },
  { title: "Phase 1 수료", org: "LG Aimers 3기 · LG AI Research", period: "2023.08" },
  { title: "스마트공장 제품 품질 상태 분류 AI 모델 개발", org: "LG Aimers 2기 · LG AI Research", period: "2023.01 – 2023.02" },
];

// ─── Contact ─────────────────────────────────────────────────────
export const contact = {
  lead: "Applied AI Engineer · Document AI · LLM/RAG 포지션 관련 연락을 받고 있습니다.",
  email: "lcylcy3816@naver.com",
  links: [
    { label: "GitHub", href: "https://github.com/cofldus", external: true },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/chaeyeon-lee-113698274", external: true },
    { label: "Blog", href: "https://velog.io/@miainflorence", external: true },
    { label: "Resume", href: "/resume_v1.html", external: false },
  ],
};
