"use client";

import { useEffect, useState } from "react";

export interface TocItem {
  id: string;
  label: string;
}

export default function StickyToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((e): e is HTMLElement => e !== null);
    if (els.length === 0) return;

    const onScroll = () => {
      const y = window.scrollY + 140;
      let current = els[0].id;
      for (const el of els) {
        if (el.offsetTop <= y) current = el.id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return (
    <nav aria-label="목차" className="toc">
      <ul className="toc-list">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              className={`toc-link${active === i.id ? " toc-link--active" : ""}`}
              aria-current={active === i.id ? "true" : undefined}
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>

      <style>{`
        .toc-list { list-style: none; margin: 0; padding: 0; }
        .toc-link {
          display: block;
          padding: 7px 0 7px 12px;
          border-left: 2px solid #E2E8F0;
          font-family: var(--font-label);
          font-size: 12px;
          font-weight: 500;
          color: #94A3B8;
          text-decoration: none;
          letter-spacing: -0.01em;
          transition: color 0.15s, border-color 0.15s, font-weight 0.15s;
        }
        .toc-link:hover { color: #475569; }
        .toc-link--active {
          color: #0F172A;
          font-weight: 700;
          border-left-color: #0E7490;
        }
        .toc-link:focus-visible { outline: 2px solid #0E7490; outline-offset: 2px; }

        /* 모바일: 가로 스크롤 탭 */
        @media (max-width: 900px) {
          .toc {
            position: sticky; top: 52px; z-index: 10;
            background: rgba(255,255,255,0.97);
            backdrop-filter: blur(8px);
            margin: 0 calc(var(--cp) * -1);
            padding: 0 var(--cp);
            border-bottom: 1px solid #E2E8F0;
          }
          .toc-list {
            display: flex; gap: 4px;
            overflow-x: auto;
            scrollbar-width: none;
          }
          .toc-list::-webkit-scrollbar { display: none; }
          .toc-link {
            padding: 12px 10px;
            border-left: none;
            border-bottom: 2px solid transparent;
            white-space: nowrap;
          }
          .toc-link--active { border-bottom-color: #0E7490; }
        }
      `}</style>
    </nav>
  );
}
