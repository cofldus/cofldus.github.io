export default function SectionHead({
  index,
  title,
  lead,
  id,
}: {
  index: string;
  title: string;
  lead?: string;
  /** h2 의 id (aria-labelledby 연결용) */
  id: string;
}) {
  return (
    <header className="section-head">
      <span className="section-index" aria-hidden="true">{index}</span>
      <h2 className="section-title" id={id}>{title}</h2>
      {lead && <p className="section-lead">{lead}</p>}
    </header>
  );
}
