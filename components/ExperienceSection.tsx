import { experience } from "@/lib/profile";
import SectionHead from "./SectionHead";

export default function ExperienceSection() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <SectionHead
          id="experience-title"
          index="02"
          title="Professional Experience"
          lead="회사와 연구실에서 맡은 문제와 직접 수행한 범위입니다. 고객사와 내부 시스템 정보는 공개하지 않습니다."
        />

        <ol className="exp-list">
          {experience.map((e) => (
            <li key={e.company} className="exp">
              <div className="exp-side">
                <span className="exp-period">{e.period}</span>
                <h3 className="exp-company">{e.company}</h3>
                {(e.role || e.companyNote) && (
                  <span className="exp-note">{[e.role, e.companyNote].filter(Boolean).join(" · ")}</span>
                )}
              </div>

              <div className="exp-main">
                <p className="exp-area">
                  {e.area}
                  {e.current && <span className="badge badge--work">재직 중</span>}
                </p>
                <p className="exp-summary">{e.summary}</p>
                <ul className="exp-points">
                  {e.points.map((pt) => <li key={pt}>{pt}</li>)}
                </ul>
                <div className="exp-foot">
                  {e.links?.map((l) => (
                    <a key={l.href} href={l.href} className="text-link">
                      {l.label} <span className="arrow" aria-hidden="true">→</span>
                    </a>
                  ))}
                  {e.tech && <span className="mini-stack">{e.tech.join(" · ")}</span>}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
