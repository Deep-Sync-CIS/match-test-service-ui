export const MATCH_TYPES = ['PII', 'Transaction', 'Digital'] as const
export type MatchTypeFilter = (typeof MATCH_TYPES)[number]

interface FilterPillsProps {
  selected: MatchTypeFilter[]
  onToggle: (type: MatchTypeFilter) => void
  onClear: () => void
}

export default function FilterPills({ selected, onToggle, onClear }: FilterPillsProps) {
  return (
    <div className="filter-by-match-type">
      <span className="filter-by-label">Filter by Match Type:</span>
      <div className="filter-pills">
        {MATCH_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            className={`filter-pill filter-pill--${type.toLowerCase()}`}
            aria-pressed={selected.includes(type)}
            onClick={() => onToggle(type)}
          >
            {type}
          </button>
        ))}
      </div>
      {selected.length > 0 && (
        <button type="button" className="clear-filters-link" onClick={onClear}>
          Clear Filters
        </button>
      )}
    </div>
  )
}
