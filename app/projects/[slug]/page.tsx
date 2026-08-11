import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/lib/projects";
import type { Metadata } from "next";
import Link from "next/link";
import ProjectDetailClient from "./ProjectDetailClient";
import StickyToc from "@/components/StickyToc";
import MetricWithNote from "@/components/MetricWithNote";
import BackLink from "@/components/BackLink";

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

  const title = `${project.title} — 이채연`;
  const description =
    project.summary
      ? `${project.summary.problem} ${project.summary.result}`
      : project.desc.slice(0, 160);
  const image = project.readmeImage ?? project.archImages?.[0] ?? "/icon.png";

  return {
    title,
    description,
    openGraph: {
      title: `${project.category} · ${project.title}`,
      description,
      type: "article",
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.category} · ${project.title}`,
      description,
      images: [image],
    },
  };
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

  const toc = [
    { id: "sec-problem", label: "문제 정의" },
    ...(p.archImages?.length ? [{ id: "sec-arch", label: "아키텍처" }] : []),
    { id: "sec-impl", label: "핵심 구현" },
    ...(troubleCount > 0 ? [{ id: "sec-trouble", label: "트러블슈팅" }] : []),
    ...(p.insight ? [{ id: "sec-learned", label: "배운 점" }] : []),
  ];

  const evidence = p.evidence ?? (
    p.repoUrl ? [{ label: p.repoName ?? "GitHub", href: p.repoUrl }] : []
  );

  const idx  = projects.findIndex((x) => x.slug === p.slug);
  const prev = idx > 0 ? projects[idx - 1] : null;
  const next = idx >= 0 && idx < projects.length - 1 ? projects[idx + 1] : null;

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div style={{ height: 52 }} />

      {/* ── Back nav (full-width strip) ── */}
      <div style={{ borderBottom: `1px solid ${RULE}` }}>
        <div className="detail-outer" style={{ padding: "20px var(--cp)" }}>
          <BackLink
            className="back-link"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontFamily: "var(--font-label)", fontSize: 11, fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: SUB, textDecoration: "none", transition: "color 0.15s",
              cursor: "pointer",
            }}
          />
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
                marginBottom: 16, flexWrap: "wrap",
              }}>
                <span style={{
                  fontFamily: "var(--font-label)", fontSize: 11, fontWeight: 700,
                  letterSpacing: "0.08em", color: "#0E7490",
                  background: "rgba(14,116,144,0.07)", borderRadius: 3,
                  padding: "4px 9px", lineHeight: 1,
                }}>
                  {p.category}
                </span>
                {p.award && (
                  <span style={{
                    fontFamily: "var(--font-label)",
                    fontSize: 9.5,
                    fontWeight: 600,
                    color: "#92400E",
                    background: "#FFFBEB",
                    border: "0.5px solid rgba(245,158,11,0.28)",
                    borderRadius: 3,
                    padding: "0 9px",
                    height: 20,
                    letterSpacing: "0.03em",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    lineHeight: 1,
                  }}>
                    <span style={{ fontSize: 8, color: "#F59E0B", lineHeight: 1 }}>★</span>
                    {p.award}
                  </span>
                )}
              </div>

              <h1 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(22px, 2.8vw, 38px)",
                fontWeight: 700, color: INK,
                letterSpacing: "-0.025em", lineHeight: 1.2,
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
                      fontFamily: "var(--font-label)", fontSize: 10, fontWeight: 400,
                      letterSpacing: "0.04em",
                      background: "#F4F7F8",
                      border: "none",
                      borderRadius: 3,
                      padding: "0 8px",
                      height: 20,
                      color: "#64748B",
                      display: "inline-flex", alignItems: "center", lineHeight: 1,
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* 상단 성과 지표 */}
              {p.highlights.length > 0 && (
                <div className="detail-topmetrics">
                  {p.highlights.map((h) => (
                    <MetricWithNote key={h.label} value={h.value} label={h.label} note={h.note} />
                  ))}
                </div>
              )}
            </div>

            {/* 요약 카드 */}
            {p.summary && (
              <div className="detail-summary">
                {[
                  { k: "Problem", v: p.summary.problem },
                  { k: "Solution", v: p.summary.solution },
                  { k: "Result", v: p.summary.result },
                  { k: "My Role", v: p.summary.role },
                ].map((row) => (
                  <div key={row.k} className="detail-summary-row">
                    <span style={{
                      fontFamily: "var(--font-label)", fontSize: 10, fontWeight: 700,
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      color: row.k === "Result" ? "#0E7490" : "#94A3B8",
                    }}>
                      {row.k}
                    </span>
                    <p style={{
                      fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.7,
                      color: row.k === "Result" ? INK : "#334155", margin: 0,
                      fontWeight: row.k === "Result" ? 600 : 400,
                      wordBreak: "keep-all",
                    }}>
                      {row.v}
                    </p>
                  </div>
                ))}
              </div>
            )}

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

          {/* ── RIGHT: sticky 목차 + 자료 ── */}
          <aside className="detail-sidebar">
            <div className="detail-sidebar-inner">
              <StickyToc items={toc} />

              {/* Evidence */}
              {evidence.length > 0 && (
                <div className="detail-evidence">
                  <div style={{
                    fontFamily: "var(--font-label)", fontSize: 9.5, fontWeight: 700,
                    color: SUB, letterSpacing: "0.1em", textTransform: "uppercase",
                    marginBottom: 10,
                  }}>
                    자료
                  </div>
                  {evidence.map((e) =>
                    e.locked ? (
                      <span key={e.label} className="ev-item ev-item--locked">
                        <span aria-hidden="true">🔒</span> {e.label}
                        <span className="ev-note">비공개</span>
                      </span>
                    ) : (
                      <a
                        key={e.label}
                        href={e.href}
                        target={e.href?.startsWith("http") ? "_blank" : undefined}
                        rel={e.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="ev-item"
                      >
                        {e.label}
                        <span aria-hidden="true" className="ev-arrow">↗</span>
                      </a>
                    )
                  )}
                </div>
              )}

              {(decisionCount + iterCount + troubleCount) > 0 && (
                <p style={{
                  marginTop: 20, paddingTop: 14, borderTop: `1px solid ${RULE}`,
                  fontFamily: "var(--font-label)", fontSize: 11, lineHeight: 1.7,
                  color: SUB, margin: "20px 0 0",
                }}>
                  기술 선택 근거 {decisionCount}건과 실험 기록 {iterCount}건은
                  본문 하단 상세 기록에서 볼 수 있습니다.
                </p>
              )}
            </div>
          </aside>

        </div>

        {/* ── 이전 / 다음 프로젝트 ── */}
        <nav aria-label="프로젝트 이동" className="detail-pager">
          {prev ? (
            <Link href={`/projects/${prev.slug}`} className="pager-item pager-item--prev">
              <span className="pager-label">← 이전 프로젝트</span>
              <span className="pager-title">{prev.category}</span>
              <span className="pager-sub">{prev.summary?.result ?? prev.period}</span>
            </Link>
          ) : <span />}
          {next && (
            <Link href={`/projects/${next.slug}`} className="pager-item pager-item--next">
              <span className="pager-label">다음 프로젝트 →</span>
              <span className="pager-title">{next.category}</span>
              <span className="pager-sub">{next.summary?.result ?? next.period}</span>
            </Link>
          )}
        </nav>
      </div>
    </main>
  );
}
