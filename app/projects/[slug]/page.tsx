import { existsSync } from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getProjectBySlug, contextLabel, type Project } from "@/lib/projects";
import { moreOrder, selectedSlugs } from "@/lib/profile";
import Navbar from "@/components/Navbar";
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
  const p = getProjectBySlug(slug);
  if (!p) return {};
  const description = p.summary?.problem ?? p.subtitle ?? p.card?.oneliner;
  return {
    title: p.title,
    description,
    alternates: { canonical: `/projects/${p.slug}/` },
    openGraph: { title: p.title, description, url: `/projects/${p.slug}/` },
  };
}

/** 홈과 같은 순서: 대표 프로젝트 → More Projects */
function siteOrder(): Project[] {
  const selected = selectedSlugs.map((s) => getProjectBySlug(s)).filter((p): p is Project => Boolean(p));
  const rank = (slug: string) => {
    const i = moreOrder.indexOf(slug);
    return i === -1 ? Number.MAX_SAFE_INTEGER : i;
  };
  const rest = projects.filter((p) => !selectedSlugs.includes(p.slug)).sort((a, b) => rank(a.slug) - rank(b.slug));
  return [...selected, ...rest];
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProjectBySlug(slug);
  if (!p) notFound();

  const order = siteOrder();
  const i = order.findIndex((x) => x.slug === p.slug);
  const prev = i > 0 ? order[i - 1] : undefined;
  const next = i < order.length - 1 ? order[i + 1] : undefined;
  const isSelected = selectedSlugs.includes(p.slug);
  const backHref = isSelected ? "/#work" : "/#projects";

  // 영상 포스터 — 빌드 시점에 파일이 있을 때만 사용
  const posterPath = p.card?.thumbImg ?? `/${p.slug}_thumb.png`;
  const poster = existsSync(path.join(process.cwd(), "public", posterPath)) ? posterPath : undefined;

  return (
    <>
      <Navbar base="/" />
      <main id="main">
        <div className="cs-top">
          <div className="container">
            <a href={backHref} className="cs-back">
              <span aria-hidden="true">←</span> {isSelected ? "Selected Work" : "More Projects"}
            </a>
          </div>
        </div>

        <header className="container cs-header">
          <div className="cs-header-meta">
            {p.context && (
              <span className={`badge${p.context === "work" ? " badge--work" : ""}`}>{contextLabel[p.context]}</span>
            )}
            <span>{p.period}</span>
            {p.award && <span>· {p.award}</span>}
          </div>
          {p.eyebrow && <p className="eyebrow cs-eyebrow">{p.eyebrow}</p>}
          <h1 className="cs-title">{p.title}</h1>
          {p.subtitle && <p className="cs-subtitle">{p.subtitle}</p>}
          <ul className="tag-list" aria-label="사용 기술">
            {p.tags.map((t) => <li key={t} className="tag">{t}</li>)}
          </ul>
        </header>

        <ProjectDetailClient
          project={p}
          poster={poster}
          prev={prev ? { slug: prev.slug, title: prev.title } : undefined}
          next={next ? { slug: next.slug, title: next.title } : undefined}
        />
      </main>
    </>
  );
}
