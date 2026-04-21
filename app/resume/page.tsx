"use client";

import { useEffect } from "react";

export default function ResumePage() {
  useEffect(() => {
    window.location.replace("/resume_v1.html");
  }, []);

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      minHeight: "100vh", fontFamily: "var(--font-label)", fontSize: 12,
      color: "var(--ink-light)",
    }}>
      이력서로 이동 중...
    </div>
  );
}
