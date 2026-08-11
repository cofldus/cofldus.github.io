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
    <section id="about" style={{ background: "#FFFFFF", overflow: "hidden" }}>
      <div style={{
        width: "100%",
        maxWidth: "var(--cw)",
        margin: "0 auto",
        padding: "64px var(--cp) 56px",
      }}>

        {/* 헤드라인 + 사진 */}
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "clamp(32px, 5vw, 80px)",
        }}>
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            style={{ flex: 1, minWidth: 0, paddingLeft: 2 }}
          >
            <h1 style={{
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
              fontSize: "clamp(36px, 4.6vw, 64px)",
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#0A0A0A",
              margin: 0,
            }}>
              {company.headline1}
            </h1>

            <p style={{
              fontFamily: "var(--font-label)",
              fontSize: "clamp(14px, 1.5vw, 18px)",
              fontWeight: 500,
              letterSpacing: "0.01em",
              color: "#6B7280",
              margin: "14px 0 0",
            }}>
              {company.headline2}
            </p>

            <p style={{
              fontFamily: "var(--font-sans)",
              fontSize: 14.5,
              lineHeight: 1.85,
              color: "#4B5563",
              margin: "26px 0 0",
              maxWidth: "58ch",
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
              width: "clamp(130px, 13vw, 175px)",
              aspectRatio: "3 / 4",
              overflow: "hidden",
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
          style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap", marginTop: 36 }}
        >
          <a href="#projects" className="hero-cta hero-cta--primary">프로젝트</a>
          <a href="/resume_v1.html" className="hero-cta">이력서</a>
          <a href="https://github.com/cofldus" target="_blank" rel="noopener noreferrer" className="hero-cta hero-cta--text">
            GitHub ↗
          </a>
        </motion.div>

      </div>

      <style>{`
        .hero-photo-col { display: none !important; }
        @media (min-width: 768px) {
          .hero-photo-col { display: block !important; }
        }
        .hero-cta {
          font-family: var(--font-label);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 3px;
          border: 1px solid #D1D5DB;
          color: #4B5563;
          transition: border-color 0.15s, color 0.15s;
        }
        .hero-cta:hover { border-color: #0A0A0A; color: #0A0A0A; }
        .hero-cta--primary {
          background: #0A0A0A;
          border-color: #0A0A0A;
          color: #FFFFFF;
        }
        .hero-cta--primary:hover { opacity: 0.8; color: #FFFFFF; }
        .hero-cta--text {
          border-color: transparent;
          padding-left: 6px;
          padding-right: 6px;
        }
        .hero-cta--text:hover { border-color: transparent; }
      `}</style>
    </section>
  );
}
