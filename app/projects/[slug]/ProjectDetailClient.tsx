"use client";

import { useState } from "react";
import type { Project } from "@/lib/projects";

const A    = "#4fc0d1";
const INK  = "#0F172A";
const BODY = "#334155";
const RULE = "#E2E8F0";
const GOLD = "#92400E";
const GOLD_BG = "#FFFBEB";

/** 인사이트 문자열을 3문장 단위 단락으로 분리 */
function splitInsight(text: string): string[] {
  const sentences = text.split(/(?<=다[.!])\s+/).filter(Boolean);
  const out: string[] = [];
  for (let i = 0; i < sentences.length; i += 3) {
    out.push(sentences.slice(i, i + 3).join(" "));
  }
  return out.length > 1 ? out : [text];
}

/** 15초 요약 박스 */
function SummaryBox({ p }: { p: Project }) {
  if (!p.summary && !p.highlights?.length) return null;
  const rows: { label: string; value: string; highlight?: boolean }[] = [];
  if (p.summary) {
    rows.push({ label: "문제", value: p.summary.problem });
    rows.push({ label: "내 결정", value: p.summary.decision, highlight: true });
    rows.push({ label: "결과", value: p.summary.result, highlight: true });
  } else if (p.goal) {
    rows.push({ label: "목표", value: p.goal });
  }

  return (
    <div style={{
      background: "linear-gradient(135deg, #F0FDFF 0%, #F8FAFC 100%)",
      border: "1px solid rgba(79,192,209,0.3)",
      borderRadius: 12,
      padding: "28px 32px",
      marginBottom: 36,
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 8, marginBottom: 20,
      }}>
        <span style={{
          fontFamily: "var(--font-label)", fontSize: 9.5, fontWeight: 700,
          letterSpacing: "0.18em", textTransform: "uppercase" as const,
          color: A,
        }}>
          ▸ 한눈에 보는 프로젝트
        </span>
        {p.award && (
          <span style={{
            fontFamily: "var(--font-label)", fontSize: 9.5, fontWeight: 600,
            color: GOLD, background: GOLD_BG,
            border: "0.5px solid rgba(245,158,11,0.35)", borderRadius: 3,
            padding: "1px 8px",
          }}>
            ★ {p.award}
          </span>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
        {rows.map((row) => (
          <div key={row.label} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <span style={{
              fontFamily: "var(--font-label)", fontSize: 11, fontWeight: 700,
              color: row.highlight ? A : "#64748B",
              flexShrink: 0, width: 60, paddingTop: 1,
              letterSpacing: "0.04em",
            }}>
              {row.label}
            </span>
            <span style={{
              fontFamily: "var(--font-sans)", fontSize: 14.5, lineHeight: 1.7,
              color: row.highlight ? INK : BODY,
              fontWeight: row.highlight ? 500 : 400,
              wordBreak: "keep-all" as const,
            }}>
              {row.value}
            </span>
          </div>
        ))}

        {p.summary?.competencies && p.summary.competencies.length > 0 && (
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <span style={{
              fontFamily: "var(--font-label)", fontSize: 11, fontWeight: 700,
              color: "#64748B", flexShrink: 0, width: 60, paddingTop: 2,
              letterSpacing: "0.04em",
            }}>
              역량
            </span>
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6 }}>
              {p.summary.competencies.map((c) => (
                <span key={c} style={{
                  fontFamily: "var(--font-label)", fontSize: 10.5, fontWeight: 600,
                  color: A, background: "rgba(79,192,209,0.1)",
                  border: "1px solid rgba(79,192,209,0.28)", borderRadius: 4,
                  padding: "2px 10px",
                }}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3개 핵심 성과 수치 */}
      {p.highlights && p.highlights.length > 0 && (
        <div style={{
          display: "flex", gap: 0,
          marginTop: 24, paddingTop: 20,
          borderTop: "1px solid rgba(79,192,209,0.2)",
        }}>
          {p.highlights.map((h, i) => (
            <div key={h.label} style={{
              flex: 1, textAlign: "center" as const,
              borderRight: i < p.highlights.length - 1 ? "1px solid rgba(79,192,209,0.15)" : "none",
              padding: "0 12px",
            }}>
              <div style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(22px, 2.5vw, 32px)",
                fontWeight: 700, color: INK,
                letterSpacing: "-0.04em", lineHeight: 1.1,
                marginBottom: 4,
              }}>
                {h.value}
              </div>
              <div style={{
                fontFamily: "var(--font-label)", fontSize: 10,
                color: "#64748B", letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
              }}>
                {h.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProjectDetailClient({ project: p }: { project: Project }) {
  return (
    <article>

      {/* 상단 요약 박스 */}
      <SummaryBox p={p} />

      {/* 역할 */}
      {p.myRole && (
        <div style={{
          display: "flex", gap: 12, alignItems: "flex-start",
          padding: "14px 20px",
          background: "#F8FAFC",
          border: "1px solid #E2E8F0",
          borderRadius: 8,
          marginBottom: 32,
        }}>
          <span style={{
            fontFamily: "var(--font-label)", fontSize: 10, fontWeight: 700,
            color: A, letterSpacing: "0.14em", textTransform: "uppercase" as const,
            flexShrink: 0, paddingTop: 2,
          }}>
            내 역할
          </span>
          <span style={{
            fontFamily: "var(--font-sans)", fontSize: 14.5, lineHeight: 1.65,
            color: INK, fontWeight: 500, wordBreak: "keep-all" as const,
          }}>
            {p.myRole}
          </span>
        </div>
      )}

      <p style={{
        fontFamily: "var(--font-sans)",
        fontSize: 12, color: "#94A3B8",
        margin: "0 0 28px", textAlign: "center" as const,
        letterSpacing: "-0.01em",
      }}>
        ↓ 아래에서 상세 경험을 확인할 수 있습니다
      </p>

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

      {/* ARCH — 시스템 아키텍처 (핵심 2장만) */}
      {p.archImages && p.archImages.length > 0 && (
        <Section step="ARCH" title="시스템 아키텍처">
          <div style={{
            display: "flex",
            alignItems: "stretch",
          }}>
            {p.archImages.slice(0, 2).map((src, i, arr) => (
              <div key={i} style={{
                flex: i === 0 ? "1 1 0" : "0 0 42%",
                minWidth: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: i === 0 ? 36 : 24,
                borderLeft: i > 0 ? `0.5px solid ${RULE}` : "none",
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`아키텍처 다이어그램 ${i + 1}`}
                  style={{
                    display: "block",
                    width: "100%",
                    height: arr.length === 2 ? "100%" : "auto",
                    objectFit: "contain",
                  }}
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
            paddingBottom: 12, marginBottom: 12,
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
          <div style={{
            paddingLeft: 20,
            borderLeft: `3px solid ${A}`,
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}>
            {splitInsight(p.insight).map((para, i) => (
              <p key={i} style={{
                fontFamily: "var(--font-sans)",
                fontSize: i === 0 ? 16.5 : 15.5,
                fontWeight: i === 0 ? 600 : 400,
                lineHeight: 1.9,
                color: i === 0 ? INK : BODY,
                margin: 0,
                wordBreak: "keep-all",
              }}>
                {para}
              </p>
            ))}
          </div>
        </Section>
      )}

      {/* 05 — 협업/책임/판단 */}
      {p.teamworkNote && (
        <Section step="05" title="협업 & 책임">
          <div style={{
            display: "flex", gap: 14, alignItems: "flex-start",
            padding: "16px 20px",
            background: "rgba(79,192,209,0.04)",
            border: "1px solid rgba(79,192,209,0.18)",
            borderRadius: 8,
          }}>
            <span style={{ fontSize: 18, flexShrink: 0, lineHeight: 1 }}>🤝</span>
            <p style={{
              fontFamily: "var(--font-sans)", fontSize: 15.5, lineHeight: 1.8,
              color: BODY, margin: 0, wordBreak: "keep-all" as const,
            }}>
              {p.teamworkNote}
            </p>
          </div>
        </Section>
      )}

      {/* 06 — 실무 적용 가능성 */}
      {p.practicalNote && (
        <Section step="06" title="실무 적용 가능성">
          <div style={{
            display: "flex", gap: 14, alignItems: "flex-start",
            padding: "16px 20px",
            background: "rgba(16,185,129,0.04)",
            border: "1px solid rgba(16,185,129,0.18)",
            borderRadius: 8,
          }}>
            <span style={{ fontSize: 18, flexShrink: 0, lineHeight: 1 }}>🔧</span>
            <p style={{
              fontFamily: "var(--font-sans)", fontSize: 15.5, lineHeight: 1.8,
              color: BODY, margin: 0, wordBreak: "keep-all" as const,
            }}>
              {p.practicalNote}
            </p>
          </div>
        </Section>
      )}

      {/* ── 상세 기록 (기본 접힘) ── */}
      <DetailAppendix p={p} />

    </article>
  );
}

/* ── 트러블슈팅 아코디언 ── */
function TroubleshootingList({ items }: { items: NonNullable<Project["troubleshooting"]> }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ borderTop: `0.5px solid ${RULE}` }}>
      {items.map((t, i) => {
        const isOpen = open === i;
        return (
          <TroubleCard
            key={i}
            index={i}
            title={t.title}
            body={t.body}
            isOpen={isOpen}
            onToggle={() => setOpen(isOpen ? null : i)}
          />
        );
      })}
    </div>
  );
}

function TroubleCard({
  index, title, body, isOpen, onToggle,
}: {
  index: number;
  title: string;
  body: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ borderBottom: `0.5px solid ${RULE}` }}>
      <button
        onClick={onToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "14px 0",
          background: hovered ? "#F8FAFC" : "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left" as const,
          borderRadius: 3,
          transition: "background 0.12s",
        }}
      >
        <span style={{
          flexShrink: 0,
          fontFamily: "var(--font-display)",
          fontSize: 10,
          fontWeight: 800,
          color: isOpen ? "#0E7490" : "#CBD5E1",
          letterSpacing: "0.06em",
          minWidth: 22,
          transition: "color 0.15s",
        }}>
          {String(index + 1).padStart(2, "0")}
        </span>

        <span style={{
          flex: 1,
          fontFamily: "var(--font-label)",
          fontSize: 13.5,
          fontWeight: isOpen ? 600 : 500,
          color: isOpen ? "#1E293B" : hovered ? "#334155" : "#475569",
          letterSpacing: "-0.015em",
          lineHeight: 1.4,
          transition: "color 0.15s",
        }}>
          {title}
        </span>

        <span style={{
          flexShrink: 0,
          fontSize: 12,
          color: isOpen ? "#0E7490" : "#CBD5E1",
          display: "inline-block",
          transition: "color 0.15s, transform 0.2s",
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          lineHeight: 1,
        }}>▾</span>
      </button>

      {isOpen && (
        <div style={{ paddingBottom: 18, paddingLeft: 38 }}>
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: 14,
            lineHeight: 1.85,
            color: BODY,
            margin: 0,
            wordBreak: "keep-all",
          }}>
            {body}
          </p>
        </div>
      )}
    </div>
  );
}

/* ── 상세 기록 (기술 선택 + 실험 로그 — 기본 접힘) ── */
function DetailAppendix({ p }: { p: Project }) {
  const [show, setShow] = useState(false);
  const hasDecisions = p.decisions && p.decisions.length > 0;
  const hasExperiments = p.experiments && p.experiments.length > 0;
  const extraArch = (p.archImages ?? []).slice(2);
  const hasExtraArch = extraArch.length > 0;
  if (!hasDecisions && !hasExperiments && !hasExtraArch) return null;

  return (
    <section style={{ paddingTop: 36, borderTop: `1px solid ${RULE}` }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        {!show && (
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: 13,
            color: "#94A3B8",
            margin: 0,
            textAlign: "center",
            letterSpacing: "-0.01em",
          }}>
            기술 선택 이유, 실험 과정, 트레이드오프를 기록했습니다.
          </p>
        )}
        <button
          onClick={() => setShow((v) => !v)}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 0",
            outline: "none",
          }}
        >
          <span style={{
            fontFamily: "var(--font-label)",
            fontSize: 11,
            fontWeight: 600,
            color: show ? "#0E7490" : "#64748B",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            transition: "color 0.15s",
          }}>
            {show ? "접기" : "기술 의사결정 · 실험 로그 열기"}
          </span>
          <span style={{
            fontSize: 9,
            color: show ? "#0E7490" : "#94A3B8",
            display: "inline-block",
            transition: "transform 0.2s, color 0.15s",
            transform: show ? "rotate(180deg)" : "rotate(0deg)",
            lineHeight: 1,
          }}>▾</span>
        </button>
      </div>

      {show && (
        <div style={{ marginTop: 36 }}>

          {/* A — 기술 선택 근거 */}
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

          {/* B — 실험 로그 */}
          {hasExperiments && (
            <div style={{ marginBottom: hasExtraArch ? 48 : 0 }}>
              <SubHeading step="B" title="실험 로그 — 시행착오 기록" />
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

          {/* C — 세부 다이어그램 */}
          {hasExtraArch && (
            <div>
              <SubHeading step="C" title="다이어그램 — 세부 플로우" />
              <div style={{ display: "flex", flexDirection: "column", gap: 32, paddingLeft: 32 }}>
                {extraArch.map((src, i) => (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    key={i}
                    src={src}
                    alt={`세부 다이어그램 ${i + 1}`}
                    style={{ display: "block", width: "100%", height: "auto" }}
                  />
                ))}
              </div>
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
      paddingTop: first ? 40 : 36,
      paddingBottom: 36,
      borderTop: first ? "none" : `0.5px solid ${RULE}`,
    }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 24 }}>
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
    <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 24 }}>
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
  return <div style={{ height: "0.5px", background: "#E2E8F0", margin: "24px 0" }} />;
}
