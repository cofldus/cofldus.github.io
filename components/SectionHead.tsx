export default function SectionHead({
  index,
  title,
  lead,
  id,
  wide,
}: {
  index: string;
  title: string;
  lead?: string;
  /** h2 의 id (aria-labelledby 연결용) */
  id: string;
  /** lead 를 본문 폭 제한 없이 한 줄로 두고 싶을 때 */
  wide?: boolean;
}) {
  return (
    <header className={`section-head${wide ? " section-head--wide" : ""}`}>
      <span className="section-index" aria-hidden="true">{index}</span>
      <h2 className="section-title" id={id}>{title}</h2>
      {lead && <p className="section-lead">{lead}</p>}
    </header>
  );
}
