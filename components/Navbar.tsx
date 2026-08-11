"use client";

import { useState, useEffect, useRef } from "react";

const links = [
  { label: "소개",      href: "#about" },
  { label: "성과",      href: "#impact" },
  { label: "기술",      href: "#tech-stack" },
  { label: "프로젝트",  href: "#projects" },
  { label: "이력",      href: "#education" },
  { label: "연락",      href: "#contact" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      if (y < 80) { setVisible(true); lastY.current = y; return; }
      if (y > lastY.current + 4) { setVisible(false); setOpen(false); }
      else if (y < lastY.current - 4) setVisible(true);
      lastY.current = y;
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 30,
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.3s ease",
      }}>
        <div style={{
          maxWidth: "var(--cw)", margin: "0 auto", padding: "0 var(--cp)",
          height: 52, display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* 상태 배지 */}
          <a href="#about" style={{ textDecoration: "none" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              padding: "3px 10px", border: "1px solid rgba(79,192,209,0.3)",
              borderRadius: 20,
              background: "linear-gradient(135deg, rgba(79,192,209,0.12) 0%, rgba(180,120,230,0.08) 100%)",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent)", display: "inline-block", flexShrink: 0 }} />
              <span style={{ fontFamily: "var(--font-label)", fontSize: 9, letterSpacing: "0.08em", color: "var(--accent)", textTransform: "uppercase" }}>
                Open to opportunities
              </span>
            </div>
          </a>

          {/* 데스크톱 링크 */}
          <div className="nav-desktop">
            {links.map((l) => (
              <a key={l.label} href={l.href} style={{
                fontFamily: "var(--font-label)", fontSize: 12, fontWeight: 500,
                color: "var(--ink-light)", textDecoration: "none", letterSpacing: "0.04em",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-light)")}
              >{l.label}</a>
            ))}
          </div>

          {/* 햄버거 버튼 (모바일) */}
          <button
            className="nav-burger"
            onClick={() => setOpen((o) => !o)}
            aria-label="메뉴"
          >
            {open ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* 모바일 드롭다운 */}
        <div className={`nav-drawer ${open ? "nav-drawer--open" : ""}`}>
          {links.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="nav-drawer-link">
              {l.label}
            </a>
          ))}
        </div>
      </nav>

      <style>{`
        .nav-desktop {
          display: flex;
          gap: 28px;
        }
        .nav-burger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          color: var(--ink);
          align-items: center;
          justify-content: center;
        }
        .nav-drawer {
          display: none;
          flex-direction: column;
          border-top: 1px solid var(--border);
          background: rgba(255,255,255,0.98);
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.25s ease;
        }
        .nav-drawer--open {
          max-height: 320px;
        }
        .nav-drawer-link {
          display: block;
          padding: 12px var(--cp);
          font-family: var(--font-label);
          font-size: 14px;
          font-weight: 500;
          color: var(--ink);
          text-decoration: none;
          border-bottom: 1px solid var(--border-sub);
        }
        @media (max-width: 640px) {
          .nav-desktop { display: none; }
          .nav-burger { display: flex; }
          .nav-drawer { display: flex; }
        }
      `}</style>
    </>
  );
}
