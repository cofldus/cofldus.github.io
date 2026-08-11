"use client";

import { motion } from "framer-motion";
import { useCompany } from "@/context/CompanyContext";
import type { SkillGroup } from "@/lib/companyConfig";

const defaultGroups: SkillGroup[] = [
  {
    cat: "AI / NLP",
    core: ["Python", "PyTorch", "HuggingFace"],
    primary: ["LoRA", "Quantization"],
    secondary: [],
  },
  {
    cat: "Retrieval / RAG",
    core: ["FAISS", "BM25", "Cross-Encoder"],
    primary: ["LangChain"],
    secondary: [],
  },
  {
    cat: "Serving",
    core: ["FastAPI", "Docker"],
    primary: ["PostgreSQL", "Redis"],
    secondary: [],
  },
];

export default function SkillsSection() {
  const company = useCompany();
  const groups = company.skillGroups ?? defaultGroups;

  return (
    <section id="tech-stack" style={{ borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: "var(--cw)", margin: "0 auto", padding: "40px var(--cp)" }}>

        <div style={{ marginBottom: 28 }}>
          <h2 className="sec-title" style={{ marginBottom: 0 }}>
            기술 스택
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {groups.map((g, i) => (
            <motion.div
              key={g.cat}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              style={{
                display: "grid",
                gridTemplateColumns: "160px 1fr",
                gap: 24,
                alignItems: "start",
                padding: "18px 0",
                borderBottom: "1px solid var(--border-sub)",
              }}
            >
              {/* 카테고리 */}
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 15,
                  fontWeight: 500,
                  color: "var(--ink)",
                  letterSpacing: "-0.01em",
                  paddingTop: 4,
                  lineHeight: 1.4,
                }}
              >
                {g.cat}
              </span>

              {/* 스킬 칩 — core / primary / secondary 3단 위계 */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {/* core — 테두리 있는 칩 */}
                {(g.core ?? []).map((sk) => (
                  <span
                    key={sk}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 12.5,
                      fontWeight: 400,
                      color: "var(--ink)",
                      padding: "5px 10px",
                      background: "transparent",
                      border: "1px solid var(--border)",
                      borderRadius: 4,
                      lineHeight: 1.2,
                      whiteSpace: "nowrap" as const,
                    }}
                  >
                    {sk}
                  </span>
                ))}
                {/* primary·secondary — 평문 */}
                {[...g.primary, ...g.secondary].map((sk) => (
                  <span
                    key={sk}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 12.5,
                      fontWeight: 400,
                      color: "var(--ink-light)",
                      padding: "5px 10px",
                      background: "transparent",
                      border: "1px solid transparent",
                      borderRadius: 4,
                      lineHeight: 1.2,
                      whiteSpace: "nowrap" as const,
                    }}
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
