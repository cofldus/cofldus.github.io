"use client";

import { motion, type Variants, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import profilePhoto from "./profilePhoto";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.032, delayChildren: 2.45 } },
};

// 민트 반짝 별
function Star({ x, y, size, delay, dur }: { x: string; y: string; size: number; delay: number; dur: number }) {
  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 24 24"
      style={{ position: "absolute", top: y, left: x, pointerEvents: "none" }}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: [0, 0.8, 0.25, 0.85, 0], scale: [0.4, 1, 0.7, 1.1, 0.5], rotate: [0, 18, -10, 14, 0] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: "easeInOut", repeatDelay: dur * 0.7 }}
    >
      <path d="M12 2 L13.5 10 L22 12 L13.5 14 L12 22 L10.5 14 L2 12 L10.5 10 Z" fill="rgba(79,192,209,0.70)" />
    </motion.svg>
  );
}
function StarCluster() {
  return (
    <>
      {/* from idea 오른쪽 */}
      <Star x="calc(100% + 10px)"  y="-22px" size={15} delay={1.4} dur={2.5} />
      <Star x="calc(100% + 32px)"  y="4px"   size={9}  delay={1.9} dur={2.0} />
      <Star x="calc(100% + 18px)"  y="20px"  size={7}  delay={2.4} dur={1.8} />
      {/* from idea 위 */}
      <Star x="38%"  y="-28px" size={8}  delay={2.0} dur={2.2} />
      <Star x="62%"  y="-36px" size={11} delay={2.7} dur={2.7} />
      <Star x="78%"  y="-20px" size={6}  delay={3.2} dur={1.9} />
    </>
  );
}

// 사인파 idle wave — 더 크고 느리게
const WAVE_Y = [0, -1, -2.5, -3.5, -4, -2.5, 0, 2.5, 4, 3.5, 2.5, 1, 0];
const WAVE_T = [0, 0.083, 0.167, 0.25, 0.333, 0.417, 0.5, 0.583, 0.667, 0.75, 0.833, 0.917, 1];
const WAVE_DUR = 7.0;   // 더 느린 주기
const WAVE_STAGGER = 0.09; // 글자 간 위상차

// ⑤ clip reveal: 마스크 안에서 아래→위로 밀려 올라옴, 이후 idle wave
function RevealLine({
  text,
  revealDelay,
  waveDelay,
  scaleOrigin,
  shake = false,
}: {
  text: string;
  revealDelay: number;
  waveDelay: number;
  scaleOrigin?: string;
  shake?: boolean;
}) {
  const [hoverOffsets, setHoverOffsets] = useState<number[] | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    // 진입 완료 후 shake → wave
    const t1 = setTimeout(() => {
      if (shake) setShaking(true);
    }, (revealDelay + 0.65) * 1000);
    const t2 = setTimeout(() => {
      setShaking(false);
      setRevealed(true);
    }, (revealDelay + 0.65 + 0.7) * 1000); // shake 0.7초 후 wave
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [revealDelay, shake]);

  const onMouseEnter = useCallback((idx: number) => {
    setHoverOffsets(Array.from({ length: text.length }, (_, i) => {
      const dist = Math.abs(i - idx);
      if (dist === 0) return -10;
      if (dist === 1) return -6;
      if (dist === 2) return -2.5;
      return 0;
    }));
  }, [text.length]);

  const onMouseLeave = useCallback(() => setHoverOffsets(null), []);

  return (
    // 마스크: overflow hidden으로 아래에서 올라오는 글자를 가림
    // padding으로 폰트 ascender/descender 여유 확보, margin으로 레이아웃 상쇄
    <div style={{
      overflow: "hidden",
      transformOrigin: scaleOrigin ?? "center",
      paddingTop: "0.3em",
      paddingBottom: "0.4em",
      marginTop: "-0.3em",
      marginBottom: "-0.4em",
      paddingLeft: "0.18em",
      paddingRight: "0.18em",
      marginLeft: "-0.18em",
      marginRight: "-0.18em",
    }}>
      <motion.span
        initial={{ y: "108%" }}
        animate={shaking
          ? { y: ["0%", "-1.2%", "1.4%", "-1.0%", "1.2%", "-0.7%", "0.8%", "-0.4%", "0.5%", "0%"] }
          : { y: "0%" }
        }
        transition={shaking
          ? { duration: 0.65, times: [0, 0.1, 0.22, 0.34, 0.46, 0.58, 0.68, 0.78, 0.88, 1], ease: "easeOut" }
          : { duration: 0.62, ease: [0.22, 1, 0.36, 1], delay: revealDelay }
        }
        style={{ display: "block" }}
      >
        {text.split("").map((ch, i) => (
          <motion.span
            key={i}
            animate={
              hoverOffsets
                ? { y: hoverOffsets[i] }
                : revealed
                  ? { y: WAVE_Y }
                  : { y: 0 }
            }
            transition={
              hoverOffsets
                ? { type: "spring", stiffness: 380, damping: 20, mass: 0.5 }
                : revealed
                  ? {
                      duration: WAVE_DUR,
                      times: WAVE_T,
                      repeat: Infinity,
                      ease: "linear",
                      delay: waveDelay + i * WAVE_STAGGER,
                      repeatType: "loop",
                    }
                  : { duration: 0 }
            }
            onMouseEnter={() => onMouseEnter(i)}
            onMouseLeave={onMouseLeave}
            style={{
              display: "inline-block",
              whiteSpace: ch === " " ? "pre" : "normal",
              cursor: "default",
            }}
          >
            {ch}
          </motion.span>
        ))}
      </motion.span>
    </div>
  );
}

export default function Hero() {
  const subtextControls = useAnimation();
  const labelControls = useAnimation();
  const photoControls = useAnimation();

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.35 });

  useEffect(() => {
    if (!isInView) return;

    labelControls.set({ opacity: 0 });
    photoControls.set({ opacity: 0 });
    subtextControls.start("hidden");

    labelControls.start({ opacity: 1, transition: { duration: 0.5 } });
    photoControls.start({ opacity: 1, transition: { duration: 0.9, delay: 0.2 } });
    subtextControls.start("show");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  return (
    <section ref={sectionRef} id="about" style={{
      background: "radial-gradient(ellipse at 15% 65%, rgba(79,192,209,0.13) 0%, transparent 55%), radial-gradient(ellipse at 85% 15%, rgba(79,192,209,0.09) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(255,220,80,0.06) 0%, transparent 45%), radial-gradient(ellipse at 30% 20%, rgba(180,120,230,0.05) 0%, transparent 42%), #FFFFFF",
      boxShadow: "0 6px 24px rgba(0,0,0,0.06)",
      overflow: "hidden",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "var(--cw)",
        margin: "0 auto",
        padding: "52px var(--cp) 48px",
      }}>

        {/* 상단 라벨 */}
        <motion.p
          animate={labelControls}
          initial={{ opacity: 0 }}
          style={{
            fontFamily: "var(--font-label)",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#9CA3AF",
            marginBottom: 24,
          }}
        >
          이채연 &nbsp;·&nbsp; AI / NLP Engineer
        </motion.p>

        {/* 메인 레이아웃: 헤드라인 + 사진 */}
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "clamp(32px, 5vw, 80px)",
          marginBottom: 32,
        }}>
          <h1
            style={{
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
              fontSize: "clamp(32px, 4.4vw, 62px)",
              fontWeight: 300,
              lineHeight: 1.18,
              color: "#0A0A0A",
              margin: 0,
              flex: 1,
              minWidth: 0,
              paddingLeft: 4,
            }}
          >
            {/* line 1: clip reveal 0.25s 후 */}
            <span style={{ display: "block", position: "relative" }}>
              <RevealLine text="From idea" revealDelay={0.25} waveDelay={1.2} scaleOrigin="left" />
              <StarCluster />
            </span>
            {/* line 2: clip reveal 0.9s 후, 착지 후 부들부들 */}
            <RevealLine text="to Real Systems." revealDelay={0.9} waveDelay={2.35} shake />
          </h1>

          {/* 사진 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={photoControls}
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

        {/* 하단: 서브카피 + CTA */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={subtextControls}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(24px, 4vw, 64px)",
            flexWrap: "wrap",
            paddingTop: 24,
          }}
        >
          <motion.p
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.032 } },
            }}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 13.5,
              lineHeight: 1.85,
              color: "#6B7280",
              fontWeight: 400,
              margin: 0,
              flex: 1,
              minWidth: 200,
            }}
          >
            {"도메인 특화 RAG 파이프라인(BM25·FAISS·리랭킹)과 NLP/LLM 서비스를 설계·구현하고, 검색 정확도와 응답 품질을 평가 파이프라인으로 정량 검증합니다.".split("").map((ch, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 7 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" } },
                }}
                style={{ display: "inline-block", whiteSpace: ch === " " ? "pre" : "normal" }}
              >
                {ch}
              </motion.span>
            ))}
          </motion.p>

          <motion.div variants={fadeUp} style={{ display: "flex", gap: 20, alignItems: "center", flexShrink: 0 }}>
            <a
              href="#projects"
              style={{
                fontFamily: "var(--font-label)",
                fontSize: 11, fontWeight: 700,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "#FFFFFF", background: "#0A0A0A",
                textDecoration: "none", padding: "10px 22px",
                borderRadius: 3, transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              View Projects
            </a>
            <a
              href="/resume_v1.html"
              style={{
                fontFamily: "var(--font-label)",
                fontSize: 11, fontWeight: 600,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: "#6B7280", textDecoration: "none",
                background: "transparent",
                border: "1px solid #D1D5DB",
                padding: "9px 20px",
                borderRadius: 3, transition: "all 0.18s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#4fc0d1";
                e.currentTarget.style.color = "#4fc0d1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#D1D5DB";
                e.currentTarget.style.color = "#6B7280";
              }}
            >
              Resume
            </a>
          </motion.div>
        </motion.div>

      </div>

<style>{`
        .hero-photo-col { display: none !important; }
        @media (min-width: 768px) {
          .hero-photo-col { display: block !important; }
        }
      `}</style>
    </section>
  );
}
