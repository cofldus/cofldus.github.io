import { awards, certifications, education, research, training, site, type BackgroundRow } from "@/lib/profile";
import SectionHead from "./SectionHead";

function Rows({ rows }: { rows: BackgroundRow[] }) {
  return (
    <ul>
      {rows.map((r) => (
        <li key={`${r.title}-${r.period}`} className="bg-row">
          <span className="bg-period">{r.period}</span>
          <span>
            <span className="bg-title">{r.title}</span>
            {r.org && <><br /><span className="bg-org">{r.org}</span></>}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function BackgroundSection() {
  return (
    <section id="background" className="section" aria-labelledby="background-title">
      <div className="container">
        <SectionHead id="background-title" index="05" title="Background" />

        <div className="bg-grid">
          <div>
            <h3 className="bg-group-title">학력</h3>
            <Rows rows={education} />
          </div>
          <div>
            <h3 className="bg-group-title">연구 · 활동</h3>
            <Rows rows={research} />
          </div>
          <div>
            <h3 className="bg-group-title">수상</h3>
            <Rows rows={awards} />
          </div>
          <div>
            <h3 className="bg-group-title">자격 · 어학</h3>
            <Rows rows={certifications} />
          </div>
          <details className="bg-details">
            <summary>교육 이수 <span className="bg-count">{training.length}건</span></summary>
            <Rows rows={training} />
          </details>
          <div>
            <a href={site.resumeUrl} className="text-link">
              전체 이력은 Resume에서 <span className="arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
