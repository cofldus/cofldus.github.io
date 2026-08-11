"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * 같은 사이트 안에서 넘어온 경우 브라우저 뒤로가기를 사용해
 * 목록에서 보던 스크롤 위치로 복귀한다.
 * 외부 유입이나 새 탭으로 연 경우에는 /#projects 로 이동한다.
 */
export default function BackLink({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    setCanGoBack(
      typeof window !== "undefined" &&
      window.history.length > 1 &&
      document.referrer.startsWith(window.location.origin)
    );
  }, []);

  if (!canGoBack) {
    return (
      <Link href="/#projects" className={className} style={style}>
        ← 프로젝트 목록
      </Link>
    );
  }

  return (
    <a
      href="/#projects"
      className={className}
      style={style}
      onClick={(e) => {
        e.preventDefault();
        router.back();
      }}
    >
      ← 프로젝트 목록
    </a>
  );
}
