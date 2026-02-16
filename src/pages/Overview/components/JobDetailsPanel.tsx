import { Job } from '../../../types'

function formatDate(processedDate: string): string {
  try {
    const d = new Date(processedDate)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return processedDate
  }
}

function formatRecords(n: number | undefined): string {
  if (n == null) return '–'
  return n.toLocaleString()
}

const FIELD_MAPPINGS = [
  { source: 'Email', target: 'ds_email' },
  { source: 'Phone', target: 'ds_phone' },
  { source: 'Name', target: 'ds_full_name' },
  { source: 'Address', target: 'ds_address' },
]

function getMatchStrategyText(matchType: string): string {
  switch (matchType) {
    case 'PII':
      return 'PII-based identity resolution with fuzzy matching enabled'
    case 'Transaction':
      return 'Transaction-based matching with temporal alignment'
    case 'Digital':
      return 'Digital identity resolution with cross-channel matching'
    default:
      return 'Identity resolution with fuzzy matching enabled'
  }
}

const INCLUDED_FIELDS = ['ds_id', 'match_rank', 'confidence_score', 'household_id', 'original_fields']

interface JobDetailsPanelProps {
  job: Job
  onClose: () => void
  onViewFullReport: () => void
}

export default function JobDetailsPanel({ job, onClose, onViewFullReport }: JobDetailsPanelProps) {
  const uploadDate = formatDate(job.processedDate)
  const recordsProcessed = formatRecords(job.recordCount)
  const matchRateDisplay =
    job.status === 'processing' ? 'Processing' : String(job.matchRate)
  const matchStrategy = getMatchStrategyText(job.matchType)

  return (
    <>
      <div
        className="job-details-overlay"
        onClick={onClose}
        aria-hidden
      />
      <aside
        className="job-details-panel-slide"
        role="dialog"
        aria-labelledby="job-details-title"
        aria-describedby="job-details-subtitle"
      >
        <div className="job-details-panel-inner">
          <header className="job-details-panel-header">
            <div className="job-details-panel-header-content">
              <span className="job-details-panel-icon" aria-hidden>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 2V8H20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div>
                <h2 id="job-details-title" className="job-details-panel-title">
                  Job Details
                </h2>
                <p id="job-details-subtitle" className="job-details-panel-subtitle">
                  Complete information for this match job
                </p>
              </div>
            </div>
            <button
              type="button"
              className="job-details-panel-close"
              onClick={onClose}
              aria-label="Close panel"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M15 5L5 15M5 5L15 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </header>

          <div className="job-details-panel-body">
            <section className="job-details-section">
              <h3 className="job-details-section-title">Job Overview</h3>
              <div className="job-details-overview-grid">
                <div className="job-details-overview-item">
                  <span className="job-details-overview-label">FILE NAME</span>
                  <span className="job-details-overview-value">{job.fileName}</span>
                </div>
                <div className="job-details-overview-item">
                  <span className="job-details-overview-label">UPLOAD DATE</span>
                  <span className="job-details-overview-value">{uploadDate}</span>
                </div>
                <div className="job-details-overview-item">
                  <span className="job-details-overview-label">RECORDS PROCESSED</span>
                  <span className="job-details-overview-value">{recordsProcessed}</span>
                </div>
                <div className="job-details-overview-item">
                  <span className="job-details-overview-label">FILE SIZE</span>
                  <span className="job-details-overview-value">{job.fileSize ?? '–'}</span>
                </div>
                <div className="job-details-overview-item">
                  <span className="job-details-overview-label">MATCH TYPE</span>
                  <span className={`match-type-tag ${job.matchType.toLowerCase()}`}>
                    {job.matchType}
                  </span>
                </div>
                <div className="job-details-overview-item">
                  <span className="job-details-overview-label">MATCH RATE</span>
                  <span
                    className={`job-details-overview-value ${job.status === 'processing' ? '' : 'job-details-match-rate'}`}
                  >
                    {matchRateDisplay}
                  </span>
                </div>
              </div>
            </section>

            <section className="job-details-section">
              <h3 className="job-details-section-title">
                <span className="job-details-section-title-icon" aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 12V4M4 8L8 4L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                Source Configuration
              </h3>
              <div className="job-details-source-block">
                <div className="job-details-source-row">
                  <span className="job-details-source-icon" aria-hidden>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
                      <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
                      <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
                      <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  </span>
                  <span className="job-details-source-text">CSV File Upload</span>
                </div>
              </div>
              <div className="job-details-field-mapping">
                <span className="job-details-source-icon job-details-field-mapping-icon" aria-hidden>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
                    <circle cx="16" cy="8" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
                    <circle cx="12" cy="16" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path d="M10.5 9.5L11.5 14.5M13.5 14.5L14.5 9.5M9 11L12 13L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
                <ul className="job-details-field-mapping-list">
                  {FIELD_MAPPINGS.map((m) => (
                    <li key={m.target} className="job-details-field-mapping-item">
                      <span className="job-details-field-mapping-check" aria-hidden>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2 7L5 10L12 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span>{m.source} → {m.target}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="job-details-match-strategy">
                <span className="job-details-match-strategy-check" aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8L6 11L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>{matchStrategy}</span>
              </div>
            </section>

            <section className="job-details-section">
              <h3 className="job-details-section-title">
                <span className="job-details-section-title-icon job-details-section-title-icon--down" aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 4V12M4 8L8 12L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                Export Configuration
              </h3>
              {job.exported && (
                <div className="job-details-export-banner">Successfully Exported</div>
              )}
              <div className="job-details-export-grid">
                <div className="job-details-overview-item">
                  <span className="job-details-overview-label">EXPORT FORMAT</span>
                  <span className="job-details-overview-value">CSV with Deep Sync IDs</span>
                </div>
                <div className="job-details-overview-item">
                  <span className="job-details-overview-label">EXPORT DATE</span>
                  <span className="job-details-overview-value">{uploadDate}</span>
                </div>
                <div className="job-details-overview-item job-details-overview-item--full">
                  <span className="job-details-overview-label">INCLUDED FIELDS</span>
                  <div className="job-details-included-pills">
                    {INCLUDED_FIELDS.map((f) => (
                      <span key={f} className="job-details-included-pill">{f}</span>
                    ))}
                  </div>
                </div>
                <div className="job-details-overview-item job-details-overview-item--full">
                  <span className="job-details-overview-label">DESTINATION</span>
                  <span className="job-details-overview-value">S3 Bucket: ds-exports/customer-matches/</span>
                </div>
              </div>
            </section>
          </div>

          <footer className="job-details-panel-footer">
            <button
              type="button"
              className="job-details-panel-btn-primary"
              onClick={onViewFullReport}
            >
              <span>→ View Full Report</span>
            </button>
            <button type="button" className="job-details-panel-btn-secondary" onClick={onClose}>
              Close
            </button>
          </footer>
        </div>
      </aside>
    </>
  )
}
