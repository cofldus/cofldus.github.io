import { projects } from "@/lib/projects";
import type { Project } from "@/lib/projects";

/* ─── Cover ────────────────────────────────────────────── */
const COVER_PROJECTS = [
  { num: "01", title: "AiRPA",              desc: "학생 진로탐색 자동화 · 한국지능정보사회진흥원 특별상", tags: ["RPA", "NLP", "T5"], kpi: "95%+ 자동화" },
  { num: "02", title: "Medical Chatbot",    desc: "하이브리드 RAG 의료자문봇",                            tags: ["RAG", "FAISS", "BM25"], kpi: "BERTScore +0.16" },
  { num: "03", title: "난독화 한글 복원 AI", desc: "야민정음·특수문자 복원 NLP 파이프라인",               tags: ["KoBART", "Classifier"], kpi: "0.9812" },
  { num: "04", title: "KillKong",           desc: "콩글리쉬 교정 AI Agent · 포스코 인재창조원 장려상",   tags: ["LoRA", "FAISS", "LLM"], kpi: "응답 0.47s" },
  { num: "05", title: "FinView",            desc: "생성형 AI 재무보고서 · 환각 80% 감소",                tags: ["GPT-4", "XGBoost"], kpi: "만족도 4.4/5" },
  { num: "06", title: "CT · MRI CycleGAN", desc: "의료영상 도메인 변환 · (주)딥러닝연구개발 연구",       tags: ["GAN", "PyTorch"], kpi: "SSIM 0.88" },
  { num: "07", title: "Rocketan",           desc: "RAG 기반 강의 퀴즈 · 학습 가이드 자동 생성",          tags: ["RAG", "LangChain"], kpi: "자동화" },
];

function CoverPage() {
  return (
    <div className="page">
      {/* ── Top bar + band ── */}
      <div className="cv-bar" />
      <div className="cv-band">
        <span>AI / NLP Portfolio</span>
        <span>2025 – 2026</span>
      </div>

      {/* ── Hero: name left, photo right ── */}
      <div className="cv-hero">
        <div className="cv-hero-left">
          <h1 className="cv-name">이채연</h1>
          <p className="cv-role">AI / NLP Engineer</p>
        </div>
        <div className="cv-hero-right">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/2024-1.jpg" alt="이채연" className="cv-photo" />
          <div className="cv-contacts">
            <p className="cv-contact">cofldus.github.io</p>
            <p className="cv-contact">github.com/cofldus</p>
          </div>
        </div>
      </div>

      {/* ── Intro: desc + skills ── */}
      <div className="cv-intro">
        <p className="cv-desc">
          RAG와 reasoning, agentic workflows를 바탕으로 실제 서비스 환경에서 작동하는 AI 시스템을 구현합니다.
        </p>
        <div className="cv-skills">
          {["Python", "NLP / RAG", "LLM Fine-tuning", "PyTorch", "LangChain"].map((s) => (
            <span key={s} className="cv-skill">{s}</span>
          ))}
        </div>
      </div>

      <div className="cv-rule" />

      {/* ── Project grid (2 columns) ── */}
      <div className="cv-projs-wrap">
        <p className="cv-proj-label">주요 프로젝트</p>
        <div className="cv-proj-grid">
          {COVER_PROJECTS.map((p) => (
            <div key={p.num} className="cv-proj-card">
              <div className="cv-card-accent" />
              <span className="cv-pnum">{p.num}</span>
              <div className="cv-proj-info">
                <div className="cv-ptitle-row">
                  <span className="cv-ptitle">{p.title}</span>
                  <span className="cv-kpi">{p.kpi}</span>
                </div>
                <div className="cv-pdesc">{p.desc}</div>
                <div className="cv-ctags">
                  {p.tags.map((t) => <span key={t} className="cv-ctag">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
          {/* empty cell to balance 2-col grid for 7 items */}
          <div className="cv-proj-card cv-proj-card--empty" />
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="cv-footer">
        <div className="cv-stats">
          {[{ n: "7", l: "Projects" }, { n: "5", l: "Awards" }, { n: "2", l: "Certifications" }].map((s) => (
            <div key={s.l} className="cv-stat">
              <span className="cv-stat-n">{s.n}</span>
              <span className="cv-stat-l">{s.l}</span>
            </div>
          ))}
        </div>
        <span className="cv-url">cofldus.github.io</span>
      </div>
    </div>
  );
}

/* ─── Maps ─────────────────────────────────────────────── */
const ARCH: Record<string, string> = {
  "airpa":                    "/arch/RPA.svg",
  "finview":                  "/arch/FinView.svg",
  "killkong":                 "/arch/KillKong.svg",
  "ct-mri-cyclegan":          "/arch/CT-MRI.svg",
  "medical-chatbot":          "/arch/medical-chatbot.svg",
  "rocketan":                 "/arch/rocketan.svg",
  "korean-noise-restoration": "/arch/korean-noise-restoration.svg",
};

const UI: Record<string, string[]> = {
  "airpa":                    ["/airpa_ui/1.png", "/airpa_ui/2.png"],
  "finview":                  ["/finview_ui/1.png", "/finview_ui/2.png"],
  "korean-noise-restoration": ["/korean_noise_ui/1.png"],
  "medical-chatbot":          ["/medical_chatbot_ui/1.png"],
};

const EXCLUDE = ["llm-for-science", "hunchgame", "lovelop"];

/* ─── CSS ───────────────────────────────────────────────── */
const CSS = `
  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --blue:    #024df0;
    --blue-lt: #eef2ff;
    --blue-bd: #c7d2fe;
    --ink:     #0F172A;
    --sub:     #64748B;
    --border:  #E2E8F0;
    --font-display: 'Plus Jakarta Sans', 'Inter', sans-serif;
    --font-label:   'Outfit', 'Noto Sans KR', sans-serif;
    --font-sans:    'Inter', 'Noto Sans KR', sans-serif;
  }

  @page { size: A4 landscape; margin: 0; }

  @media print {
    html, body { background: #fff; padding: 0 !important; margin: 0; display: block; }
    .page {
      box-shadow: none !important; border-radius: 0 !important;
      width: 1123px; height: 794px;
      page-break-after: always; break-after: page;
    }
    .page:last-child { page-break-after: avoid; break-after: avoid; }
  }

  body {
    font-family: var(--font-sans); -webkit-font-smoothing: antialiased;
    background: #E8EDF5; padding: 32px;
    display: flex; flex-direction: column; align-items: center; gap: 32px;
  }

  .page {
    width: 1123px; height: 794px;
    background: #fff; border-radius: 6px;
    box-shadow: 0 12px 48px rgba(0,0,0,0.12);
    overflow: hidden; display: flex; flex-direction: column; flex-shrink: 0;
  }

  /* ═══ COVER ═══════════════════════════════════════════ */
  .cv-bar { height: 5px; background: var(--blue); flex-shrink: 0; }

  .cv-band {
    background: var(--blue-lt); padding: 7px 44px;
    display: flex; justify-content: space-between; align-items: center;
    font-family: var(--font-label); font-size: 9px; font-weight: 700;
    letter-spacing: 0.2em; text-transform: uppercase; color: var(--blue);
    flex-shrink: 0;
  }

  /* Hero */
  .cv-hero {
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 44px 0; flex-shrink: 0;
  }
  .cv-hero-left { flex: 1; }
  .cv-name {
    font-family: var(--font-display);
    font-size: 82px; font-weight: 900; color: var(--ink);
    letter-spacing: -0.05em; line-height: 0.9; margin-bottom: 8px;
  }
  .cv-role {
    font-family: var(--font-label);
    font-size: 13px; font-weight: 500; color: var(--sub); letter-spacing: 0.06em;
  }
  .cv-hero-right {
    display: flex; align-items: center; gap: 14px; flex-shrink: 0;
  }
  .cv-photo {
    width: 110px; height: 148px;
    object-fit: contain; object-position: center;
    border-radius: 4px; display: block;
  }
  .cv-contacts {
    display: flex; flex-direction: column; justify-content: center; gap: 5px;
  }
  .cv-contact { font-family: var(--font-label); font-size: 10px; color: var(--blue); }

  /* Intro */
  .cv-intro { padding: 10px 44px 10px; flex-shrink: 0; }
  .cv-desc {
    font-family: var(--font-sans);
    font-size: 12.5px; line-height: 1.75; color: #475569;
    margin-bottom: 8px; word-break: keep-all;
  }
  .cv-skills { display: flex; flex-wrap: wrap; gap: 5px; }
  .cv-skill {
    font-family: var(--font-label); font-size: 8.5px; font-weight: 600;
    letter-spacing: 0.06em; text-transform: uppercase;
    background: var(--blue-lt); border: 1px solid var(--blue-bd);
    border-radius: 3px; padding: 2px 8px; color: var(--blue);
  }

  .cv-rule { height: 1px; background: var(--border); margin: 0 44px; flex-shrink: 0; }

  /* Project grid */
  .cv-projs-wrap {
    flex: 1; padding: 8px 44px 0;
    display: flex; flex-direction: column; overflow: hidden;
  }
  .cv-proj-label {
    font-family: var(--font-label); font-size: 8px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase; color: var(--blue);
    margin-bottom: 5px; flex-shrink: 0;
  }
  .cv-proj-grid {
    flex: 1; min-height: 0;
    display: grid; grid-template-columns: 1fr 1fr; grid-auto-rows: 1fr;
    border-top: 1px solid var(--border); border-left: 1px solid var(--border);
  }
  .cv-proj-card {
    display: flex; align-items: center; gap: 10px; padding: 0 16px;
    border-right: 1px solid var(--border); border-bottom: 1px solid var(--border);
    min-height: 0; overflow: hidden; position: relative;
  }
  .cv-card-accent {
    width: 3px; height: 60%; background: var(--blue);
    border-radius: 2px; flex-shrink: 0; align-self: center;
  }
  .cv-proj-card--empty { background: #FAFBFD; }
  .cv-proj-card--empty .cv-card-accent { background: transparent; }
  .cv-pnum {
    font-family: var(--font-label); font-size: 9px; font-weight: 700;
    color: var(--blue); letter-spacing: 0.1em; flex-shrink: 0; min-width: 18px;
  }
  .cv-proj-info { min-width: 0; flex: 1; }
  .cv-ptitle-row {
    display: flex; align-items: baseline; justify-content: space-between; gap: 8px;
    margin-bottom: 2px;
  }
  .cv-ptitle {
    font-family: var(--font-display); font-size: 13px; font-weight: 700; color: var(--ink);
  }
  .cv-kpi {
    font-family: var(--font-display); font-size: 11px; font-weight: 700;
    color: var(--blue); flex-shrink: 0;
  }
  .cv-pdesc {
    font-family: var(--font-sans); font-size: 11px; color: var(--sub);
    line-height: 1.4; margin-bottom: 4px;
  }
  .cv-ctags { display: flex; flex-wrap: wrap; gap: 3px; }
  .cv-ctag {
    font-family: var(--font-label); font-size: 8px; font-weight: 600;
    letter-spacing: 0.04em; text-transform: uppercase;
    background: #F1F5F9; border: 1px solid #E2E8F0;
    border-radius: 2px; padding: 1px 5px; color: #64748B;
  }

  /* Footer */
  .cv-footer {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 44px; border-top: 1px solid var(--border);
    background: #FAFBFC; flex-shrink: 0;
  }
  .cv-stats { display: flex; gap: 28px; align-items: center; }
  .cv-stat { display: flex; align-items: baseline; gap: 6px; }
  .cv-stat-n {
    font-family: var(--font-display);
    font-size: 22px; font-weight: 900; color: var(--ink); letter-spacing: -0.04em;
  }
  .cv-stat-l {
    font-family: var(--font-label); font-size: 9px; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase; color: #94A3B8;
  }
  .cv-url { font-family: var(--font-label); font-size: 10px; color: var(--blue); }

  /* ═══ PROJECT PAGES ════════════════════════════════════ */
  .proj-bar { height: 5px; background: var(--blue); flex-shrink: 0; }

  .hdr {
    padding: 13px 32px 11px; border-bottom: 1px solid var(--border);
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
  .hdr-sep { width: 1px; height: 10px; background: #CBD5E1; flex-shrink: 0; }
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
    display: flex; flex-direction: row; background: #FAFBFF;
    overflow: hidden;
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
    display: grid; grid-template-columns: 1fr 1fr 1fr;
    overflow: hidden;
  }
  .c-col { padding: 16px 20px; overflow: hidden; }
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
  .meta-val { font-family: var(--font-sans); font-size: 13.5px; line-height: 1.7; color: var(--ink); }

  .bullets { display: flex; flex-direction: column; gap: 10px; }
  .bullet { display: flex; gap: 10px; align-items: flex-start; }
  .bullet-num {
    font-size: 8.5px; font-weight: 800; color: #fff;
    background: var(--blue); flex-shrink: 0;
    width: 19px; height: 19px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center; margin-top: 2px;
  }
  .bullet-text { font-family: var(--font-sans); font-size: 13.5px; line-height: 1.75; color: #1E293B; }

  .decisions { display: flex; flex-direction: column; gap: 8px; }
  .decision {
    padding: 9px 12px; background: var(--blue-lt);
    border-radius: 6px; border: 1px solid var(--blue-bd);
  }
  .decision-tech { font-family: var(--font-display); font-size: 12.5px; font-weight: 700; color: var(--ink); margin-bottom: 3px; }
  .decision-reason {
    font-family: var(--font-sans); font-size: 12px; line-height: 1.65; color: var(--sub);
    display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .insight-block { margin-top: 12px; }
  .insight-text {
    font-family: var(--font-sans); font-size: 12px; line-height: 1.75;
    color: #64748B;
    display: -webkit-box; -webkit-line-clamp: 7; -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Footer */
  .footer {
    padding: 8px 32px; border-top: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    background: #F8FAFC; flex-shrink: 0;
  }
  .footer-name { font-family: var(--font-label); font-size: 10px; font-weight: 700; letter-spacing: 0.05em; color: #94A3B8; }
  .footer-url { font-family: var(--font-label); font-size: 10px; color: var(--blue); }
`;

/* ─── Project page component ───────────────────────────── */
function ProjectPage({ p, archSrc }: { p: Project; archSrc: string | null }) {
  const uiImgs = UI[p.slug] ?? [];
  const bullets = p.bullets.slice(0, 4);
  const decisions = p.decisions.slice(0, 1);
  const hasArch = !!archSrc;
  const hasUI = uiImgs.length > 0;
  const archH = hasArch && hasUI ? 160 : hasArch ? 240 : 0;
  const uiH   = hasUI ? 110 : 0;

  return (
    <div className="page">
      <div className="proj-bar" />

      <div className="hdr">
        <div className="hdr-left">
          <div className="hdr-eyebrow">PROJECT {p.num} &nbsp;·&nbsp; Case Study</div>
          <div className="hdr-title">{p.title}</div>
          <div className="hdr-row">
            <span className="hdr-period">{p.period}</span>
            {p.tags.length > 0 && <span className="hdr-sep" />}
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

      <div className="content">
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
          {p.insight && (
            <div className="insight-block">
              <div className="c-label">배운 점</div>
              <p className="insight-text">{p.insight}</p>
            </div>
          )}
        </div>
      </div>

      <div className="footer">
        <span className="footer-name">이채연 &nbsp;·&nbsp; AI / NLP Engineer</span>
        <span className="footer-url">cofldus.github.io/projects/{p.slug}</span>
      </div>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────── */
export default function ExportAllPage() {
  const filtered = projects.filter((p) => !EXCLUDE.includes(p.slug));

  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <title>이채연 — 포트폴리오 전체 케이스 스터디</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Outfit:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+KR:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <style>{CSS}</style>
      </head>
      <body>
        <CoverPage />
        {filtered.map((p) => (
          <ProjectPage key={p.slug} p={p} archSrc={ARCH[p.slug] ?? null} />
        ))}
      </body>
    </html>
  );
}
