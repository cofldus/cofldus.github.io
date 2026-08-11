"use client";

import { motion } from "framer-motion";

const groups = [
  {
    cat: "LLM / NLP",
    items: ["PyTorch", "HuggingFace", "LoRA", "Quantization", "KoBART", "KoELECTRA"],
  },
  {
    cat: "검색 / RAG",
    items: ["FAISS", "BM25", "Cross-Encoder", "LangChain"],
  },
  {
    cat: "서빙 / 인프라",
    items: ["Python", "FastAPI", "Docker", "PostgreSQL", "Redis"],
  },
];

export default function SkillsSection() {
  return (
    <section id="tech-stack" style={{ borderTop: "1px solid var(--border)", background: "var(--bg-subtle)" }}>
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
          기술
        </motion.h2>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {groups.map((g, i) => (
            <motion.div
              key={g.cat}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="skill-row"
            >
              <span className="skill-cat">{g.cat}</span>
              <span className="skill-items">{g.items.join("  ·  ")}</span>
            </motion.div>
          ))}
        </div>

      </div>

      <style>{`
        .skill-row {
          display: grid;
          grid-template-columns: 160px 1fr;
          gap: 24px;
          align-items: baseline;
          padding: 22px 0;
          border-top: 1px solid var(--border);
        }
        .skill-row:last-child { border-bottom: 1px solid var(--border); }
        .skill-cat {
          font-family: var(--font-label);
          font-size: 13px;
          font-weight: 600;
          color: var(--ink);
          letter-spacing: -0.01em;
        }
        .skill-items {
          font-family: var(--font-label);
          font-size: 14px;
          line-height: 1.8;
          color: var(--ink-light);
          word-break: keep-all;
        }
        @media (max-width: 640px) {
          .skill-row { grid-template-columns: 1fr; gap: 8px; }
        }
      `}</style>
    </section>
  );
}
