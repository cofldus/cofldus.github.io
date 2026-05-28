import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/lib/projects";
import type { Metadata } from "next";
import Link from "next/link";
import ProjectDetailClient from "./ProjectDetailClient";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return { title: `${project.title} — 이채연` };
}

const A    = "#4fc0d1";
const INK  = "#0F172A";
const SUB  = "#64748B";
const RULE = "#E2E8F0";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProjectBySlug(slug);
  if (!p) notFound();

  const decisionCount = p.decisions?.length ?? 0;
  const iterCount     = p.experiments?.length ?? 0;
  const troubleCount  = p.troubleshooting?.length ?? 0;

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div style={{ height: 52 }} />

      {/* ── Back nav (full-width strip) ── */}
      <div style={{ borderBottom: `1px solid ${RULE}` }}>
        <div className="detail-outer" style={{ padding: "20px var(--cp)" }}>
          <Link
            href="/#projects"
            className="back-link"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontFamily: "var(--font-label)", fontSize: 11, fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: SUB, textDecoration: "none", transition: "color 0.15s",
            }}
          >
            ← 프로젝트 목록
          </Link>
        </div>
      </div>

      {/* ── Main two-column grid — runs from hero to bottom ── */}
      <div className="detail-outer">
        <div className="detail-grid">

          {/* ── LEFT: title + article ── */}
          <div>
            {/* Hero title block */}
            <div style={{ padding: "48px 0 40px", borderBottom: `1px solid ${RULE}` }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 14,
                marginBottom: 16,
              }}>
                <span style={{
                  fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 800,
                  letterSpacing: "0.12em", color: "#94A3B8", textTransform: "uppercase",
                }}>
                  PROJECT {p.num}
                </span>
                {p.award && (
                  <span style={{
                    fontFamily: "var(--font-label)", fontSize: 10, fontWeight: 600,
                    color: A, borderLeft: `1px solid #C7D2FE`, paddingLeft: 14,
                  }}>
                    {p.award}
                  </span>
                )}
              </div>

              <h1 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(26px, 3.5vw, 46px)",
                fontWeight: 800, color: INK,
                letterSpacing: "-0.035em", lineHeight: 1.15,
                marginBottom: 16,
                wordBreak: "keep-all", overflowWrap: "break-word",
              }}>
                {p.title}
              </h1>

              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
                <p style={{
                  fontFamily: "var(--font-label)", fontSize: 12, fontWeight: 500,
                  color: SUB, letterSpacing: "0.02em", margin: 0, flexShrink: 0,
                }}>
                  {p.period}
                </p>
                <span style={{ width: 1, height: 12, background: RULE, flexShrink: 0 }} />
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {p.tags.map((t) => (
                    <span key={t} style={{
                      fontFamily: "var(--font-label)", fontSize: 10, fontWeight: 500,
                      letterSpacing: "0.04em",
                      background: "rgba(79,192,209,0.06)",
                      border: "0.5px solid rgba(79,192,209,0.3)",
                      borderRadius: 20, padding: "3px 10px", color: "#3ea8b8",
                      display: "inline-flex", alignItems: "center", lineHeight: 1,
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* 목표 · 역할 */}
              {(p.goal || p.myRole) && (
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {p.goal && (
                    <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                      <span style={{ fontFamily: "var(--font-label)", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: A, flexShrink: 0 }}>
                        목표
                      </span>
                      <span style={{ width: 1, height: 11, background: RULE, flexShrink: 0, alignSelf: "center" }} />
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: 13.5, lineHeight: 1.65, color: INK, margin: 0, wordBreak: "keep-all" }}>
                        {p.goal}
                      </p>
                    </div>
                  )}
                  {p.myRole && (
                    <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                      <span style={{ fontFamily: "var(--font-label)", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: SUB, flexShrink: 0 }}>
                        역할
                      </span>
                      <span style={{ width: 1, height: 11, background: RULE, flexShrink: 0, alignSelf: "center" }} />
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: 13.5, lineHeight: 1.65, color: INK, margin: 0, wordBreak: "keep-all" }}>
                        {p.myRole}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Readme / Overview image */}
            {p.readmeImage && (
              <div style={{ marginTop: 40, marginBottom: 8 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.readmeImage}
                  alt={`${p.title} overview`}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    borderRadius: 8,
                    border: `1px solid ${RULE}`,
                  }}
                />
              </div>
            )}

            {/* Article sections */}
            <ProjectDetailClient project={p} />
          </div>

          {/* ── RIGHT: sidebar ── */}
          <aside className="detail-sidebar" style={{ paddingTop: 48 }}>

            {/* Counts */}
            <div style={{ marginBottom: 32 }}>
              {[
                { n: decisionCount, label: "기술 결정" },
                { n: iterCount,     label: "실험 라운드" },
                { n: troubleCount,  label: "현장 이슈" },
              ].map((s, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "baseline",
                  padding: "10px 0", borderBottom: `1px solid ${RULE}`,
                }}>
                  <span style={{ fontFamily: "var(--font-label)", fontSize: 11, color: SUB }}>
                    {s.label}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 900,
                    color: INK, letterSpacing: "-0.04em",
                  }}>
                    {s.n}
                  </span>
                </div>
              ))}
            </div>

            {/* Highlights */}
            {p.highlights.length > 0 && (
              <div style={{ marginBottom: 28 }}>
                <div style={{
                  fontFamily: "var(--font-label)", fontSize: 9, fontWeight: 700,
                  color: SUB, letterSpacing: "0.1em", textTransform: "uppercase",
                  marginBottom: 14,
                }}>
                  성과
                </div>
                {p.highlights.map((h, i) => (
                  <div key={h.label} style={{
                    marginBottom: 14, paddingBottom: 14,
                    borderBottom: i < p.highlights.length - 1 ? `1px solid ${RULE}` : "none",
                  }}>
                    <div style={{
                      fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 900,
                      color: A, letterSpacing: "-0.04em", lineHeight: 1,
                    }}>
                      {h.value}
                    </div>
                    <div style={{
                      fontFamily: "var(--font-label)", fontSize: 10, fontWeight: 600,
                      color: SUB, letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 4,
                    }}>
                      {h.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* GitHub */}
            {p.repoUrl && (
              <a
                href={p.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="detail-github-link"
              >
                GitHub ↗
              </a>
            )}
          </aside>

        </div>
      </div>
    </main>
  );
}
