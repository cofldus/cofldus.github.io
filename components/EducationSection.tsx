"use client";

import { motion } from "framer-motion";

// ─────────────────────────────────────────────────────────────────
// 이력 원본 데이터. 전체는 이력서(/resume_v1.html)에서 확인하고,
// 홈에서는 아래 HOME_* 선택자로 일부만 노출한다. 데이터는 지우지 않는다.
// ─────────────────────────────────────────────────────────────────

// 왼쪽 — 주요 경험 (역할/프로젝트 중심)
const mainExp = [
  {
    cat: "학력",
    items: [
      {
        role: "AI융합학부",
        org: "성신여자대학교",
        period: "졸업 예정 2026.08",
        desc: "",
      },
    ],
  },
  {
    cat: "경력 · 활동",
    items: [
      {
        role: "문서 인식 엔진 품질 개선 · 단계별 손실 측정 체계 구축",
        org: "문서 AI 기업 실무",
        period: "2026.07– 재직 중",
        desc: "",
      },
      {
        role: "Scientific LLM · CPT · SFT · GDPO 리서치",
        org: "가짜연구소 (Pseudo Lab) 12기 러너 · 오픈 리서치 커뮤니티",
        period: "진행 중",
        desc: "",
      },
      {
        role: "RAG 기반 강의 자동 퀴즈·학습 가이드 생성",
        org: "멋쟁이사자처럼 로켓단 인턴십",
        period: "2026.03–04",
        desc: "",
      },
      {
        role: "정부지원 사업 Pre-TIPS 최종 합격 · 프로젝트 'MOIM' 개발",
        org: "중소벤처기업부",
        period: "2025.01",
        desc: "",
      },
      {
        role: "CT·MRI 의료영상 AI 연구개발 · 논문 작성",
        org: "(주)딥러닝연구개발 · 한성대학교 연구원",
        period: "2023.06–09",
        desc: "",
      },
    ],
  },
  {
    cat: "교육이수",
    items: [
      {
        role: "AI NLP 엔지니어 집중과정 3기 수료",
        org: "멋쟁이사자처럼",
        period: "2025.12–2026.02",
        desc: "",
      },
      {
        role: "청년 AI·BigData 아카데미 30기 수료",
        org: "포스코 인재창조원",
        period: "2025.06–08",
        desc: "",
      },
      {
        role: "정보보안과정 수료",
        org: "Microsoft",
        period: "2024.10",
        desc: "",
      },
      {
        role: "MQL 데이터 기반 B2B 영업 기회 창출 예측 모델 개발",
        org: "LG Aimers 4기 · LG AI Research",
        period: "2024.01–02",
        desc: "",
      },
      {
        role: "Phase 1 수료",
        org: "LG Aimers 3기 · LG AI Research",
        period: "2023.08",
        desc: "",
      },
      {
        role: "스마트공장 제품 품질 상태 분류 AI 모델 개발",
        org: "LG Aimers 2기 · LG AI Research",
        period: "2023.01–02",
        desc: "",
      },
    ],
  },
];

// 오른쪽 — 수상 · 자격증 · 어학
const sideInfo = [
  {
    cat: "수상",
    items: [
      { label: "AI 프로젝트 대회 장려상", org: "포스코 인재창조원", period: "2025.08" },
      { label: "Bias-A-Thon Track 2 리더보드 3위", org: "성균관대 지능형멀티미디어연구센터 · 딥페이크연구센터", period: "2025.05" },
      { label: "AiRPA 해커톤 특별상", org: "한국지능정보사회진흥원", period: "2023.11" },
      { label: "소프트웨어 경진대회 장려상", org: "성신여자대학교", period: "2023.09" },
      { label: "학생창업경진대회 A등급", org: "교육부 · 연세대학교", period: "2022.08" },
    ],
  },
  {
    cat: "자격증",
    items: [
      { label: "ADsP (데이터분석 준전문가)", org: "한국데이터산업진흥원", period: "2026.03" },
      { label: "빅데이터분석기사", org: "한국데이터산업진흥원", period: "2025.12" },
    ],
  },
  {
    cat: "어학",
    items: [
      { label: "OPIc IH (Intermediate High)", org: "ACTFL", period: "2025.08" },
    ],
  },
];

// ─── 홈 노출 선택 ────────────────────────────────────────────────
const byCat = (list: typeof mainExp, cat: string) =>
  list.find((c) => c.cat === cat)?.items ?? [];
const sideByCat = (cat: string) =>
  sideInfo.find((c) => c.cat === cat)?.items ?? [];

const education = byCat(mainExp, "학력");
const allCareer = byCat(mainExp, "경력 · 활동");
const awards = sideByCat("수상");
// 교육이수 · 자격증 · 어학은 데이터로만 보관하고 홈에는 노출하지 않는다.

const pick = (orgs: string[]) =>
  orgs
    .map((org) => allCareer.find((it) => it.org === org))
    .filter((it): it is (typeof allCareer)[0] => Boolean(it));

// 고용 관계가 있던 것만 '경력'으로 둔다 (실무 · 인턴십 · 연구원)
const homeCareer = pick([
  "문서 AI 기업 실무",
  "멋쟁이사자처럼 로켓단 인턴십",
  "(주)딥러닝연구개발 · 한성대학교 연구원",
]);

// 커뮤니티 리서치 참여는 위계를 나눠 별도 표기
const homeResearch = pick([
  "가짜연구소 (Pseudo Lab) 12기 러너 · 오픈 리서치 커뮤니티",
]);

// AI/NLP 관련 수상 2건만 노출. 나머지 이력은 이력서에서 확인.
const homeAwards = awards.slice(0, 2);

// ─── 표시 컴포넌트 ───────────────────────────────────────────────

function GroupTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{
      fontFamily: "var(--font-sans)",
      fontSize: 16,
      fontWeight: 600,
      color: "var(--ink)",
      letterSpacing: "-0.01em",
      lineHeight: 1.4,
      margin: "0 0 14px",
      paddingBottom: 10,
      borderBottom: "1px solid var(--border)",
    }}>
      {children}
    </h3>
  );
}

function Row({ period, title, org }: { period: string; title: string; org?: string }) {
  return (
    <div className="bg-row">
      <span style={{
        fontFamily: "var(--font-sans)", fontSize: 14.5, fontWeight: 400,
        color: "var(--ink-light)", lineHeight: 1.6, whiteSpace: "nowrap" as const,
      }}>
        {period}
      </span>
      <div>
        <p style={{
          fontFamily: "var(--font-sans)", fontSize: 16, fontWeight: 500,
          color: "var(--ink)", lineHeight: 1.55, margin: 0,
          letterSpacing: "-0.01em", wordBreak: "keep-all" as const,
        }}>
          {title}
        </p>
        {org && (
          <p style={{
            fontFamily: "var(--font-sans)", fontSize: 14.5, fontWeight: 400,
            color: "var(--ink-mid)", lineHeight: 1.6, margin: "3px 0 0",
            wordBreak: "keep-all" as const,
          }}>
            {org}
          </p>
        )}
      </div>
    </div>
  );
}

export default function EducationSection() {
  return (
    <section id="education" style={{ borderTop: "1px solid var(--border)", background: "var(--bg)" }}>
      <div className="sec-wrap">

        <h2 className="sec-title">경력 · 학력</h2>

        <div style={{ maxWidth: "var(--measure)" }}>

          {/* 경력 */}
          <GroupTitle>경력</GroupTitle>
          <div style={{ marginBottom: 48 }}>
            {homeCareer.map((it) => (
              <motion.div
                key={it.org}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
              >
                <Row period={it.period} title={it.role} org={it.org} />
              </motion.div>
            ))}
          </div>

          {/* 연구 · 활동 — 고용 관계가 아닌 참여 */}
          {homeResearch.length > 0 && (
            <>
              <GroupTitle>연구 · 활동</GroupTitle>
              <div style={{ marginBottom: 48 }}>
                {homeResearch.map((it) => (
                  <Row key={it.org} period={it.period} title={it.role} org={it.org} />
                ))}
              </div>
            </>
          )}

          {/* 학력 */}
          <GroupTitle>학력</GroupTitle>
          <div style={{ marginBottom: 48 }}>
            {education.map((it) => (
              <Row key={it.org} period={it.period} title={`${it.org} ${it.role}`} />
            ))}
          </div>

          {/* 수상 */}
          <GroupTitle>수상</GroupTitle>
          <div style={{ marginBottom: 48 }}>
            {homeAwards.map((it) => (
              <Row key={it.label} period={it.period} title={it.label} org={it.org} />
            ))}
          </div>

          {/* 교육이수 · 자격증 · 어학은 이력서에서 확인 */}

          <a href="/resume_v1.html" className="bg-cta">
            전체 이력 보기
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <style>{`
        .bg-row {
          display: grid;
          grid-template-columns: 160px 1fr;
          gap: 20px;
          padding: 16px 0;
          border-bottom: 1px solid var(--border-sub);
        }
        .bg-row:last-child { border-bottom: none; }

        .bg-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 44px;
          padding: 11px 20px;
          border: 1px solid var(--border);
          border-radius: 6px;
          font-family: var(--font-sans);
          font-size: 15px;
          font-weight: 400;
          color: var(--ink-mid);
          text-decoration: none;
          transition: border-color 0.15s, color 0.15s;
        }
        .bg-cta:hover { border-color: var(--ink); color: var(--ink); }
        .bg-cta:focus-visible { outline: 2px solid var(--accent-text); outline-offset: 2px; }

        @media (max-width: 640px) {
          .bg-row {
            grid-template-columns: 1fr;
            gap: 5px;
          }
        }
      `}</style>
    </section>
  );
}
