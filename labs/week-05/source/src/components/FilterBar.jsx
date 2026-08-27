const STATUS_FILTERS = [
  { value: 'all', label: 'ทั้งหมด' },
  { value: 'pending', label: 'รอดำเนินการ' },
  { value: 'in-progress', label: 'กำลังดำเนินการ' },
  { value: 'completed', label: 'เสร็จสิ้น' },
];

export default function FilterBar({ value, onFilterChange }) {
  return (
    <div className="filter-bar" role="group" aria-label="กรองสถานะคำร้อง">
      {STATUS_FILTERS.map((filter) => {
        const isActive = value === filter.value;
        return (
          <button
            key={filter.value}
            type="button"
            className={isActive ? 'filter-active' : 'filter-button'}
            aria-pressed={isActive}
            onClick={() => onFilterChange(filter.value)}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
