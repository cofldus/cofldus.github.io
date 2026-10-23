import type { Metadata } from "next";
import SectionHead from "@/components/SectionHead";
import { site } from "@/lib/profile";
import { agentDecisions, agentSim, resource } from "@/lib/krafton";
import type { KeyResult } from "@/lib/projects";

export const metadata: Metadata = {
  title: agentSim.title,
  description: agentSim.subtitle,
  alternates: { canonical: "/krafton/agent-sim/" },
  robots: { index: false, follow: false },
};

function Results({ items }: { items: KeyResult[] }) {
  return (
    <div className="results">
      {items.map((h) => (
        <div key={h.label} className="result">
          <span className="result-value">{h.value}</span>
          <span className="result-label">{h.label}</span>
          {h.condition && <span className="result-cond">{h.condition}</span>}
        </div>
      ))}
    </div>
  );
}

export default function AgentSimPage() {
  return (
    <>
      <nav className="nav" aria-label="주 메뉴">
        <div className="container nav-inner">
          <a href="/krafton/" className="nav-brand">
            <span className="nav-brand-name">{site.name}</span>
            <span className="nav-brand-role">LLM Agent · Evaluation</span>
          </a>
          <div className="nav-links">
            <a href="#design" className="nav-link">Design</a>
            <a href="#resource" className="nav-link">Resource</a>
            <a href={site.resumeUrl} className="btn btn--primary nav-cta">Resume</a>
          </div>
        </div>
      </nav>

      <main id="main">
        <header className="cs-header">
          <div className="container">
            <a href="/krafton/" className="cs-back">← 포트폴리오로</a>
            <p className="cs-header-meta" style={{ marginTop: 24 }}>
              <span className="badge">팀 프로젝트</span>
              <span>{agentSim.period}</span>
            </p>
            <h1 className="cs-title">{agentSim.title}</h1>
            <p className="cs-subtitle">{agentSim.subtitle}</p>
            <p className="cs-prose measure" style={{ marginTop: 24 }}>{agentSim.problem}</p>
            <p style={{ marginTop: 20 }}>
              <a href={agentSim.repoUrl} className="text-link" target="_blank" rel="noopener noreferrer">
                GitHub <span aria-hidden="true">↗</span><span className="sr-only">(새 창)</span>
              </a>
            </p>
          </div>
        </header>

        <section id="design" className="section" aria-labelledby="design-title">
          <div className="container">
            <SectionHead id="design-title" index="01" title="에이전트 설계" />

            <Results items={agentSim.highlights} />

            <div className="pipeline" role="group" aria-label="에이전트 의사결정 단계" style={{ marginTop: 32 }}>
              <div className="pipeline-row pipeline-row--after">
                <span className="pipeline-caption">타임슬롯마다</span>
                <ol className="pipeline-stages">
                  {agentSim.steps.map((st, si) => (
                    <li key={st.name}>
                      {si > 0 && <span className="pipeline-arrow" aria-hidden="true">→</span>}
                      <span className="pipeline-stage" title={st.detail}>{st.name}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <ul className="pipeline-foot" style={{ display: "grid", gap: 4 }}>
                {agentSim.steps.map((st) => <li key={st.name}><strong>{st.name}</strong> — {st.detail}</li>)}
              </ul>
            </div>

            <h3 className="cs-subhead" style={{ margin: "48px 0 16px" }}>에이전트 행동을 사람답게 만든 4가지 설계</h3>
            {agentDecisions.map((d, i) => (
              <article key={d.title} className="decision">
                <h4 className="decision-title">
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  {d.title}
                </h4>
                <dl>
                  <div><dt>Problem</dt><dd>{d.problem}</dd></div>
                  <div>
                    <dt>Options</dt>
                    <dd><ul className="decision-options">{d.options.map((o) => <li key={o}>{o}</li>)}</ul></dd>
                  </div>
                  <div><dt>Decision</dt><dd className="decision-chosen">{d.decision}</dd></div>
                  <div><dt>Trade-off</dt><dd>{d.tradeoff}</dd></div>
                  <div><dt>Validation</dt><dd className="decision-validation">{d.validation}</dd></div>
                </dl>
              </article>
            ))}

            <div className="cs-media" style={{ marginTop: 40 }}>
              <video src={agentSim.videoUrl} controls preload="metadata" style={{ width: "100%", borderRadius: "var(--radius)", border: "1px solid var(--border)" }} />
            </div>
          </div>
        </section>

        <section id="resource" className="section section--subtle" aria-labelledby="resource-title">
          <div className="container">
            <SectionHead id="resource-title" index="02" title="자원 관리" lead={resource.lead} />
            <Results items={resource.results} />
            <ul className="cap-problems measure" style={{ marginTop: 28 }}>
              {resource.points.map((pt) => <li key={pt}>{pt}</li>)}
            </ul>
            <p style={{ marginTop: 32 }}>
              <a href="/krafton/" className="text-link">← 포트폴리오로</a>
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} {site.name} · {site.nameEn}</span>
          <a href="#main" className="text-link text-link--muted">맨 위로 <span aria-hidden="true">↑</span></a>
        </div>
      </footer>
    </>
  );
}
