import type { Metadata } from "next";
import SectionHead from "@/components/SectionHead";
import profilePhoto from "@/components/profilePhoto";
import { contact, site } from "@/lib/profile";
import { agentDecisions, agentSim, kraftonFit, kraftonHero, resource, supporting } from "@/lib/krafton";
import type { KeyResult } from "@/lib/projects";

// 지원서에 넣는 전용 링크. 메인에서 링크하지 않고 검색 노출도 막는다.
export const metadata: Metadata = {
  title: "AI Research Portfolio",
  description: kraftonHero.sub,
  alternates: { canonical: "/krafton/" },
  robots: { index: false, follow: false },
};

const links = [
  { label: "Case", hash: "#case" },
  { label: "Resource", hash: "#resource" },
  { label: "Fit", hash: "#fit" },
  { label: "Research", hash: "#research" },
  { label: "Contact", hash: "#contact" },
];

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

export default function KraftonPage() {
  return (
    <>
      <nav className="nav" aria-label="주 메뉴">
        <div className="container nav-inner">
          <a href="#top" className="nav-brand">
            <span className="nav-brand-name">{site.name}</span>
            <span className="nav-brand-role">AI Research · LLM Agent</span>
          </a>
          <div className="nav-links">
            {links.map((l) => (
              <a key={l.hash} href={l.hash} className="nav-link">{l.label}</a>
            ))}
            <a href={site.resumeUrl} className="btn btn--primary nav-cta">Resume</a>
          </div>
        </div>
      </nav>

      <main id="main">
        <section id="top" className="hero" aria-labelledby="hero-title">
          <div className="container hero-inner">
            <div>
              <p className="eyebrow">{kraftonHero.eyebrow}</p>
              <h1 className="hero-title" id="hero-title">
                <span>{kraftonHero.headline[0]}</span>
                <span>{kraftonHero.headline[1]}</span>
              </h1>
              <p className="hero-sub">{kraftonHero.sub}</p>
              <div className="hero-cta">
                <a href="#case" className="btn btn--primary">대표 연구 사례</a>
                <a href={site.resumeUrl} className="btn">Resume</a>
                <a href={agentSim.repoUrl} className="btn" target="_blank" rel="noopener noreferrer">
                  GitHub <span aria-hidden="true">↗</span><span className="sr-only">(새 창)</span>
                </a>
              </div>
            </div>
            <div className="hero-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={profilePhoto} alt={`${site.name} 프로필 사진`} width={168} height={224} />
            </div>
          </div>
        </section>

        <section id="case" className="section" aria-labelledby="case-title">
          <div className="container">
            <SectionHead id="case-title" index="01" title={agentSim.title} lead={agentSim.subtitle} />

            <p className="work-meta"><span className="badge">팀 프로젝트</span><span>{agentSim.period}</span></p>
            <p className="cs-prose measure" style={{ margin: "16px 0 32px" }}>{agentSim.problem}</p>

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
          </div>
        </section>

        <section id="fit" className="section" aria-labelledby="fit-title">
          <div className="container">
            <SectionHead id="fit-title" index="03" title="크래프톤 게임 AI 연구와의 연결" lead={kraftonFit.lead} />
            <div className="mini-grid fit-grid">
              {kraftonFit.rows.map((r) => (
                <article key={r.mine} className="cap">
                  <div>
                    <p className="cap-label">제가 다뤄 본 문제</p>
                    <p className="cap-title">{r.mine}</p>
                  </div>
                  <div>
                    <p className="cap-label">게임 AI에서의 질문</p>
                    <p className="cap-keywords">{r.game}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="research" className="section section--subtle" aria-labelledby="research-title">
          <div className="container">
            <SectionHead
              id="research-title"
              index="04"
              title="함께 보는 연구·실무"
              lead="결과를 그대로 받아들이지 않고, 실패 조건을 나눠 측정하는 방식이 다른 작업에서도 이어집니다."
            />
            <div className="mini-grid">
              {supporting.map((s) => (
                <article key={s.slug} className="mini">
                  <p className="mini-meta">{s.meta}</p>
                  <h3 className="mini-title"><a href={`/projects/${s.slug}/`}>{s.title}</a></h3>
                  <p className="mini-desc">{s.desc}</p>
                  <div className="mini-foot"><span className="mini-stack">{s.stack}</span></div>
                </article>
              ))}
            </div>
            <p style={{ marginTop: 24 }}>
              <a href="/" className="text-link">전체 포트폴리오 보기 <span className="arrow" aria-hidden="true">→</span></a>
            </p>
          </div>
        </section>

        <section id="contact" className="section" aria-labelledby="contact-title">
          <div className="container contact-inner">
            <SectionHead id="contact-title" index="05" title="Contact" />
            <a href={`mailto:${contact.email}`} className="contact-email">{contact.email}</a>
            <div className="contact-links">
              {contact.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="btn"
                  target={l.external ? "_blank" : undefined}
                  rel={l.external ? "noopener noreferrer" : undefined}
                >
                  {l.label}
                  {l.external && <><span aria-hidden="true">↗</span><span className="sr-only">(새 창)</span></>}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} {site.name} · {site.nameEn}</span>
          <a href="#top" className="text-link text-link--muted">맨 위로 <span aria-hidden="true">↑</span></a>
        </div>
      </footer>
    </>
  );
}
