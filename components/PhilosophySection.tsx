"use client";

import { motion } from "framer-motion";

const links = [
  { label: "lcylcy1717@gmail.com", href: "mailto:lcylcy1717@gmail.com", name: "Email" },
  { label: "github.com/cofldus", href: "https://github.com/cofldus", name: "GitHub", external: true },
  { label: "이력서 보기", href: "/resume_v1.html", name: "Resume" },
];

export default function PhilosophySection() {
  return (
    <section id="contact" style={{ background: "var(--bg-subtle)", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: "var(--cw)", margin: "0 auto", padding: "72px var(--cp) 48px" }}>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          style={{
            fontFamily: "var(--font-sans)", fontSize: 30, fontWeight: 700,
            color: "var(--ink)", letterSpacing: "-0.04em", lineHeight: 1.1,
            marginBottom: 14,
          }}
        >
          연락
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08, duration: 0.45 }}
          style={{ fontSize: 14, color: "var(--ink-light)", marginBottom: 40 }}
        >
          AI/NLP 엔지니어 포지션 관련 연락을 받고 있습니다.
        </motion.p>

        <div className="contact-links">
          {links.map((l, i) => (
            <motion.a
              key={l.name}
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="contact-row"
            >
              <span className="contact-name">{l.name}</span>
              <span className="contact-value">{l.label}</span>
            </motion.a>
          ))}
        </div>

        <div style={{
          marginTop: 56, paddingTop: 20,
          borderTop: "1px solid var(--border-sub)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <p style={{ fontFamily: "var(--font-label)", fontSize: 11, color: "var(--ink-ghost)" }}>
            © 2026 이채연
          </p>
          <p style={{ fontFamily: "var(--font-label)", fontSize: 11, color: "var(--ink-ghost)" }}>
            Lee Chaeyeon
          </p>
        </div>
      </div>

      <style>{`
        .contact-links { display: flex; flex-direction: column; }
        .contact-row {
          display: grid;
          grid-template-columns: 96px 1fr;
          gap: 24px;
          align-items: baseline;
          padding: 18px 0;
          border-top: 1px solid var(--border);
          text-decoration: none;
          transition: padding-left 0.18s ease;
        }
        .contact-links .contact-row:last-child { border-bottom: 1px solid var(--border); }
        .contact-row:hover { padding-left: 10px; }
        .contact-row:hover .contact-value { color: var(--accent); }
        .contact-name {
          font-family: var(--font-label); font-size: 11px; font-weight: 600;
          color: #9CA3AF; letter-spacing: 0.08em; text-transform: uppercase;
        }
        .contact-value {
          font-size: 14.5px; color: var(--ink); transition: color 0.18s;
          word-break: break-all;
        }
        @media (max-width: 560px) {
          .contact-row { grid-template-columns: 1fr; gap: 5px; }
        }
      `}</style>
    </section>
  );
}
