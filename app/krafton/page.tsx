import type { Metadata } from "next";
import SectionHead from "@/components/SectionHead";
import profilePhoto from "@/components/profilePhoto";
import { contact, site } from "@/lib/profile";
import { agentSim, kraftonHero, supporting } from "@/lib/krafton";
import { pngSize } from "@/lib/imageSize";

// 지원서에 넣는 전용 링크. 메인에서 링크하지 않고 검색 노출도 막는다.
export const metadata: Metadata = {
  title: "LLM Agent Portfolio",
  description: kraftonHero.sub,
  alternates: { canonical: "/krafton/" },
  robots: { index: false, follow: false },
};

const links = [
  { label: "Work", hash: "#work" },
  { label: "Contact", hash: "#contact" },
];

function FeatureCard() {
  const size = pngSize(agentSim.thumb);
  return (
    <article className="work-card work-card--feature" aria-labelledby="feature-title">
      <a href="/krafton/agent-sim/" className="work-media" tabIndex={-1} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={agentSim.thumb} alt="" width={size?.width} height={size?.height} loading="eager" decoding="async" />
      </a>
      <div className="work-body">
        <div className="work-meta">
          <span className="badge">팀 프로젝트</span>
          <span>{agentSim.period}</span>
        </div>
        <p className="eyebrow">01 — LLM Agent Simulation</p>
        <h3 className="work-title" id="feature-title"><a href="/krafton/agent-sim/">{agentSim.title}</a></h3>
        <p className="work-problem">{agentSim.problem}</p>
        <dl className="facts">
          <div><dt>역할</dt><dd>{agentSim.role}</dd></div>
          <div><dt>기술</dt><dd>{agentSim.stack.join(" · ")}</dd></div>
        </dl>
        <div className="feature-results">
          {agentSim.highlights.map((h) => (
            <div key={h.label}>
              <span className="work-result-value">{h.value}</span>
              <span className="feature-result-label">{h.label}</span>
            </div>
          ))}
        </div>
        <div className="work-actions">
          <a href="/krafton/agent-sim/" className="text-link">Case Study <span className="arrow" aria-hidden="true">→</span></a>
          <a href={agentSim.repoUrl} className="text-link text-link--muted" target="_blank" rel="noopener noreferrer">
            GitHub <span aria-hidden="true">↗</span><span className="sr-only">(새 창)</span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function KraftonPage() {
  return (
    <>
      <nav className="nav" aria-label="주 메뉴">
        <div className="container nav-inner">
          <a href="#top" className="nav-brand">
            <span className="nav-brand-name">{site.name}</span>
            <span className="nav-brand-role">LLM Agent · Evaluation</span>
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
                <a href="#work" className="btn btn--primary">View Work</a>
                <a href={site.resumeUrl} className="btn">Resume</a>
                <a href={site.githubUrl} className="btn" target="_blank" rel="noopener noreferrer">
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

        <section id="work" className="section" aria-labelledby="work-title">
          <div className="container">
            <SectionHead
              id="work-title"
              index="01"
              title="Selected Work"
              lead="에이전트 시뮬레이션을 중심으로, 학습·경량화·평가 설계를 다룬 작업입니다. 공통적으로 결과를 그대로 받지 않고 어디서 틀렸는지 나눠 측정했습니다."
            />
            <FeatureCard />

            <div className="mini-grid" style={{ marginTop: 32 }}>
              {supporting.map((s) => {
                const size = pngSize(s.thumb);
                return (
                  <article key={s.slug} className="mini">
                    <a href={`/projects/${s.slug}/`} className="mini-thumb" tabIndex={-1} aria-hidden="true">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={s.thumb} alt="" width={size?.width} height={size?.height} loading="lazy" decoding="async" />
                    </a>
                    <p className="mini-meta">{s.meta}</p>
                    <h3 className="mini-title"><a href={`/projects/${s.slug}/`}>{s.title}</a></h3>
                    <p className="mini-desc">{s.desc}</p>
                    <div className="mini-foot"><span className="mini-stack">{s.stack}</span></div>
                  </article>
                );
              })}
            </div>
            <p style={{ marginTop: 32 }}>
              <a href="/" className="text-link">전체 포트폴리오 보기 <span className="arrow" aria-hidden="true">→</span></a>
            </p>
          </div>
        </section>

        <section id="contact" className="section section--subtle" aria-labelledby="contact-title">
          <div className="container contact-inner">
            <SectionHead id="contact-title" index="02" title="Contact" />
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
