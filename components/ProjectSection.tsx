"use client";

import { motion } from "framer-motion";

interface Project {
  slug: string;
  title: string;
  period: string;
  /** 카드 한 문장 요약 */
  headline: string;
  /** 카드에 노출할 대표 수치 하나 */
  metric: string;
  metricLabel: string;
  tags: string[];
  award?: string;
  videoUrl?: string;
  thumbImg?: string;
  thumbBg?: string;
}

const featured: Project[] = [
  {
    slug: "doc-extraction",
    title: "문서 AI 엔진 정확도 개선",
    period: "기업 실무 · 2026.07–",
    headline:
      "증명서·진단서에서 항목을 추출하는 엔진의 오류 구간을 단계별로 측정하고, 인식 구조를 VLM 기반으로 변경했습니다.",
    metric: "34.1% → 91.7%",
    metricLabel: "항목 추출 정확도",
    tags: ["Qwen-VL", "vLLM", "PaddleOCR", "LoRA"],
    thumbImg: "/doc-extraction_thumb.png",
    thumbBg: "#FFFFFF",
  },
  {
    slug: "killkong",
    title: "온디바이스 콩글리쉬 교정 에이전트",
    period: "포스코 AI·BigData 아카데미 · 2025.07–08",
    headline:
      "14GB 모델을 3.0GB로 압축하고 검색 구간을 최적화해 스마트폰 CPU에서 실시간 교정이 동작하도록 만들었습니다.",
    metric: "2.3s → 0.47s",
    metricLabel: "응답 시간",
    tags: ["Qwen2.5", "LoRA", "FAISS", "4-bit 양자화"],
    award: "장려상 · 팀 리더",
    videoUrl: "/killkong_demo.mp4",
  },
  {
    slug: "medical-chatbot",
    title: "의료 문서 검색 RAG 파이프라인",
    period: "AI NLP 집중과정 · 팀 프로젝트",
    headline:
      "벡터 검색이 놓치는 전문 의학 용어 문서를 BM25로 보완하고, Cross-Encoder로 후보를 다시 정렬했습니다.",
    metric: "BERTScore +0.16",
    metricLabel: "서술형 답변 품질",
    tags: ["BM25", "FAISS", "bge-reranker", "EXAONE"],
    videoUrl: "/medical-chatbot_demo.mp4",
  },
];

const more = [
  { slug: "korean-noise-restoration", title: "한글 난독화 복원", metric: "BERTScore 0.9812", tags: "KoBART · KoELECTRA" },
  { slug: "finview", title: "재무 리포트 자동 생성", metric: "분류 정확도 91%", tags: "XGBoost · GPT-4" },
  { slug: "lovelop", title: "상권 시뮬레이션 플랫폼", metric: "4분 22초 → 48초", tags: "GPT-4.1 · Multi-Agent" },
  { slug: "rocketan", title: "강의 퀴즈 자동 생성", metric: "청크 512 → 256", tags: "LangChain · FAISS" },
  { slug: "ct-mri-cyclegan", title: "CT→MRI 변환 연구", metric: "SSIM +6.2%p", tags: "CycleGAN · PyTorch" },
  { slug: "llm-for-science", title: "과학 도메인 LLM 연구", metric: "진행 중", tags: "CPT · GDPO" },
  { slug: "airpa", title: "학과 탐색 자동화", metric: "8h → 3h", tags: "UiPath · T5" },
  { slug: "hunchgame", title: "인파 분산 서비스", metric: "밀집도 예측 84%", tags: "FP-Growth · SQLite" },
  { slug: "moim", title: "실시간 모임 플랫폼", metric: "커밋 1,124", tags: "Next.js · WebSocket" },
];

const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

function Visual({ p }: { p: Project }) {
  if (p.videoUrl) {
    return <video src={p.videoUrl} autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />;
  }
  if (p.thumbImg) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={p.thumbImg} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} />;
  }
  return null;
}

function Meta({ p }: { p: Project }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        <span style={{ fontFamily: "var(--font-label)", fontSize: 11, color: "#9CA3AF" }}>
          {p.period}
        </span>
        {p.award && (
          <span style={{
            fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 400,
            color: "#4fc0d1", background: "rgba(79,192,209,0.08)",
            border: "1px solid rgba(79,192,209,0.35)", borderRadius: 20,
            padding: "2px 8px", lineHeight: 1.4,
          }}>
            {p.award}
          </span>
        )}
      </div>

      <h3 style={{
        fontSize: 21, fontWeight: 700, lineHeight: 1.3,
        letterSpacing: "-0.025em", color: "var(--ink)", margin: "0 0 12px",
      }}>
        {p.title}
      </h3>

      <p style={{
        fontSize: 14, lineHeight: 1.75, color: "var(--ink-light)",
        margin: "0 0 28px", wordBreak: "keep-all" as const,
      }}>
        {p.headline}
      </p>

      <div style={{ marginBottom: 24 }}>
        <div style={{
          fontFamily: "var(--font-sans)", fontSize: 30, fontWeight: 500,
          letterSpacing: "-0.03em", color: "#0A0A0A", lineHeight: 1.1,
        }}>
          {p.metric}
        </div>
        <div style={{ fontFamily: "var(--font-label)", fontSize: 11, color: "#9CA3AF", marginTop: 6 }}>
          {p.metricLabel}
        </div>
      </div>

      <p style={{
        fontFamily: "var(--font-label)", fontSize: 12, fontWeight: 500,
        color: "#6B7280", lineHeight: 1.7, margin: "0 0 24px",
      }}>
        {p.tags.join("  ·  ")}
      </p>

      <span style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        fontFamily: "var(--font-label)", fontSize: 12, fontWeight: 600,
        color: "var(--accent)", letterSpacing: "0.02em",
      }}>
        Case Study
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </span>
    </>
  );
}

function FeaturedCard({ p }: { p: Project }) {
  return (
    <motion.a
      href={`/projects/${p.slug}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={fadeUp}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="pcard pcard-hero"
      style={{ textDecoration: "none", display: "grid", alignItems: "center" }}
    >
      <div className="pcard-hero-visual" style={{ background: p.thumbBg ?? "#0F172A" }}>
        <Visual p={p} />
      </div>
      <div className="pcard-hero-body">
        <Meta p={p} />
      </div>
    </motion.a>
  );
}

function HalfCard({ p }: { p: Project }) {
  return (
    <motion.a
      href={`/projects/${p.slug}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={fadeUp}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="pcard"
      style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}
    >
      <div className="pcard-half-visual" style={{ background: p.thumbBg ?? "#0F172A" }}>
        <Visual p={p} />
      </div>
      <div style={{ padding: "32px 4px 0" }}>
        <Meta p={p} />
      </div>
    </motion.a>
  );
}

export default function ProjectSection() {
  return (
    <section id="projects" style={{ background: "var(--bg)" }}>
      <div style={{ maxWidth: "var(--cw)", margin: "0 auto", padding: "96px var(--cp)" }}>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          style={{
            fontFamily: "var(--font-sans)", fontSize: 30, fontWeight: 700,
            color: "var(--ink)", letterSpacing: "-0.04em", lineHeight: 1.1,
            marginBottom: 64,
          }}
        >
          프로젝트
        </motion.h2>

        <FeaturedCard p={featured[0]} />

        <div className="pcard-half-grid">
          <HalfCard p={featured[1]} />
          <HalfCard p={featured[2]} />
        </div>

        {/* 그 외 작업 */}
        <div style={{ marginTop: 112 }}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "var(--font-label)", fontSize: 12, fontWeight: 600,
              color: "#9CA3AF", letterSpacing: "0.04em", marginBottom: 8,
            }}
          >
            그 외 작업
          </motion.p>

          <div style={{ borderTop: "1px solid var(--border)" }}>
            {more.map((m) => (
              <a
                key={m.slug}
                href={`/projects/${m.slug}`}
                className="pmore-row"
              >
                <span className="pmore-title">{m.title}</span>
                <span className="pmore-tags">{m.tags}</span>
                <span className="pmore-metric">{m.metric}</span>
                <svg className="pmore-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .pcard { transition: opacity 0.2s; }
        .pcard:hover { opacity: 0.72; }

        .pcard-hero {
          grid-template-columns: 1.15fr 1fr;
          gap: clamp(40px, 5vw, 72px);
          margin-bottom: 112px;
        }
        .pcard-hero-visual {
          aspect-ratio: 16 / 10;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid var(--border);
        }
        .pcard-hero-body { min-width: 0; }

        .pcard-half-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 5vw, 72px);
        }
        .pcard-half-visual {
          aspect-ratio: 16 / 10;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid var(--border);
        }

        .pmore-row {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr) minmax(0, 0.8fr) 16px;
          align-items: center;
          gap: 20px;
          padding: 22px 4px;
          border-bottom: 1px solid var(--border);
          text-decoration: none;
          transition: padding-left 0.18s ease;
        }
        .pmore-row:hover { padding-left: 12px; }
        .pmore-row:hover .pmore-title { color: var(--accent); }
        .pmore-title {
          font-size: 15px; font-weight: 600; color: var(--ink);
          letter-spacing: -0.015em; transition: color 0.18s;
          word-break: keep-all;
        }
        .pmore-tags {
          font-family: var(--font-label); font-size: 12px; color: #9CA3AF;
        }
        .pmore-metric {
          font-family: var(--font-sans); font-size: 14px; font-weight: 500;
          color: var(--ink-mid); letter-spacing: -0.01em;
        }
        .pmore-arrow { color: #D1D5DB; flex-shrink: 0; }

        @media (max-width: 900px) {
          .pcard-hero { grid-template-columns: 1fr; gap: 32px; }
          .pcard-half-grid { grid-template-columns: 1fr; gap: 72px; }
          .pcard-hero { margin-bottom: 72px; }
        }
        @media (max-width: 640px) {
          .pmore-row {
            grid-template-columns: 1fr auto;
            grid-template-areas: "title metric" "tags tags";
            gap: 6px 16px;
          }
          .pmore-title { grid-area: title; }
          .pmore-metric { grid-area: metric; font-size: 13px; }
          .pmore-tags { grid-area: tags; }
          .pmore-arrow { display: none; }
        }
      `}</style>
    </section>
  );
}
