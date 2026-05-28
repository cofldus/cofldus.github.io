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
  headline1: "Build the pipeline.",
  headline2: "Verify the output.",
  subtext:
    "도메인 특화 RAG 파이프라인(BM25·FAISS·리랭킹)과 NLP/LLM 서비스를 설계·구현하고, 검색 정확도와 응답 품질을 평가 파이프라인으로 정량 검증합니다.",
  projectOrder: [
    "killkong",                 // 압축·역할분리·병목실측 — 아키텍처 판단 최강
    "medical-chatbot",          // RAG 파이프라인 깊이 + 평가셋 설계
    "korean-noise-restoration", // 태스크 재정의 — 구조적 진단
    "finview",                  // 환각 차단 설계 — LLM 한계 인식
    "lovelop",                  // 창의적 시뮬레이션 구조
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

// ─── 회사 맵 ──────────────────────────────────────────────────────────────────
const companyConfigs: Record<string, CompanyConfig> = {
  archivsoft: archivSoftConfig,
  full: fullConfig,
};

export function getCompanyConfig(company: string | null): CompanyConfig {
  if (company && companyConfigs[company]) {
    return companyConfigs[company];
  }
  return defaultConfig;
}
