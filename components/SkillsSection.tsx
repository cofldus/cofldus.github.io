"use client";

import { motion } from "framer-motion";
import { useCompany } from "@/context/CompanyContext";
import type { SkillGroup } from "@/lib/companyConfig";

const defaultGroups: SkillGroup[] = [
  {
    cat: "LLM / 에이전트",
    primary: ["LangChain", "FAISS(IVF)", "BM25", "bge-reranker-v2-m3", "Multi-Agent"],
    secondary: ["GPT-4.1", "EXAONE", "Qwen2.5", "Gemma-2", "CPT", "SFT", "GDPO"],
  },
  {
    cat: "NLP / 파인튜닝",
    primary: ["HuggingFace", "KoBART", "KoELECTRA", "LoRA", "Quantization"],
    secondary: ["T5", "JAMO 전처리", "Nougat/Marker", "arXiv/PubMed 파이프라인"],
  },
  {
    cat: "ML / 분석",
    primary: ["PyTorch", "XGBoost", "Scikit-learn", "SHAP"],
    secondary: ["CycleGAN", "KMeans", "SMOTE", "OpenCV", "FP-Growth"],
  },
  {
    cat: "서빙 / 인프라",
    primary: ["Python", "FastAPI", "Docker"],
    secondary: ["Flask", "PostgreSQL", "SQLite", "Redis", "UiPath RPA"],
  },
  {
    cat: "프론트 / 시각화",
    primary: ["React", "Next.js", "D3.js"],
    secondary: ["TypeScript", "Tailwind CSS", "Zustand"],
  },
];

export default function SkillsSection() {
  const company = useCompany();
  const groups = company.skillGroups ?? defaultGroups;

  return (
    <section id="tech-stack" style={{ borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: "var(--cw)", margin: "0 auto", padding: "40px var(--cp)" }}>

        <div style={{ marginBottom: 24 }}>
          <p style={{
            fontFamily: "var(--font-label)", fontSize: 10, letterSpacing: "0.18em",
            textTransform: "uppercase", color: "var(--accent)", marginBottom: 8,
          }}>
            Capabilities
          </p>
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
                  fontSize: 12,
                  fontWeight: 700,
                  color: "var(--accent)",
                  letterSpacing: "0.04em",
                  paddingTop: 4,
                }}
              >
                {g.cat}
              </span>

              {/* 스킬 칩 */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 7px" }}>
                {g.primary.map((sk) => (
                  <span
                    key={sk}
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "var(--ink)",
                      padding: "3px 11px",
                      background: "var(--bg)",
                      border: "1px solid var(--border)",
                      borderRadius: 4,
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
                      fontSize: 12,
                      fontWeight: 400,
                      color: "var(--ink-light)",
                      padding: "3px 11px",
                      background: "var(--bg-subtle)",
                      border: "1px solid var(--border-sub)",
                      borderRadius: 4,
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
