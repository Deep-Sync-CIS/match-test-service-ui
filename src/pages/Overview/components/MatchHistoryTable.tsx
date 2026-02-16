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

interface MatchHistoryTableProps {
  jobs: Job[]
  selectedJob: Job | null
  onSelect: (job: Job) => void
  onDoubleClick: (jobId: number) => void
}

export default function MatchHistoryTable({
  jobs,
  selectedJob,
  onSelect,
  onDoubleClick,
}: MatchHistoryTableProps) {
  return (
    <div className="table-container">
      <table className="jobs-table match-history-table">
        <thead>
          <tr>
            <th scope="col">FILE NAME</th>
            <th scope="col">DATE</th>
            <th scope="col">RECORDS</th>
            <th scope="col">MATCH TYPE</th>
            <th scope="col">MATCH RATE</th>
            <th scope="col">EXPORTED</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr
              key={job.id}
              className={selectedJob?.id === job.id ? 'selected' : ''}
              onClick={() => onSelect(job)}
              onDoubleClick={() => onDoubleClick(job.id)}
            >
              <td>
                <div className="file-name-cell">
                  <span className="file-name-icon" aria-hidden>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M12 2H5C4.44772 2 4 2.44772 4 3V17C4 17.5523 4.44772 18 5 18H15C15.5523 18 16 17.5523 16 17V6L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 2V6H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <span className="file-name-text">{job.fileName}</span>
                    {job.fileSize != null && (
                      <span className="file-name-size">{job.fileSize}</span>
                    )}
                  </div>
                </div>
              </td>
              <td>{formatDate(job.processedDate)}</td>
              <td>{formatRecords(job.recordCount)}</td>
              <td>
                <span className={`match-type-tag ${job.matchType.toLowerCase()}`}>
                  {job.matchType}
                </span>
              </td>
              <td>
                {job.status === 'processing' ? (
                  <span className="match-rate-processing">
                    <span className="spinner" aria-hidden />
                    Processing
                  </span>
                ) : (
                  <span>{job.matchRate}</span>
                )}
              </td>
              <td>
                {job.exported ? (
                  <span className="export-status yes">Yes</span>
                ) : (
                  <span className="export-status">–</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
