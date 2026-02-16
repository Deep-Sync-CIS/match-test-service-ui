import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/layout/Header'
import SelectMatchTypeModal, { MatchType } from '../../components/common/SelectMatchTypeModal'
import FieldMappingModal from '../../components/common/FieldMappingModal'
import { useMatchReportStore } from '../../stores'

const RunMatchReport = () => {
  const navigate = useNavigate()
  const [isDragging, setIsDragging] = useState(false)
  const {
    selectedFile,
    setSelectedFile,
    fileColumns,
    setFileColumns,
    selectedMatchType,
    setSelectedMatchType,
    showMatchTypeModal,
    setShowMatchTypeModal,
    showFieldMappingModal,
    setShowFieldMappingModal,
  } = useMatchReportStore()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const allowedExtensions = ['.csv', '.xls', '.xlsx', '.parquet', '.json']
  const allowedTypes = [
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/json',
  ]

  const handleFileSelect = async (file: File) => {
    const ext = '.' + file.name.split('.').pop()?.toLowerCase()
    if (
      !allowedTypes.includes(file.type) &&
      !allowedExtensions.includes(ext)
    ) {
      alert('Please upload a CSV, Excel, or JSON file')
      return
    }
    setSelectedFile(file)
    
    // Extract column names from file (mock implementation)
    // In production, this would parse the actual file
    const mockColumns = extractColumnsFromFile(file)
    setFileColumns(mockColumns)
  }

  const extractColumnsFromFile = (file: File): string[] => {
    // Mock column extraction - in production, parse CSV/Excel/JSON
    const fileName = file.name.toLowerCase()
    if (fileName.includes('customer') || fileName.includes('crm')) {
      return [
        'first_name',
        'last_name',
        'email_address',
        'phone',
        'street_address',
        'city',
        'state',
        'zip_code',
        'date_of_birth',
        'customer_id',
      ]
    }
    // Default columns
    return [
      'first_name',
      'last_name',
      'email',
      'phone',
      'address',
      'city',
      'state',
      'zip',
      'dob',
    ]
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) handleFileSelect(files[0])
  }

  const handleBrowseClick = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    fileInputRef.current?.click()
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0])
    }
  }

  const handleGetStartedConnected = () => {
    navigate('connections')
  }

  const handleStartAnalysis = () => {
    if (!selectedFile) return
    setShowMatchTypeModal(true)
  }

  const handleMatchTypeSelect = (matchType: MatchType) => {
    setSelectedMatchType(matchType)
    setShowMatchTypeModal(false)
    setShowFieldMappingModal(true)
  }

  const handleFieldMappingProcess = () => {
    setShowFieldMappingModal(false)
    // Generate a mock jobId (in production, this would come from an API call)
    const jobId = `job-${Date.now()}`
    navigate(`preparing-report?jobId=${jobId}`)
  }

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const headerActions = (
    <div className="header-actions">
      <button className="nav-icon-btn" type="button" aria-label="Notifications">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2C8.9 2 8 2.9 8 4V5.5C6.2 6.1 5 7.7 5 9.5V13L3 15V16H17V15L15 13V9.5C15 7.7 13.8 6.1 12 5.5V4C12 2.9 11.1 2 10 2Z" fill="currentColor" />
        </svg>
        <span className="notification-dot" aria-hidden />
      </button>
      <button className="nav-icon-btn" type="button" aria-label="Bookmark">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M5 2H15V18L10 15L5 18V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button className="nav-icon-btn" type="button" aria-label="Help">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M10 7V10M10 13H10.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )

  return (
    <div className="run-page">
      <Header
        title="Run Match Analysis"
        subtitle="Import data and start a new match analysis workflow"
        actions={headerActions}
      />

      <div className="run-cards">
        <div className="run-import-card">
          <span className="run-card-pill run-card-pill--recommended">
            <span className="run-card-pill-dot" aria-hidden />
            Recommended
          </span>
          <div className="run-import-card-inner">
            <div className="run-import-card-icon" aria-hidden>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M3 9H21M9 3V21" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <div className="run-import-card-content">
              <h2 className="run-import-card-title">Import from Connected Source</h2>
              <p className="run-import-card-desc">
                Pull data directly from your configured data sources like Snowflake, Databricks, or S3 for seamless integration
              </p>
              <button
                type="button"
                className="run-import-card-btn"
                onClick={handleGetStartedConnected}
              >
                <span>Get Started</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M6 4L12 8L6 12V4Z" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          className={`run-upload-card ${isDragging ? 'run-upload-card--dragover' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !selectedFile && handleBrowseClick()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xls,.xlsx,.parquet,.json"
            className="run-upload-input"
            onChange={handleFileInputChange}
          />
          {selectedFile ? (
            <div className="run-upload-selected">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="run-upload-success-icon">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <p className="run-upload-filename">{selectedFile.name}</p>
              <p className="run-upload-filesize">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <div className="run-upload-actions">
                <button
                  type="button"
                  className="run-upload-remove-btn"
                  onClick={handleRemoveFile}
                >
                  Remove File
                </button>
                <button
                  type="button"
                  className="run-upload-continue-btn"
                  onClick={handleStartAnalysis}
                >
                  Start Analysis
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M6 4L12 8L6 12V4Z" fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="run-upload-icon" aria-hidden>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M17 8L12 3M12 3L7 8M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="run-upload-card-title">Upload File</h2>
              <p className="run-upload-card-desc">
                Drag and drop or browse for CSV, Excel, or JSON files
              </p>
              <button
                type="button"
                className="run-upload-choose-btn"
                onClick={(e) => handleBrowseClick(e)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M17 8L12 3M12 3L7 8M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Choose File
              </button>
            </>
          )}
        </div>
      </div>

      <section className="getting-started-section" aria-labelledby="getting-started-title">
        <h2 id="getting-started-title" className="getting-started-title">
          Getting Started
        </h2>
        <div className="getting-started-grid">
          <div className="getting-started-item">
            <h3 className="getting-started-item-title">Connected Source</h3>
            <p className="getting-started-item-desc">
              Connects to your configured data warehouse or cloud storage for automated data pulls.
            </p>
          </div>
          <div className="getting-started-item">
            <h3 className="getting-started-item-title">File Upload</h3>
            <p className="getting-started-item-desc">
              Upload individual files for one-time analysis. Supports CSV, Excel, and JSON formats.
            </p>
          </div>
        </div>
      </section>

      <SelectMatchTypeModal
        isOpen={showMatchTypeModal}
        onClose={() => setShowMatchTypeModal(false)}
        onSelect={handleMatchTypeSelect}
      />

      <FieldMappingModal
        isOpen={showFieldMappingModal}
        onClose={() => setShowFieldMappingModal(false)}
        matchType={selectedMatchType}
        fileColumns={fileColumns}
        onProcess={handleFieldMappingProcess}
      />
    </div>
  )
}

export default RunMatchReport
