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

const A    = "var(--accent-text)";  // 이 페이지의 액센트는 전부 텍스트 용도
const INK  = "var(--ink)";
const SUB  = "var(--ink-mid)";
const RULE = "var(--border)";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProjectBySlug(slug);
  if (!p) notFound();


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
              fontFamily: "var(--font-sans)", fontSize: 13.5, fontWeight: 400,
              letterSpacing: "-0.005em",
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
            <div style={{ padding: "56px 0 44px", borderBottom: `1px solid ${RULE}` }}>
              {/* 기간 · 수상 — 한 줄 */}
              <p style={{
                fontFamily: "var(--font-sans)", fontSize: 13.5, fontWeight: 400,
                color: "var(--ink-light)", margin: "0 0 18px", lineHeight: 1.4,
              }}>
                {p.period}
                {p.award && (
                  <span style={{ color: A }}>{" · "}{p.award}</span>
                )}
              </p>

              <h1 style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(30px, 3.6vw, 42px)",
                fontWeight: 600, color: INK,
                letterSpacing: "-0.035em", lineHeight: 1.15,
                margin: 0,
                maxWidth: "20ch",
                wordBreak: "keep-all", overflowWrap: "break-word",
              }}>
                {p.title}
              </h1>

              {p.subtitle && (
                <p style={{
                  fontFamily: "var(--font-sans)", fontSize: 18,
                  lineHeight: 1.6, color: SUB, margin: "14px 0 0",
                  maxWidth: "52ch", wordBreak: "keep-all",
                }}>
                  {p.subtitle}
                </p>
              )}

              {/* 목표 — 리드 문장 */}
              {p.goal && (
                <p style={{
                  fontFamily: "var(--font-sans)", fontSize: 16.5, lineHeight: 1.75,
                  color: INK, margin: "28px 0 0",
                  maxWidth: "var(--measure)", wordBreak: "keep-all",
                }}>
                  {p.goal}
                </p>
              )}

              {/* 담당 — 한 줄 */}
              {p.myRole && (
                <p style={{
                  fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.7,
                  color: SUB, margin: "14px 0 0",
                  maxWidth: "var(--measure)", wordBreak: "keep-all",
                }}>
                  <span style={{ color: "var(--ink-light)" }}>담당 </span>
                  {p.myRole}
                </p>
              )}

              {/* 태그 */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 28 }}>
                {p.tags.map((t) => (
                  <span key={t} style={{
                    fontFamily: "var(--font-sans)", fontSize: 12.5, fontWeight: 400,
                    letterSpacing: "-0.005em",
                    background: "var(--tag-bg)",
                    border: `1px solid ${RULE}`,
                    borderRadius: 4,
                    padding: "5px 10px",
                    color: "var(--tag-text)",
                    display: "inline-flex", alignItems: "center", lineHeight: 1,
                  }}>
                    {t}
                  </span>
                ))}
              </div>
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
                    border: `0.5px solid ${RULE}`,
                  }}
                />
              </div>
            )}

            {/* Article sections */}
            <ProjectDetailClient project={p} />
          </div>

          {/* ── RIGHT: sidebar ── */}
          <aside className="detail-sidebar" style={{ paddingTop: 56 }}>

            {/* Highlights */}
            {p.highlights.length > 0 && (
              <div style={{ marginBottom: 28 }}>
                <div style={{
                  fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 400,
                  color: "var(--ink-light)", marginBottom: 16,
                }}>
                  성과
                </div>
                {p.highlights.map((h, i) => (
                  <div key={h.label} style={{
                    marginBottom: 16, paddingBottom: 16,
                    borderBottom: i < p.highlights.length - 1 ? `1px solid var(--border-sub)` : "none",
                  }}>
                    <div style={{
                      fontFamily: "var(--font-sans)", fontSize: 21, fontWeight: 500,
                      color: INK, letterSpacing: "-0.03em", lineHeight: 1.15,
                      fontVariantNumeric: "tabular-nums",
                    }}>
                      {h.value}
                    </div>
                    <div style={{
                      fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 400,
                      color: SUB, marginTop: 5, lineHeight: 1.45, wordBreak: "keep-all",
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
