"use client";

import { useState, useRef, useEffect } from "react";

export default function MetricWithNote({
  value, label, note,
}: {
  value: string;
  label: string;
  note?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <div style={{
        fontFamily: "var(--font-sans)",
        fontSize: "clamp(22px, 2.4vw, 30px)",
        fontWeight: 500,
        letterSpacing: "-0.03em",
        color: "#0F172A",
        lineHeight: 1.1,
        fontVariantNumeric: "tabular-nums",
        whiteSpace: "nowrap",
      }}>
        {value}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 7 }}>
        <span style={{
          fontFamily: "var(--font-label)", fontSize: 11,
          color: "#94A3B8", letterSpacing: "0.02em",
        }}>
          {label}
        </span>
        {note && (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={`${label} 측정 조건 보기`}
            className="metric-note-btn"
          >
            i
          </button>
        )}
      </div>

      {note && open && (
        <div role="tooltip" className="metric-note-pop">
          <div style={{
            fontFamily: "var(--font-label)", fontSize: 9.5, fontWeight: 700,
            letterSpacing: "0.1em", color: "#0E7490", marginBottom: 7,
          }}>
            측정 조건
          </div>
          <p style={{
            fontFamily: "var(--font-sans)", fontSize: 12.5, lineHeight: 1.7,
            color: "#334155", margin: 0, wordBreak: "keep-all",
          }}>
            {note}
          </p>
        </div>
      )}

      <style>{`
        .metric-note-btn {
          width: 15px; height: 15px; flex-shrink: 0;
          border-radius: 50%;
          border: 1px solid #CBD5E1;
          background: transparent;
          color: #94A3B8;
          font-family: var(--font-label);
          font-size: 9px; font-weight: 700; font-style: italic;
          line-height: 1; cursor: pointer; padding: 0;
          display: inline-flex; align-items: center; justify-content: center;
          transition: border-color 0.15s, color 0.15s;
        }
        .metric-note-btn:hover, .metric-note-btn[aria-expanded="true"] {
          border-color: #0E7490; color: #0E7490;
        }
        .metric-note-btn:focus-visible {
          outline: 2px solid #0E7490; outline-offset: 2px;
        }
        .metric-note-pop {
          position: absolute; top: calc(100% + 10px); left: 0; z-index: 20;
          width: max(260px, 100%);
          max-width: 320px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          padding: 14px 16px;
          box-shadow: 0 8px 28px rgba(15,23,42,0.12);
        }
      `}</style>
    </div>
  );
}
