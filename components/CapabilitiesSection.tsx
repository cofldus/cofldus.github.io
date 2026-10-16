import { capabilities, supportingTools } from "@/lib/profile";
import SectionHead from "./SectionHead";

export default function CapabilitiesSection() {
  return (
    <section id="capabilities" className="section section--subtle" aria-labelledby="capabilities-title">
      <div className="container">
        <SectionHead
          id="capabilities-title"
          index="03"
          title="Core Capabilities"
          lead="세 영역에서 해결할 수 있는 문제와, 그것을 확인할 수 있는 실제 작업입니다."
        />

        <div className="cap-grid">
          {capabilities.map((c) => (
            <article key={c.id} id={c.id} className="cap" aria-labelledby={`${c.id}-title`}>
              <header>
                <h3 className="cap-title" id={`${c.id}-title`}>{c.title}</h3>
                <p className="cap-keywords">{c.keywords}</p>
              </header>

              <div>
                <p className="cap-label">해결할 수 있는 문제</p>
                <ul className="cap-problems">
                  {c.problems.map((pr) => <li key={pr}>{pr}</li>)}
                </ul>
              </div>

              <div className="cap-evidence">
                <p className="cap-label">근거</p>
                {c.evidence.map((ev) => (
                  <a key={ev.label} href={ev.href}>
                    <strong>{ev.label} <span aria-hidden="true">→</span></strong>
                    <span>{ev.detail}</span>
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>

        <p className="cap-tools">
          <span className="cap-tools-label">함께 쓰는 도구</span>
          <span>{supportingTools.join(" · ")}</span>
        </p>
      </div>
    </section>
  );
}
