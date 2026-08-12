"use client";

import { motion } from "framer-motion";

// LinkedIn·Blog 는 주소를 확인한 뒤 여기에 추가한다.
const links = [
  { label: "Email", href: "mailto:lcylcy3816@naver.com" },
  { label: "GitHub", href: "https://github.com/cofldus", external: true },
  { label: "Resume", href: "/resume_v1.html" },
];

export default function PhilosophySection() {
  return (
    <section
      id="contact"
      style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}
    >
      <div className="sec-wrap">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          style={{ maxWidth: "var(--measure)" }}
        >
          <h2 className="sec-title" style={{ marginBottom: 16 }}>연락</h2>

          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: 16.5,
            lineHeight: 1.75,
            color: "var(--ink-mid)",
            margin: "0 0 32px",
            wordBreak: "keep-all",
          }}>
            AI/NLP 엔지니어 포지션 관련 연락을 받고 있습니다.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                className="contact-link"
              >
                {l.label}
              </a>
            ))}
          </div>
        </motion.div>

        <div style={{
          marginTop: 56,
          paddingTop: 20,
          borderTop: "1px solid var(--border-sub)",
        }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--ink-light)" }}>
            © 2026 이채연
          </p>
        </div>
      </div>

      <style>{`
        .contact-link {
          display: inline-flex;
          align-items: center;
          min-height: 44px;
          padding: 11px 20px;
          border: 1px solid var(--border);
          border-radius: 6px;
          font-family: var(--font-sans);
          font-size: 15px;
          font-weight: 400;
          color: var(--ink-mid);
          text-decoration: none;
          transition: border-color 0.15s, color 0.15s;
        }
        .contact-link:hover { border-color: var(--ink); color: var(--ink); }
        .contact-link:focus-visible { outline: 2px solid var(--accent-text); outline-offset: 2px; }
      `}</style>
    </section>
  );
}
