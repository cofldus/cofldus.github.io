"use client";

import { useState, useEffect } from "react";

interface Props {
  src: string;
  alt?: string;
  caption?: string;
  maxHeight?: string;
}

export default function LightboxImage({ src, alt = "", caption, maxHeight = "400px" }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <>
      {/* Thumbnail */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative w-full cursor-zoom-in focus:outline-none"
        aria-label="클릭해서 확대"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-contain"
          style={{ maxHeight, background: "#0D1525" }}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-end justify-end p-2">
          <span
            className="opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[9px] tracking-wide px-2 py-0.5"
            style={{ color: "#2A4060", background: "#080C16", border: "1px solid #1C2840" }}
          >
            확대 ↗
          </span>
        </div>
      </button>

      {/* Lightbox overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 lg:p-12"
          style={{ background: "rgba(0,0,0,0.88)" }}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="w-full h-auto max-h-[82vh] object-contain rounded-xl shadow-2xl"
              style={{ background: "white" }}
            />
            {caption && (
              <p className="mt-4 text-center font-mono text-[11px] text-white/50 tracking-wide">
                {caption}
              </p>
            )}
          </div>
          <button
            onClick={() => setOpen(false)}
            className="absolute top-5 right-5 font-mono text-[10px] tracking-widest text-white/50 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-all"
          >
            ESC
          </button>
        </div>
      )}
    </>
  );
}
