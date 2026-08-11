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

        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
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
                gridTemplateColumns: "140px 1fr",
                gap: 24,
                alignItems: "start",
                padding: "13px 0",
                borderBottom: "1px solid var(--border-sub)",
              }}
            >
              {/* 카테고리 */}
              <span
                style={{
                  fontFamily: "var(--font-label)",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#475569",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase" as const,
                  paddingTop: 5,
                  paddingLeft: 8,
                  borderLeft: "2px solid rgba(79,192,209,0.5)",
                  lineHeight: 1.2,
                }}
              >
                {g.cat}
              </span>

              {/* 스킬 칩 — core / primary / secondary 3단 위계 */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 7px" }}>
                {(g.core ?? []).map((sk) => (
                  <span
                    key={sk}
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      color: "#0E7490",
                      padding: "3px 9px",
                      background: "#E8F4F6",
                      border: "none",
                      borderRadius: 3,
                      lineHeight: 1.6,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {sk}
                  </span>
                ))}
                {g.primary.map((sk) => (
                  <span
                    key={sk}
                    style={{
                      fontSize: 11,
                      fontWeight: 400,
                      color: "#64748B",
                      padding: "3px 9px",
                      background: "#F4F7F8",
                      border: "none",
                      borderRadius: 3,
                      lineHeight: 1.6,
                      letterSpacing: "-0.005em",
                    }}
                  >
                    {sk}
                  </span>
                ))}
                {g.secondary.map((sk) => (
                  <span
                    key={sk}
                    style={{
                      fontSize: 10.5,
                      fontWeight: 400,
                      color: "#94A3B8",
                      padding: "3px 9px",
                      background: "transparent",
                      border: "none",
                      borderRadius: 3,
                      lineHeight: 1.6,
                      letterSpacing: "-0.005em",
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
