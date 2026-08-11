"use client";

import { motion, type Variants } from "framer-motion";
import profilePhoto from "./profilePhoto";
import { useCompany } from "@/context/CompanyContext";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Hero() {
  const company = useCompany();

  return (
    <section id="about" className="hero" style={{ background: "var(--bg)" }}>
      <div style={{
        width: "100%",
        maxWidth: "var(--cw)",
        margin: "0 auto",
        padding: "0 var(--cp)",
      }}>

        {/* 헤드라인 + 사진 */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(32px, 5vw, 80px)",
        }}>
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            style={{ flex: 1, minWidth: 0 }}
          >
            <h1 style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(40px, 5vw, 60px)",
              fontWeight: 600,
              lineHeight: 1.07,
              letterSpacing: "-0.035em",
              color: "var(--ink)",
              margin: 0,
            }}>
              {company.headline1}
            </h1>

            <p style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(19px, 2vw, 23px)",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              color: "var(--ink-mid)",
              margin: "12px 0 0",
            }}>
              {company.headline2}
            </p>

            <p style={{
              fontFamily: "var(--font-sans)",
              fontSize: 18,
              lineHeight: 1.75,
              color: "var(--ink-mid)",
              margin: "28px 0 0",
              maxWidth: "46ch",
              wordBreak: "keep-all",
            }}>
              {company.subtext}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="hero-photo-col"
            style={{ flexShrink: 0 }}
          >
            <div style={{
              width: "clamp(140px, 14vw, 190px)",
              aspectRatio: "3 / 4",
              overflow: "hidden",
              borderRadius: 10,
              border: "1px solid var(--border)",
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profilePhoto}
                alt="이채연"
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover", objectPosition: "top center",
                  display: "block",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ delay: 0.1 }}
          style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginTop: 40 }}
        >
          <a href="#projects" className="hero-cta hero-cta--primary">프로젝트 보기</a>
          <a href="/resume_v1.html" className="hero-cta">이력서</a>
        </motion.div>

      </div>

      <style>{`
        .hero {
          min-height: 560px;
          display: flex;
          align-items: center;
          padding: 72px 0;
        }
        .hero-photo-col { display: none !important; }
        @media (min-width: 768px) {
          .hero-photo-col { display: block !important; }
        }
        @media (max-width: 640px) {
          .hero { min-height: 0; padding: 56px 0 48px; }
        }
        .hero-cta {
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.005em;
          text-decoration: none;
          padding: 11px 20px;
          border-radius: 6px;
          border: 1px solid var(--border);
          color: var(--ink-mid);
          background: var(--bg);
          transition: border-color 0.15s, color 0.15s;
        }
        .hero-cta:hover { border-color: var(--ink); color: var(--ink); }
        .hero-cta--primary {
          background: var(--ink);
          border-color: var(--ink);
          color: #FFFFFF;
        }
        .hero-cta--primary:hover { opacity: 0.85; color: #FFFFFF; border-color: var(--ink); }
        .hero-cta:focus-visible { outline: 2px solid var(--accent-text); outline-offset: 2px; }
      `}</style>
    </section>
  );
}
