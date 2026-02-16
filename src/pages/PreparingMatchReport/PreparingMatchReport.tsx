import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const STEPS = [
  'Reading file data...',
  'Processing records...',
  'Analyzing match quality...',
  'Generating insights...',
  'Report ready!',
]

const STEP_DURATION_MS = 1300
const TOTAL_DURATION_MS = 7000
const PROGRESS_INTERVAL_MS = 80

export default function PreparingMatchReport() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const jobId = searchParams.get('jobId')

  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!jobId) {
      navigate('.', { replace: true })
      return
    }
  }, [jobId, navigate])

  useEffect(() => {
    if (!jobId) return

    const startTime = Date.now()
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const next = Math.min(100, Math.round((elapsed / TOTAL_DURATION_MS) * 100))
      setProgress(next)
      if (next >= 100) {
        setIsComplete(true)
        clearInterval(progressInterval)
      }
    }, PROGRESS_INTERVAL_MS)

    return () => clearInterval(progressInterval)
  }, [jobId])

  useEffect(() => {
    if (!jobId || isComplete) return

    const stepInterval = setInterval(() => {
      setActiveStepIndex((prev) => {
        if (prev >= STEPS.length - 1) return prev
        return prev + 1
      })
    }, STEP_DURATION_MS)

    return () => clearInterval(stepInterval)
  }, [jobId, isComplete])

  useEffect(() => {
    if (!isComplete || !jobId) return
    const t = setTimeout(() => {
      navigate(`intelligence?jobId=${jobId}`, { replace: true })
    }, 400)
    return () => clearTimeout(t)
  }, [isComplete, jobId, navigate])

  if (!jobId) return null

  return (
    <div className="preparing-report">
      <div className="preparing-report-header">
        <div className="preparing-report-icon" aria-hidden>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <defs>
              <linearGradient id="preparing-icon-gradient" x1="0" y1="0" x2="1" y2="1" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--primary-blue)" />
                <stop offset="1" stopColor="var(--primary-purple)" />
              </linearGradient>
            </defs>
            <rect width="64" height="64" rx="16" fill="url(#preparing-icon-gradient)" />
            <path
              d="M20 18H44C45.1 18 46 18.9 46 20V44C46 45.1 45.1 46 44 46H20C18.9 46 18 45.1 18 44V20C18 18.9 18.9 18 20 18Z"
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
            <path d="M18 20L46 20L46 24" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <rect x="24" y="28" width="8" height="8" rx="1" fill="white" />
            <rect x="24" y="40" width="8" height="8" rx="1" fill="white" />
          </svg>
        </div>
        <h1 className="preparing-report-title">Preparing Your Match Report</h1>
        <p className="preparing-report-subtitle">
          Analyzing your data and generating comprehensive insights...
        </p>
      </div>

      <div className="preparing-report-card">
        <ul className="preparing-report-steps" role="list">
          {STEPS.map((label, index) => {
            const isCompleted = index < activeStepIndex || (index === activeStepIndex && isComplete)
            const isActive = index === activeStepIndex && !isComplete
            return (
              <li
                key={label}
                className={`preparing-report-step ${isActive ? 'preparing-report-step--active' : ''} ${isCompleted ? 'preparing-report-step--completed' : ''}`}
              >
                <span className="preparing-report-step-icon-left" aria-hidden>
                  {isCompleted ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
                      <path d="M6 10L9 13L14 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : isActive ? (
                    <span className="preparing-report-step-icon-rotate">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 2L11.5 8.5L18 10L11.5 11.5L10 18L8.5 11.5L2 10L8.5 8.5L10 2Z" fill="currentColor" />
                      </svg>
                    </span>
                  ) : (
                    <span className="preparing-report-step-icon-pending" aria-hidden />
                  )}
                </span>
                <span className="preparing-report-step-label">{label}</span>
                {isCompleted && (
                  <span className="preparing-report-step-icon-right" aria-hidden>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7L5 10L12 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </li>
            )
          })}
        </ul>
        <div className="preparing-report-progress-wrap">
          <div className="preparing-report-progress-header">
            <span className="preparing-report-progress-label">Overall Progress</span>
            <span className="preparing-report-progress-percent">{progress}%</span>
          </div>
          <div className="preparing-report-progress-bar">
            <div
              className="preparing-report-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="preparing-report-stats">
        <div className="preparing-report-stat-card">
          <span className="preparing-report-stat-value">50,000</span>
          <span className="preparing-report-stat-label">Records</span>
        </div>
        <div className="preparing-report-stat-card">
          <span className="preparing-report-stat-value">12</span>
          <span className="preparing-report-stat-label">Data Points</span>
        </div>
        <div className="preparing-report-stat-card">
          <span className="preparing-report-stat-value">15+</span>
          <span className="preparing-report-stat-label">Metrics</span>
        </div>
      </div>
    </div>
  )
}
