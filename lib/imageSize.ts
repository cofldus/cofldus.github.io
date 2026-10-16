import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * public/ 아래 PNG 의 크기를 빌드 시점에 읽는다 (서버 컴포넌트 전용).
 * img 에 width/height 를 지정해 지연 로딩 중 레이아웃 이동을 막는다.
 */
export function pngSize(publicPath: string): { width: number; height: number } | undefined {
  try {
    const buf = readFileSync(path.join(process.cwd(), "public", publicPath));
    if (buf.toString("ascii", 1, 4) !== "PNG") return undefined;
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  } catch {
    return undefined;
  }
}
