"use client";

import { motion } from "framer-motion";

// 왼쪽 — 주요 경험 (역할/프로젝트 중심)
const mainExp = [
  {
    cat: "학력",
    items: [
      {
        role: "AI융합학부",
        org: "성신여자대학교",
        period: "졸업 예정 2026.08",
        desc: "",
      },
    ],
  },
  {
    cat: "경력 · 활동",
    items: [
      {
        role: "Scientific LLM · CPT · SFT · GDPO 리서치",
        org: "가짜연구소 (Pseudo Lab) 12기 러너 · 오픈 리서치 커뮤니티",
        period: "진행 중",
        desc: "",
      },
      {
        role: "RAG 기반 강의 자동 퀴즈·학습 가이드 생성",
        org: "멋쟁이사자처럼 로켓단 인턴십",
        period: "2026.03–04",
        desc: "",
      },
      {
        role: "정부지원 사업 Pre-TIPS 최종 합격 · 프로젝트 'MOIM' 개발",
        org: "중소벤처기업부",
        period: "2025.01",
        desc: "",
      },
      {
        role: "CT·MRI 의료영상 AI 연구개발 · 논문 작성",
        org: "(주)딥러닝연구개발 · 한성대학교 연구원",
        period: "2023.06–09",
        desc: "",
      },
    ],
  },
  {
    cat: "교육이수",
    items: [
      {
        role: "AI NLP 엔지니어 집중과정 3기 수료",
        org: "멋쟁이사자처럼",
        period: "2025.12–2026.02",
        desc: "",
      },
      {
        role: "청년 AI·BigData 아카데미 30기 수료",
        org: "포스코 인재창조원",
        period: "2025.06–08",
        desc: "",
      },
      {
        role: "정보보안과정 수료",
        org: "Microsoft",
        period: "2024.10",
        desc: "",
      },
      {
        role: "MQL 데이터 기반 B2B 영업 기회 창출 예측 모델 개발",
        org: "LG Aimers 4기 · LG AI Research",
        period: "2024.01–02",
        desc: "",
      },
      {
        role: "Phase 1 수료",
        org: "LG Aimers 3기 · LG AI Research",
        period: "2023.08",
        desc: "",
      },
      {
        role: "스마트공장 제품 품질 상태 분류 AI 모델 개발",
        org: "LG Aimers 2기 · LG AI Research",
        period: "2023.01–02",
        desc: "",
      },
    ],
  },
];

// 오른쪽 — 수상 · 자격증 · 어학
const sideInfo = [
  {
    cat: "수상",
    items: [
      { label: "AI 프로젝트 대회 장려상", org: "포스코 인재창조원", period: "2025.08" },
      { label: "Bias-A-Thon Track 2 리더보드 3위", org: "성균관대 지능형멀티미디어연구센터 · 딥페이크연구센터", period: "2025.05" },
      { label: "AiRPA 해커톤 특별상", org: "한국지능정보사회진흥원", period: "2023.11" },
      { label: "소프트웨어 경진대회 장려상", org: "성신여자대학교", period: "2023.09" },
      { label: "학생창업경진대회 A등급", org: "교육부 · 연세대학교", period: "2022.08" },
    ],
  },
  {
    cat: "자격증",
    items: [
      { label: "ADsP (데이터분석 준전문가)", org: "한국데이터산업진흥원", period: "2026.03" },
      { label: "빅데이터분석기사", org: "한국데이터산업진흥원", period: "2025.12" },
    ],
  },
  {
    cat: "어학",
    items: [
      { label: "OPIc IH (Intermediate High)", org: "ACTFL", period: "2025.08" },
    ],
  },
];

function MainCatBlock({ c, delay }: { c: typeof mainExp[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      style={{ marginBottom: 22 }}
    >
      <div style={{
        padding: "5px 12px",
        background: "rgba(79,192,209,0.06)",
        borderLeft: "2px solid rgba(79,192,209,0.4)",
        borderRadius: "0 4px 4px 0",
        marginBottom: 4,
      }}>
        <span style={{
          fontFamily: "var(--font-label)", fontSize: 11, fontWeight: 600,
          letterSpacing: "0.14em", textTransform: "uppercase" as const,
          color: "#3ea8b8",
          WebkitFontSmoothing: "antialiased",
        }}>
          {c.cat}
        </span>
      </div>

      {c.items.map((item, i) => (
        <div
          key={i}
          style={{
            padding: "10px 0 10px 14px",
            borderBottom: "1px solid var(--border-sub)",
          }}
        >
          {/* 역할/프로젝트 — 메인 정보 */}
          <p style={{
            fontSize: 14,
            fontWeight: 600,
            color: "var(--ink)",
            lineHeight: 1.45,
            marginBottom: 3,
            letterSpacing: "-0.01em",
          }}>
            {item.role}
          </p>
          {/* 기관 + 기간 — 서브 정보 */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{
              fontFamily: "var(--font-label)", fontSize: 11,
              color: "var(--ink-light)", lineHeight: 1.4,
            }}>
              {item.org}
            </span>
            {item.period && (
              <>
                <span style={{ width: 2, height: 2, borderRadius: "50%", background: "var(--ink-ghost)", display: "inline-block", flexShrink: 0 }} />
                <span style={{
                  fontFamily: "var(--font-label)", fontSize: 11,
                  color: "var(--ink-light)", letterSpacing: "0.02em",
                }}>
                  {item.period}
                </span>
              </>
            )}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function SideCatBlock({ c, delay }: { c: typeof sideInfo[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      style={{ marginBottom: 22 }}
    >
      <div style={{
        padding: "5px 12px",
        background: "rgba(79,192,209,0.06)",
        borderLeft: "2px solid rgba(79,192,209,0.4)",
        borderRadius: "0 4px 4px 0",
        marginBottom: 4,
      }}>
        <span style={{
          fontFamily: "var(--font-label)", fontSize: 11, fontWeight: 600,
          letterSpacing: "0.14em", textTransform: "uppercase" as const,
          color: "#3ea8b8",
          WebkitFontSmoothing: "antialiased",
        }}>
          {c.cat}
        </span>
      </div>

      {c.items.map((item, i) => (
        <div
          key={i}
          style={{
            padding: "9px 0 9px 14px",
            borderBottom: "1px solid var(--border-sub)",
          }}
        >
          <p style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--ink)",
            lineHeight: 1.4,
            marginBottom: 2,
            letterSpacing: "-0.01em",
          }}>
            {item.label}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "var(--font-label)", fontSize: 11, color: "var(--ink-light)" }}>
              {item.org}
            </span>
            <span style={{ width: 2, height: 2, borderRadius: "50%", background: "var(--ink-ghost)", display: "inline-block", flexShrink: 0 }} />
            <span style={{ fontFamily: "var(--font-label)", fontSize: 11, color: "var(--ink-light)" }}>
              {item.period}
            </span>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

export default function EducationSection() {
  return (
    <section id="education" style={{ borderTop: "1px solid var(--border)", background: "var(--bg-subtle)" }}>
      <div style={{ maxWidth: "var(--cw)", margin: "0 auto", padding: "44px var(--cp)" }}>

        <div style={{ marginBottom: 32 }}>
          <p style={{
            fontFamily: "var(--font-label)", fontSize: 10, letterSpacing: "0.18em",
            textTransform: "uppercase", color: "var(--accent)", marginBottom: 8,
          }}>
            Background
          </p>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            학력 · 경력 · 이력
          </h2>
        </div>

        <div className="edu-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 60px", alignItems: "start" }}>
          {/* 좌측: 주요 경험 */}
          <div>
            {mainExp.map((c, i) => (
              <MainCatBlock key={c.cat} c={c} delay={i * 0.07} />
            ))}
          </div>

          {/* 우측: 수상·자격증·어학 */}
          <div style={{ paddingLeft: 32, borderLeft: "1px solid var(--border)" }}>
            {sideInfo.map((c, i) => (
              <SideCatBlock key={c.cat} c={c} delay={0.1 + i * 0.07} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
