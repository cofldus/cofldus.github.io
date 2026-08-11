import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cofldus.github.io"),
  title: "이채연 — AI / NLP Engineer Portfolio",
  description:
    "문서 AI, 검색·RAG, LLM 최적화 프로젝트를 개발한 AI/NLP 엔지니어 이채연의 포트폴리오.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "이채연 · AI / NLP Engineer",
    title: "이채연 — AI / NLP Engineer",
    description:
      "문서 AI 항목 추출 34.1% → 91.7%, 온디바이스 LLM 응답 2.3s → 0.47s, 의료 RAG BERTScore +0.16",
  },
  twitter: {
    card: "summary_large_image",
    title: "이채연 — AI / NLP Engineer",
    description:
      "문서 AI 항목 추출 34.1% → 91.7%, 온디바이스 LLM 응답 2.3s → 0.47s, 의료 RAG BERTScore +0.16",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon3.svg" type="image/svg+xml" />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-KZVMV4CQEJ" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-KZVMV4CQEJ');
        `}} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Inter:wght@400;500;600;700;800;900&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Noto+Sans+KR:wght@400;500;700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Outfit:wght@400;500;600;700&family=Playwrite+IE:wght@100..400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
