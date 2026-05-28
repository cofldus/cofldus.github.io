"use client";

import { useState } from "react";
import type { Project } from "@/lib/projects";

const A    = "#4fc0d1";
const INK  = "#0F172A";
const BODY = "#334155";
const RULE = "#E2E8F0";

export default function ProjectDetailClient({ project: p }: { project: Project }) {
  return (
    <article>

      {/* 01 — 문제 정의 */}
      <Section step="01" title="문제 정의 및 접근" first>
        <p style={{
          fontFamily: "var(--font-sans)",
          fontSize: 16.5, lineHeight: 1.85, color: BODY,
          margin: 0, wordBreak: "keep-all",
        }}>
          {p.desc}
        </p>
      </Section>

      {/* ARCH — 시스템 아키텍처 */}
      {p.archImages && p.archImages.length > 0 && (
        <Section step="ARCH" title="시스템 아키텍처">
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {p.archImages.map((src, i) => (
              <div key={i} style={{
                border: `1px solid ${RULE}`,
                borderRadius: 10,
                overflow: "hidden",
                background: "#FAFBFC",
                padding: 20,
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`아키텍처 다이어그램 ${i + 1}`}
                  style={{ width: "100%", height: "auto", display: "block", borderRadius: 6 }}
                />
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* 02 — 핵심 구현 */}
      <Section step="02" title="핵심 구현 내용">
        {p.bullets.map((b, i) => (
          <div key={i} style={{
            display: "flex", gap: 18, alignItems: "flex-start",
            paddingBottom: 14, marginBottom: 14,
            borderBottom: i < p.bullets.length - 1 ? `1px solid ${RULE}` : "none",
          }}>
            <Num>{String(i + 1).padStart(2, "0")}</Num>
            <span style={{
              fontFamily: "var(--font-sans)", fontSize: 15.5, lineHeight: 1.75,
              color: BODY, wordBreak: "keep-all",
            }}>
              {b}
            </span>
          </div>
        ))}
      </Section>

      {/* 03 — 트러블슈팅 */}
      {p.troubleshooting && p.troubleshooting.length > 0 && (
        <Section step="03" title="트러블슈팅">
          <TroubleshootingList items={p.troubleshooting} />
        </Section>
      )}

      {/* 04 — 배운 점 */}
      {p.insight && (
        <Section step="04" title="배운 점">
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: 16.5, lineHeight: 1.9,
            color: INK, margin: 0, wordBreak: "keep-all",
            paddingLeft: 20,
            borderLeft: `3px solid ${A}`,
          }}>
            {p.insight}
          </p>
        </Section>
      )}

      {/* ── 상세 기록 (접힘) ── */}
      <DetailAppendix p={p} />

    </article>
  );
}

/* ── 트러블슈팅 아코디언 ── */
function TroubleshootingList({ items }: { items: NonNullable<Project["troubleshooting"]> }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {items.map((t, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            style={{
              borderLeft: `3px solid ${isOpen ? "#D97706" : "#FCD34D"}`,
              background: isOpen ? "rgba(245,158,11,0.06)" : "rgba(245,158,11,0.025)",
              borderRadius: "0 8px 8px 0",
              overflow: "hidden",
              transition: "background 0.15s",
            }}
          >
            {/* 타이틀 행 — 클릭 토글 */}
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                padding: "13px 18px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span style={{
                fontFamily: "var(--font-label)",
                fontSize: 13.5,
                fontWeight: 700,
                color: "#B45309",
                letterSpacing: "-0.01em",
                lineHeight: 1.4,
              }}>
                {t.title}
              </span>
              <span style={{
                fontFamily: "var(--font-label)",
                fontSize: 11,
                color: "#D97706",
                flexShrink: 0,
                transition: "transform 0.15s",
                display: "inline-block",
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}>
                ▾
              </span>
            </button>

            {/* 본문 — 열렸을 때만 */}
            {isOpen && (
              <div style={{ padding: "0 18px 14px" }}>
                <p style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 15,
                  lineHeight: 1.8,
                  color: BODY,
                  margin: 0,
                  wordBreak: "keep-all",
                }}>
                  {t.body}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── 상세 기록 (기술 선택 + 실험 로그 — 기본 접힘) ── */
function DetailAppendix({ p }: { p: Project }) {
  const [show, setShow] = useState(false);
  const hasDecisions = p.decisions && p.decisions.length > 0;
  const hasExperiments = p.experiments && p.experiments.length > 0;
  if (!hasDecisions && !hasExperiments) return null;

  return (
    <section style={{ paddingTop: 40, borderTop: `1px solid ${RULE}` }}>
      <button
        onClick={() => setShow((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <span style={{
          fontFamily: "var(--font-label)",
          fontSize: 13,
          fontWeight: 700,
          color: "#94A3B8",
          letterSpacing: "0.03em",
        }}>
          {show ? "▾ 상세 기록 접기" : "▸ 상세 기록 — 기술 선택 근거 · 실험 로그"}
        </span>
      </button>

      {show && (
        <div style={{ marginTop: 36 }}>

          {/* 기술 선택 근거 */}
          {hasDecisions && (
            <div style={{ marginBottom: 48 }}>
              <SubHeading step="A" title="기술 선택 근거" />
              {p.decisions.map((d, i) => (
                <div key={d.tech}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 10 }}>
                    <Num>{String(i + 1).padStart(2, "0")}</Num>
                    <h3 style={{
                      fontFamily: "var(--font-label)", fontSize: 15, fontWeight: 700,
                      color: INK, margin: 0, letterSpacing: "-0.01em",
                    }}>
                      {d.tech}
                    </h3>
                  </div>
                  <p style={{
                    fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.8,
                    color: BODY, margin: 0, paddingLeft: 32, wordBreak: "keep-all",
                  }}>
                    {d.reason}
                  </p>
                  {d.refs && d.refs.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 8px", marginTop: 12, paddingLeft: 32 }}>
                      {d.refs.map((ref) => (
                        <a
                          key={ref.url}
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontFamily: "var(--font-label)", fontSize: 10.5, fontWeight: 600,
                            color: A, background: "rgba(79,192,209,0.07)",
                            border: "1px solid rgba(79,192,209,0.25)", borderRadius: 3,
                            padding: "2px 8px", textDecoration: "none",
                            letterSpacing: "0.02em", lineHeight: 1.8,
                          }}
                        >
                          ↗ {ref.label}
                        </a>
                      ))}
                    </div>
                  )}
                  {i < p.decisions.length - 1 && <Divider />}
                </div>
              ))}
            </div>
          )}

          {/* 실험 로그 */}
          {hasExperiments && (
            <div>
              <SubHeading step="B" title="실험 로그 — 시행착오 기록" />
              {/* Progress dots */}
              <div style={{ display: "flex", alignItems: "center", marginBottom: 36, paddingLeft: 32 }}>
                {p.experiments!.map((e, i) => {
                  const isLast = i === p.experiments!.length - 1;
                  return (
                    <div key={e.id} style={{ display: "flex", alignItems: "center" }}>
                      <div style={{
                        width: isLast ? 8 : 6, height: isLast ? 8 : 6,
                        borderRadius: "50%",
                        background: isLast ? A : "#CBD5E1",
                      }} />
                      {i < p.experiments!.length - 1 && (
                        <div style={{ width: 24, height: 1, background: "#CBD5E1" }} />
                      )}
                    </div>
                  );
                })}
              </div>

              {p.experiments!.map((e, i) => {
                const isLast = i === p.experiments!.length - 1;
                return (
                  <div key={e.id} style={{
                    display: "flex",
                    marginBottom: i < p.experiments!.length - 1 ? 32 : 0,
                  }}>
                    <div style={{
                      width: 32, flexShrink: 0,
                      display: "flex", flexDirection: "column", alignItems: "center",
                      paddingTop: 2,
                    }}>
                      <span style={{
                        fontFamily: "var(--font-display)", fontSize: 9, fontWeight: 800,
                        color: isLast ? A : "#94A3B8",
                        letterSpacing: "0.08em", lineHeight: 1, marginBottom: 10,
                      }}>
                        {e.id}
                      </span>
                      {i < p.experiments!.length - 1 && (
                        <div style={{ flex: 1, width: 1, background: RULE, minHeight: 56 }} />
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      {isLast && (
                        <div style={{
                          fontFamily: "var(--font-label)", fontSize: 10, fontWeight: 700,
                          color: A, letterSpacing: "0.1em", textTransform: "uppercase",
                          marginBottom: 8,
                        }}>
                          ✓ 최종 채택
                        </div>
                      )}
                      <p style={{
                        fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 700,
                        color: INK, margin: "0 0 8px",
                        lineHeight: 1.5, letterSpacing: "-0.01em", wordBreak: "keep-all",
                      }}>
                        {e.hypothesis}
                      </p>
                      <p style={{
                        fontFamily: "var(--font-sans)", fontSize: 14.5, lineHeight: 1.75,
                        color: BODY, margin: "0 0 12px", wordBreak: "keep-all",
                      }}>
                        {e.result}
                      </p>
                      <div style={{
                        fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600,
                        color: isLast ? A : "#475569", letterSpacing: "-0.01em",
                      }}>
                        → {e.conclusion}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function Section({
  step, title, first = false, children,
}: {
  step: string; title: string; first?: boolean; children: React.ReactNode;
}) {
  return (
    <section style={{
      paddingTop: first ? 40 : 48,
      paddingBottom: 48,
      borderTop: first ? "none" : `1px solid ${RULE}`,
    }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 28 }}>
        <span style={{
          fontFamily: "var(--font-display)", fontSize: 10, fontWeight: 900,
          color: A, letterSpacing: "0.1em", flexShrink: 0,
        }}>
          {step}
        </span>
        <h2 style={{
          fontFamily: "var(--font-label)", fontSize: 17, fontWeight: 700,
          color: INK, margin: 0, letterSpacing: "-0.02em",
        }}>
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function SubHeading({ step, title }: { step: string; title: string }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 28 }}>
      <span style={{
        fontFamily: "var(--font-display)", fontSize: 10, fontWeight: 900,
        color: "#94A3B8", letterSpacing: "0.1em", flexShrink: 0,
      }}>
        {step}
      </span>
      <h2 style={{
        fontFamily: "var(--font-label)", fontSize: 17, fontWeight: 700,
        color: "#475569", margin: 0, letterSpacing: "-0.02em",
      }}>
        {title}
      </h2>
    </div>
  );
}

function Num({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontFamily: "var(--font-display)", fontSize: 10, fontWeight: 800,
      color: A, letterSpacing: "0.06em", flexShrink: 0, paddingTop: 4, minWidth: 18,
    }}>
      {children}
    </span>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "#E2E8F0", margin: "24px 0" }} />;
}
