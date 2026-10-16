import { contextLabel, projects, type Project } from "@/lib/projects";
import { moreOrder, selectedSlugs } from "@/lib/profile";
import SectionHead from "./SectionHead";

function orderedRest(): Project[] {
  const rest = projects.filter((p) => !selectedSlugs.includes(p.slug));
  const rank = (slug: string) => {
    const i = moreOrder.indexOf(slug);
    return i === -1 ? Number.MAX_SAFE_INTEGER : i;
  };
  return [...rest].sort((a, b) => rank(a.slug) - rank(b.slug));
}

export default function MoreProjects() {
  const items = orderedRest();

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHead
          id="projects-title"
          index="04"
          title="More Projects"
          lead="교육 과정, 대회, 연구 커뮤니티에서 진행한 프로젝트와 연구입니다. 각 카드에서 상세 기록으로 이동할 수 있습니다."
        />

        <ul className="mini-grid">
          {items.map((p) => (
            <li key={p.slug} className="mini">
              <div className="mini-meta">
                {p.context && <span className="badge">{contextLabel[p.context]}</span>}
                <span>{p.card?.period ?? p.period}</span>
              </div>
              <h3 className="mini-title">
                <a href={`/projects/${p.slug}/`}>{p.title}</a>
              </h3>
              <p className="mini-desc">{p.subtitle ?? p.card?.oneliner}</p>
              <div className="mini-foot">
                <span className="mini-stack">{p.tags.slice(0, 3).join(" · ")}</span>
                {p.repoUrl && (
                  <a href={p.repoUrl} className="mini-repo" target="_blank" rel="noopener noreferrer">
                    GitHub <span aria-hidden="true">↗</span><span className="sr-only">: {p.title} (새 창)</span>
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
