"use client";

interface QuoteStripProps {
  quote: string;
  subdued?: boolean;
}

export default function QuoteStrip({ quote, subdued = false }: QuoteStripProps) {
  return (
    <div
      style={{
        borderTop: "1px solid var(--border-sub)",
        borderBottom: "1px solid var(--border-sub)",
        background: subdued ? "var(--bg-subtle)" : "var(--bg)",
        padding: "40px var(--cp)",
      }}
    >
      <div style={{ maxWidth: "var(--cw)", margin: "0 auto", display: "flex", justifyContent: "center" }}>
        <div style={{ textAlign: "center", maxWidth: 640 }}>
          <p style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "clamp(17px, 1.6vw, 22px)",
            fontWeight: 400,
            lineHeight: 1.65,
            color: "var(--ink)",
            letterSpacing: "0.01em",
          }}>
            <span style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.8em",
              lineHeight: 0,
              verticalAlign: "-0.3em",
              color: "var(--accent)",
              opacity: 0.35,
              marginRight: 4,
            }}>&ldquo;</span>
            {quote}
            <span style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.8em",
              lineHeight: 0,
              verticalAlign: "-0.3em",
              color: "var(--accent)",
              opacity: 0.35,
              marginLeft: 4,
            }}>&rdquo;</span>
          </p>
        </div>
      </div>
    </div>
  );
}
