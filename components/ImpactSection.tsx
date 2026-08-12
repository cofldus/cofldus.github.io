"use client";

import { motion } from "framer-motion";

const achievements = [
  { metric: "34.1% → 91.7%", label: "Document AI 항목 추출 정확도", href: "/projects/doc-extraction" },
  { metric: "2.3s → 0.47s", label: "온디바이스 end-to-end 응답 시간", href: "/projects/killkong" },
  { metric: "+0.16", label: "의료 RAG 서술형 답변 BERTScore", href: "/projects/medical-chatbot" },
];

export default function ImpactSection() {
  return (
    <section id="impact" style={{ background: "var(--bg)" }}>
      <div style={{ maxWidth: "var(--cw)", margin: "0 auto", padding: "0 var(--cp)" }}>
        <div className="impact-grid">
          {achievements.map((a, i) => (
            <motion.a
              key={a.label}
              href={a.href}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="impact-item"
            >
              <span className="impact-metric">{a.metric}</span>
              <span className="impact-label">{a.label}</span>
            </motion.a>
          ))}
        </div>
      </div>

      <style>{`
        .impact-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 40px 0;
        }
        .impact-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 0 32px;
          text-decoration: none;
          border-left: 1px solid var(--border-sub);
        }
        .impact-item:first-child { border-left: none; padding-left: 0; }
        .impact-item:last-child { padding-right: 0; }
        .impact-metric {
          font-family: var(--font-sans);
          font-size: clamp(26px, 3vw, 36px);
          font-weight: 500;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: var(--ink);
          font-variant-numeric: tabular-nums;
          white-space: nowrap;
          transition: color 0.15s;
        }
        .impact-item:hover .impact-metric { color: var(--accent-text); }
        .impact-label {
          font-family: var(--font-sans);
          font-size: 13.5px;
          color: var(--ink-mid);
          letter-spacing: -0.005em;
          word-break: keep-all;
        }
        .impact-item:focus-visible { outline: 2px solid var(--accent-text); outline-offset: 4px; }

        @media (max-width: 760px) {
          .impact-grid { grid-template-columns: 1fr; gap: 28px; padding: 32px 0; }
          .impact-item { border-left: none; padding: 0; }
        }
      `}</style>
    </section>
  );
}
