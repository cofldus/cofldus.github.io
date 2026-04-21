import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

const ARCH: Record<string, string> = {
  "airpa":                        "/arch/RPA.svg",
  "finview":                      "/arch/FinView.svg",
  "killkong":                     "/arch/KillKong.svg",
  "ct-mri-cyclegan":              "/arch/CT-MRI.svg",
  "hunchgame":                    "/arch/HunchGame.svg",
  "lovelop":                      "/arch/lovelop.svg",
  "medical-chatbot":              "/arch/medical-chatbot.svg",
  "rocketan":                     "/arch/rocketan.svg",
  "korean-noise-restoration":     "/arch/korean-noise-restoration.svg",
};

const UI: Record<string, string[]> = {
  "airpa":                    ["/airpa_ui/1.png", "/airpa_ui/2.png"],
  "finview":                  ["/finview_ui/1.png", "/finview_ui/2.png"],
  "korean-noise-restoration": ["/korean_noise_ui/1.png", "/korean_noise_ui/2.png"],
  "medical-chatbot":          ["/medical_chatbot_ui/1.png"],
};

export default async function ProjectExportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProjectBySlug(slug);
  if (!p) notFound();

  const archSrc = ARCH[slug] ?? null;
  const uiImgs = UI[slug] ?? [];
  const bullets = p.bullets.slice(0, 3);
  const decisions = p.decisions.slice(0, 2);

  // Heights: arch + UI zone adaptive
  const hasArch = !!archSrc;
  const hasUI   = uiImgs.length > 0;
  const archH   = hasArch && hasUI ? 160 : hasArch ? 240 : 0;
  const uiH     = hasUI ? 110 : 0;

  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <title>{p.title} — export</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Outfit:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+KR:wght@400;500;700;900&display=swap" rel="stylesheet" />
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }

          :root {
            --blue:   #024df0;
            --blue-lt: #eef2ff;
            --blue-bd: #c7d2fe;
            --font-display: 'Plus Jakarta Sans', 'Inter', sans-serif;
            --font-label:   'Outfit', 'Noto Sans KR', sans-serif;
            --font-sans:    'Inter', 'Noto Sans KR', sans-serif;
            --ink:    #0F172A;
            --sub:    #64748B;
            --border: #E2E8F0;
          }

          @page { size: A4 landscape; margin: 0; }

          @media print {
            html, body { background: #fff !important; padding: 0 !important; }
            .page { box-shadow: none !important; border-radius: 0 !important; }
          }

          html, body {
            background: #E8EDF5;
            font-family: var(--font-sans);
            -webkit-font-smoothing: antialiased;
            display: flex; justify-content: center; align-items: flex-start;
            padding: 28px; min-height: 100vh;
          }

          .page {
            width: 1123px; height: 794px;
            background: #fff; border-radius: 6px;
            box-shadow: 0 12px 48px rgba(0,0,0,0.12);
            overflow: hidden; display: flex; flex-direction: column;
            flex-shrink: 0;
          }

          /* Accent bar */
          .accent { height: 5px; background: var(--blue); flex-shrink: 0; }

          /* Header */
          .hdr {
            padding: 13px 32px 11px;
            border-bottom: 1px solid var(--border);
            display: flex; align-items: flex-start;
            justify-content: space-between; gap: 20px; flex-shrink: 0;
          }
          .hdr-left { flex: 1; min-width: 0; }
          .hdr-eyebrow {
            font-family: var(--font-label);
            font-size: 8px; font-weight: 700; letter-spacing: 0.18em;
            text-transform: uppercase; color: #94A3B8; margin-bottom: 3px;
          }
          .hdr-title {
            font-family: var(--font-display);
            font-size: 25px; font-weight: 800; color: var(--ink);
            letter-spacing: -0.03em; line-height: 1.15; margin-bottom: 5px;
          }
          .hdr-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
          .hdr-period { font-family: var(--font-label); font-size: 12px; color: var(--sub); }
          .sep { width: 1px; height: 10px; background: #CBD5E1; flex-shrink: 0; }
          .tags { display: flex; flex-wrap: wrap; gap: 4px; }
          .tag {
            font-family: var(--font-label);
            font-size: 9px; font-weight: 600; letter-spacing: 0.04em;
            text-transform: uppercase; background: var(--blue-lt);
            border: 1px solid var(--blue-bd); border-radius: 3px;
            padding: 2px 7px; color: var(--blue);
          }
          .kpis { display: flex; gap: 8px; flex-shrink: 0; }
          .kpi {
            text-align: center; border: 1px solid var(--blue-bd);
            border-radius: 6px; padding: 8px 16px; min-width: 72px;
            background: var(--blue-lt);
          }
          .kpi-v {
            font-family: var(--font-display);
            font-size: 20px; font-weight: 900; color: var(--blue);
            letter-spacing: -0.04em; line-height: 1;
          }
          .kpi-l {
            font-family: var(--font-label);
            font-size: 8px; font-weight: 600; color: #94A3B8;
            letter-spacing: 0.07em; text-transform: uppercase; margin-top: 3px;
          }

          /* Image zone: arch left, UI right */
          .img-zone {
            flex-shrink: 0; border-bottom: 1px solid var(--border);
            display: flex; flex-direction: row;
            background: #FAFBFF; overflow: hidden;
          }
          .arch-wrap {
            flex: 3; display: flex; align-items: center; justify-content: center;
            overflow: hidden; padding: 8px;
          }
          .arch-wrap--split { border-right: 1px solid var(--border); }
          .arch-img {
            width: 100%; height: 100%; display: block;
            object-fit: contain; object-position: center;
          }
          .ui-stack { flex: 2; display: flex; flex-direction: column; overflow: hidden; }
          .ui-img {
            flex: 1; display: block; width: 100%;
            object-fit: cover; object-position: top center;
            background: #F8FAFC;
          }
          .ui-img + .ui-img { border-top: 1px solid var(--border); }

          /* Content: 3 columns */
          .content {
            flex: 1; min-height: 0;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            overflow: hidden;
          }
          .c-col {
            padding: 16px 20px;
            overflow: hidden;
          }
          .c-col + .c-col { border-left: 1px solid var(--border); }

          .c-label {
            font-family: var(--font-label);
            font-size: 8.5px; font-weight: 800; letter-spacing: 0.18em;
            text-transform: uppercase; color: var(--blue);
            margin-bottom: 10px; padding-bottom: 6px;
            border-bottom: 1px solid var(--border);
          }

          .meta-item { display: flex; gap: 10px; align-items: baseline; margin-bottom: 10px; }
          .meta-key {
            font-family: var(--font-label);
            font-size: 9px; font-weight: 700; letter-spacing: 0.14em;
            text-transform: uppercase; flex-shrink: 0; min-width: 28px;
          }
          .meta-div { width: 1px; height: 10px; background: #CBD5E1; flex-shrink: 0; align-self: center; }
          .meta-val { font-family: var(--font-sans); font-size: 13px; line-height: 1.65; color: var(--ink); }

          .bullets { display: flex; flex-direction: column; gap: 10px; }
          .bullet { display: flex; gap: 10px; align-items: flex-start; }
          .bullet-num {
            font-size: 8.5px; font-weight: 800; color: #fff;
            background: var(--blue); flex-shrink: 0;
            width: 19px; height: 19px; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            margin-top: 2px;
          }
          .bullet-text {
            font-family: var(--font-sans); font-size: 13px; line-height: 1.65; color: #1E293B;
            display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
          }

          .decisions { display: flex; flex-direction: column; gap: 9px; }
          .decision {
            padding: 10px 13px; background: var(--blue-lt);
            border-radius: 6px; border: 1px solid var(--blue-bd);
          }
          .decision-tech {
            font-family: var(--font-display);
            font-size: 12px; font-weight: 700; color: var(--ink); margin-bottom: 3px;
          }
          .decision-reason {
            font-family: var(--font-sans); font-size: 11.5px; line-height: 1.6; color: var(--sub);
            display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden;
          }

          /* Footer */
          .footer {
            padding: 8px 32px; border-top: 1px solid var(--border);
            display: flex; align-items: center; justify-content: space-between;
            background: #F8FAFC; flex-shrink: 0;
          }
          .footer-name { font-family: var(--font-label); font-size: 10px; font-weight: 700; letter-spacing: 0.05em; color: #94A3B8; }
          .footer-url { font-family: var(--font-label); font-size: 10px; color: var(--blue); }
        `}</style>
      </head>
      <body>
        <div className="page">
          <div className="accent" />

          {/* Header */}
          <div className="hdr">
            <div className="hdr-left">
              <div className="hdr-eyebrow">PROJECT {p.num} &nbsp;·&nbsp; Case Study</div>
              <div className="hdr-title">{p.title}</div>
              <div className="hdr-row">
                <span className="hdr-period">{p.period}</span>
                {p.tags.length > 0 && <span className="sep" />}
                <div className="tags">
                  {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </div>
            {p.highlights.length > 0 && (
              <div className="kpis">
                {p.highlights.map((h) => (
                  <div key={h.label} className="kpi">
                    <div className="kpi-v">{h.value}</div>
                    <div className="kpi-l">{h.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Image zone: arch left, UI right */}
          {(hasArch || hasUI) && (
            <div className="img-zone" style={{ height: hasArch && hasUI ? 220 : hasArch ? 200 : 160 }}>
              {hasArch && (
                <div className={`arch-wrap${hasUI ? " arch-wrap--split" : ""}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={archSrc!} alt="architecture" className="arch-img" />
                </div>
              )}
              {hasUI && (
                <div className="ui-stack">
                  {uiImgs.map((src, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={i} src={src} alt={`UI ${i + 1}`} className="ui-img" />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Content: 3 equal columns */}
          <div className="content">
            {/* Col 1: Goal / Role */}
            <div className="c-col">
              {(p.goal || p.myRole) && (
                <>
                  <div className="c-label">프로젝트 개요</div>
                  {p.goal && (
                    <div className="meta-item">
                      <span className="meta-key" style={{ color: "#024df0" }}>목표</span>
                      <span className="meta-div" />
                      <span className="meta-val">{p.goal}</span>
                    </div>
                  )}
                  {p.myRole && (
                    <div className="meta-item">
                      <span className="meta-key" style={{ color: "#94A3B8" }}>역할</span>
                      <span className="meta-div" />
                      <span className="meta-val">{p.myRole}</span>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Col 2: Bullets */}
            <div className="c-col">
              {bullets.length > 0 && (
                <>
                  <div className="c-label">핵심 구현</div>
                  <div className="bullets">
                    {bullets.map((b, i) => (
                      <div key={i} className="bullet">
                        <span className="bullet-num">{i + 1}</span>
                        <span className="bullet-text">{b}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Col 3: Decisions */}
            <div className="c-col">
              {decisions.length > 0 && (
                <>
                  <div className="c-label">기술 선택 근거</div>
                  <div className="decisions">
                    {decisions.map((d) => (
                      <div key={d.tech} className="decision">
                        <div className="decision-tech">{d.tech}</div>
                        <div className="decision-reason">{d.reason}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="footer">
            <span className="footer-name">이채연 &nbsp;·&nbsp; AI / NLP Engineer</span>
            <span className="footer-url">cofldus.github.io/projects/{slug}</span>
          </div>
        </div>
      </body>
    </html>
  );
}
