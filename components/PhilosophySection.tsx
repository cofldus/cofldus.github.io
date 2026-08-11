"use client";

import { motion } from "framer-motion";

const IconMail = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ flexShrink: 0 }}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const IconGithub = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const infoRows = [
  { label: "이름", value: "이채연 / Lee Chaeyeon" },
  { label: "소속", value: "성신여자대학교 AI융합학부" },
  { label: "졸업예정", value: "2026년 8월" },
  { label: "가용", value: "즉시 가능" },
];

export default function PhilosophySection() {
  return (
    <section
      id="contact"
      style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}
    >
      <div
        style={{
          maxWidth: "var(--cw)",
          margin: "0 auto",
          padding: "64px var(--cp)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-label)",
            fontSize: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: 40,
          }}
        >
          Contact
        </p>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}
          className="contact-grid"
        >
          {/* 좌측: CTA + 연락처 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <h2
              style={{
                fontSize: "clamp(26px, 3vw, 38px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
                color: "var(--ink)",
                marginBottom: 14,
              }}
            >
              채용 기회를<br />찾고 있습니다.
            </h2>
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.9,
                color: "var(--ink-light)",
                marginBottom: 32,
              }}
            >
              AI 리서치 및 NLP 엔지니어링 분야에서<br />
              새로운 기회에 열려 있습니다.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { href: "mailto:lcylcy1717@gmail.com", icon: <IconMail />, label: "lcylcy1717@gmail.com" },
                { href: "https://github.com/cofldus", icon: <IconGithub />, label: "github.com/cofldus", external: true },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 9,
                    fontSize: 14,
                    color: "var(--ink-mid)",
                    textDecoration: "none",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-mid)")}
                >
                  {item.icon}
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* 우측: 기본 정보 테이블 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.45 }}
            style={{
              borderLeft: "1px solid var(--border)",
              paddingLeft: 48,
            }}
            className="contact-info"
          >
            {infoRows.map((row, i) => (
              <div
                key={row.label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "72px 1fr",
                  gap: 16,
                  padding: "14px 0",
                  borderBottom: i < infoRows.length - 1 ? "1px solid var(--border-sub)" : "none",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-label)",
                    fontSize: 10,
                    color: "var(--ink-light)",
                    paddingTop: 2,
                    letterSpacing: "0.04em",
                  }}
                >
                  {row.label}
                </span>
                <span style={{ fontSize: 13.5, color: "var(--ink)", lineHeight: 1.5 }}>
                  {row.value}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 하단 */}
        <div
          style={{
            marginTop: 52,
            paddingTop: 20,
            borderTop: "1px solid var(--border-sub)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ fontFamily: "var(--font-label)", fontSize: 11, color: "var(--ink-ghost)" }}>
            © 2026 이채연
          </p>
          <p style={{ fontFamily: "var(--font-label)", fontSize: 11, color: "var(--ink-ghost)" }}>
            Lee Chaeyeon
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .contact-info { border-left: none !important; padding-left: 0 !important; }
        }
      `}</style>
    </section>
  );
}
