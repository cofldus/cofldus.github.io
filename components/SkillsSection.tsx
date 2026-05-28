"use client";

import { motion } from "framer-motion";
import { useCompany } from "@/context/CompanyContext";
import type { SkillGroup } from "@/lib/companyConfig";

const defaultGroups: SkillGroup[] = [
  {
    cat: "LLM / 에이전트",
    core: ["LangChain", "FAISS(IVF)", "bge-reranker-v2-m3"],
    primary: ["BM25", "Multi-Agent", "GPT-4.1"],
    secondary: ["EXAONE", "Qwen2.5", "Gemma-2", "CPT", "SFT", "GDPO"],
  },
  {
    cat: "NLP / 파인튜닝",
    core: ["HuggingFace", "LoRA", "KoBART"],
    primary: ["KoELECTRA", "Quantization", "JAMO 전처리"],
    secondary: ["T5", "Nougat/Marker", "arXiv/PubMed 파이프라인"],
  },
  {
    cat: "ML / 분석",
    core: ["PyTorch", "XGBoost"],
    primary: ["Scikit-learn", "SHAP", "OpenCV"],
    secondary: ["CycleGAN", "KMeans", "SMOTE", "FP-Growth"],
  },
  {
    cat: "서빙 / 인프라",
    core: ["Python", "FastAPI", "Docker"],
    primary: ["PostgreSQL", "Redis"],
    secondary: ["Flask", "SQLite", "UiPath RPA"],
  },
  {
    cat: "프론트 / 시각화",
    core: ["React", "Next.js"],
    primary: ["D3.js", "TypeScript"],
    secondary: ["Tailwind CSS", "Zustand"],
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
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#64748B",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase" as const,
                  paddingTop: 5,
                  paddingLeft: 8,
                  borderLeft: "2px solid #CBD5E1",
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
                      background: "#EFF9FB",
                      border: "1px solid rgba(14,116,144,0.18)",
                      borderRadius: 4,
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
                      color: "#475569",
                      padding: "3px 9px",
                      background: "#F8FAFC",
                      border: "1px solid #E2E8F0",
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
                      fontSize: 10.5,
                      fontWeight: 400,
                      color: "#94A3B8",
                      padding: "3px 9px",
                      background: "transparent",
                      border: "1px solid #E8ECF2",
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
