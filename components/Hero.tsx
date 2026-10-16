"use client";

import profilePhoto from "./profilePhoto";
import { useCompany } from "@/context/CompanyContext";
import { hero, site } from "@/lib/profile";

export default function Hero() {
  // ?company= 파라미터가 있으면 해당 문구, 없으면 lib/profile.ts 의 hero 문구
  const company = useCompany();

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="container hero-inner">
        <div>
          <p className="eyebrow">{company.label}</p>

          <h1 className="hero-title" id="hero-title">
            <span>{company.headline1}</span>
            <span>{company.headline2}</span>
          </h1>

          <p className="hero-sub">{company.subtext}</p>

          <ul className="hero-focus" aria-label="핵심 영역">
            {hero.focus.map((f) => (
              <li key={f.label}><a href={f.href}>{f.label}</a></li>
            ))}
          </ul>

          <div className="hero-cta">
            <a href="#work" className="btn btn--primary">View Selected Work</a>
            <a href={site.resumeUrl} className="btn">Resume</a>
            <a href={site.githubUrl} className="btn" target="_blank" rel="noopener noreferrer">
              GitHub <span aria-hidden="true">↗</span><span className="sr-only">(새 창)</span>
            </a>
          </div>

          <p className="hero-start">
            먼저 볼 프로젝트 · <a href={hero.startHere.href}>{hero.startHere.label} <span aria-hidden="true">→</span></a>
          </p>
        </div>

        <div className="hero-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={profilePhoto} alt={`${site.name} 프로필 사진`} width={168} height={224} />
        </div>
      </div>
    </section>
  );
}
