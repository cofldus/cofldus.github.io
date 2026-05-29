"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function CountUp({ end, decimals = 0, ariaLabel }: { end: number; decimals?: number; ariaLabel: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(end); // 초기값을 실제 값으로 설정
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (!inView || animated) return;
    setAnimated(true);
    setVal(0);
    const t0 = performance.now();
    const run = (now: number) => {
      const p = Math.min((now - t0) / 1400, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(parseFloat((end * e).toFixed(decimals)));
      if (p < 1) requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
  }, [inView, end, decimals, animated]);

  return <span ref={ref} aria-label={ariaLabel}>{val.toFixed(decimals)}</span>;
}

const achievements = [
  {
    end: 76, decimals: 0, suffix: "%",
    label: "모델 경량화",
    desc: "경량화 76% 달성으로 모바일 온디바이스 추론 가능 수준 확보",
    note: "LoRA + 4-bit NF4 + Token Pruning  ·  14GB → 3.0GB",
  },
  {
    end: 0.9812, decimals: 4, suffix: "",
    label: "BERTScore F1",
    desc: "난독화 한글 복원 AI에서 BERTScore 0.9812 달성",
    note: "KoELECTRA 분류 → 분기형 KoBART 복원 아키텍처",
  },
  {
    end: 0.16, decimals: 2, suffix: "↑",
    label: "RAG 성능 향상",
    desc: "하이브리드 RAG 파이프라인 개선으로 BERTScore +0.16↑, Accuracy +0.04↑",
    note: "BM25 + FAISS 하이브리드 검색 + bge-reranker 도입",
  },
];

export default function ImpactSection() {
  return (
    <section id="impact" style={{ borderTop: "1px solid var(--border)", background: "var(--bg-subtle)" }}>
      <div style={{ maxWidth: "var(--cw)", margin: "0 auto", padding: "44px var(--cp)" }}>

        <div style={{ marginBottom: 32 }}>
          <p style={{
            fontFamily: "var(--font-label)", fontSize: 10, letterSpacing: "0.18em",
            textTransform: "uppercase", color: "var(--accent)", marginBottom: 8,
          }}>
            Impact
          </p>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            주요 성과
          </h2>
        </div>

        <div className="impact-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "1px solid var(--border)" }}>
          {achievements.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              style={{
                padding: "32px 40px",
                paddingLeft: i === 0 ? 0 : 40,
                paddingRight: i === 2 ? 0 : 40,
                borderRight: i < 2 ? "1px solid var(--border-sub)" : "none",
              }}
            >
              <div style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(46px, 4.8vw, 68px)",
                fontWeight: 400,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                color: "#0A0A0A",
                marginBottom: 16,
                fontVariantNumeric: "tabular-nums",
                textAlign: "center",
              }}>
                <CountUp end={a.end} decimals={a.decimals} ariaLabel={`${a.end.toFixed(a.decimals)}${a.suffix}`} />{a.suffix}
              </div>
              <p style={{
                fontFamily: "var(--font-label)",
                fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
                color: "var(--ink-light)", marginBottom: 8,
              }}>
                {a.label}
              </p>
              <p style={{
                fontSize: 14, fontWeight: 500, color: "var(--ink)",
                lineHeight: 1.6, marginBottom: 8, letterSpacing: "-0.01em",
              }}>
                {a.desc}
              </p>
              <p style={{
                fontFamily: "var(--font-label)",
                fontSize: 12.5, color: "var(--ink-light)", lineHeight: 1.6,
              }}>
                {a.note}
              </p>
            </motion.div>
          ))}
          <div style={{ borderTop: "1px solid var(--border-sub)" }} />
        </div>
      </div>
    </section>
  );
}
