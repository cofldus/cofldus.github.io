// ─── Company-specific portfolio configuration ───────────────────────────────
// Usage: cofldus.github.io?company=archivsoft

export interface SkillGroup {
  cat: string;
  core?: string[];
  primary: string[];
  secondary: string[];
}

export interface CompanyConfig {
  id: string;
  /** Hero 상단 라벨 */
  label: string;
  /** 헤드라인 1행 */
  headline1: string;
  /** 헤드라인 2행 */
  headline2: string;
  /** 서브 카피 */
  subtext: string;
  /** 기술 스택 그룹 (undefined = 기본값 사용) */
  skillGroups?: SkillGroup[];
  /** 메인 프로젝트 노출 순서 (slug 배열, undefined = 기본 순서) */
  projectOrder?: string[];
  /** 리서치 섹션에 넣을 slug 목록 */
  researchSlugs?: string[];
}

// ─── Default (generic) ────────────────────────────────────────────────────────
export const defaultConfig: CompanyConfig = {
  id: "default",
  label: "이채연 · AI / NLP Engineer",
  headline1: "문제를 구조로 바꾸고,",
  headline2: "AI를 실제 서비스로.",
  subtext:
    "RAG·LLM·데이터 파이프라인을 설계하며 정확도뿐 아니라 지연시간, 비용, 운영 안정성까지 함께 최적화합니다.",
  projectOrder: [
    "killkong",
    "medical-chatbot",
    "korean-noise-restoration",
    "finview",
    "lovelop",
  ],
  researchSlugs: ["ct-mri-cyclegan"],
};

// ─── Full (전체 버전, ?company=full) ──────────────────────────────────────────
const fullConfig: CompanyConfig = {
  id: "full",
  label: "이채연 · AI / NLP Engineer",
  headline1: "Build the pipeline.",
  headline2: "Prove it works.",
  subtext:
    "도메인 특화 RAG 파이프라인(BM25·FAISS·리랭킹)과 NLP/LLM 서비스를 설계·구현하고, 검색 정확도와 응답 품질을 평가 파이프라인으로 정량 검증합니다.",
  projectOrder: [
    "killkong",
    "finview",
    "medical-chatbot",
    "airpa",
    "lovelop",
    "korean-noise-restoration",
    "hunchgame",
    "rocketan",
    "moim",
  ],
  researchSlugs: ["ct-mri-cyclegan", "llm-for-science"],
};

// ─── 아키브소프트 ─────────────────────────────────────────────────────────────
const archivSoftConfig: CompanyConfig = {
  id: "archivsoft",
  label: "이채연 · LLM · 문서 AI · 패턴인식",
  headline1: "문서를 읽는 것에서",
  headline2: "이해하는 AI로.",
  subtext:
    "LLM 파인튜닝(LoRA·양자화)과 하이브리드 RAG(BM25·FAISS·리랭킹)으로 비정형 문서를 이해·구조화하는 AI 파이프라인을 설계하고, 패턴인식부터 모델 서빙까지 전 과정을 정량 검증합니다.",
  skillGroups: [
    {
      cat: "LLM · 파인튜닝",
      primary: ["LoRA", "4-bit 양자화", "HuggingFace", "KoBART", "KoELECTRA", "Qwen2.5"],
      secondary: ["T5", "Token Pruning", "CPT", "SFT", "온프레미스 LLM 서빙"],
    },
    {
      cat: "RAG · 문서 검색",
      primary: ["LangChain", "FAISS(IVF)", "BM25", "Hybrid Search", "bge-reranker-v2-m3"],
      secondary: ["인덱싱 파이프라인", "평가셋 설계", "청크 전략", "Multi-Agent RAG"],
    },
    {
      cat: "패턴인식 · 비전",
      primary: ["PyTorch", "OpenCV", "CycleGAN", "XGBoost", "JAMO 전처리"],
      secondary: ["ResNet-9", "Spectral Norm", "SHAP", "KMeans", "Scikit-learn"],
    },
    {
      cat: "자동화 파이프라인",
      primary: ["FastAPI", "Docker", "UiPath RPA", "PostgreSQL"],
      secondary: ["Redis", "Flask", "SQLite", "ETL 파이프라인"],
    },
    {
      cat: "자격증 · 어학",
      primary: ["빅데이터분석기사 (2025.12)", "ADsP (2026.03)", "OPIc IH (2025.08)"],
      secondary: [],
    },
  ],
  projectOrder: ["killkong", "finview", "airpa", "medical-chatbot", "korean-noise-restoration"],
  researchSlugs: ["ct-mri-cyclegan"],
};

// ─── 금융권 제출용 ────────────────────────────────────────────────────────────
const financeConfig: CompanyConfig = {
  id: "finance",
  label: "이채연 · 신뢰 가능한 AI 서비스를 설계합니다",
  headline1: "수치는 검증하고,",
  headline2: "AI는 해설만.",
  subtext:
    "공식 데이터 기반 수치 계산과 LLM 해설을 분리해 환각을 차단하고, 검증 가능한 AI 서비스 구조를 설계합니다. 금융·의료·법률처럼 신뢰성이 핵심인 현장에 바로 적용 가능한 파이프라인을 구축해왔습니다.",
  projectOrder: [
    "finview",
    "medical-chatbot",
    "killkong",
    "airpa",
    "korean-noise-restoration",
  ],
  researchSlugs: ["ct-mri-cyclegan", "llm-for-science"],
};

// ─── AI/NLP 제출용 ────────────────────────────────────────────────────────────
const aiNlpConfig: CompanyConfig = {
  id: "ainlp",
  label: "이채연 · AI / NLP Engineer",
  headline1: "문제를 구조로 바꾸고,",
  headline2: "AI를 실제 서비스로.",
  subtext:
    "RAG·LLM·NLP 파이프라인을 설계하며 정확도뿐 아니라 지연시간, 비용, 운영 안정성까지 함께 최적화합니다. 태스크 재정의부터 아키텍처 설계, 정량 평가까지 전 과정을 직접 수행합니다.",
  projectOrder: [
    "medical-chatbot",
    "korean-noise-restoration",
    "killkong",
    "rocketan",
    "lovelop",
    "airpa",
  ],
  researchSlugs: ["ct-mri-cyclegan", "llm-for-science"],
};

// ─── 제조/IT 제출용 ───────────────────────────────────────────────────────────
const manufacturingConfig: CompanyConfig = {
  id: "manufacturing",
  label: "이채연 · 데이터 파이프라인 · AI 자동화",
  headline1: "반복 업무를 자동화하고,",
  headline2: "AI로 의사결정을 지원합니다.",
  subtext:
    "RPA·데이터 파이프라인·시뮬레이션 엔진으로 제조·운영 현장의 반복 업무를 자동화하고, AI 결과의 신뢰성을 정량 검증합니다.",
  projectOrder: [
    "airpa",
    "lovelop",
    "finview",
    "hunchgame",
    "killkong",
  ],
  researchSlugs: ["ct-mri-cyclegan", "llm-for-science"],
};

// ─── 회사 맵 ──────────────────────────────────────────────────────────────────
const companyConfigs: Record<string, CompanyConfig> = {
  archivsoft: archivSoftConfig,
  full: fullConfig,
  finance: financeConfig,
  ainlp: aiNlpConfig,
  manufacturing: manufacturingConfig,
};

export function getCompanyConfig(company: string | null): CompanyConfig {
  if (company && companyConfigs[company]) {
    return companyConfigs[company];
  }
  return defaultConfig;
}
