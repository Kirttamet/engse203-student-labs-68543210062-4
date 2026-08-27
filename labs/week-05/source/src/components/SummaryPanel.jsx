const SUMMARY_FIELDS = [
  { key: 'total', label: 'ทั้งหมด' },
  { key: 'pending', label: 'รอดำเนินการ' },
  { key: 'inProgress', label: 'กำลังดำเนินการ' },
  { key: 'completed', label: 'เสร็จสิ้น' },
];

export default function SummaryPanel({ summary }) {
  return (
    <section className="summary-grid" aria-label="สรุปคำร้อง">
      {SUMMARY_FIELDS.map((field) => (
        <article className="summary-card" key={field.key}>
          <span>{field.label}</span>
          <strong>{summary[field.key]}</strong>
        </article>
      ))}
    </section>
  );
}
