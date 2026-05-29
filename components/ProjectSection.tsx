"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { useCompany } from "@/context/CompanyContext";
import { projects as libProjects } from "@/lib/projects";
import type { Project } from "@/lib/projects";

const FILTER_CATS = ["전체", "금융 AI", "RAG/LLM", "NLP", "데이터 파이프라인", "제조/시뮬레이션"] as const;
type FilterCat = typeof FILTER_CATS[number];

// ─── SVG shared constants ─────────────────────────────────────────
const SAN = "Inter, -apple-system, system-ui, sans-serif";
const MON = "'IBM Plex Mono', 'Courier New', monospace";
const INK  = "#1D2640";
const INK2 = "#3D4A68";
const MUTED = "#8896B0";
const LINE = "rgba(29,38,64,0.08)";
const BOX  = "rgba(29,38,64,0.04)";
const BSTR = "rgba(29,38,64,0.11)";
const MG   = "#3A7A5A"; // muted forest green for positive metrics

// ─── SVG Thumbnails (light mode) ─────────────────────────────────

function Thumb01() {
  const AC = "#3B5BDB";
  return (
    <svg viewBox="0 0 360 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block" }}>
      <text x={14} y={13} fill={MUTED} fontSize={8.5} fontFamily={MON} letterSpacing="0.12em">AUTOMATION FLOW · AiRPA</text>
      <line x1={14} y1={20} x2={346} y2={20} stroke={LINE} strokeWidth={0.8} />

      <text x={14} y={46} fill={AC} fontSize={28} fontFamily={SAN} fontWeight="700">Automate</text>
      <text x={14} y={62} fill={MUTED} fontSize={9.5} fontFamily={SAN}>이질적 소스 → UiPath 자동 수집 → T5 요약 → 학과 맞춤 추천 리포트</text>

      {["교육부 포털", "대학알리미", "졸업생 블로그"].map((label, i) => (
        <g key={label}>
          <rect x={14} y={76 + i * 18} width={76} height={13} rx={2} fill={BOX} stroke={BSTR} strokeWidth={0.8} />
          <text x={52} y={76 + i * 18 + 9} textAnchor="middle" fill={INK} fontSize={8.5} fontFamily={SAN}>{label}</text>
        </g>
      ))}

      <line x1={90} y1={82} x2={110} y2={96} stroke={LINE} strokeWidth={0.8} />
      <line x1={90} y1={91} x2={110} y2={96} stroke={LINE} strokeWidth={0.8} />
      <line x1={90} y1={112} x2={110} y2={100} stroke={LINE} strokeWidth={0.8} />

      <rect x={110} y={84} width={68} height={28} rx={3} fill={`rgba(59,91,219,0.09)`} stroke={`rgba(59,91,219,0.3)`} strokeWidth={1.2} />
      <text x={144} y={96} textAnchor="middle" fill={AC} fontSize={10} fontFamily={SAN} fontWeight={600}>UiPath RPA</text>
      <text x={144} y={107} textAnchor="middle" fill={MUTED} fontSize={7.5} fontFamily={MON}>login · parse · crawl</text>

      <line x1={178} y1={98} x2={194} y2={98} stroke={`rgba(59,91,219,0.3)`} strokeWidth={1} />
      <polygon points="192,95 198,98 192,101" fill={`rgba(59,91,219,0.3)`} />

      <rect x={198} y={84} width={68} height={28} rx={3} fill={`rgba(59,91,219,0.05)`} stroke={`rgba(59,91,219,0.2)`} strokeWidth={1} />
      <text x={232} y={96} textAnchor="middle" fill={AC} fontSize={10} fontFamily={SAN} fontWeight={600}>HuggingFace T5</text>
      <text x={232} y={107} textAnchor="middle" fill={MUTED} fontSize={7.5} fontFamily={MON}>abstractive summ.</text>

      <line x1={266} y1={98} x2={282} y2={98} stroke={`rgba(59,91,219,0.3)`} strokeWidth={1} />
      <polygon points="280,95 286,98 280,101" fill={`rgba(59,91,219,0.3)`} />

      {["안정형", "성장형", "+3 유형"].map((p, i) => (
        <g key={p}>
          <rect x={286} y={76 + i * 16} width={58} height={12} rx={2}
            fill={i === 0 ? `rgba(59,91,219,0.1)` : i === 1 ? `rgba(59,91,219,0.06)` : BOX}
            stroke={i < 2 ? `rgba(59,91,219,0.22)` : BSTR} strokeWidth={0.8} />
          <text x={315} y={76 + i * 16 + 9} textAnchor="middle" fill={i < 2 ? AC : INK2} fontSize={8.5} fontFamily={SAN} fontWeight={i < 2 ? 600 : 400}>{p}</text>
        </g>
      ))}

      <line x1={14} y1={138} x2={346} y2={138} stroke={LINE} strokeWidth={0.8} />

      {[
        { x: 14,  label: "자동화율",  value: "95%+" },
        { x: 134, label: "처리 시간", value: "8h→3h" },
        { x: 254, label: "수집량/회", value: "200건" },
      ].map((m, i) => (
        <g key={m.label}>
          {i > 0 && <line x1={m.x - 6} y1={142} x2={m.x - 6} y2={215} stroke={LINE} strokeWidth={0.8} />}
          <text x={m.x} y={153} fill={MUTED} fontSize={8.5} fontFamily={SAN}>{m.label}</text>
          <text x={m.x} y={192} fill={i === 1 ? MG : AC} fontSize={28} fontFamily={MON} fontWeight={700}>{m.value}</text>
        </g>
      ))}
      <text x={14} y={214} fill={MUTED} fontSize={8} fontFamily={SAN}>★ 한국지능정보사회진흥원 특별상  ·  UiPath · HuggingFace T5 · TF-IDF</text>
    </svg>
  );
}

function Thumb02() {
  const AC = "#37697C";
  const layers = [
    { label: "Query Input",       detail: "medical question",         hi: false },
    { label: "Hybrid Retrieval",  detail: "BM25(k=20)  ·  FAISS(k=20)", hi: true  },
    { label: "Rerank Layer",      detail: "40 candidates → Top-5",    hi: true  },
    { label: "Response",          detail: "EXAONE 3.5-7.8B",          hi: false },
  ];
  const rowY = [76, 95, 114, 133];
  return (
    <svg viewBox="0 0 360 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block" }}>
      <text x={14} y={13} fill={MUTED} fontSize={8.5} fontFamily={MON} letterSpacing="0.12em">HIGH-TRUST RAG · MEDICAL BOT</text>
      <line x1={14} y1={20} x2={346} y2={20} stroke={LINE} strokeWidth={0.8} />

      <text x={14} y={46} fill={AC} fontSize={28} fontFamily={SAN} fontWeight="700">Precision</text>
      <text x={14} y={62} fill={MUTED} fontSize={9.5} fontFamily={SAN}>BM25 + FAISS → bge-reranker → EXAONE  ·  5.5만건 코퍼스</text>

      <line x1={24} y1={79} x2={24} y2={136} stroke={LINE} strokeWidth={0.8} />

      {layers.map((l, i) => (
        <g key={i}>
          <circle cx={24} cy={rowY[i] + 2} r={3.5}
            fill={l.hi ? `rgba(55,105,124,0.15)` : "none"}
            stroke={l.hi ? AC : BSTR}
            strokeWidth={l.hi ? 1.1 : 0.8} />
          <text x={36} y={rowY[i] + 6} fill={l.hi ? AC : INK} fontSize={10} fontFamily={SAN} fontWeight={l.hi ? 600 : 400}>{l.label}</text>
          <text x={210} y={rowY[i] + 6} fill={MUTED} fontSize={9} fontFamily={MON}>{l.detail}</text>
        </g>
      ))}

      <line x1={14} y1={148} x2={346} y2={148} stroke={LINE} strokeWidth={0.8} />

      {[
        { x: 14,  label: "Accuracy",  value: "+0.04↑" },
        { x: 134, label: "BERTScore", value: "+0.16↑" },
        { x: 254, label: "코퍼스",    value: "5.5만건" },
      ].map((m, i) => (
        <g key={m.label}>
          {i > 0 && <line x1={m.x - 6} y1={152} x2={m.x - 6} y2={215} stroke={LINE} strokeWidth={0.8} />}
          <text x={m.x} y={163} fill={MUTED} fontSize={8.5} fontFamily={SAN}>{m.label}</text>
          <text x={m.x} y={200} fill={i < 2 ? MG : AC} fontSize={27} fontFamily={MON} fontWeight={700}>{m.value}</text>
        </g>
      ))}
      <text x={14} y={215} fill={MUTED} fontSize={8} fontFamily={SAN}>BM25 · FAISS · bge-reranker-v2-m3 · EXAONE</text>
    </svg>
  );
}

function Thumb03() {
  const AC = "#8B6240";
  return (
    <svg viewBox="0 0 360 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block" }}>
      <text x={14} y={13} fill={MUTED} fontSize={8.5} fontFamily={MON} letterSpacing="0.12em">NLP · BRANCH CLASSIFIER</text>
      <line x1={14} y1={20} x2={346} y2={20} stroke={LINE} strokeWidth={0.8} />

      <text x={14} y={46} fill={AC} fontSize={28} fontFamily={SAN} fontWeight="700">Restoration</text>
      <text x={14} y={62} fill={MUTED} fontSize={9.5} fontFamily={SAN}>JAMO 전처리 → KoELECTRA 분류 → 분기형 KoBART 복원</text>

      {/* main flow nodes */}
      {[
        { cx: 35,  label: "Noisy",      sub: "noise text" },
        { cx: 110, label: "JAMO",       sub: "전처리" },
        { cx: 195, label: "Classifier", sub: "KoELECTRA" },
      ].map((n, i) => (
        <g key={i}>
          <circle cx={n.cx} cy={95} r={4}
            fill={i > 0 ? `rgba(139,98,64,0.12)` : "none"}
            stroke={i > 0 ? AC : BSTR}
            strokeWidth={i > 0 ? 1.1 : 0.8} />
          {i < 2 && <line x1={n.cx + 4} y1={95} x2={[35, 110, 195][i + 1] - 4} y2={95} stroke={LINE} strokeWidth={0.8} />}
          <text x={n.cx} y={110} textAnchor="middle" fill={i > 0 ? AC : INK} fontSize={9.5} fontFamily={SAN} fontWeight={i > 0 ? 600 : 400}>{n.label}</text>
          <text x={n.cx} y={121} textAnchor="middle" fill={MUTED} fontSize={7.5} fontFamily={MON}>{n.sub}</text>
        </g>
      ))}

      {/* fork */}
      <line x1={199} y1={95} x2={240} y2={95} stroke={LINE} strokeWidth={0.8} />
      <line x1={240} y1={95} x2={240} y2={82} stroke={LINE} strokeWidth={0.8} />
      <line x1={240} y1={95} x2={240} y2={110} stroke={LINE} strokeWidth={0.8} />
      <line x1={240} y1={82} x2={254} y2={82} stroke={LINE} strokeWidth={0.8} />
      <line x1={240} y1={110} x2={254} y2={110} stroke={LINE} strokeWidth={0.8} />

      <circle cx={310} cy={82} r={4} fill={`rgba(139,98,64,0.15)`} stroke={AC} strokeWidth={1.1} />
      <text x={310} y={72} textAnchor="middle" fill={AC} fontSize={9.5} fontFamily={SAN} fontWeight={600}>KoBART-A</text>
      <text x={310} y={97} textAnchor="middle" fill={MUTED} fontSize={7.5} fontFamily={SAN}>야민정음 복원</text>

      <circle cx={310} cy={110} r={4} fill={`rgba(139,98,64,0.08)`} stroke={AC} strokeWidth={0.9} />
      <text x={310} y={124} textAnchor="middle" fill={AC} fontSize={9.5} fontFamily={SAN} fontWeight={600}>KoBART-B</text>
      <text x={310} y={135} textAnchor="middle" fill={MUTED} fontSize={7.5} fontFamily={SAN}>음운오류 복원</text>

      <line x1={14} y1={142} x2={346} y2={142} stroke={LINE} strokeWidth={0.8} />

      {[
        { x: 14,  label: "BERTScore", value: "0.9812" },
        { x: 134, label: "CER",       value: "0.0426" },
        { x: 254, label: "향상폭",    value: "+5.6%p" },
      ].map((m, i) => (
        <g key={m.label}>
          {i > 0 && <line x1={m.x - 6} y1={146} x2={m.x - 6} y2={215} stroke={LINE} strokeWidth={0.8} />}
          <text x={m.x} y={157} fill={MUTED} fontSize={8.5} fontFamily={SAN}>{m.label}</text>
          <text x={m.x} y={196} fill={i < 2 ? MG : AC} fontSize={27} fontFamily={MON} fontWeight={700}>{m.value}</text>
        </g>
      ))}
      <text x={14} y={214} fill={MUTED} fontSize={8} fontFamily={SAN}>KoBART · KoELECTRA · JAMO 분해 · PyTorch</text>
    </svg>
  );
}

function Thumb04() {
  const AC = "#6B5898";
  return (
    <svg viewBox="0 0 360 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block" }}>
      <text x={14} y={13} fill={MUTED} fontSize={8.5} fontFamily={MON} letterSpacing="0.12em">ON-DEVICE LLM · MODEL COMPRESSION</text>
      <line x1={14} y1={20} x2={346} y2={20} stroke={LINE} strokeWidth={0.8} />

      <text x={14} y={46} fill={AC} fontSize={28} fontFamily={SAN} fontWeight="700">Compression</text>
      <text x={14} y={62} fill={MUTED} fontSize={9.5} fontFamily={SAN}>LoRA · 4-bit NF4 · Token Pruning → 온디바이스 실시간 추론</text>

      {/* Before bar */}
      <text x={14} y={84} fill={MUTED} fontSize={8.5} fontFamily={SAN}>Before</text>
      <rect x={14} y={89} width={238} height={13} rx={2}
        fill={`rgba(160,40,40,0.07)`} stroke={`rgba(160,40,40,0.22)`} strokeWidth={0.8} />
      <text x={258} y={101} fill={`rgba(160,40,40,0.65)`} fontSize={11.5} fontFamily={MON} fontWeight={700}>14 GB</text>

      {/* Stack labels */}
      <text x={14} y={118} fill={MUTED} fontSize={8.5} fontFamily={SAN}>LoRA fine-tuning  ·  4-bit NF4 quantization  ·  Multilingual token pruning ~10%</text>

      {/* After bar */}
      <text x={14} y={134} fill={MUTED} fontSize={8.5} fontFamily={SAN}>After</text>
      <rect x={14} y={139} width={57} height={13} rx={2}
        fill={`rgba(107,88,152,0.12)`} stroke={`rgba(107,88,152,0.38)`} strokeWidth={1} />
      <text x={78} y={151} fill={AC} fontSize={11.5} fontFamily={MON} fontWeight={700}>3.0 GB  ↓76%</text>

      <line x1={14} y1={160} x2={346} y2={160} stroke={LINE} strokeWidth={0.8} />

      {[
        { x: 14,  label: "응답 지연",   value: "0.47s" },
        { x: 134, label: "CPU 추론",    value: "0.3s" },
        { x: 254, label: "모바일 일관성", value: "92%+" },
      ].map((m, i) => (
        <g key={m.label}>
          {i > 0 && <line x1={m.x - 6} y1={164} x2={m.x - 6} y2={215} stroke={LINE} strokeWidth={0.8} />}
          <text x={m.x} y={175} fill={MUTED} fontSize={8.5} fontFamily={SAN}>{m.label}</text>
          <text x={m.x} y={207} fill={i < 2 ? MG : AC} fontSize={26} fontFamily={MON} fontWeight={700}>{m.value}</text>
        </g>
      ))}
      <text x={14} y={218} fill={MUTED} fontSize={8} fontFamily={SAN}>★ 포스코 인재창조원 장려상  ·  Qwen2.5 · LoRA · FAISS · FastAPI</text>
    </svg>
  );
}

function Thumb05() {
  const AC = "#3D5E8C";
  const nodes = [
    { cx: 55,  label: "DART API", sub: "500사 ETL",   hi: false },
    { cx: 145, label: "XGBoost",  sub: "신용등급 91%", hi: true  },
    { cx: 235, label: "KMeans",   sub: "군집화",       hi: true  },
    { cx: 318, label: "GPT-4",    sub: "서사 해설",    hi: false },
  ];
  return (
    <svg viewBox="0 0 360 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block" }}>
      <text x={14} y={13} fill={MUTED} fontSize={8.5} fontFamily={MON} letterSpacing="0.12em">FINTECH · GENERATIVE REPORT</text>
      <line x1={14} y1={20} x2={346} y2={20} stroke={LINE} strokeWidth={0.8} />

      <text x={14} y={46} fill={AC} fontSize={28} fontFamily={SAN} fontWeight="700">Analysis</text>
      <text x={14} y={62} fill={MUTED} fontSize={9.5} fontFamily={SAN}>DART ETL → XGBoost 분류 → GPT-4 서사 해설  ·  환각 80%↓</text>

      {nodes.map((n, i) => (
        <g key={n.label}>
          <circle cx={n.cx} cy={88} r={4}
            fill={n.hi ? `rgba(61,94,140,0.12)` : "none"}
            stroke={n.hi ? AC : BSTR}
            strokeWidth={n.hi ? 1.1 : 0.8} />
          {i < 3 && <line x1={n.cx + 4} y1={88} x2={nodes[i + 1].cx - 4} y2={88} stroke={LINE} strokeWidth={0.8} />}
          <text x={n.cx} y={103} textAnchor="middle" fill={n.hi ? AC : INK} fontSize={9.5} fontFamily={SAN} fontWeight={n.hi ? 600 : 400}>{n.label}</text>
          <text x={n.cx} y={114} textAnchor="middle" fill={MUTED} fontSize={7.5} fontFamily={SAN}>{n.sub}</text>
        </g>
      ))}

      {/* annotation */}
      <text x={14} y={133} fill={MUTED} fontSize={8.5} fontFamily={SAN}>군집 패턴·리스크 태그 → GPT-4 컨텍스트 주입 → LLM 수치 계산 원천 차단  ·  환각 80%↓</text>

      <line x1={14} y1={144} x2={346} y2={144} stroke={LINE} strokeWidth={0.8} />

      {[
        { x: 14,  label: "분류 정확도", value: "91%" },
        { x: 134, label: "처리 속도",   value: "10x" },
        { x: 254, label: "만족도",      value: "4.4/5" },
      ].map((m, i) => (
        <g key={m.label}>
          {i > 0 && <line x1={m.x - 6} y1={148} x2={m.x - 6} y2={215} stroke={LINE} strokeWidth={0.8} />}
          <text x={m.x} y={159} fill={MUTED} fontSize={8.5} fontFamily={SAN}>{m.label}</text>
          <text x={m.x} y={196} fill={i < 2 ? MG : AC} fontSize={27} fontFamily={MON} fontWeight={700}>{m.value}</text>
        </g>
      ))}
      <text x={14} y={214} fill={MUTED} fontSize={8} fontFamily={SAN}>GPT-4 · XGBoost · KMeans · SHAP · DART API · D3.js</text>
    </svg>
  );
}


function Thumb07() {
  const AC = "#3D7A5A";
  const heat = [
    [0.92, 0.55, 0.28, 0.12],
    [0.68, 0.95, 0.48, 0.22],
    [0.38, 0.78, 0.72, 0.42],
    [0.14, 0.32, 0.52, 0.64],
  ];
  const zones = ["홍대", "이태원", "강남", "여의도"];
  const fc = (v: number) =>
    v > 0.75 ? `rgba(160,40,40,${0.07 + v * 0.16})`
    : v > 0.45 ? `rgba(160,120,30,${0.07 + v * 0.14})`
    : `rgba(50,120,70,${0.06 + v * 0.18})`;
  const sc = (v: number) =>
    v > 0.75 ? `rgba(160,40,40,${0.18 + v * 0.18})`
    : v > 0.45 ? `rgba(160,120,30,${0.16 + v * 0.15})`
    : `rgba(50,120,70,${0.16 + v * 0.16})`;
  return (
    <svg viewBox="0 0 360 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block" }}>
      <text x={14} y={13} fill={MUTED} fontSize={8.5} fontFamily={MON} letterSpacing="0.12em">CROWD SAFETY · DENSITY ROUTING</text>
      <line x1={14} y1={20} x2={346} y2={20} stroke={LINE} strokeWidth={0.8} />

      <text x={14} y={46} fill={AC} fontSize={28} fontFamily={SAN} fontWeight="700">Dispersion</text>
      <text x={14} y={62} fill={MUTED} fontSize={9.5} fontFamily={SAN}>FP-Growth 패턴 → 가중치 추천 엔진 → SQLite 오프라인 캐시</text>

      {heat.map((row, r) =>
        row.map((v, c) => (
          <rect key={`h-${r}-${c}`} x={44 + c * 34} y={74 + r * 18} width={30} height={14} rx={2}
            fill={fc(v)} stroke={sc(v)} strokeWidth={0.7} />
        ))
      )}
      {zones.map((z, i) => (
        <text key={z} x={38} y={85 + i * 18} fill={MUTED} fontSize={8.5} fontFamily={SAN} textAnchor="end">{z}</text>
      ))}

      <rect x={198} y={72} width={150} height={88} rx={3} fill={BOX} stroke={BSTR} strokeWidth={0.8} />
      <text x={273} y={85} textAnchor="middle" fill={MUTED} fontSize={8.5} fontFamily={SAN}>추천 가중치</text>
      {[
        { label: "혼잡도", w: 40 },
        { label: "거리",   w: 30 },
        { label: "유사도", w: 20 },
        { label: "시간대", w: 10 },
      ].map((item, i) => (
        <g key={item.label}>
          <text x={206} y={100 + i * 17} fill={INK2} fontSize={8.5} fontFamily={SAN}>{item.label}</text>
          <rect x={248} y={93 + i * 17} width={54} height={6} rx={1} fill={`rgba(29,38,64,0.05)`} />
          <rect x={248} y={93 + i * 17} width={item.w * 0.54} height={6} rx={1} fill={`rgba(61,122,90,${0.18 + (item.w / 40) * 0.38})`} />
          <text x={308} y={100 + i * 17} fill={AC} fontSize={8.5} fontFamily={MON} fontWeight={700} textAnchor="end">{item.w}%</text>
        </g>
      ))}

      <line x1={14} y1={168} x2={346} y2={168} stroke={LINE} strokeWidth={0.8} />

      {[
        { x: 14,  label: "밀집도 예측", value: "84%" },
        { x: 134, label: "혼잡 회피율", value: "87%" },
        { x: 254, label: "처리 검증",   value: "10,000건" },
      ].map((m, i) => (
        <g key={m.label}>
          {i > 0 && <line x1={m.x - 6} y1={172} x2={m.x - 6} y2={215} stroke={LINE} strokeWidth={0.8} />}
          <text x={m.x} y={183} fill={MUTED} fontSize={8.5} fontFamily={SAN}>{m.label}</text>
          <text x={m.x} y={212} fill={i < 2 ? MG : AC} fontSize={24} fontFamily={MON} fontWeight={700}>{m.value}</text>
        </g>
      ))}
      <text x={14} y={218} fill={MUTED} fontSize={8} fontFamily={SAN}>★ 성신여대 IT경진대회 장려상  ·  FP-Growth · SQLite · 위치 API</text>
    </svg>
  );
}

function Thumb08() {
  const AC = "#5A4C98";
  const barWidths = [22, 30, 18, 26, 34];
  const barLabels = ["매출 변화", "방문 빈도", "객단가", "재방문율", "경쟁 지수"];
  return (
    <svg viewBox="0 0 360 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block" }}>
      <text x={14} y={13} fill={MUTED} fontSize={8.5} fontFamily={MON} letterSpacing="0.12em">COMMERCE AI · SCENARIO SIMULATION</text>
      <line x1={14} y1={20} x2={346} y2={20} stroke={LINE} strokeWidth={0.8} />

      <text x={14} y={46} fill={AC} fontSize={28} fontFamily={SAN} fontWeight="700">Simulation</text>
      <text x={14} y={62} fill={MUTED} fontSize={9.5} fontFamily={SAN}>160 페르소나 · 2-Stage GPT · Before / After 11지표 검증</text>

      {/* inputs */}
      <circle cx={44} cy={88} r={4} fill={BOX} stroke={BSTR} strokeWidth={0.8} />
      <text x={44} y={103} textAnchor="middle" fill={INK} fontSize={9} fontFamily={SAN}>매장 조건</text>
      <circle cx={44} cy={118} r={4} fill={`rgba(90,76,152,0.1)`} stroke={`rgba(90,76,152,0.28)`} strokeWidth={1} />
      <text x={44} y={133} textAnchor="middle" fill={AC} fontSize={9} fontFamily={SAN}>160 페르소나</text>

      <line x1={48} y1={88} x2={94} y2={100} stroke={LINE} strokeWidth={0.8} />
      <line x1={48} y1={118} x2={94} y2={106} stroke={LINE} strokeWidth={0.8} />

      {/* 2-stage GPT */}
      <circle cx={100} cy={103} r={4} fill={`rgba(90,76,152,0.12)`} stroke={AC} strokeWidth={1.1} />
      <text x={100} y={88} textAnchor="middle" fill={AC} fontSize={9} fontFamily={SAN} fontWeight={600}>분석가 GPT</text>
      <text x={100} y={98} textAnchor="middle" fill={MUTED} fontSize={7.5} fontFamily={MON}>Temp 0.1</text>
      <line x1={100} y1={107} x2={100} y2={113} stroke={LINE} strokeWidth={0.8} strokeDasharray="3 2" />
      <circle cx={100} cy={119} r={4} fill={`rgba(90,76,152,0.07)`} stroke={`rgba(90,76,152,0.28)`} strokeWidth={1} />
      <text x={100} y={132} textAnchor="middle" fill={AC} fontSize={9} fontFamily={SAN} fontWeight={600}>전략가 GPT</text>
      <text x={100} y={142} textAnchor="middle" fill={MUTED} fontSize={7.5} fontFamily={MON}>Temp 0.7</text>

      <line x1={104} y1={111} x2={162} y2={100} stroke={LINE} strokeWidth={0.8} />

      {/* before/after bars */}
      <rect x={162} y={74} width={182} height={80} rx={3} fill={BOX} stroke={BSTR} strokeWidth={0.8} />
      <text x={253} y={86} textAnchor="middle" fill={MUTED} fontSize={8} fontFamily={SAN}>Before / After  11지표</text>
      {barLabels.map((label, i) => (
        <g key={label}>
          <text x={170} y={99 + i * 12} fill={INK2} fontSize={8} fontFamily={SAN}>{label}</text>
          <rect x={228} y={93 + i * 12} width={56} height={6} rx={1} fill={`rgba(29,38,64,0.05)`} />
          <rect x={228} y={93 + i * 12} width={barWidths[i] + 12} height={6} rx={1} fill={`rgba(90,76,152,${0.16 + i * 0.05})`} />
        </g>
      ))}

      <line x1={14} y1={162} x2={346} y2={162} stroke={LINE} strokeWidth={0.8} />

      {[
        { x: 14,  label: "사용 의향",   value: "80%" },
        { x: 134, label: "검증 지표",   value: "11개" },
        { x: 254, label: "AI 페르소나", value: "160명" },
      ].map((m, i) => (
        <g key={m.label}>
          {i > 0 && <line x1={m.x - 6} y1={166} x2={m.x - 6} y2={215} stroke={LINE} strokeWidth={0.8} />}
          <text x={m.x} y={177} fill={MUTED} fontSize={8.5} fontFamily={SAN}>{m.label}</text>
          <text x={m.x} y={207} fill={i < 2 ? MG : AC} fontSize={26} fontFamily={MON} fontWeight={700}>{m.value}</text>
        </g>
      ))}
      <text x={14} y={218} fill={MUTED} fontSize={8} fontFamily={SAN}>★ AI NLP 집중과정 3기 장려상  ·  GPT-4.1 · Gemma-2-9b · Flask</text>
    </svg>
  );
}

function Thumb09() {
  const BG = "#080E1A";
  const AC = "#A78BFA";
  const GR = "#34D399";
  const W = "#E2E8F0";
  const M2 = "#4B6080";
  return (
    <svg viewBox="0 0 360 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block" }}>
      <rect width="360" height="200" fill={BG}/>
      <text x={14} y={14} fill={M2} fontSize={8} fontFamily={MON} letterSpacing="0.14em">SCIENTIFIC LLM · CPT + GDPO ALIGNMENT</text>
      <line x1={14} y1={20} x2={346} y2={20} stroke="rgba(167,139,250,0.1)" strokeWidth={0.6}/>

      <text x={14} y={56} fill={AC} fontSize={38} fontFamily={SAN} fontWeight="800" letterSpacing="-0.04em">Alignment</text>
      <text x={14} y={71} fill={M2} fontSize={9} fontFamily={MON}>arXiv · PubMed → Nougat → Nemotron CPT → GDPO</text>

      {/* Pipeline: 3 nodes */}
      {[
        { cx: 60,  label: "Data",  sub: "arXiv · PubMed", hi: false },
        { cx: 180, label: "CPT",   sub: "Nemotron",       hi: true  },
        { cx: 300, label: "GDPO",  sub: "×3 Rewards",     hi: true  },
      ].map((s, i) => (
        <g key={i}>
          <circle cx={s.cx} cy={108} r={28}
            fill={s.hi ? "rgba(167,139,250,0.12)" : "rgba(75,96,128,0.15)"}
            stroke={s.hi ? "rgba(167,139,250,0.4)" : "rgba(75,96,128,0.3)"}
            strokeWidth={1.2}/>
          <text x={s.cx} y={104} textAnchor="middle" fill={s.hi ? AC : W} fontSize={12} fontFamily={SAN} fontWeight="700">{s.label}</text>
          <text x={s.cx} y={116} textAnchor="middle" fill={M2} fontSize={7} fontFamily={MON}>{s.sub}</text>
          {i < 2 && (
            <>
              <line x1={s.cx+28} y1={108} x2={s.cx+60} y2={108} stroke="rgba(167,139,250,0.25)" strokeWidth={1} strokeDasharray="4 3"/>
              <polygon points={`${s.cx+58},105 ${s.cx+64},108 ${s.cx+58},111`} fill="rgba(167,139,250,0.3)"/>
            </>
          )}
        </g>
      ))}

      {/* Metrics */}
      <line x1={14} y1={148} x2={346} y2={148} stroke="rgba(167,139,250,0.08)" strokeWidth={0.6}/>
      {[
        { x: 14,  label: "Base Model", value: "Nemotron", c: AC, size: 22 },
        { x: 154, label: "Rewards",    value: "×3",       c: GR, size: 32 },
        { x: 254, label: "Method",     value: "GDPO",     c: W,  size: 26 },
      ].map((m, i) => (
        <g key={m.label}>
          {i > 0 && <line x1={m.x-8} y1={152} x2={m.x-8} y2={196} stroke="rgba(167,139,250,0.07)" strokeWidth={0.6}/>}
          <text x={m.x} y={163} fill={M2} fontSize={8} fontFamily={MON}>{m.label}</text>
          <text x={m.x} y={192} fill={m.c} fontSize={m.size} fontFamily={MON} fontWeight="700">{m.value}</text>
        </g>
      ))}
    </svg>
  );
}

function Thumb11() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/moim_ui.png"
      alt="MOIM 플랫폼"
      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
    />
  );
}

const thumbMap: Record<string, React.FC> = {
  "01": Thumb01, "02": Thumb02, "03": Thumb03, "04": Thumb04,
  "05": Thumb05, "07": Thumb07, "08": Thumb08,
  "09": Thumb09, "11": Thumb11,
};

// ─── Layout ───────────────────────────────────────────────────────

const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

function Chip({ text }: { text: string }) {
  return (
    <span style={{
      fontFamily: "var(--font-label)", fontSize: 10.5, fontWeight: 500,
      padding: "3px 8px", background: "var(--tag-bg)", color: "var(--tag-text)",
      border: "1px solid var(--border)", borderRadius: 4, whiteSpace: "nowrap" as const,
    }}>
      {text}
    </span>
  );
}

function ProjectCard({ p, idx }: { p: Project; idx: number }) {
  const Thumb = thumbMap[p.num];
  const displayNum = String(idx + 1).padStart(2, "0");
  const visibleTags = p.tags.slice(0, 5);
  const extraTags = p.tags.length - 5;

  return (
    <motion.a
      href={`/projects/${p.slug}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={fadeUp}
      transition={{ duration: 0.45, ease: "easeOut" }}
      style={{
        background: "var(--bg)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 20px rgba(0,0,0,0.07)",
        transition: "box-shadow 0.2s, border-color 0.2s",
        textDecoration: "none",
        cursor: "pointer",
      }}
      className="pcard"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 8px rgba(0,0,0,0.08), 0 12px 32px rgba(0,0,0,0.12)";
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--accent-bd)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 1px 2px rgba(0,0,0,0.04), 0 4px 20px rgba(0,0,0,0.07)";
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)";
      }}
      onMouseDown={(e) => {
        const el = e.currentTarget as HTMLElement;
        const flash = document.createElement("div");
        flash.className = "pcard-flash";
        el.appendChild(flash);
        setTimeout(() => flash.remove(), 350);
      }}
    >
      {/* Thumbnail */}
      <div className="pcard-thumb" style={{ ...(p.thumbBg ? { background: p.thumbBg } : {}), ...(!p.videoUrl && !p.youtubeId && !thumbMap[p.num] && !p.thumbImg ? { height: "auto" } : {}) }}>
        {p.youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${p.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${p.youtubeId}&controls=0&modestbranding=1&rel=0`}
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{ width: "100%", height: "100%", border: "none", display: "block" }}
          />
        ) : p.videoUrl ? (
          <video src={p.videoUrl} autoPlay loop muted playsInline style={p.thumbAutoHeight ? { width: "100%", height: "100%", objectFit: "contain", display: "block" } : undefined} />
        ) : p.thumbImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.thumbImg} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          <div className="pcard-thumb-svg">
            {Thumb && <Thumb />}
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "22px 24px 0", display: "flex", flexDirection: "column", flex: 1 }}>

        {/* num + metadata chips */}
        <div style={{ marginBottom: 10 }}>
          <span style={{ fontFamily: "var(--font-label)", fontSize: 10, letterSpacing: "0.2em", fontWeight: 700, color: "var(--accent)", display: "block", marginBottom: 7 }}>
            {displayNum}
          </span>
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 4 }}>
            {p.date && (
              <span style={{
                fontFamily: "var(--font-label)", fontSize: 9.5, fontWeight: 500,
                color: "#475569", background: "#F1F5F9", borderRadius: 3,
                padding: "0 7px", height: 18, display: "inline-flex", alignItems: "center", lineHeight: 1,
              }}>
                {p.date}
              </span>
            )}
            {p.period && (
              <span style={{
                fontFamily: "var(--font-label)", fontSize: 9.5, fontWeight: 400,
                color: "#94A3B8", background: "#F8FAFC", borderRadius: 3,
                padding: "0 7px", height: 18, display: "inline-flex", alignItems: "center", lineHeight: 1,
              }}>
                {p.period}
              </span>
            )}
            {p.award && (
              <span style={{
                fontFamily: "var(--font-label)", fontSize: 9.5, fontWeight: 600,
                color: "#92400E", background: "#FFFBEB",
                border: "0.5px solid rgba(245,158,11,0.28)", borderRadius: 3,
                padding: "0 7px", height: 18, display: "inline-flex", alignItems: "center", gap: 4, lineHeight: 1,
              }}>
                <span style={{ fontSize: 7, color: "#F59E0B", lineHeight: 1 }}>★</span>
                {p.award}
              </span>
            )}
          </div>
        </div>

        {/* topic — 주제 어구 */}
        <h3 style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.38, letterSpacing: "-0.025em", color: "var(--ink)", marginBottom: 7 }}>
          {p.topic}
        </h3>

        {/* oneliner — 서비스명 + 구체 한 줄 */}
        <p style={{ fontSize: 12, fontWeight: 400, lineHeight: 1.6, letterSpacing: "-0.008em", color: "var(--ink-light)", marginBottom: 14 }}>
          {p.oneliner}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 5, marginBottom: 18 }}>
          {visibleTags.map((t) => <Chip key={t} text={t} />)}
          {extraTags > 0 && (
            <span style={{ fontFamily: "var(--font-label)", fontSize: 10.5, color: "var(--ink-light)", alignSelf: "center" }}>
              +{extraTags}
            </span>
          )}
        </div>
      </div>

      {/* 하단 버튼 */}
      <div style={{
        borderTop: "1px solid var(--border-sub)",
        padding: "10px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span
          className="pcard-action-btn"
          style={{
            fontFamily: "var(--font-label)", fontSize: 12, fontWeight: 500,
            color: "var(--accent)", letterSpacing: "0.02em",
            padding: "6px 10px", borderRadius: 6, cursor: "pointer",
            transition: "background 0.2s",
            display: "inline-flex", alignItems: "center", gap: 5,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "radial-gradient(ellipse at center, rgba(79,192,209,0.07) 0%, transparent 75%)";
            (e.currentTarget.querySelector(".pcard-arrow") as HTMLElement).style.transform = "translateX(3px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            (e.currentTarget.querySelector(".pcard-arrow") as HTMLElement).style.transform = "translateX(0)";
          }}
        >
          Case Study
          <span className="pcard-arrow" style={{ transition: "transform 0.2s ease", display: "inline-block" }}>→</span>
        </span>
        {p.repoUrl && (
          <a
            href={p.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              fontFamily: "var(--font-label)", fontSize: 12, fontWeight: 500,
              color: "var(--ink-light)", letterSpacing: "0.04em",
              textDecoration: "none", padding: "6px 10px", borderRadius: 6,
              transition: "background 0.2s, color 0.2s",
              display: "inline-flex", alignItems: "center", gap: 5,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "radial-gradient(ellipse at center, rgba(79,192,209,0.07) 0%, transparent 75%)";
              e.currentTarget.style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--ink-light)";
            }}
          >
            github ↗
          </a>
        )}
      </div>

      {/* print-only: 항상 DOM에 있고 화면에선 숨김, 인쇄에서만 표시 */}
      <div className="pcard-print-detail">
        <p style={{ fontSize: 11, lineHeight: 1.7, color: "#4B5563", marginBottom: 10, wordBreak: "keep-all" as const }}>
          {p.desc}
        </p>
        <ul style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {p.bullets.map((b) => (
            <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: 6, fontSize: 10.5, lineHeight: 1.65, color: "#111827", wordBreak: "keep-all" as const }}>
              <span style={{ color: "#2563EB", flexShrink: 0, marginTop: 1 }}>›</span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </motion.a>
  );
}

const DEFAULT_RESEARCH_SLUGS = ["ct-mri-cyclegan", "llm-for-science"];

export default function ProjectSection() {
  const company = useCompany();
  const researchSlugs = company.researchSlugs ?? DEFAULT_RESEARCH_SLUGS;
  const [selectedCat, setSelectedCat] = useState<FilterCat>("전체");

  const orderedProjects = useMemo(() => {
    return company.projectOrder
      ? company.projectOrder
          .map(slug => libProjects.find(p => p.slug === slug))
          .filter((p): p is Project => p !== undefined)
      : libProjects.filter(p => !researchSlugs.includes(p.slug));
  }, [company.projectOrder, researchSlugs]);

  const filteredProjects = useMemo(() => {
    if (selectedCat === "전체") return orderedProjects;
    return orderedProjects.filter(p => p.categories?.includes(selectedCat));
  }, [orderedProjects, selectedCat]);

  const svgProjects = useMemo(
    () => libProjects.filter(p => researchSlugs.includes(p.slug)),
    [researchSlugs]
  );

  return (
    <section id="projects" style={{ background: "var(--bg-subtle)", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: "var(--cw)", margin: "0 auto", padding: "72px var(--cp)" }}>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32 }}
        >
          <div>
            <p style={{ fontFamily: "var(--font-label)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>
              Projects
            </p>
            <h2 style={{ fontFamily: "var(--font-sans)", fontSize: 32, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 6 }}>
              프로젝트
            </h2>
            <p style={{ fontSize: 13, color: "var(--ink-light)" }}>
              Selected work in LLM, NLP, and applied AI
            </p>
          </div>
          <a
            href="https://github.com/cofldus" target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, fontWeight: 500, color: "var(--accent)", textDecoration: "none", flexShrink: 0, marginLeft: 24, transition: "opacity 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            GitHub
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>

        {/* Filter tabs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 36 }}>
          {FILTER_CATS.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              style={{
                fontFamily: "var(--font-label)",
                fontSize: 11.5,
                fontWeight: selectedCat === cat ? 600 : 400,
                padding: "6px 14px",
                borderRadius: 20,
                border: selectedCat === cat ? "1.5px solid var(--accent)" : "1px solid var(--border)",
                background: selectedCat === cat ? "rgba(79,192,209,0.09)" : "var(--bg)",
                color: selectedCat === cat ? "var(--accent)" : "var(--ink-light)",
                cursor: "pointer",
                transition: "all 0.15s",
                letterSpacing: "0.02em",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="pcard-grid" style={{ marginBottom: 60 }}>
          {filteredProjects.map((p, i) => <ProjectCard key={p.num} p={p} idx={i} />)}
        </div>

        {/* Research section */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 48, marginBottom: 40 }}>
          <p style={{ fontFamily: "var(--font-label)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "var(--accent)", marginBottom: 6 }}>
            Research &amp; Exploration
          </p>
          <p style={{ fontSize: 13, color: "var(--ink-light)" }}>
            논문 탐구 및 실험 프로젝트
          </p>
        </div>
        <div className="pcard-grid pcard-grid-svg">
          {svgProjects.map((p, i) => <ProjectCard key={p.num} p={p} idx={videoProjects.length + i} />)}
        </div>
      </div>

      <style>{`
        .pcard-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px;
          align-items: start;
        }
        .pcard-grid-svg {
          grid-template-columns: repeat(3, 1fr);
        }
        .pcard {
          transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.22s ease;
        }
        .pcard-flash {
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.45);
          pointer-events: none;
          z-index: 10;
          animation: pcard-flash 0.32s ease-out forwards;
        }
        @keyframes pcard-flash {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        .pcard:hover {
          transform: translateY(-12px) scale(1.38);
          box-shadow: 0 24px 48px rgba(0,0,0,0.14), 0 48px 96px rgba(0,0,0,0.22) !important;
          z-index: 20;
        }
        .pcard:active {
          transform: translateY(2px) scale(0.96);
          transition: transform 0.1s ease, box-shadow 0.1s ease;
          box-shadow: 0 1px 4px rgba(0,0,0,0.07), 0 4px 12px rgba(0,0,0,0.09) !important;
        }
        .pcard-thumb {
          border-bottom: 1px solid var(--border-sub);
          background: #0A1628;
          height: 340px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pcard-thumb video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .pcard-thumb-svg {
          width: 100%;
          height: 100%;
          background: var(--bg-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          box-sizing: border-box;
        }
        @media (max-width: 1024px) {
          .pcard-grid-svg { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .pcard-grid, .pcard-grid-svg { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
