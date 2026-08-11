"use client";

import { motion } from "framer-motion";

const experience = [
  {
    role: "문서 인식 엔진 정확도 개선",
    org: "문서 AI 기업 실무",
    period: "2026.07–",
  },
  {
    role: "RAG 기반 강의 퀴즈·학습 가이드 생성",
    org: "멋쟁이사자처럼 로켓단 인턴십",
    period: "2026.03–04",
  },
  {
    role: "CT·MRI 의료영상 AI 연구개발 · 논문 작성",
    org: "(주)딥러닝연구개발 · 한성대학교 연구원",
    period: "2023.06–09",
  },
];

export default function EducationSection() {
  return (
    <section id="education" style={{ borderTop: "1px solid var(--border)", background: "var(--bg)" }}>
      <div style={{ maxWidth: "var(--cw)", margin: "0 auto", padding: "72px var(--cp)" }}>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          style={{
            fontFamily: "var(--font-sans)", fontSize: 30, fontWeight: 700,
            color: "var(--ink)", letterSpacing: "-0.04em", lineHeight: 1.1,
            marginBottom: 44,
          }}
        >
          경력
        </motion.h2>

        <div>
          {experience.map((e, i) => (
            <motion.div
              key={e.role}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="exp-row"
            >
              <div>
                <div style={{
                  fontSize: 15.5, fontWeight: 600, color: "var(--ink)",
                  letterSpacing: "-0.015em", lineHeight: 1.45, wordBreak: "keep-all",
                }}>
                  {e.role}
                </div>
                <div style={{
                  fontFamily: "var(--font-label)", fontSize: 12.5,
                  color: "var(--ink-light)", marginTop: 6,
                }}>
                  {e.org}
                </div>
              </div>
              <span style={{
                fontFamily: "var(--font-label)", fontSize: 12,
                color: "#9CA3AF", whiteSpace: "nowrap", paddingTop: 2,
              }}>
                {e.period}
              </span>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          <a
            href="/resume_v1.html"
            className="edu-link"
          >
            전체 이력 보기
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <span style={{ fontFamily: "var(--font-label)", fontSize: 12, color: "#9CA3AF" }}>
            학력 · 수상 · 자격증 · 교육이수 포함
          </span>
        </div>

      </div>

      <style>{`
        .exp-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 24px;
          padding: 22px 0;
          border-top: 1px solid var(--border);
        }
        .exp-row:last-of-type { border-bottom: 1px solid var(--border); }
        .edu-link {
          display: inline-flex; align-items: center; gap: 6;
          gap: 6px;
          font-family: var(--font-label); font-size: 12.5px; font-weight: 600;
          color: var(--accent); text-decoration: none; letter-spacing: 0.02em;
          transition: opacity 0.15s;
        }
        .edu-link:hover { opacity: 0.7; }
        @media (max-width: 560px) {
          .exp-row { flex-direction: column; gap: 8px; }
        }
      `}</style>
    </section>
  );
}
