"use client";

import { useEffect, useId, useState } from "react";
import type { Project } from "@/lib/projects";

type PagerLink = { slug: string; title: string };

interface SectionDef {
  id: string;
  title: string;
}

/** 인사이트 문자열을 단락으로 분리 (\n\n 우선, 없으면 3문장 단위) */
function splitParagraphs(text: string): string[] {
  if (text.includes("\n\n")) return text.split("\n\n").map((s) => s.trim()).filter(Boolean);
  const sentences = text.split(/(?<=다[.!])\s+/).filter(Boolean);
  const out: string[] = [];
  for (let i = 0; i < sentences.length; i += 3) out.push(sentences.slice(i, i + 3).join(" "));
  return out.length > 1 ? out : [text];
}

/** 담당 문자열 "A · B · C" → 목록 */
const splitRole = (role: string) => role.split(/\s+·\s+/).map((s) => s.trim()).filter(Boolean);

export default function ProjectDetailClient({
  project: p,
  poster,
  prev,
  next,
}: {
  project: Project;
  poster?: string;
  prev?: PagerLink;
  next?: PagerLink;
}) {
  const hasArch = Boolean(p.pipeline?.length || p.archImages?.length);
  const hasDecisions = Boolean(p.decisionRecords?.length || p.decisions.length);
  const hasChallenges = Boolean(p.troubleshooting?.length || p.experiments?.length || (p.archImages?.length ?? 0) > 2);

  const sections: SectionDef[] = [
    { id: "overview", title: "Project Overview" },
    { id: "problem", title: "Problem & Constraints" },
    ...(p.myRole ? [{ id: "role", title: "My Responsibilities" }] : []),
    ...(hasArch ? [{ id: "architecture", title: "System Architecture" }] : []),
    ...(hasDecisions ? [{ id: "decisions", title: "Key Engineering Decisions" }] : []),
    { id: "results", title: "Evaluation & Results" },
    ...(hasChallenges ? [{ id: "challenges", title: "Challenges & Improvements" }] : []),
    ...(p.insight ? [{ id: "lessons", title: "Lessons Learned" }] : []),
  ];
  const num = (id: string) => String(sections.findIndex((s) => s.id === id) + 1).padStart(2, "0");

  const active = useActiveSection(sections.map((s) => s.id));

  return (
    <div className="container cs-grid">
      <article className="cs-article">

        {/* 01 — Overview */}
        <Section id="overview" num={num("overview")} title="Project Overview">
          <div className="cs-prose">
            {p.goal && <p className="cs-lead">{p.goal}</p>}
          </div>
          {p.disclosure && <p className="cs-note">{p.disclosure}</p>}
          {p.videoUrl ? (
            <figure className="cs-media">
              <video
                src={p.videoUrl}
                controls
                muted
                playsInline
                preload="none"
                poster={poster}
                aria-label={`${p.title} 데모 영상`}
              />
              <figcaption>데모 영상 · 소리 없음</figcaption>
            </figure>
          ) : p.readmeImage ? (
            <figure className="cs-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.readmeImage} alt={`${p.title} 예시 화면`} loading="lazy" />
              {p.context === "work" && <figcaption>공개 법정 서식에 합성 값을 채운 테스트 문서 예시</figcaption>}
            </figure>
          ) : null}
        </Section>

        {/* 02 — Problem & Constraints */}
        <Section id="problem" num={num("problem")} title="Problem & Constraints">
          <div className="cs-prose">
            {p.desc.split("\n\n").map((para, i) => <p key={i}>{para}</p>)}
          </div>
          {p.constraints && p.constraints.length > 0 && (
            <>
              <h3 className="cs-subhead">제약 조건</h3>
              <ul className="cs-list">
                {p.constraints.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </>
          )}
        </Section>

        {/* 03 — My Responsibilities */}
        {p.myRole && (
          <Section id="role" num={num("role")} title="My Responsibilities">
            <ul className="cs-list">
              {splitRole(p.myRole).map((r) => <li key={r}>{r}</li>)}
            </ul>
          </Section>
        )}

        {/* 04 — System Architecture */}
        {hasArch && (
          <Section id="architecture" num={num("architecture")} title="System Architecture">
            {p.pipeline && p.pipeline.length > 0 && (
              <div className="pipeline" role="group" aria-label="처리 흐름 비교">
                {p.pipeline.map((row, ri) => (
                  <div key={row.caption} className={`pipeline-row${ri === p.pipeline!.length - 1 ? " pipeline-row--after" : ""}`}>
                    <span className="pipeline-caption">{row.caption}</span>
                    <ol className="pipeline-stages">
                      {row.stages.map((st, si) => (
                        <li key={st}>
                          {si > 0 && <span className="pipeline-arrow" aria-hidden="true">→</span>}
                          <span className="pipeline-stage">{st}</span>
                        </li>
                      ))}
                    </ol>
                    {row.result && <span className="pipeline-result">{row.result}</span>}
                  </div>
                ))}
                {p.pipelineNote && <p className="pipeline-foot">{p.pipelineNote}</p>}
              </div>
            )}
            {p.archImages && p.archImages.length > 0 && (
              <div className={`cs-arch${p.pipeline ? " cs-arch--after" : ""}`}>
                {p.archImages.slice(0, 2).map((src, i) => (
                  <figure key={src}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`${p.title} 시스템 구성도 ${i + 1}`} loading="lazy" />
                  </figure>
                ))}
              </div>
            )}
          </Section>
        )}

        {/* 05 — Key Engineering Decisions */}
        {hasDecisions && (
          <Section id="decisions" num={num("decisions")} title="Key Engineering Decisions">
            {p.decisionRecords && p.decisionRecords.length > 0 ? (
              <>
                {p.decisionRecords.map((d, i) => (
                  <article key={d.title} className="decision">
                    <h3 className="decision-title">
                      <span className="num">{String(i + 1).padStart(2, "0")}</span>
                      {d.title}
                    </h3>
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
                {p.decisions.length > 0 && (
                  <div>
                    <h3 className="cs-subhead">의사결정 상세 서술 · 참고 문헌</h3>
                    <Accordion
                      items={p.decisions.map((d) => ({
                        title: d.tech,
                        body: <DecisionBody reason={d.reason} refs={d.refs} />,
                      }))}
                    />
                  </div>
                )}
              </>
            ) : (
              <Accordion
                defaultOpen={0}
                items={p.decisions.map((d) => ({
                  title: d.tech,
                  body: <DecisionBody reason={d.reason} refs={d.refs} />,
                }))}
              />
            )}
          </Section>
        )}

        {/* 06 — Evaluation & Results */}
        <Section id="results" num={num("results")} title="Evaluation & Results">
          {p.highlights.length > 0 && (
            <div className="results">
              {p.highlights.map((h) => (
                <div key={h.label} className="result">
                  <span className="result-value">{h.value}</span>
                  <span className="result-label">{h.label}</span>
                  {h.condition && <span className="result-cond">{h.condition}</span>}
                </div>
              ))}
            </div>
          )}
          <h3 className="cs-subhead">구현과 결과</h3>
          <ul className="cs-list">
            {p.bullets.map((b) => <li key={b}>{b}</li>)}
          </ul>
        </Section>

        {/* 07 — Challenges & Improvements */}
        {hasChallenges && (
          <Section id="challenges" num={num("challenges")} title="Challenges & Improvements">
            {p.troubleshooting && p.troubleshooting.length > 0 && (
              <>
                <h3 className="cs-subhead cs-subhead--first">트러블슈팅</h3>
                <Accordion items={p.troubleshooting.map((t) => ({ title: t.title, body: <p>{t.body}</p> }))} />
              </>
            )}
            {p.experiments && p.experiments.length > 0 && (
              <>
                <h3 className="cs-subhead">실험 로그 — 가설과 결과</h3>
                <Accordion
                  numbered={false}
                  items={p.experiments.map((e) => ({
                    title: `${e.id} · ${e.hypothesis}`,
                    body: (
                      <>
                        <p><span className="acc-k">결과</span>{e.result}</p>
                        <p><span className="acc-k">결론</span>{e.conclusion}</p>
                      </>
                    ),
                  }))}
                />
              </>
            )}
            {(p.archImages?.length ?? 0) > 2 && (
              <>
                <h3 className="cs-subhead">세부 다이어그램</h3>
                <Accordion
                  items={[{
                    title: "세부 플로우 다이어그램 보기",
                    body: (
                      <div className="cs-arch">
                        {p.archImages!.slice(2).map((src, i) => (
                          <figure key={src}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={src} alt={`${p.title} 세부 다이어그램 ${i + 1}`} loading="lazy" />
                          </figure>
                        ))}
                      </div>
                    ),
                  }]}
                />
              </>
            )}
          </Section>
        )}

        {/* 08 — Lessons Learned */}
        {p.insight && (
          <Section id="lessons" num={num("lessons")} title="Lessons Learned">
            <div className="cs-prose cs-insight">
              {splitParagraphs(p.insight).map((para, i) => <p key={i}>{para}</p>)}
            </div>
          </Section>
        )}

        {/* 이전 · 다음 */}
        {(prev || next) && (
          <nav className="cs-pager" aria-label="다른 프로젝트">
            {prev ? (
              <a href={`/projects/${prev.slug}/`}>
                <span className="dir">← 이전</span>
                <span className="name">{prev.title}</span>
              </a>
            ) : <span />}
            {next ? (
              <a href={`/projects/${next.slug}/`} className="next">
                <span className="dir">다음 →</span>
                <span className="name">{next.title}</span>
              </a>
            ) : <span />}
          </nav>
        )}
      </article>

      {/* 사이드바 — 목차 · 핵심 결과 · 링크 */}
      <aside className="cs-aside" aria-label="페이지 정보">
        <nav aria-label="목차">
          <p className="cs-toc-title">On this page</p>
          <div className="cs-toc">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} aria-current={active === s.id ? "true" : undefined}>{s.title}</a>
            ))}
          </div>
        </nav>

        {p.highlights.length > 0 && (
          <div>
            <p className="cs-aside-title">Key results</p>
            <div className="cs-aside-results">
              {p.highlights.slice(0, 3).map((h) => (
                <div key={h.label}>
                  <div className="result-value">{h.value}</div>
                  <div className="result-label">{h.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {p.repoUrl && (
          <a href={p.repoUrl} className="text-link" target="_blank" rel="noopener noreferrer">
            GitHub repository <span aria-hidden="true">↗</span><span className="sr-only">(새 창)</span>
          </a>
        )}
      </aside>
    </div>
  );
}

/* ── 공용 조각 ─────────────────────────────────────────────── */

function Section({ id, num, title, children }: { id: string; num: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="cs-section" aria-labelledby={`${id}-h`}>
      <div className="cs-section-head">
        <span className="cs-section-num" aria-hidden="true">{num}</span>
        <h2 className="cs-section-title" id={`${id}-h`}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function DecisionBody({ reason, refs }: { reason: string; refs?: { label: string; url: string }[] }) {
  return (
    <>
      <p>{reason}</p>
      {refs && refs.length > 0 && (
        <div className="ref-list">
          {refs.map((r) => (
            <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer">
              {r.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      )}
    </>
  );
}

function Accordion({
  items,
  defaultOpen,
  numbered = true,
}: {
  items: { title: string; body: React.ReactNode }[];
  defaultOpen?: number;
  numbered?: boolean;
}) {
  const baseId = useId();
  const [open, setOpen] = useState<Set<number>>(() => new Set(defaultOpen !== undefined ? [defaultOpen] : []));
  const toggle = (i: number) =>
    setOpen((prev) => {
      const s = new Set(prev);
      if (s.has(i)) s.delete(i);
      else s.add(i);
      return s;
    });

  return (
    <div className="acc">
      {items.map((it, i) => {
        const isOpen = open.has(i);
        const panelId = `${baseId}-p${i}`;
        const btnId = `${baseId}-b${i}`;
        return (
          <div key={it.title} className="acc-item">
            <h4 className="acc-heading">
              <button
                type="button"
                id={btnId}
                className="acc-trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
              >
                {numbered && <span className="acc-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>}
                <span className="acc-title">{it.title}</span>
                <span className="acc-icon" aria-hidden="true">{isOpen ? "–" : "+"}</span>
              </button>
            </h4>
            <div id={panelId} role="region" aria-labelledby={btnId} className="acc-panel" hidden={!isOpen}>
              {it.body}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** 현재 화면에 보이는 섹션 id */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0]);
  const key = ids.join(",");
  useEffect(() => {
    const list = key.split(",");
    const els = list.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    if (!("IntersectionObserver" in window) || els.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [key]);
  return active;
}
