// ─────────────────────────────────────────────────────────────────
// AI Research 지원용 페이지 (/krafton/) 콘텐츠. 회사명은 화면에 내지 않는다.
//
// 원칙 (lib/profile.ts 와 같음)
// - 확인된 사실만 쓴다. 에이전트 시뮬레이션 수치 출처는 khai-likelion/agent-sim README,
//   나머지 프로젝트 수치는 lib/projects.ts.
// ─────────────────────────────────────────────────────────────────

import type { DecisionRecord, KeyResult } from "./projects";

export const kraftonHero = {
  eyebrow: "이채연 · LLM Agent · Evaluation",
  headline: ["그럴듯한 답보다,", "상황에 맞는 행동을."],
  sub: "LLM 에이전트가 말이 아니라 행동으로 상황을 이해하게 만드는 일, 그리고 그 행동이 맞는지 측정하는 방법에 관심이 있습니다. 160명의 에이전트가 실제 상권에서 매장을 고르는 시뮬레이션에서 기억·의사결정 구조와 통제된 비교 실험을 설계했습니다.",
};

// ─── 대표 연구 사례 ──────────────────────────────────────────────
export const agentSim = {
  title: "망원동 상권 에이전트 시뮬레이션",
  subtitle: "160명의 생성형 에이전트로 가게 전략의 효과와 역효과를 실행 전에 비교",
  period: "2026.02 · 멋쟁이사자처럼 AI 자연어처리 과정 · 팀 프로젝트",
  repoUrl: "https://github.com/khai-likelion/agent-sim",
  thumb: "/lovelop_thumb.png",
  role: "에이전트 의사결정·기억 구조 설계 · 전·후 비교 실험 설계",
  stack: ["Gemini 2.5 Flash Lite", "asyncio", "OSMnx", "Streamlit"],
  videoUrl: "/lovelop_demo.mp4",
  problem:
    "자영업자가 메뉴·가격·운영을 바꾸기 전에 손님 반응을 미리 보고 싶어 했습니다. 실제 상권 데이터(매장 721개) 위에서 가상 손님이 직접 매장을 고르게 했더니, 초기 에이전트는 거리·가격을 무시하거나 이전 방문과 무관하게 선택했습니다. 말은 그럴듯했지만 행동은 사람 같지 않았습니다.",
  highlights: [
    { value: "160명", label: "LLM 에이전트", condition: "상주 47 + 유동 113 · 세대 5 × 방문 목적 4" },
    { value: "5단계", label: "의사결정 루프", condition: "외식 여부 → 업종 → 매장 → 평가 → 다음 행동" },
    { value: "11개", label: "전·후 비교 지표", condition: "역효과 위험도 0~100 자동 진단 포함" },
  ] satisfies KeyResult[],
  /** 타임슬롯(아침·점심·저녁·야식)마다 도는 의사결정 단계 */
  steps: [
    { name: "Step 1 · 외식 여부", detail: "LLM이 오늘 상황과 기억을 보고 판단" },
    { name: "Step 2 · 업종", detail: "시간대별 업종 후보에서 선택" },
    { name: "Step 3 · 매장", detail: "반경 내 후보(계층화 샘플링)에서 1곳" },
    { name: "Step 4 · 평가", detail: "평점·태그·한 줄 리뷰 → 기억에 저장" },
    { name: "Step 5 · 다음 행동", detail: "카페 등 매장 방문이면 Step 3으로 (최대 3회)" },
  ],
};

/** 에이전트 행동 설계 — Problem → Options → Decision → Trade-off → Validation */
export const agentDecisions: DecisionRecord[] = [
  {
    title: "기억: 이전 경험이 다음 선택을 바꾸게 하기",
    problem: "에이전트가 어제 실망한 가게를 오늘 또 고르는 등, 매번 처음 보는 것처럼 선택했습니다.",
    options: ["프롬프트에 \"이전 경험을 고려하라\"는 지시 추가", "방문 기록을 구조화해 판단 입력으로 직접 전달"],
    decision:
      "Stanford Generative Agents(Park et al., 2023)의 기억 구조를 참고해, 당일 식사 기록과 과거 방문의 평점·코멘트를 memory_context로 매 판단에 전달했습니다.",
    tradeoff: "기억이 쌓일수록 입력이 길어집니다. 매장 리뷰가 10개 쌓이면 LLM으로 요약해 장기 기억으로 넘겼습니다.",
    validation: "재방문율 지표(유지·신규·이탈 인원)로 기억이 실제 행동 차이로 이어지는지 확인했습니다.",
  },
  {
    title: "단계 분해: 어디서 틀렸는지 보이게 하기",
    problem: "한 번의 응답으로 하루 행동을 정하면, 이상한 결과가 나와도 어느 판단이 틀렸는지 알 수 없습니다.",
    options: ["한 번의 호출로 하루 일정 생성", "외식 여부부터 다음 행동까지 단계별 호출"],
    decision:
      "외식 여부 → 업종 → 매장 → 평가 → 다음 행동의 5단계로 나누고, 매장 방문 행동이 나오면 Step 3~5를 최대 3회 반복하게 했습니다. 외식 여부도 고정 확률 대신 LLM 판단으로 바꿨습니다.",
    tradeoff: "호출 수가 크게 늘어납니다(90일 전·후 비교 기준 약 6만 5천 회). 아래 자원 관리로 대응했습니다.",
    validation: "모든 단계의 선택이 visit_log에 남아, 이상 행동을 단계 단위로 추적할 수 있습니다.",
  },
  {
    title: "선택지 설계: 인기 매장 쏠림과 순서 편향 막기",
    problem: "후보를 그대로 주면 유명한 가게나 목록 앞쪽 가게로 선택이 몰렸습니다.",
    options: ["평점 상위 N개만 제시", "전체 무작위 제시", "등급별 계층화 샘플링"],
    decision:
      "상·중·하 등급에서 각 20개를 Softmax(T=0.5)로 샘플링하고 순서를 섞었습니다. 실제 보행로(OSMnx, 반경 2km)를 쓰고 한강 위 노드를 제거해 걸어갈 수 없는 경로도 막았습니다.",
    tradeoff: "인기 매장의 선택 확률을 일부 낮추는 대신, 롱테일 매장도 선택될 기회를 얻습니다.",
    validation: "시장 점유율과 경쟁 매장 TOP 5 비교 지표로 선택 분포를 점검했습니다.",
  },
  {
    title: "통제된 비교: 전략 효과를 과장하지 않기",
    problem: "LLM 에이전트는 실행마다 행동이 달라서, 전·후 차이가 전략 때문인지 우연인지 구분하기 어렵습니다.",
    options: ["전략 적용 후 결과만 보고", "같은 에이전트·같은 상권에서 매장 데이터만 바꿔 전·후 실행"],
    decision:
      "StrategyBridge가 전략 문서를 읽어 매장 데이터 4개 필드만 수정하고, 나머지 조건은 그대로 둔 채 전·후를 실행했습니다. 매장 점수 변화는 전략당 ±0.10, 누적 ±0.20으로 제한했습니다.",
    tradeoff: "전략 효과가 작게 나올 수 있지만, 과장된 \"개선\"을 막습니다.",
    validation: "방문 수·세대별 증감·재방문율 등 11개 지표와 역효과 위험도(0~100)로 결과를 판단했습니다.",
  },
];

// ─── 자원 관리 ───────────────────────────────────────────────────
export const resource = {
  lead: "에이전트 수 × 일수 × 단계만큼 LLM 호출이 늘어납니다. 반복 실험이 가능하려면 시간과 비용을 먼저 관리해야 했습니다.",
  results: [
    { value: "27시간 → 81분", label: "90일 전·후 비교 실행 시간", condition: "순차 실행 대비 · 동시 호출 20개" },
    { value: "약 6.5만 회", label: "1회 비교 실험의 LLM 호출", condition: "160명 × 90일 × 전·후" },
    { value: "약 8,000원", label: "1회 비교 실험 예상 비용", condition: "Gemini 2.5 Flash Lite 기준" },
  ] satisfies KeyResult[],
  points: [
    "asyncio + Semaphore로 동시 호출을 20개로 제한해, API 한도를 넘지 않으면서 추가 인프라 없이 약 20배 단축",
    "모델 벤치마크로 GPT-4o-mini 대비 비용 33%↓·속도 25%↑인 Gemini 2.5 Flash Lite를 기본 모델로 선택 (리뷰 품질 비교 포함)",
    "리뷰 10개 누적 시 요약해 장기 기억으로 넘겨, 기억은 유지하면서 입력 길이를 관리",
  ],
};

// ─── 다른 작업 ───────────────────────────────────────────────────
/** 에이전트·학습·평가와 가까운 순서. 상세는 /projects/{slug}/ */
export const supporting = [
  {
    slug: "killkong",
    thumb: "/killkong_thumb.png",
    meta: "팀 프로젝트 · 2025.07–08",
    title: "실시간 교정 에이전트의 경량화와 지연 최적화",
    desc: "14GB 모델을 LoRA·4-bit 양자화·토큰 Pruning 조합으로 3.5GB까지 줄이고, 지연 병목을 먼저 측정해 개인화 메모리 검색 경로를 다시 설계했습니다.",
    stack: "LoRA · 4-bit · FAISS 메모리",
  },
  {
    slug: "llm-for-science",
    thumb: "/arch/llm-for-science.svg",
    meta: "연구 · Pseudo Lab · 진행 중",
    title: "과학 추론 LLM의 다중 보상 강화학습",
    desc: "정확도·형식·길이를 하나의 보상으로 합치면 서로 충돌해, 보상을 따로 정규화하는 GDPO 실험에 참여하고 있습니다.",
    stack: "CPT · SFT · GDPO",
  },
  {
    slug: "doc-extraction",
    thumb: "/doc-extraction_thumb.png",
    meta: "기업 실무 · 아키브소프트",
    title: "문서 AI 추출 엔진의 단계별 손실 측정",
    desc: "최종 정확도 대신 단계마다 손실을 분리해 측정하는 평가셋을 만들고, 그 결과로 VLM 기반 추출로 전환해 34.1% → 91.7%.",
    stack: "OCR · VLM · 평가셋 설계",
  },
  {
    slug: "korean-noise-restoration",
    thumb: "/korean-noise-restoration_thumb.png",
    meta: "2026.01 · AI 자연어처리 과정",
    title: "한글 난독화 복원",
    desc: "모든 변형을 한 모델로 풀지 않고 변형 유형을 먼저 분류한 뒤 유형별 복원 모델로 분기해 BERTScore 0.9812.",
    stack: "KoELECTRA · KoBART",
  },
  {
    slug: "medical-chatbot",
    thumb: "/medical-chatbot_thumb.png",
    meta: "팀 프로젝트",
    title: "의료 문서 검색 RAG",
    desc: "BM25·FAISS 하이브리드 검색과 Cross-Encoder 재정렬을 설계하고, 평가셋 편향을 교정해 서술형 BERTScore +0.16.",
    stack: "BM25 · FAISS · Reranker",
  },
  {
    slug: "ct-mri-cyclegan",
    thumb: "/arch/ct-mri-result.png",
    meta: "연구 · 딥러닝연구개발소",
    title: "CT→MRI 교차 모달리티 변환",
    desc: "짝지어진 데이터 없이 CycleGAN으로 학습해 구조 보존 성능을 SSIM 0.82 → 0.88로 개선했습니다.",
    stack: "PyTorch · CycleGAN",
  },
];
