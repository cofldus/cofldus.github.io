"use client";

import { motion } from "framer-motion";
import { useCompany } from "@/context/CompanyContext";
import type { SkillGroup } from "@/lib/companyConfig";

const defaultGroups: SkillGroup[] = [
  {
    cat: "LLM / RAG",
    primary: ["LangChain", "FAISS(IVF)", "BM25", "Hybrid Search", "bge-reranker-v2-m3", "Multi-Agent"],
    secondary: ["인덱싱 파이프라인", "평가셋 설계", "온프레미스 LLM", "CPT", "SFT", "GDPO", "Multi-Reward RL"],
  },
  {
    cat: "NLP / LLM",
    primary: ["Python", "HuggingFace", "KoBART", "KoELECTRA", "LoRA"],
    secondary: ["T5", "Quantization", "Nougat/Marker", "arXiv/PubMed 파이프라인"],
  },
  {
    cat: "CV / ML",
    primary: ["PyTorch", "XGBoost", "Scikit-learn", "OpenCV"],
    secondary: ["CycleGAN", "SHAP", "KMeans", "SMOTE"],
  },
  {
    cat: "Backend",
    primary: ["FastAPI", "PostgreSQL", "Docker", "Redis"],
    secondary: ["Flask", "SQLite", "UiPath RPA"],
  },
  {
    cat: "Frontend",
    primary: ["Next.js", "TypeScript", "Tailwind CSS"],
    secondary: ["React Native", "D3.js"],
  },
  {
    cat: "자격증 · 어학",
    primary: ["빅데이터분석기사 (2025.12)", "ADsP (2026.03)", "OPIc IH (2025.08)"],
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
