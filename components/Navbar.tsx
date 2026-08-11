"use client";

import { useState, useEffect, useRef } from "react";

const links = [
  { label: "프로젝트",  href: "#projects" },
  { label: "경력",      href: "#education" },
  { label: "이력서",    href: "/resume_v1.html" },
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
          {/* 이름 */}
          <a href="#about" style={{ textDecoration: "none" }}>
            <span style={{
              fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700,
              letterSpacing: "-0.02em", color: "var(--ink)",
            }}>
              이채연
            </span>
          </a>

          {/* 데스크톱 링크 */}
          <div className="nav-desktop">
            {links.map((l) => (
              <a key={l.label} href={l.href} style={{
                fontFamily: "var(--font-label)", fontSize: 12, fontWeight: 500,
                color: "var(--ink-light)", textDecoration: "none", letterSpacing: "0.04em",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-light)")}
              >{l.label}</a>
            ))}
          </div>

          {/* 햄버거 버튼 (모바일) */}
          <button
            className="nav-burger"
            onClick={() => setOpen((o) => !o)}
            aria-label="메뉴"
            aria-expanded={open}
            aria-controls="nav-drawer"
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
        <div id="nav-drawer" className={`nav-drawer ${open ? "nav-drawer--open" : ""}`}>
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
