"use client";

import { motion } from "framer-motion";
import { useCompany } from "@/context/CompanyContext";

interface Project {
  slug: string;
  num: string;
  title: string;
  period: string;
  desc: string;
  bullets: string[];
  highlights: { value: string; label: string }[];
  tags: string[];
  award?: string;
  repoUrl?: string;
  repoName?: string;
  videoUrl?: string;
  youtubeId?: string;
  thumbBg?: string;
  thumbAutoHeight?: boolean;
}

const projects: Project[] = [
  {
    slug: "airpa",
    num: "01",
    title: "교육 정보 자동 수집·요약 기반 개인화 진로 탐색 시스템",
    period: "한국지능정보사회진흥원 해커톤",
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
    tags: ["UiPath RPA", "Python", "HuggingFace T5", "TF-IDF", "Excel 자동화"],
    award: "한국지능정보사회진흥원 해커톤 특별상",
    videoUrl: "/airpa_demo.mp4",
    thumbBg: "#FFFFFF",
  },
  {
    slug: "medical-chatbot",
    num: "02",
    title: "의학 코퍼스 하이브리드 RAG 질의응답 시스템",
    period: "멋쟁이사자처럼 AI 자연어처리 집중과정 · 팀 프로젝트",
    desc: "Naive RAG의 구조적 한계(단일 벡터 검색은 전문 의학 용어의 Recall 상한이 낮고, 검색된 문서 전부를 컨텍스트에 넣으면 LLM이 노이즈에 흔들린다)를 2단계 아키텍처로 정밀 해소했습니다. BM25가 용어 매칭 정확도를, FAISS가 의미적 유사성을 보완하고, bge-reranker가 최종 후보를 질문-문서 정합성 기준으로 Top-5로 압축해 LLM이 받는 컨텍스트 품질을 최대화했습니다. 5.5만 건 전문 의학 JSON(약 2.2억 토큰)을 처리한 코퍼스 기반 시스템입니다.",
    bullets: [
      "하이브리드 Retrieval 파이프라인: BM25(Lexical, k=20) + FAISS 벡터 인덱싱(Semantic, k=20) 병렬 검색으로 전문 의학 용어 Recall 상한 제거",
      "BAAI/bge-reranker-v2-m3 리랭킹: 40개 후보→Top-5 압축으로 LLM 컨텍스트 노이즈 최소화",
      "직접 설계한 평가셋(의학 QA 100문항, 전공자 1인 검수) 기반 ReRanker 전후 비교: 객관식 Accuracy +0.04, 서술형 BERTScore +0.16 향상",
    ],
    highlights: [
      { value: "+0.04", label: "Accuracy" },
      { value: "+0.16", label: "BERTScore" },
      { value: "5.5만건", label: "코퍼스" },
    ],
    tags: ["EXAONE-3.5", "BM25", "FAISS", "RAG", "bge-reranker-v2-m3", "LangChain", "Python"],
    videoUrl: "/medical-chatbot_demo.mp4",
    repoUrl: "https://github.com/cofldus/medical-chatbot_aegis-bio-sentinels",
    repoName: "medical-chatbot_aegis-bio-sentinels",
  },
  {
    slug: "korean-noise-restoration",
    num: "03",
    title: "한국어 변형 텍스트 원문 복원 AI",
    period: "2026.01 · AI 자연어처리 집중 과정 3기",
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
    tags: ["KoBART", "KoELECTRA", "JAMO", "Noise Classifier", "PyTorch", "HuggingFace"],
    videoUrl: "/korean-noise-restoration_demo.mp4",
    repoUrl: "https://github.com/cofldus/korean-noise-restoration",
    repoName: "korean-noise-restoration",
  },
  {
    slug: "killkong",
    num: "04",
    title: "맥락 기반 콩글리쉬 LLM 교정 에이전트: ARM CPU 실시간 추론을 위한 76% 압축·역할 분리",
    period: "2025.07–08 · 포스코 AI·BigData 아카데미 30기",
    desc: "'블랙 컨슈머', 'after 신청'처럼 한국인 특화 콩글리쉬는 GPT 학습 분포에서 극히 희소해 교정 품질이 불안정합니다. 온디바이스 목표를 설정하자 두 번째 제약이 즉시 발생했습니다: 14GB 모델을 스마트폰 CPU에서 실시간 추론해야 한다는 것. 모델 압축과 지식 분리를 동시에 설계해 해결했습니다. LLM은 문법·문맥 판단만, 콩글리쉬 용례 검색은 전용 벡터 DB가 담당하는 역할 분업입니다.",
    bullets: [
      "모델 압축: LoRA + 4-bit NF4 양자화 + 멀티링구얼 토큰 Pruning(~10%) 조합으로 14GB→3.0GB(76%), ARM CPU(Snapdragon 865 기준) 추론 0.3s",
      "지식 분리: FAISS(IVF) + SQLite LRU 캐시 하이브리드로 630개 콩글리쉬 패턴 DB(SNS·커뮤니티 크롤링 + 수기 검수) 0.02초 내 검색",
      "응답 지연 2.3s→0.47s(5배 단축, Snapdragon 865 측정); cProfile 실측 결과 병목은 LLM이 아닌 FAISS(0.21s)·SQLite(0.12s)였음",
    ],
    highlights: [
      { value: "76%", label: "모델 경량화" },
      { value: "0.47s", label: "응답 지연" },
      { value: "92%+", label: "모바일 일관성" },
    ],
    tags: ["Qwen2.5", "LoRA", "4-bit 양자화", "FAISS", "BM25", "SQLite", "LangChain", "FastAPI", "Docker"],
    award: "포스코 인재창조원 장려상 · 팀 리더",
    videoUrl: "/killkong_demo.mp4",
    repoUrl: "https://github.com/cofldus/killkong_konglish-corrector",
    repoName: "killkong_konglish-corrector",
  },
  {
    slug: "finview",
    num: "05",
    title: "재무제표 기반 AI 신용분석·보고서 자동화 시스템",
    period: "2024.09–11 · 성신여자대학교 · 팀장",
    desc: "LLM에게 '삼성전자의 부채비율이 높은가?'를 직접 물으면 환각이 발생합니다. 수치 계산 책임을 LLM에 주는 것 자체가 설계 오류입니다. 역할을 명확히 분리했습니다: XGBoost가 500개 상장사 재무지표를 A~D 등급으로 분류하고, KMeans가 유사 기업을 군집화합니다. GPT-4는 이미 통계 모델이 계산·태깅한 결과를 받아 서사적 해설만 생성합니다. 수치 연산을 LLM 바깥으로 완전히 빼낸 아키텍처입니다.",
    bullets: [
      "ETL 파이프라인: DART API(500개 상장사 재무제표) + 네이버 뉴스 200건 자동 수집 → XGBoost 신용 등급 분류(91%) + KMeans 군집화",
      "환각 차단 설계: 군집 평균 패턴·리스크 태깅을 GPT-4 컨텍스트에 주입, LLM은 해설 전담 → 환각 80% 감소 (수치 직접 연산 포함 비율, Before/After 50건 수동 측정)",
      "리포트 생성 5분→30초(10배 단축), 사용자 만족도 4.4/5.0; 수치와 언어의 역할 분리가 핵심",
    ],
    highlights: [
      { value: "91%", label: "신용등급 분류" },
      { value: "10배", label: "생성 속도" },
      { value: "500사", label: "ETL 규모" },
    ],
    tags: ["GPT-4", "XGBoost", "KMeans", "SHAP", "SMOTE", "DART API", "Flask", "D3.js"],
    videoUrl: "/finview_demo.mp4",
    thumbBg: "#FFFFFF",
    repoUrl: "https://github.com/cofldus/finview_generative-ai-report",
    repoName: "finview_generative-ai-report",
  },
  {
    slug: "ct-mri-cyclegan",
    num: "06",
    title: "비지도 학습 기반 CT-MRI 의료영상 자동 변환 시스템",
    period: "2023.06–09 · 딥러닝연구개발소 · 한성대학교 연구원",
    desc: "CT·MRI 도메인 간 Cycle-Consistency Loss 기반 비지도 교차-모달리티 변환 연구입니다. 임상 환경의 핵심 제약(1:1 Paired 데이터 획득 불가)을 Unpaired Image-to-Image Translation으로 극복하고, Generator·Discriminator 학습 불균형이라는 GAN 고유 불안정성을 실험적으로 탐색·해소했습니다.",
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
    tags: ["CycleGAN", "ResNet-9", "PatchGAN", "VGG Perceptual Loss", "Spectral Norm", "PyTorch", "OpenCV"],
    repoUrl: "https://github.com/cofldus/medical_image_translation",
    repoName: "medical_image_translation",
  },
  {
    slug: "hunchgame",
    num: "07",
    title: "GPS 이동 패턴 기반 실시간 혼잡도 예측 및 대체 공간 추천 시스템",
    period: "성신여자대학교 IT경진대회",
    desc: "압사 사고의 공통 선행 조건은 '군중이 대안을 인지하지 못한 채 단일 지점에 집중된다'는 것입니다. 경고만으로는 부족하고, 사람들이 실제로 이동할 구체적인 대안 장소를 즉시 제시해야 합니다. Naver Maps 혼잡도 API·사용자 제보 보정과 seed_data.py로 연령·성별·시간대 변수를 조합해 생성한 시뮬레이션 이동 로그를 조합해 FP-Growth로 잠재 이동 패턴을 추출하고, 혼잡도·거리·장소 유사도·시간대 4개 가중치로 개인화 추천을 설계했습니다. 재난 상황의 네트워크 불안정을 고려해 오프라인 SQLite 캐시 아키텍처를 반드시 포함시켰습니다.",
    bullets: [
      "FP-Growth로 시뮬레이션 이동 로그(seed_data.py: 연령·성별·시간대 변수 조합 생성, 10,000건 처리 검증) + Naver Maps 혼잡도 조합 → 장소 간 이동 선호 연관 규칙 추출",
      "추천 점수 엔진: 혼잡도(40%)·거리(30%)·장소 유사도(20%)·시간대(10%) 정규화 가중치 설계",
      "오프라인 내성: SQLite 기기 내 캐시로 히트맵·추천 오프라인 동작을 보장, 실시간 밀집도 예측 84%·혼잡 회피율 87% 달성",
    ],
    highlights: [
      { value: "84%", label: "밀집도 예측" },
      { value: "87%", label: "혼잡 회피율" },
      { value: "10,000건", label: "처리 검증" },
    ],
    tags: ["FP-Growth", "SQLite", "Python", "위치 API", "히트맵", "추천 엔진"],
    award: "성신여자대학교 IT경진대회 장려상",
    videoUrl: "/hunchgame_demo.mp4",
    repoUrl: "https://github.com/cofldus/hunchgame_density-predict-service",
    repoName: "hunchgame_density-predict-service",
  },
  {
    slug: "lovelop",
    num: "08",
    title: "다중 AI 페르소나 시뮬레이션 기반 상권 전략 사전 검증 플랫폼",
    period: "2026.02 · AI 자연어처리 집중 과정 3기",
    desc: "자영업자 15명 현장 인터뷰에서 반복적으로 나온 말은 '예측 정확도보다 내 매장 조건이 바뀌면 어떻게 되는지 미리 보고 싶다'였습니다. 예측 모델이 아닌 시뮬레이션 엔진이 필요했습니다. GPT-4.1을 단일 호출하면 창의성과 신뢰성을 동시에 얻을 수 없어 Temperature를 분리한 2-Stage 구조를 설계했고, 다양한 실제 고객 유형을 재현하기 위해 160개 AI 페르소나가 5단계 Agent 의사결정으로 시나리오를 독립 검증하는 구조를 구축했습니다.",
    bullets: [
      "2-Stage GPT: Temp 0.1 '분석가' 모듈(신뢰성)→ Temp 0.7 '전략가' 모듈(창의성) 순차 처리로 신뢰+창의 동시 확보",
      "160 페르소나 시뮬레이션: 방문 목적 4유형 × 세대 5종 × 성별·인원 구성으로 실제 고객 분포 재현, Agent 5단계 의사결정",
      "Before/After 11지표 검증 리포트로 조건 변경 시나리오를 정량화, 자영업자 사용 의향 80% 확인",
    ],
    highlights: [
      { value: "160명", label: "AI 페르소나" },
      { value: "2-Stage", label: "GPT 구조" },
      { value: "11개", label: "검증 지표" },
    ],
    tags: ["GPT-4.1", "Multi-Agent", "LLM Agent", "Gemma-2-9b", "EXAONE", "Python", "React", "Flask"],
    videoUrl: "/lovelop_demo.mp4",
    thumbBg: "#FFFFFF",
    repoUrl: "https://github.com/cofldus/lovelop_commerce-agent-simulation",
    repoName: "lovelop_commerce-agent-simulation",
  },
  {
    slug: "llm-for-science",
    num: "09",
    title: "LLM for Science: 과학 도메인 특화 CPT·GDPO 연구",
    period: "Pseudo Lab · 오픈 리서치 커뮤니티 · 진행 중",
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
    tags: ["Nemotron", "CPT", "SFT", "GDPO", "arXiv/PubMed", "Nougat/Marker", "HuggingFace", "Multi-Reward RL", "Python"],
  },
  {
    slug: "rocketan",
    num: "10",
    title: "STT 강의 스크립트 퀴즈·학습 가이드 자동 생성기",
    period: "2026.03–04 · 멋쟁이사자처럼 로켓단 인턴십",
    thumbAutoHeight: true,
    desc: "강의 영상과 자료를 업로드하면 핵심 개념 퀴즈와 학습 가이드를 자동으로 생성하는 시스템입니다. 강사가 수업 자료를 반복 정리·출제하는 데 소요하는 시간을 RAG 파이프라인으로 자동화했습니다. FAISS 벡터 검색과 LangChain 기반 체인 설계로 강의 맥락을 정확히 반영한 문제·해설을 생성합니다.",
    bullets: [
      "문서 청크 설계 → FAISS 인덱싱 파이프라인 → Semantic 검색 → LLM 퀴즈·해설 자동 생성; 청크 크기·overlap 실험으로 검색 품질 최적화",
      "LangChain RetrievalQA 체인으로 강의 맥락 기반 객관식·서술형 혼합 문제 생성; 평가셋 설계로 난이도별 품질 정량 검증",
      "강의별 독립 인덱스 네임스페이스 구조로 다중 코스 동시 운영 지원, temperature·캐싱으로 생성 재현성 확보",
    ],
    highlights: [
      { value: "256tok", label: "최적 청크 크기" },
      { value: "3단계", label: "난이도 체계화" },
      { value: "T=0.3", label: "캐싱 재현성" },
    ],
    tags: ["LangChain", "FAISS", "RAG", "Python", "OpenAI API", "LLM"],
    videoUrl: "/rocketan_demo.mp4",
    repoUrl: "https://github.com/orgs/Mutsa-Rocketdan/repositories",
    repoName: "Mutsa-Rocketdan",
  },
  {
    slug: "moim",
    num: "11",
    title: "MOIM: 실시간 채팅 기반 모임 플랫폼",
    period: "2024.12–2025.03 · 경기대학교 LINKVERSE",
    desc: "〔AI 기술 비사용 풀스택 프로젝트〕 약속 잡기의 모든 흐름(장소 검색 → 후보 핀 등록 → 투표 → 확정)을 실시간 채팅 안에서 완결합니다. Next.js 15 App Router + STOMP WebSocket으로 실시간성을 확보하고, Kakao Maps API로 장소 핀 공유를 채팅 메시지와 동일한 인터페이스로 통합했습니다. 프로덕션 수준 Next.js/TypeScript/WebSocket 개발 역량 증거로 포함했습니다.",
    bullets: [
      "STOMP/WebSocket 기반 실시간 채팅: 채팅 메시지 · 장소 핀 공유 · 투표 현황을 단일 소켓 채널에서 동기화",
      "Kakao Maps PinMap: 후보 장소를 지도 핀으로 등록·공유, 투표 결과와 마커를 실시간 연동",
      "Zustand + Next.js 15: SSR Hydration 이슈 해결 · 모바일 터치 이벤트 탭/스크롤 분리",
    ],
    highlights: [
      { value: "1,124", label: "커밋 수" },
      { value: "STOMP", label: "실시간 채팅" },
      { value: "Kakao Maps", label: "PinMap" },
    ],
    tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "Zustand", "WebSocket/STOMP", "Kakao Maps API", "Docker"],
    repoUrl: "https://github.com/cofldus/MOIM-Client",
    repoName: "MOIM-Client",
  },
];

// ─── SVG shared constants ─────────────────────────────────────────
const SAN = "Inter, -apple-system, system-ui, sans-serif";
const MON = "'IBM Plex Mono', 'Courier New', monospace";
const INK  = "#1D2640";
const INK2 = "#3D4A68";
const MUTED = "#8896B0";
const LINE = "rgba(29,38,64,0.08)";
const BOX  = "rgba(29,38,64,0.04)";
const BSTR = "rgba(29,38,64,0.11)";
const MG   = "#3A7A5A"; // muted forest green for positive metrics

// ─── SVG Thumbnails (light mode) ─────────────────────────────────

function Thumb01() {
  const AC = "#3B5BDB";
  return (
    <svg viewBox="0 0 360 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block" }}>
      <text x={14} y={13} fill={MUTED} fontSize={8.5} fontFamily={MON} letterSpacing="0.12em">AUTOMATION FLOW · AiRPA</text>
      <line x1={14} y1={20} x2={346} y2={20} stroke={LINE} strokeWidth={0.8} />

      <text x={14} y={46} fill={AC} fontSize={28} fontFamily={SAN} fontWeight="700">Automate</text>
      <text x={14} y={62} fill={MUTED} fontSize={9.5} fontFamily={SAN}>이질적 소스 → UiPath 자동 수집 → T5 요약 → 학과 맞춤 추천 리포트</text>

      {["교육부 포털", "대학알리미", "졸업생 블로그"].map((label, i) => (
        <g key={label}>
          <rect x={14} y={76 + i * 18} width={76} height={13} rx={2} fill={BOX} stroke={BSTR} strokeWidth={0.8} />
          <text x={52} y={76 + i * 18 + 9} textAnchor="middle" fill={INK} fontSize={8.5} fontFamily={SAN}>{label}</text>
        </g>
      ))}

      <line x1={90} y1={82} x2={110} y2={96} stroke={LINE} strokeWidth={0.8} />
      <line x1={90} y1={91} x2={110} y2={96} stroke={LINE} strokeWidth={0.8} />
      <line x1={90} y1={112} x2={110} y2={100} stroke={LINE} strokeWidth={0.8} />

      <rect x={110} y={84} width={68} height={28} rx={3} fill={`rgba(59,91,219,0.09)`} stroke={`rgba(59,91,219,0.3)`} strokeWidth={1.2} />
      <text x={144} y={96} textAnchor="middle" fill={AC} fontSize={10} fontFamily={SAN} fontWeight={600}>UiPath RPA</text>
      <text x={144} y={107} textAnchor="middle" fill={MUTED} fontSize={7.5} fontFamily={MON}>login · parse · crawl</text>

      <line x1={178} y1={98} x2={194} y2={98} stroke={`rgba(59,91,219,0.3)`} strokeWidth={1} />
      <polygon points="192,95 198,98 192,101" fill={`rgba(59,91,219,0.3)`} />

      <rect x={198} y={84} width={68} height={28} rx={3} fill={`rgba(59,91,219,0.05)`} stroke={`rgba(59,91,219,0.2)`} strokeWidth={1} />
      <text x={232} y={96} textAnchor="middle" fill={AC} fontSize={10} fontFamily={SAN} fontWeight={600}>HuggingFace T5</text>
      <text x={232} y={107} textAnchor="middle" fill={MUTED} fontSize={7.5} fontFamily={MON}>abstractive summ.</text>

      <line x1={266} y1={98} x2={282} y2={98} stroke={`rgba(59,91,219,0.3)`} strokeWidth={1} />
      <polygon points="280,95 286,98 280,101" fill={`rgba(59,91,219,0.3)`} />

      {["안정형", "성장형", "+3 유형"].map((p, i) => (
        <g key={p}>
          <rect x={286} y={76 + i * 16} width={58} height={12} rx={2}
            fill={i === 0 ? `rgba(59,91,219,0.1)` : i === 1 ? `rgba(59,91,219,0.06)` : BOX}
            stroke={i < 2 ? `rgba(59,91,219,0.22)` : BSTR} strokeWidth={0.8} />
          <text x={315} y={76 + i * 16 + 9} textAnchor="middle" fill={i < 2 ? AC : INK2} fontSize={8.5} fontFamily={SAN} fontWeight={i < 2 ? 600 : 400}>{p}</text>
        </g>
      ))}

      <line x1={14} y1={138} x2={346} y2={138} stroke={LINE} strokeWidth={0.8} />

      {[
        { x: 14,  label: "자동화율",  value: "95%+" },
        { x: 134, label: "처리 시간", value: "8h→3h" },
        { x: 254, label: "수집량/회", value: "200건" },
      ].map((m, i) => (
        <g key={m.label}>
          {i > 0 && <line x1={m.x - 6} y1={142} x2={m.x - 6} y2={215} stroke={LINE} strokeWidth={0.8} />}
          <text x={m.x} y={153} fill={MUTED} fontSize={8.5} fontFamily={SAN}>{m.label}</text>
          <text x={m.x} y={192} fill={i === 1 ? MG : AC} fontSize={28} fontFamily={MON} fontWeight={700}>{m.value}</text>
        </g>
      ))}
      <text x={14} y={214} fill={MUTED} fontSize={8} fontFamily={SAN}>★ 한국지능정보사회진흥원 특별상  ·  UiPath · HuggingFace T5 · TF-IDF</text>
    </svg>
  );
}

function Thumb02() {
  const AC = "#37697C";
  const layers = [
    { label: "Query Input",       detail: "medical question",         hi: false },
    { label: "Hybrid Retrieval",  detail: "BM25(k=20)  ·  FAISS(k=20)", hi: true  },
    { label: "Rerank Layer",      detail: "40 candidates → Top-5",    hi: true  },
    { label: "Response",          detail: "EXAONE 3.5-7.8B",          hi: false },
  ];
  const rowY = [76, 95, 114, 133];
  return (
    <svg viewBox="0 0 360 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block" }}>
      <text x={14} y={13} fill={MUTED} fontSize={8.5} fontFamily={MON} letterSpacing="0.12em">HIGH-TRUST RAG · MEDICAL BOT</text>
      <line x1={14} y1={20} x2={346} y2={20} stroke={LINE} strokeWidth={0.8} />

      <text x={14} y={46} fill={AC} fontSize={28} fontFamily={SAN} fontWeight="700">Precision</text>
      <text x={14} y={62} fill={MUTED} fontSize={9.5} fontFamily={SAN}>BM25 + FAISS → bge-reranker → EXAONE  ·  5.5만건 코퍼스</text>

      <line x1={24} y1={79} x2={24} y2={136} stroke={LINE} strokeWidth={0.8} />

      {layers.map((l, i) => (
        <g key={i}>
          <circle cx={24} cy={rowY[i] + 2} r={3.5}
            fill={l.hi ? `rgba(55,105,124,0.15)` : "none"}
            stroke={l.hi ? AC : BSTR}
            strokeWidth={l.hi ? 1.1 : 0.8} />
          <text x={36} y={rowY[i] + 6} fill={l.hi ? AC : INK} fontSize={10} fontFamily={SAN} fontWeight={l.hi ? 600 : 400}>{l.label}</text>
          <text x={210} y={rowY[i] + 6} fill={MUTED} fontSize={9} fontFamily={MON}>{l.detail}</text>
        </g>
      ))}

      <line x1={14} y1={148} x2={346} y2={148} stroke={LINE} strokeWidth={0.8} />

      {[
        { x: 14,  label: "Accuracy",  value: "+0.04↑" },
        { x: 134, label: "BERTScore", value: "+0.16↑" },
        { x: 254, label: "코퍼스",    value: "5.5만건" },
      ].map((m, i) => (
        <g key={m.label}>
          {i > 0 && <line x1={m.x - 6} y1={152} x2={m.x - 6} y2={215} stroke={LINE} strokeWidth={0.8} />}
          <text x={m.x} y={163} fill={MUTED} fontSize={8.5} fontFamily={SAN}>{m.label}</text>
          <text x={m.x} y={200} fill={i < 2 ? MG : AC} fontSize={27} fontFamily={MON} fontWeight={700}>{m.value}</text>
        </g>
      ))}
      <text x={14} y={215} fill={MUTED} fontSize={8} fontFamily={SAN}>BM25 · FAISS · bge-reranker-v2-m3 · EXAONE</text>
    </svg>
  );
}

function Thumb03() {
  const AC = "#8B6240";
  return (
    <svg viewBox="0 0 360 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block" }}>
      <text x={14} y={13} fill={MUTED} fontSize={8.5} fontFamily={MON} letterSpacing="0.12em">NLP · BRANCH CLASSIFIER</text>
      <line x1={14} y1={20} x2={346} y2={20} stroke={LINE} strokeWidth={0.8} />

      <text x={14} y={46} fill={AC} fontSize={28} fontFamily={SAN} fontWeight="700">Restoration</text>
      <text x={14} y={62} fill={MUTED} fontSize={9.5} fontFamily={SAN}>JAMO 전처리 → KoELECTRA 분류 → 분기형 KoBART 복원</text>

      {/* main flow nodes */}
      {[
        { cx: 35,  label: "Noisy",      sub: "noise text" },
        { cx: 110, label: "JAMO",       sub: "전처리" },
        { cx: 195, label: "Classifier", sub: "KoELECTRA" },
      ].map((n, i) => (
        <g key={i}>
          <circle cx={n.cx} cy={95} r={4}
            fill={i > 0 ? `rgba(139,98,64,0.12)` : "none"}
            stroke={i > 0 ? AC : BSTR}
            strokeWidth={i > 0 ? 1.1 : 0.8} />
          {i < 2 && <line x1={n.cx + 4} y1={95} x2={[35, 110, 195][i + 1] - 4} y2={95} stroke={LINE} strokeWidth={0.8} />}
          <text x={n.cx} y={110} textAnchor="middle" fill={i > 0 ? AC : INK} fontSize={9.5} fontFamily={SAN} fontWeight={i > 0 ? 600 : 400}>{n.label}</text>
          <text x={n.cx} y={121} textAnchor="middle" fill={MUTED} fontSize={7.5} fontFamily={MON}>{n.sub}</text>
        </g>
      ))}

      {/* fork */}
      <line x1={199} y1={95} x2={240} y2={95} stroke={LINE} strokeWidth={0.8} />
      <line x1={240} y1={95} x2={240} y2={82} stroke={LINE} strokeWidth={0.8} />
      <line x1={240} y1={95} x2={240} y2={110} stroke={LINE} strokeWidth={0.8} />
      <line x1={240} y1={82} x2={254} y2={82} stroke={LINE} strokeWidth={0.8} />
      <line x1={240} y1={110} x2={254} y2={110} stroke={LINE} strokeWidth={0.8} />

      <circle cx={310} cy={82} r={4} fill={`rgba(139,98,64,0.15)`} stroke={AC} strokeWidth={1.1} />
      <text x={310} y={72} textAnchor="middle" fill={AC} fontSize={9.5} fontFamily={SAN} fontWeight={600}>KoBART-A</text>
      <text x={310} y={97} textAnchor="middle" fill={MUTED} fontSize={7.5} fontFamily={SAN}>야민정음 복원</text>

      <circle cx={310} cy={110} r={4} fill={`rgba(139,98,64,0.08)`} stroke={AC} strokeWidth={0.9} />
      <text x={310} y={124} textAnchor="middle" fill={AC} fontSize={9.5} fontFamily={SAN} fontWeight={600}>KoBART-B</text>
      <text x={310} y={135} textAnchor="middle" fill={MUTED} fontSize={7.5} fontFamily={SAN}>음운오류 복원</text>

      <line x1={14} y1={142} x2={346} y2={142} stroke={LINE} strokeWidth={0.8} />

      {[
        { x: 14,  label: "BERTScore", value: "0.9812" },
        { x: 134, label: "CER",       value: "0.0426" },
        { x: 254, label: "향상폭",    value: "+5.6%p" },
      ].map((m, i) => (
        <g key={m.label}>
          {i > 0 && <line x1={m.x - 6} y1={146} x2={m.x - 6} y2={215} stroke={LINE} strokeWidth={0.8} />}
          <text x={m.x} y={157} fill={MUTED} fontSize={8.5} fontFamily={SAN}>{m.label}</text>
          <text x={m.x} y={196} fill={i < 2 ? MG : AC} fontSize={27} fontFamily={MON} fontWeight={700}>{m.value}</text>
        </g>
      ))}
      <text x={14} y={214} fill={MUTED} fontSize={8} fontFamily={SAN}>KoBART · KoELECTRA · JAMO 분해 · PyTorch</text>
    </svg>
  );
}

function Thumb04() {
  const AC = "#6B5898";
  return (
    <svg viewBox="0 0 360 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block" }}>
      <text x={14} y={13} fill={MUTED} fontSize={8.5} fontFamily={MON} letterSpacing="0.12em">ON-DEVICE LLM · MODEL COMPRESSION</text>
      <line x1={14} y1={20} x2={346} y2={20} stroke={LINE} strokeWidth={0.8} />

      <text x={14} y={46} fill={AC} fontSize={28} fontFamily={SAN} fontWeight="700">Compression</text>
      <text x={14} y={62} fill={MUTED} fontSize={9.5} fontFamily={SAN}>LoRA · 4-bit NF4 · Token Pruning → 온디바이스 실시간 추론</text>

      {/* Before bar */}
      <text x={14} y={84} fill={MUTED} fontSize={8.5} fontFamily={SAN}>Before</text>
      <rect x={14} y={89} width={238} height={13} rx={2}
        fill={`rgba(160,40,40,0.07)`} stroke={`rgba(160,40,40,0.22)`} strokeWidth={0.8} />
      <text x={258} y={101} fill={`rgba(160,40,40,0.65)`} fontSize={11.5} fontFamily={MON} fontWeight={700}>14 GB</text>

      {/* Stack labels */}
      <text x={14} y={118} fill={MUTED} fontSize={8.5} fontFamily={SAN}>LoRA fine-tuning  ·  4-bit NF4 quantization  ·  Multilingual token pruning ~10%</text>

      {/* After bar */}
      <text x={14} y={134} fill={MUTED} fontSize={8.5} fontFamily={SAN}>After</text>
      <rect x={14} y={139} width={57} height={13} rx={2}
        fill={`rgba(107,88,152,0.12)`} stroke={`rgba(107,88,152,0.38)`} strokeWidth={1} />
      <text x={78} y={151} fill={AC} fontSize={11.5} fontFamily={MON} fontWeight={700}>3.0 GB  ↓76%</text>

      <line x1={14} y1={160} x2={346} y2={160} stroke={LINE} strokeWidth={0.8} />

      {[
        { x: 14,  label: "응답 지연",   value: "0.47s" },
        { x: 134, label: "CPU 추론",    value: "0.3s" },
        { x: 254, label: "모바일 일관성", value: "92%+" },
      ].map((m, i) => (
        <g key={m.label}>
          {i > 0 && <line x1={m.x - 6} y1={164} x2={m.x - 6} y2={215} stroke={LINE} strokeWidth={0.8} />}
          <text x={m.x} y={175} fill={MUTED} fontSize={8.5} fontFamily={SAN}>{m.label}</text>
          <text x={m.x} y={207} fill={i < 2 ? MG : AC} fontSize={26} fontFamily={MON} fontWeight={700}>{m.value}</text>
        </g>
      ))}
      <text x={14} y={218} fill={MUTED} fontSize={8} fontFamily={SAN}>★ 포스코 인재창조원 장려상  ·  Qwen2.5 · LoRA · FAISS · FastAPI</text>
    </svg>
  );
}

function Thumb05() {
  const AC = "#3D5E8C";
  const nodes = [
    { cx: 55,  label: "DART API", sub: "500사 ETL",   hi: false },
    { cx: 145, label: "XGBoost",  sub: "신용등급 91%", hi: true  },
    { cx: 235, label: "KMeans",   sub: "군집화",       hi: true  },
    { cx: 318, label: "GPT-4",    sub: "서사 해설",    hi: false },
  ];
  return (
    <svg viewBox="0 0 360 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block" }}>
      <text x={14} y={13} fill={MUTED} fontSize={8.5} fontFamily={MON} letterSpacing="0.12em">FINTECH · GENERATIVE REPORT</text>
      <line x1={14} y1={20} x2={346} y2={20} stroke={LINE} strokeWidth={0.8} />

      <text x={14} y={46} fill={AC} fontSize={28} fontFamily={SAN} fontWeight="700">Analysis</text>
      <text x={14} y={62} fill={MUTED} fontSize={9.5} fontFamily={SAN}>DART ETL → XGBoost 분류 → GPT-4 서사 해설  ·  환각 80%↓</text>

      {nodes.map((n, i) => (
        <g key={n.label}>
          <circle cx={n.cx} cy={88} r={4}
            fill={n.hi ? `rgba(61,94,140,0.12)` : "none"}
            stroke={n.hi ? AC : BSTR}
            strokeWidth={n.hi ? 1.1 : 0.8} />
          {i < 3 && <line x1={n.cx + 4} y1={88} x2={nodes[i + 1].cx - 4} y2={88} stroke={LINE} strokeWidth={0.8} />}
          <text x={n.cx} y={103} textAnchor="middle" fill={n.hi ? AC : INK} fontSize={9.5} fontFamily={SAN} fontWeight={n.hi ? 600 : 400}>{n.label}</text>
          <text x={n.cx} y={114} textAnchor="middle" fill={MUTED} fontSize={7.5} fontFamily={SAN}>{n.sub}</text>
        </g>
      ))}

      {/* annotation */}
      <text x={14} y={133} fill={MUTED} fontSize={8.5} fontFamily={SAN}>군집 패턴·리스크 태그 → GPT-4 컨텍스트 주입 → LLM 수치 계산 원천 차단  ·  환각 80%↓</text>

      <line x1={14} y1={144} x2={346} y2={144} stroke={LINE} strokeWidth={0.8} />

      {[
        { x: 14,  label: "분류 정확도", value: "91%" },
        { x: 134, label: "처리 속도",   value: "10x" },
        { x: 254, label: "만족도",      value: "4.4/5" },
      ].map((m, i) => (
        <g key={m.label}>
          {i > 0 && <line x1={m.x - 6} y1={148} x2={m.x - 6} y2={215} stroke={LINE} strokeWidth={0.8} />}
          <text x={m.x} y={159} fill={MUTED} fontSize={8.5} fontFamily={SAN}>{m.label}</text>
          <text x={m.x} y={196} fill={i < 2 ? MG : AC} fontSize={27} fontFamily={MON} fontWeight={700}>{m.value}</text>
        </g>
      ))}
      <text x={14} y={214} fill={MUTED} fontSize={8} fontFamily={SAN}>GPT-4 · XGBoost · KMeans · SHAP · DART API · D3.js</text>
    </svg>
  );
}

function Thumb06() {
  const BG = "#0A1120";
  const AC = "#38BDF8";
  const GR = "#34D399";
  const W = "#E2E8F0";
  const M2 = "#4B6080";
  return (
    <svg viewBox="0 0 360 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block" }}>
      <rect width="360" height="200" fill={BG}/>
      <text x={14} y={14} fill={M2} fontSize={8} fontFamily={MON} letterSpacing="0.14em">MEDICAL CV · UNPAIRED DOMAIN TRANSFER</text>
      <line x1={14} y1={20} x2={346} y2={20} stroke="rgba(56,189,248,0.1)" strokeWidth={0.6}/>

      <text x={14} y={56} fill={AC} fontSize={38} fontFamily={SAN} fontWeight="800" letterSpacing="-0.04em">CT → MRI</text>
      <text x={14} y={71} fill={M2} fontSize={9} fontFamily={MON}>CycleGAN · ResNet-9 · VGG Loss · Unpaired · PyTorch</text>

      {/* Pipeline: 3 nodes */}
      {[
        { cx: 60,  label: "CT",       sub: "Input",       hi: false },
        { cx: 180, label: "CycleGAN", sub: "G: X→Y  F: Y→X", hi: true  },
        { cx: 300, label: "MRI",      sub: "Output",      hi: false },
      ].map((s, i) => (
        <g key={i}>
          <circle cx={s.cx} cy={108} r={28}
            fill={s.hi ? "rgba(56,189,248,0.1)" : "rgba(71,96,128,0.15)"}
            stroke={s.hi ? "rgba(56,189,248,0.4)" : "rgba(71,96,128,0.3)"}
            strokeWidth={1.2}/>
          <text x={s.cx} y={104} textAnchor="middle" fill={s.hi ? AC : W} fontSize={s.hi ? 11 : 10} fontFamily={SAN} fontWeight="700">{s.label}</text>
          <text x={s.cx} y={116} textAnchor="middle" fill={M2} fontSize={6.5} fontFamily={MON}>{s.sub}</text>
          {i < 2 && (
            <>
              <line x1={s.cx+28} y1={108} x2={s.cx+60} y2={108} stroke="rgba(56,189,248,0.25)" strokeWidth={1} strokeDasharray="4 3"/>
              <polygon points={`${s.cx+58},105 ${s.cx+64},108 ${s.cx+58},111`} fill="rgba(56,189,248,0.3)"/>
            </>
          )}
        </g>
      ))}

      {/* Metrics */}
      <line x1={14} y1={148} x2={346} y2={148} stroke="rgba(56,189,248,0.08)" strokeWidth={0.6}/>
      {[
        { x: 14,  label: "SSIM",        value: "0.88", c: GR },
        { x: 134, label: "의료진 평가",  value: "80%+", c: AC },
        { x: 254, label: "학습 데이터",  value: "800장", c: W },
      ].map((m, i) => (
        <g key={m.label}>
          {i > 0 && <line x1={m.x-6} y1={152} x2={m.x-6} y2={196} stroke="rgba(56,189,248,0.07)" strokeWidth={0.6}/>}
          <text x={m.x} y={163} fill={M2} fontSize={8} fontFamily={MON}>{m.label}</text>
          <text x={m.x} y={192} fill={m.c} fontSize={26} fontFamily={MON} fontWeight="700">{m.value}</text>
        </g>
      ))}
    </svg>
  );
}

function Thumb07() {
  const AC = "#3D7A5A";
  const heat = [
    [0.92, 0.55, 0.28, 0.12],
    [0.68, 0.95, 0.48, 0.22],
    [0.38, 0.78, 0.72, 0.42],
    [0.14, 0.32, 0.52, 0.64],
  ];
  const zones = ["홍대", "이태원", "강남", "여의도"];
  const fc = (v: number) =>
    v > 0.75 ? `rgba(160,40,40,${0.07 + v * 0.16})`
    : v > 0.45 ? `rgba(160,120,30,${0.07 + v * 0.14})`
    : `rgba(50,120,70,${0.06 + v * 0.18})`;
  const sc = (v: number) =>
    v > 0.75 ? `rgba(160,40,40,${0.18 + v * 0.18})`
    : v > 0.45 ? `rgba(160,120,30,${0.16 + v * 0.15})`
    : `rgba(50,120,70,${0.16 + v * 0.16})`;
  return (
    <svg viewBox="0 0 360 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block" }}>
      <text x={14} y={13} fill={MUTED} fontSize={8.5} fontFamily={MON} letterSpacing="0.12em">CROWD SAFETY · DENSITY ROUTING</text>
      <line x1={14} y1={20} x2={346} y2={20} stroke={LINE} strokeWidth={0.8} />

      <text x={14} y={46} fill={AC} fontSize={28} fontFamily={SAN} fontWeight="700">Dispersion</text>
      <text x={14} y={62} fill={MUTED} fontSize={9.5} fontFamily={SAN}>FP-Growth 패턴 → 가중치 추천 엔진 → SQLite 오프라인 캐시</text>

      {heat.map((row, r) =>
        row.map((v, c) => (
          <rect key={`h-${r}-${c}`} x={44 + c * 34} y={74 + r * 18} width={30} height={14} rx={2}
            fill={fc(v)} stroke={sc(v)} strokeWidth={0.7} />
        ))
      )}
      {zones.map((z, i) => (
        <text key={z} x={38} y={85 + i * 18} fill={MUTED} fontSize={8.5} fontFamily={SAN} textAnchor="end">{z}</text>
      ))}

      <rect x={198} y={72} width={150} height={88} rx={3} fill={BOX} stroke={BSTR} strokeWidth={0.8} />
      <text x={273} y={85} textAnchor="middle" fill={MUTED} fontSize={8.5} fontFamily={SAN}>추천 가중치</text>
      {[
        { label: "혼잡도", w: 40 },
        { label: "거리",   w: 30 },
        { label: "유사도", w: 20 },
        { label: "시간대", w: 10 },
      ].map((item, i) => (
        <g key={item.label}>
          <text x={206} y={100 + i * 17} fill={INK2} fontSize={8.5} fontFamily={SAN}>{item.label}</text>
          <rect x={248} y={93 + i * 17} width={54} height={6} rx={1} fill={`rgba(29,38,64,0.05)`} />
          <rect x={248} y={93 + i * 17} width={item.w * 0.54} height={6} rx={1} fill={`rgba(61,122,90,${0.18 + (item.w / 40) * 0.38})`} />
          <text x={308} y={100 + i * 17} fill={AC} fontSize={8.5} fontFamily={MON} fontWeight={700} textAnchor="end">{item.w}%</text>
        </g>
      ))}

      <line x1={14} y1={168} x2={346} y2={168} stroke={LINE} strokeWidth={0.8} />

      {[
        { x: 14,  label: "밀집도 예측", value: "84%" },
        { x: 134, label: "혼잡 회피율", value: "87%" },
        { x: 254, label: "처리 검증",   value: "10,000건" },
      ].map((m, i) => (
        <g key={m.label}>
          {i > 0 && <line x1={m.x - 6} y1={172} x2={m.x - 6} y2={215} stroke={LINE} strokeWidth={0.8} />}
          <text x={m.x} y={183} fill={MUTED} fontSize={8.5} fontFamily={SAN}>{m.label}</text>
          <text x={m.x} y={212} fill={i < 2 ? MG : AC} fontSize={24} fontFamily={MON} fontWeight={700}>{m.value}</text>
        </g>
      ))}
      <text x={14} y={218} fill={MUTED} fontSize={8} fontFamily={SAN}>★ 성신여대 IT경진대회 장려상  ·  FP-Growth · SQLite · 위치 API</text>
    </svg>
  );
}

function Thumb08() {
  const AC = "#5A4C98";
  const barWidths = [22, 30, 18, 26, 34];
  const barLabels = ["매출 변화", "방문 빈도", "객단가", "재방문율", "경쟁 지수"];
  return (
    <svg viewBox="0 0 360 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block" }}>
      <text x={14} y={13} fill={MUTED} fontSize={8.5} fontFamily={MON} letterSpacing="0.12em">COMMERCE AI · SCENARIO SIMULATION</text>
      <line x1={14} y1={20} x2={346} y2={20} stroke={LINE} strokeWidth={0.8} />

      <text x={14} y={46} fill={AC} fontSize={28} fontFamily={SAN} fontWeight="700">Simulation</text>
      <text x={14} y={62} fill={MUTED} fontSize={9.5} fontFamily={SAN}>160 페르소나 · 2-Stage GPT · Before / After 11지표 검증</text>

      {/* inputs */}
      <circle cx={44} cy={88} r={4} fill={BOX} stroke={BSTR} strokeWidth={0.8} />
      <text x={44} y={103} textAnchor="middle" fill={INK} fontSize={9} fontFamily={SAN}>매장 조건</text>
      <circle cx={44} cy={118} r={4} fill={`rgba(90,76,152,0.1)`} stroke={`rgba(90,76,152,0.28)`} strokeWidth={1} />
      <text x={44} y={133} textAnchor="middle" fill={AC} fontSize={9} fontFamily={SAN}>160 페르소나</text>

      <line x1={48} y1={88} x2={94} y2={100} stroke={LINE} strokeWidth={0.8} />
      <line x1={48} y1={118} x2={94} y2={106} stroke={LINE} strokeWidth={0.8} />

      {/* 2-stage GPT */}
      <circle cx={100} cy={103} r={4} fill={`rgba(90,76,152,0.12)`} stroke={AC} strokeWidth={1.1} />
      <text x={100} y={88} textAnchor="middle" fill={AC} fontSize={9} fontFamily={SAN} fontWeight={600}>분석가 GPT</text>
      <text x={100} y={98} textAnchor="middle" fill={MUTED} fontSize={7.5} fontFamily={MON}>Temp 0.1</text>
      <line x1={100} y1={107} x2={100} y2={113} stroke={LINE} strokeWidth={0.8} strokeDasharray="3 2" />
      <circle cx={100} cy={119} r={4} fill={`rgba(90,76,152,0.07)`} stroke={`rgba(90,76,152,0.28)`} strokeWidth={1} />
      <text x={100} y={132} textAnchor="middle" fill={AC} fontSize={9} fontFamily={SAN} fontWeight={600}>전략가 GPT</text>
      <text x={100} y={142} textAnchor="middle" fill={MUTED} fontSize={7.5} fontFamily={MON}>Temp 0.7</text>

      <line x1={104} y1={111} x2={162} y2={100} stroke={LINE} strokeWidth={0.8} />

      {/* before/after bars */}
      <rect x={162} y={74} width={182} height={80} rx={3} fill={BOX} stroke={BSTR} strokeWidth={0.8} />
      <text x={253} y={86} textAnchor="middle" fill={MUTED} fontSize={8} fontFamily={SAN}>Before / After  11지표</text>
      {barLabels.map((label, i) => (
        <g key={label}>
          <text x={170} y={99 + i * 12} fill={INK2} fontSize={8} fontFamily={SAN}>{label}</text>
          <rect x={228} y={93 + i * 12} width={56} height={6} rx={1} fill={`rgba(29,38,64,0.05)`} />
          <rect x={228} y={93 + i * 12} width={barWidths[i] + 12} height={6} rx={1} fill={`rgba(90,76,152,${0.16 + i * 0.05})`} />
        </g>
      ))}

      <line x1={14} y1={162} x2={346} y2={162} stroke={LINE} strokeWidth={0.8} />

      {[
        { x: 14,  label: "사용 의향",   value: "80%" },
        { x: 134, label: "검증 지표",   value: "11개" },
        { x: 254, label: "AI 페르소나", value: "160명" },
      ].map((m, i) => (
        <g key={m.label}>
          {i > 0 && <line x1={m.x - 6} y1={166} x2={m.x - 6} y2={215} stroke={LINE} strokeWidth={0.8} />}
          <text x={m.x} y={177} fill={MUTED} fontSize={8.5} fontFamily={SAN}>{m.label}</text>
          <text x={m.x} y={207} fill={i < 2 ? MG : AC} fontSize={26} fontFamily={MON} fontWeight={700}>{m.value}</text>
        </g>
      ))}
      <text x={14} y={218} fill={MUTED} fontSize={8} fontFamily={SAN}>★ AI NLP 집중과정 3기 장려상  ·  GPT-4.1 · Gemma-2-9b · Flask</text>
    </svg>
  );
}

function Thumb09() {
  const BG = "#080E1A";
  const AC = "#A78BFA";
  const GR = "#34D399";
  const W = "#E2E8F0";
  const M2 = "#4B6080";
  return (
    <svg viewBox="0 0 360 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block" }}>
      <rect width="360" height="200" fill={BG}/>
      <text x={14} y={14} fill={M2} fontSize={8} fontFamily={MON} letterSpacing="0.14em">SCIENTIFIC LLM · CPT + GDPO ALIGNMENT</text>
      <line x1={14} y1={20} x2={346} y2={20} stroke="rgba(167,139,250,0.1)" strokeWidth={0.6}/>

      <text x={14} y={56} fill={AC} fontSize={38} fontFamily={SAN} fontWeight="800" letterSpacing="-0.04em">Alignment</text>
      <text x={14} y={71} fill={M2} fontSize={9} fontFamily={MON}>arXiv · PubMed → Nougat → Nemotron CPT → GDPO</text>

      {/* Pipeline: 3 nodes */}
      {[
        { cx: 60,  label: "Data",  sub: "arXiv · PubMed", hi: false },
        { cx: 180, label: "CPT",   sub: "Nemotron",       hi: true  },
        { cx: 300, label: "GDPO",  sub: "×3 Rewards",     hi: true  },
      ].map((s, i) => (
        <g key={i}>
          <circle cx={s.cx} cy={108} r={28}
            fill={s.hi ? "rgba(167,139,250,0.12)" : "rgba(75,96,128,0.15)"}
            stroke={s.hi ? "rgba(167,139,250,0.4)" : "rgba(75,96,128,0.3)"}
            strokeWidth={1.2}/>
          <text x={s.cx} y={104} textAnchor="middle" fill={s.hi ? AC : W} fontSize={12} fontFamily={SAN} fontWeight="700">{s.label}</text>
          <text x={s.cx} y={116} textAnchor="middle" fill={M2} fontSize={7} fontFamily={MON}>{s.sub}</text>
          {i < 2 && (
            <>
              <line x1={s.cx+28} y1={108} x2={s.cx+60} y2={108} stroke="rgba(167,139,250,0.25)" strokeWidth={1} strokeDasharray="4 3"/>
              <polygon points={`${s.cx+58},105 ${s.cx+64},108 ${s.cx+58},111`} fill="rgba(167,139,250,0.3)"/>
            </>
          )}
        </g>
      ))}

      {/* Metrics */}
      <line x1={14} y1={148} x2={346} y2={148} stroke="rgba(167,139,250,0.08)" strokeWidth={0.6}/>
      {[
        { x: 14,  label: "Base Model", value: "Nemotron", c: AC, size: 22 },
        { x: 154, label: "Rewards",    value: "×3",       c: GR, size: 32 },
        { x: 254, label: "Method",     value: "GDPO",     c: W,  size: 26 },
      ].map((m, i) => (
        <g key={m.label}>
          {i > 0 && <line x1={m.x-8} y1={152} x2={m.x-8} y2={196} stroke="rgba(167,139,250,0.07)" strokeWidth={0.6}/>}
          <text x={m.x} y={163} fill={M2} fontSize={8} fontFamily={MON}>{m.label}</text>
          <text x={m.x} y={192} fill={m.c} fontSize={m.size} fontFamily={MON} fontWeight="700">{m.value}</text>
        </g>
      ))}
    </svg>
  );
}

function Thumb11() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/moim_ui.png"
      alt="MOIM 플랫폼"
      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
    />
  );
}

const thumbMap: Record<string, React.FC> = {
  "01": Thumb01, "02": Thumb02, "03": Thumb03, "04": Thumb04,
  "05": Thumb05, "06": Thumb06, "07": Thumb07, "08": Thumb08,
  "09": Thumb09, "11": Thumb11,
};

// ─── Layout ───────────────────────────────────────────────────────

const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

function Chip({ text }: { text: string }) {
  return (
    <span style={{
      fontFamily: "var(--font-label)", fontSize: 10.5, fontWeight: 500,
      padding: "3px 8px", background: "var(--tag-bg)", color: "var(--tag-text)",
      border: "1px solid var(--border)", borderRadius: 4, whiteSpace: "nowrap" as const,
    }}>
      {text}
    </span>
  );
}

function ProjectCard({ p, idx }: { p: Project; idx: number }) {
  const Thumb = thumbMap[p.num];
  const displayNum = String(idx + 1).padStart(2, "0");
  const visibleTags = p.tags.slice(0, 5);
  const extraTags = p.tags.length - 5;

  return (
    <motion.a
      href={`/projects/${p.slug}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={fadeUp}
      transition={{ duration: 0.45, ease: "easeOut" }}
      style={{
        background: "var(--bg)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 20px rgba(0,0,0,0.07)",
        transition: "box-shadow 0.2s, border-color 0.2s",
        textDecoration: "none",
        cursor: "pointer",
      }}
      className="pcard"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 8px rgba(0,0,0,0.08), 0 12px 32px rgba(0,0,0,0.12)";
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--accent-bd)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 1px 2px rgba(0,0,0,0.04), 0 4px 20px rgba(0,0,0,0.07)";
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)";
      }}
      onMouseDown={(e) => {
        const el = e.currentTarget as HTMLElement;
        const flash = document.createElement("div");
        flash.className = "pcard-flash";
        el.appendChild(flash);
        setTimeout(() => flash.remove(), 350);
      }}
    >
      {/* Thumbnail */}
      <div className="pcard-thumb" style={{ ...(p.thumbBg ? { background: p.thumbBg } : {}), ...(!p.videoUrl && !p.youtubeId && !thumbMap[p.num] ? { height: "auto" } : {}) }}>
        {p.youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${p.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${p.youtubeId}&controls=0&modestbranding=1&rel=0`}
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{ width: "100%", height: "100%", border: "none", display: "block" }}
          />
        ) : p.videoUrl ? (
          <video src={p.videoUrl} autoPlay loop muted playsInline style={p.thumbAutoHeight ? { width: "100%", height: "100%", objectFit: "contain", display: "block" } : undefined} />
        ) : (
          <div className="pcard-thumb-svg">
            {Thumb && <Thumb />}
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "22px 24px 0", display: "flex", flexDirection: "column", flex: 1 }}>

        {/* num row */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <span style={{ fontFamily: "var(--font-label)", fontSize: 10, letterSpacing: "0.2em", fontWeight: 700, color: "var(--accent)" }}>
            {displayNum}
          </span>
          {p.award && (
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 9, padding: "2px 7px", color: "#4fc0d1", background: "rgba(79,192,209,0.08)", border: "1px solid rgba(79,192,209,0.35)", borderRadius: 20 }}>
              {p.award}
            </span>
          )}
        </div>

        {/* title */}
        <h3 style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.3, letterSpacing: "-0.03em", color: "var(--ink)", marginBottom: 5 }}>
          {p.title}
        </h3>

        {/* period */}
        <p style={{ fontFamily: "var(--font-label)", fontSize: 10, color: "var(--ink-light)", marginBottom: 18 }}>
          {p.period}
        </p>

        {/* Highlights — inline stats */}
        <div style={{ display: "flex", borderTop: "1px solid var(--border-sub)", borderBottom: "1px solid var(--border-sub)", marginBottom: 16 }}>
          {p.highlights.map((h, i) => (
            <div key={h.label} style={{
              flex: 1, padding: "12px 8px", textAlign: "center" as const,
              borderLeft: i > 0 ? "1px solid var(--border-sub)" : "none",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{
                fontFamily: "var(--font-sans)", fontSize: 19, fontWeight: 400,
                letterSpacing: "-0.03em", lineHeight: 1, color: "var(--ink)",
                fontVariantNumeric: "tabular-nums", marginBottom: 3,
              }}>
                {h.value}
              </div>
              <div style={{ fontFamily: "var(--font-label)", fontSize: 10.5, color: "var(--ink-light)", letterSpacing: "0.06em", textTransform: "uppercase" as const }}>
                {h.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 5, marginBottom: 18 }}>
          {visibleTags.map((t) => <Chip key={t} text={t} />)}
          {extraTags > 0 && (
            <span style={{ fontFamily: "var(--font-label)", fontSize: 10.5, color: "var(--ink-light)", alignSelf: "center" }}>
              +{extraTags}
            </span>
          )}
        </div>
      </div>

      {/* 하단 버튼 */}
      <div style={{
        borderTop: "1px solid var(--border-sub)",
        padding: "10px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span
          className="pcard-action-btn"
          style={{
            fontFamily: "var(--font-label)", fontSize: 12, fontWeight: 500,
            color: "var(--accent)", letterSpacing: "0.02em",
            padding: "6px 10px", borderRadius: 6, cursor: "pointer",
            transition: "background 0.2s",
            display: "inline-flex", alignItems: "center", gap: 5,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "radial-gradient(ellipse at center, rgba(79,192,209,0.07) 0%, transparent 75%)";
            (e.currentTarget.querySelector(".pcard-arrow") as HTMLElement).style.transform = "translateX(3px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            (e.currentTarget.querySelector(".pcard-arrow") as HTMLElement).style.transform = "translateX(0)";
          }}
        >
          Case Study
          <span className="pcard-arrow" style={{ transition: "transform 0.2s ease", display: "inline-block" }}>→</span>
        </span>
        {p.repoUrl && (
          <a
            href={p.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              fontFamily: "var(--font-label)", fontSize: 12, fontWeight: 500,
              color: "var(--ink-light)", letterSpacing: "0.04em",
              textDecoration: "none", padding: "6px 10px", borderRadius: 6,
              transition: "background 0.2s, color 0.2s",
              display: "inline-flex", alignItems: "center", gap: 5,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "radial-gradient(ellipse at center, rgba(79,192,209,0.07) 0%, transparent 75%)";
              e.currentTarget.style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--ink-light)";
            }}
          >
            github ↗
          </a>
        )}
      </div>

      {/* print-only: 항상 DOM에 있고 화면에선 숨김, 인쇄에서만 표시 */}
      <div className="pcard-print-detail">
        <p style={{ fontSize: 11, lineHeight: 1.7, color: "#4B5563", marginBottom: 10, wordBreak: "keep-all" as const }}>
          {p.desc}
        </p>
        <ul style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {p.bullets.map((b) => (
            <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: 6, fontSize: 10.5, lineHeight: 1.65, color: "#111827", wordBreak: "keep-all" as const }}>
              <span style={{ color: "#2563EB", flexShrink: 0, marginTop: 1 }}>›</span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </motion.a>
  );
}

const DEFAULT_RESEARCH_SLUGS = ["ct-mri-cyclegan", "llm-for-science"];

export default function ProjectSection() {
  const company = useCompany();
  const researchSlugs = company.researchSlugs ?? DEFAULT_RESEARCH_SLUGS;

  const videoProjects = company.projectOrder
    ? company.projectOrder
        .map(slug => projects.find(p => p.slug === slug))
        .filter((p): p is Project => p !== undefined)
    : projects.filter(p => !researchSlugs.includes(p.slug));
  const svgProjects = projects.filter(p => researchSlugs.includes(p.slug));

  return (
    <section id="projects" style={{ background: "var(--bg-subtle)", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: "var(--cw)", margin: "0 auto", padding: "72px var(--cp)" }}>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40 }}
        >
          <div>
            <p style={{ fontFamily: "var(--font-label)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>
              Projects
            </p>
            <h2 style={{ fontFamily: "var(--font-sans)", fontSize: 32, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 6 }}>
              프로젝트
            </h2>
            <p style={{ fontSize: 13, color: "var(--ink-light)" }}>
              Selected work in LLM, NLP, and applied AI
            </p>
          </div>
          <a
            href="https://github.com/cofldus" target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, fontWeight: 500, color: "var(--accent)", textDecoration: "none", flexShrink: 0, marginLeft: 24, transition: "opacity 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            GitHub
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>

        <div className="pcard-grid" style={{ marginBottom: 60 }}>
          {videoProjects.map((p, i) => <ProjectCard key={p.num} p={p} idx={i} />)}
        </div>

        {/* Research section */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 48, marginBottom: 40 }}>
          <p style={{ fontFamily: "var(--font-label)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "var(--accent)", marginBottom: 6 }}>
            Research &amp; Exploration
          </p>
          <p style={{ fontSize: 13, color: "var(--ink-light)" }}>
            논문 탐구 및 실험 프로젝트
          </p>
        </div>
        <div className="pcard-grid pcard-grid-svg">
          {svgProjects.map((p, i) => <ProjectCard key={p.num} p={p} idx={videoProjects.length + i} />)}
        </div>
      </div>

      <style>{`
        .pcard-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px;
          align-items: start;
        }
        .pcard-grid-svg {
          grid-template-columns: repeat(3, 1fr);
        }
        .pcard {
          transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.22s ease;
        }
        .pcard-flash {
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.45);
          pointer-events: none;
          z-index: 10;
          animation: pcard-flash 0.32s ease-out forwards;
        }
        @keyframes pcard-flash {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        .pcard:hover {
          transform: translateY(-12px) scale(1.38);
          box-shadow: 0 24px 48px rgba(0,0,0,0.14), 0 48px 96px rgba(0,0,0,0.22) !important;
          z-index: 20;
        }
        .pcard:active {
          transform: translateY(2px) scale(0.96);
          transition: transform 0.1s ease, box-shadow 0.1s ease;
          box-shadow: 0 1px 4px rgba(0,0,0,0.07), 0 4px 12px rgba(0,0,0,0.09) !important;
        }
        .pcard-thumb {
          border-bottom: 1px solid var(--border-sub);
          background: #0A1628;
          height: 340px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pcard-thumb video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .pcard-thumb-svg {
          width: 100%;
          height: 100%;
          background: var(--bg-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          box-sizing: border-box;
        }
        @media (max-width: 1024px) {
          .pcard-grid-svg { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .pcard-grid, .pcard-grid-svg { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
