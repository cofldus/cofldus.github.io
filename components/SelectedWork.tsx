import { contextLabel, getProjectBySlug, type Project } from "@/lib/projects";
import { selectedSlugs } from "@/lib/profile";
import SectionHead from "./SectionHead";
import { pngSize } from "@/lib/imageSize";

const thumbOf = (p: Project) => p.card?.thumbImg ?? `/${p.slug}_thumb.png`;

function WorkCard({ p, index }: { p: Project; index: number }) {
  const s = p.summary;
  const href = `/projects/${p.slug}/`;
  const titleId = `work-${p.slug}`;
  const src = thumbOf(p);
  const size = pngSize(src);

  return (
    <li className="work-card" aria-labelledby={titleId}>
      {/* 이미지 링크는 제목 링크와 중복이라 탭 순서에서 제외 */}
      <a href={href} className="work-media" tabIndex={-1} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" width={size?.width} height={size?.height} loading={index === 0 ? "eager" : "lazy"} decoding="async" />
      </a>

      <div className="work-body">
        <div className="work-meta">
          {p.context && (
            <span className={`badge${p.context === "work" ? " badge--work" : ""}`}>{contextLabel[p.context]}</span>
          )}
          <span>{p.card?.period ?? p.period}</span>
          {p.award && <span>· {p.award}</span>}
        </div>

        {p.eyebrow && <p className="eyebrow">{String(index + 1).padStart(2, "0")} — {p.eyebrow}</p>}

        <h3 className="work-title" id={titleId}>
          <a href={href}>{p.title}</a>
        </h3>

        {s && <p className="work-problem">{s.problem}</p>}

        {s && (
          <dl className="facts">
            <div><dt>역할</dt><dd>{s.role}</dd></div>
            <div><dt>기술</dt><dd>{s.stack.slice(0, 4).join(" · ")}</dd></div>
          </dl>
        )}

        {s?.keyResult && (
          <p className="work-result">
            <span className="work-result-value">{s.keyResult.value}</span>
            <span className="work-result-label">{s.keyResult.label}</span>
            {s.keyResult.condition && <span className="work-result-cond">{s.keyResult.condition}</span>}
          </p>
        )}

        <div className="work-actions">
          <a href={href} className="text-link">
            Case Study <span className="arrow" aria-hidden="true">→</span>
            <span className="sr-only">: {p.title}</span>
          </a>
          {p.repoUrl && (
            <a href={p.repoUrl} className="text-link text-link--muted" target="_blank" rel="noopener noreferrer">
              GitHub <span aria-hidden="true">↗</span><span className="sr-only">(새 창)</span>
            </a>
          )}
        </div>
      </div>
    </li>
  );
}

export default function SelectedWork() {
  const items = selectedSlugs
    .map((slug) => getProjectBySlug(slug))
    .filter((p): p is Project => Boolean(p));

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <SectionHead
          id="work-title"
          index="01"
          title="Selected Work"
          lead="기업 실무 1건과 대표 프로젝트 2건입니다. 카드에는 문제, 역할, 검증된 결과만 담았고 판단 과정과 실험 기록은 Case Study에 정리했습니다."
        />
        <ol className="work-list">
          {items.map((p, i) => <WorkCard key={p.slug} p={p} index={i} />)}
        </ol>
      </div>
    </section>
  );
}
