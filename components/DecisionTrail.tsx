"use client";

import { motion } from "framer-motion";

interface Decision {
  type: "시도" | "해결" | "한계" | "최종" | "불가" | "부적합" | "부족" | "채택" | "전환" | "전략" | "문제";
  text: string;
}

const typeConfig: Record<string, { color: string; dot: string }> = {
  시도:   { color: "#4A6A8A", dot: "#1E3050" },
  해결:   { color: "#34D399", dot: "#34D399" },
  한계:   { color: "#FB923C", dot: "#FB923C" },
  최종:   { color: "#00D4FF", dot: "#00D4FF" },
  불가:   { color: "#FB923C", dot: "#FB923C" },
  부적합: { color: "#FB923C", dot: "#FB923C" },
  부족:   { color: "#4A6A8A", dot: "#1E3050" },
  채택:   { color: "#34D399", dot: "#34D399" },
  전환:   { color: "#A78BFA", dot: "#A78BFA" },
  전략:   { color: "#A78BFA", dot: "#A78BFA" },
  문제:   { color: "#4A6A8A", dot: "#1E3050" },
};

export default function DecisionTrail({ decisions }: { decisions: Decision[] }) {
  return (
    <div className="flex flex-col">
      {decisions.map((d, i) => {
        const cfg = typeConfig[d.type] ?? typeConfig["시도"];
        const isLast = i === decisions.length - 1;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.055, duration: 0.35 }}
            className="grid"
            style={{ gridTemplateColumns: "20px 44px 1fr" }}
          >
            {/* Track */}
            <div className="flex flex-col items-center">
              <div
                className="w-[5px] h-[5px] rounded-full mt-[10px] shrink-0"
                style={{ backgroundColor: cfg.dot }}
              />
              {!isLast && (
                <div className="w-px flex-1 mt-1" style={{ background: "#1C2840", minHeight: "24px" }} />
              )}
            </div>

            {/* Type */}
            <div
              className="font-mono text-[10px] font-semibold tracking-[0.04em] pt-[7px] pb-4 pr-2 leading-none"
              style={{ color: cfg.color }}
            >
              {d.type}
            </div>

            {/* Body */}
            <p className="text-[13px] leading-[1.8] pt-[5px] pb-4" style={{ color: "#4A6A8A" }}>
              {d.text}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
