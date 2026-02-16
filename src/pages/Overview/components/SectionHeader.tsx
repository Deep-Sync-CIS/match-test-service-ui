import { ReactNode } from 'react'

interface SectionHeaderProps {
  titleId: string
  title: string
  count: number
  countLabel?: string
  action: ReactNode
  icon?: ReactNode
}

export default function SectionHeader({
  titleId,
  title,
  count,
  countLabel = 'jobs',
  action,
  icon,
}: SectionHeaderProps) {
  return (
    <div className="match-history-header">
      <div className="match-history-title-row">
        {icon != null && (
          <span className="match-history-icon" aria-hidden>
            {icon}
          </span>
        )}
        <h2 id={titleId} className="match-history-title">
          {title}
        </h2>
        <span className="match-history-count">
          {count} {countLabel}
        </span>
      </div>
      {action}
    </div>
  )
}
