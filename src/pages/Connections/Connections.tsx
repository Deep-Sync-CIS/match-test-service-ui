import { useState } from 'react'
import Header from '../../components/layout/Header'
import Modal from '../../components/common/Modal'
import { mockConnections } from '../../utils/constants'
import type { Connection } from '../../types'

const SOURCE_TYPES = ['snowflake', 'databricks', 'sftp'] as const
const DESTINATION_TYPES = ['s3'] as const

const sources = mockConnections.filter((c) =>
  (SOURCE_TYPES as readonly string[]).includes(c.type)
)
const destinations = mockConnections.filter((c) =>
  (DESTINATION_TYPES as readonly string[]).includes(c.type)
)

const Connections = () => {
  const [activeTab, setActiveTab] = useState<'sources' | 'destinations'>('sources')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [connectionType, setConnectionType] = useState<'s3' | 'snowflake' | 'sftp' | 'databricks'>('s3')
  const [formData, setFormData] = useState({
    connectionName: '',
    bucketName: '',
    path: '',
    accessKeyId: '',
    secretAccessKey: '',
    host: '',
    database: '',
    schema: '',
    table: '',
    username: '',
    password: '',
  })

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
    </div>
  )

  const handleSaveConnection = () => {
    alert('Connection saved! (This will call API later)')
    setIsModalOpen(false)
    setFormData({
      connectionName: '',
      bucketName: '',
      path: '',
      accessKeyId: '',
      secretAccessKey: '',
      host: '',
      database: '',
      schema: '',
      table: '',
      username: '',
      password: '',
    })
  }

  const handleTestConnection = () => {
    alert('Testing connection... (This will call API later)')
  }

  return (
    <div className="connections-page">
      <Header
        title="Connections"
        subtitle="Manage your source and destination connections."
        actions={headerActions}
      />

      <div className="connections-tabs-wrapper">
        <div
          className={`connections-tab ${activeTab === 'sources' ? 'connections-tab--active connections-tab--sources' : ''}`}
          role="tab"
          aria-selected={activeTab === 'sources'}
          onClick={() => setActiveTab('sources')}
        >
          Sources
        </div>
        <div
          className={`connections-tab ${activeTab === 'destinations' ? 'connections-tab--active connections-tab--destinations' : ''}`}
          role="tab"
          aria-selected={activeTab === 'destinations'}
          onClick={() => setActiveTab('destinations')}
        >
          Destinations
        </div>
      </div>

      <div className="connections-grid">
        <button
          type="button"
          className="connection-card connection-card--add-new"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="connection-card-add-icon" aria-hidden>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <span className="connection-card-add-title">Add New Connection</span>
          <span className="connection-card-add-subtitle">
            {activeTab === 'sources'
              ? 'Connect a new data source.'
              : 'Connect a new data destination'}
          </span>
        </button>

        {activeTab === 'sources' &&
          sources.map((conn) => (
            <SourceConnectionCard key={conn.id} connection={conn} />
          ))}
        {activeTab === 'destinations' &&
          destinations.map((conn) => (
            <DestinationConnectionCard key={conn.id} connection={conn} />
          ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={activeTab === 'sources' ? 'Add Source Connection' : 'Add Destination Connection'}
        subtitle="Configure a new data connection."
      >
        <div className="form-group">
          <label className="form-label">Connection Type</label>
          <div className="connection-type-selector">
            <button
              type="button"
              className={`connection-type-btn ${connectionType === 'snowflake' ? 'selected' : ''}`}
              onClick={() => setConnectionType('snowflake')}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M3 9H21M9 3V21" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span className="type-label">Snowflake</span>
            </button>
            <button
              type="button"
              className={`connection-type-btn ${connectionType === 'databricks' ? 'selected' : ''}`}
              onClick={() => setConnectionType('databricks')}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M3 9H21M9 3V21" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span className="type-label">Databricks</span>
            </button>
            <button
              type="button"
              className={`connection-type-btn ${connectionType === 's3' ? 'selected' : ''}`}
              onClick={() => setConnectionType('s3')}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="type-label">AWS S3</span>
            </button>
            <button
              type="button"
              className={`connection-type-btn ${connectionType === 'sftp' ? 'selected' : ''}`}
              onClick={() => setConnectionType('sftp')}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M21 10C21 17 17 21 10 21C3 21 3 17 3 10C3 3 7 3 14 3C21 3 21 3 21 10Z" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="type-label">SFTP</span>
            </button>
          </div>
        </div>

        {connectionType === 's3' && (
          <>
            <div className="form-group">
              <label className="form-label required">Connection Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="My Production Database"
                value={formData.connectionName}
                onChange={(e) => setFormData({ ...formData, connectionName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label required">Bucket Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="my-bucket-name"
                value={formData.bucketName}
                onChange={(e) => setFormData({ ...formData, bucketName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Path / Prefix</label>
              <input
                type="text"
                className="form-input"
                placeholder="/data/exports/"
                value={formData.path}
                onChange={(e) => setFormData({ ...formData, path: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Access Key ID</label>
              <input
                type="text"
                className="form-input"
                placeholder="AKIAIOSFODNN7EXAMPLE"
                value={formData.accessKeyId}
                onChange={(e) => setFormData({ ...formData, accessKeyId: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Secret Access Key</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={formData.secretAccessKey}
                onChange={(e) => setFormData({ ...formData, secretAccessKey: e.target.value })}
              />
            </div>
          </>
        )}

        {connectionType === 'snowflake' && (
          <>
            <div className="form-group">
              <label className="form-label required">Connection Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="My Production Database"
                value={formData.connectionName}
                onChange={(e) => setFormData({ ...formData, connectionName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label required">Host / Account URL</label>
              <input
                type="text"
                className="form-input"
                placeholder="account.snowflakecomputing.com"
                value={formData.host}
                onChange={(e) => setFormData({ ...formData, host: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label required">Database</label>
              <input
                type="text"
                className="form-input"
                placeholder="CUSTOMER_DB"
                value={formData.database}
                onChange={(e) => setFormData({ ...formData, database: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Schema</label>
              <input
                type="text"
                className="form-input"
                placeholder="PUBLIC"
                value={formData.schema}
                onChange={(e) => setFormData({ ...formData, schema: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Table (for source connections)</label>
              <input
                type="text"
                className="form-input"
                placeholder="CUSTOMERS"
                value={formData.table}
                onChange={(e) => setFormData({ ...formData, table: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-input"
                placeholder="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </>
        )}

        {connectionType === 'sftp' && (
          <>
            <div className="form-group">
              <label className="form-label required">Connection Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="My Production Database"
                value={formData.connectionName}
                onChange={(e) => setFormData({ ...formData, connectionName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label required">Host</label>
              <input
                type="text"
                className="form-input"
                placeholder="sftp.example.com"
                value={formData.host}
                onChange={(e) => setFormData({ ...formData, host: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Path</label>
              <input
                type="text"
                className="form-input"
                placeholder="/uploads/"
                value={formData.path}
                onChange={(e) => setFormData({ ...formData, path: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-input"
                placeholder="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </>
        )}

        {connectionType === 'databricks' && (
          <>
            <div className="form-group">
              <label className="form-label required">Connection Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="My Production Database"
                value={formData.connectionName}
                onChange={(e) => setFormData({ ...formData, connectionName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label required">Host</label>
              <input
                type="text"
                className="form-input"
                placeholder="dbc-xxxxx.cloud.databricks.com"
                value={formData.host}
                onChange={(e) => setFormData({ ...formData, host: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label required">Database</label>
              <input
                type="text"
                className="form-input"
                placeholder="analytics"
                value={formData.database}
                onChange={(e) => setFormData({ ...formData, database: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-input"
                placeholder="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </>
        )}

        <div className="demo-mode-banner">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2L12 7L18 8L14 12L15 18L10 15L5 18L6 12L2 8L8 7L10 2Z" fill="currentColor" />
          </svg>
          <span>Demo Mode: Leave credentials blank to use a mock dataset for demonstration purposes.</span>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn-test" onClick={handleTestConnection}>
            Test Connection
          </button>
          <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>
            Cancel
          </button>
          <button type="button" className="btn-save" onClick={handleSaveConnection}>
            Save Connection
          </button>
        </div>
      </Modal>
    </div>
  )
}

function SourceConnectionCard({ connection }: { connection: Connection }) {
  const statusLabel =
    connection.status === 'active'
      ? 'Active'
      : connection.status === 'error'
        ? 'Error'
        : 'Inactive'
  const statusIcon =
    connection.status === 'active' ? (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ) : connection.status === 'error' ? (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ) : null

  return (
    <div className="connection-card connection-card--source">
      <div className="connection-card-source-icon" aria-hidden>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M3 9H21M9 3V21" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <span className="connection-card-type-label">{connection.type.toUpperCase()}</span>
      <h3 className="connection-card-name">{connection.name}</h3>
      <div className={`connection-card-status connection-card-status--${connection.status}`}>
        <span>Status</span>
        {statusIcon}
        <span className="connection-card-status-value">{statusLabel}</span>
      </div>
      <p className="connection-card-created">Created {connection.createdDate}</p>
      {connection.details.host != null && (
        <p className="connection-card-detail">
          Host: {connection.details.host}
        </p>
      )}
      {connection.details.database != null && (
        <p className="connection-card-detail">
          Database: {connection.details.database}
        </p>
      )}
    </div>
  )
}

function DestinationConnectionCard({ connection }: { connection: Connection }) {
  const statusLabel =
    connection.status === 'active' ? 'Active' : connection.status === 'error' ? 'Error' : 'Inactive'
  const gradientId = `cloud-grad-${connection.id}`

  return (
    <div className="connection-card connection-card--destination">
      <div className="connection-card-destination-icon" aria-hidden>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path
            d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"
            fill={`url(#${gradientId})`}
          />
          <defs>
            <linearGradient id={gradientId} x1="0" y1="4" x2="24" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--primary-purple)" />
              <stop offset="1" stopColor="var(--primary-blue)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <span className="connection-card-type-label">{connection.type.toUpperCase()}</span>
      <h3 className="connection-card-name">{connection.name}</h3>
      <div className={`connection-card-status connection-card-status--${connection.status}`}>
        <span>Status</span>
        <span className="connection-card-status-value">{statusLabel}</span>
      </div>
      <p className="connection-card-created">Created {connection.createdDate}</p>
      {connection.details.bucket != null && (
        <p className="connection-card-detail">
          Bucket: {connection.details.bucket}
        </p>
      )}
      {connection.details.path != null && (
        <p className="connection-card-detail">
          Path: {connection.details.path}
        </p>
      )}
    </div>
  )
}

export default Connections
