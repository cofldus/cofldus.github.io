const tags = [
  "Python", "PyTorch", "HuggingFace", "LangChain", "LlamaIndex",
  "FAISS", "BM25", "RAG", "LoRA", "GGUF", "KoBART", "KoELECTRA", "FastAPI", "Docker",
];

export default function TechBar() {
  return (
    <div style={{
      borderTop: "1px solid var(--border-sub)",
      borderBottom: "1px solid var(--border-sub)",
      background: "var(--bg-subtle)",
      padding: "14px var(--cp)",
      overflow: "hidden",
    }}>
      <div style={{
        maxWidth: "var(--cw)",
        margin: "0 auto",
        display: "flex",
        flexWrap: "wrap",
        gap: "8px 16px",
        alignItems: "center",
      }}>
        <span style={{
          fontFamily: "var(--font-label)",
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--ink-ghost)",
          flexShrink: 0,
          paddingRight: 8,
          borderRight: "1px solid var(--border)",
        }}>
          Stack
        </span>
        {tags.map((tag, i) => (
          <span key={tag} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{
              fontFamily: "var(--font-label)",
              fontSize: 11,
              color: "var(--ink-light)",
              letterSpacing: "0.04em",
            }}>
              {tag}
            </span>
            {i < tags.length - 1 && (
              <span style={{ color: "var(--border)", fontSize: 10 }}>·</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
