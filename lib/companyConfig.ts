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
  /** Hero 대표 지표 3개 */
  metrics?: { value: string; label: string }[];
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
  label: "AI / NLP Engineer",
  headline1: "이채연",
  headline2: "AI / NLP Engineer",
  subtext:
    "문서 AI, 검색·RAG, LLM 최적화 프로젝트를 개발했습니다.\n현재 문서 인식 엔진의 정확도 개선 업무를 하고 있습니다.",
  metrics: [
    { value: "34.1% → 91.7%", label: "문서 AI 항목 추출" },
    { value: "2.3s → 0.47s", label: "온디바이스 응답" },
    { value: "BERTScore +0.16", label: "의료 RAG" },
  ],
  projectOrder: [
    "doc-extraction",           // 문서 AI 실무 — 진단 체계·합성 벤치마크·GT 감사
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
  label: "AI / NLP Engineer",
  headline1: "이채연",
  headline2: "AI / NLP Engineer",
  subtext:
    "문서 AI, 검색·RAG, LLM 최적화 프로젝트를 개발했습니다.\n현재 문서 인식 엔진의 정확도 개선 업무를 하고 있습니다.",
  metrics: [
    { value: "34.1% → 91.7%", label: "문서 AI 항목 추출" },
    { value: "2.3s → 0.47s", label: "온디바이스 응답" },
    { value: "BERTScore +0.16", label: "의료 RAG" },
  ],
  projectOrder: [
    "doc-extraction",
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
  label: "AI / NLP Engineer",
  headline1: "이채연",
  headline2: "AI / NLP Engineer",
  subtext:
    "문서 AI와 검색·RAG 파이프라인을 개발했습니다.\n현재 문서 인식 엔진의 정확도 개선 업무를 하고 있습니다.",
  metrics: [
    { value: "34.1% → 91.7%", label: "문서 AI 항목 추출" },
    { value: "14GB → 3.0GB", label: "LLM 경량화" },
    { value: "BERTScore +0.16", label: "의료 RAG" },
  ],
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
