"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface Metric {
  value: string;
  label: string;
  color?: string;
}

function AnimatedNumber({ raw, color }: { raw: string; color: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  const match = raw.match(/^([+\-]?)(\d+(?:\.\d+)?)(.*)/);
  if (!match) return <span style={{ color }}>{raw}</span>;

  const prefix = match[1];
  const numeric = parseFloat(match[2]);
  const suffix = match[3];
  const decimals = match[2].includes(".") ? match[2].split(".")[1].length : 0;

  useEffect(() => {
    if (!isInView) return;
    const duration = 1400;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(prefix + (numeric * eased).toFixed(decimals) + suffix);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, numeric, decimals, prefix, suffix]);

  return <span ref={ref} style={{ color }}>{display}</span>;
}

const FALLBACK_COLORS = ["#A78BFA", "#34D399", "#00D4FF", "#FB923C", "#60A5FA", "#F472B6"];

export default function MetricCards({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-8">
      {metrics.map((m, i) => {
        const color = m.color || FALLBACK_COLORS[i % FALLBACK_COLORS.length];
        return (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.42 }}
          >
            {/* Accent rule */}
            <div className="h-[1px] w-6 mb-3" style={{ backgroundColor: color }} />
            {/* Number */}
            <div
              className="font-black tabular-nums leading-none"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(26px, 2.8vw, 36px)",
                letterSpacing: "-0.03em",
                color,
              }}
            >
              <AnimatedNumber raw={m.value} color={color} />
            </div>
            {/* Label */}
            <div
              className="text-[11px] leading-snug mt-2.5 tracking-wide"
              style={{ fontFamily: "var(--font-label)", fontWeight: 600, color: "#2A4060" }}
            >
              {m.label}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
