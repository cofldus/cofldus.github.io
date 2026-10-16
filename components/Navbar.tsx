"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/profile";

const links = [
  { label: "Work", hash: "#work" },
  { label: "Experience", hash: "#experience" },
  { label: "Capabilities", hash: "#capabilities" },
  { label: "Projects", hash: "#projects" },
  { label: "Contact", hash: "#contact" },
];

/**
 * @param base 홈에서는 "" (같은 페이지 앵커), 상세 페이지에서는 "/" (홈으로 이동)
 */
export default function Navbar({ base = "" }: { base?: string }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Esc 로 닫고 버튼으로 포커스 복귀, 데스크톱 폭이 되면 닫기
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 861px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  return (
    <nav className="nav" aria-label="주 메뉴">
      <div className="container nav-inner">
        <a href={base || "#top"} className="nav-brand">
          <span className="nav-brand-name">{site.name}</span>
          <span className="nav-brand-role">Applied AI Engineer</span>
        </a>

        <div className="nav-links">
          {links.map((l) => (
            <a key={l.hash} href={`${base}${l.hash}`} className="nav-link">{l.label}</a>
          ))}
          <a href={site.resumeUrl} className="btn btn--primary nav-cta">Resume</a>
        </div>

        <button
          ref={buttonRef}
          type="button"
          className="nav-burger"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          aria-controls="nav-drawer"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      <div id="nav-drawer" className="nav-drawer" hidden={!open}>
        {links.map((l) => (
          <a
            key={l.hash}
            href={`${base}${l.hash}`}
            onClick={(e) => {
              setOpen(false);
              // 같은 페이지 앵커는 드로어가 닫힌 뒤 스크롤해야 위치가 어긋나지 않는다
              const target = !base ? document.querySelector(l.hash) : null;
              if (target) {
                e.preventDefault();
                requestAnimationFrame(() => {
                  target.scrollIntoView({ block: "start" });
                  history.replaceState(null, "", l.hash);
                });
              }
            }}
          >
            {l.label}
          </a>
        ))}
        <a href={site.resumeUrl} onClick={() => setOpen(false)}>Resume</a>
      </div>
    </nav>
  );
}
