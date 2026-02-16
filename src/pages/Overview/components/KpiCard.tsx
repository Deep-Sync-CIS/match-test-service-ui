import { KpiCardData } from '../../../types'

interface KpiCardProps {
  card: KpiCardData
}

export default function KpiCard({ card }: KpiCardProps) {
  const iconClass = `kpi-icon kpi-icon--${card.iconVariant}`
  const trendClass =
    card.trendColor === 'purple'
      ? 'kpi-trend kpi-trend--purple'
      : 'kpi-trend kpi-trend--green'
  return (
    <div className="kpi-card">
      <div className={iconClass}>
        {card.iconVariant === 'checkmark' && (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {card.iconVariant === 'barChart' && (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 17V21H7V17H3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 12V21H14V12H10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17 7V21H21V7H17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {card.iconVariant === 'target' && (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
          </svg>
        )}
      </div>
      <div className="kpi-content">
        <p className="kpi-value">{card.value}</p>
        <p className="kpi-label">{card.label}</p>
        <p className={trendClass}>
          <span className="kpi-trend-text">{card.trendText}</span>
          {card.trendDirection === 'up' && (
            <span className="kpi-trend-arrow" aria-hidden>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 10V4M7 4L3 8M7 4L11 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          )}
          <span className="kpi-trend-percent">{card.trendPercent}</span>
        </p>
      </div>
    </div>
  )
}
