import { useState, useEffect } from 'react'
import { MatchType } from './SelectMatchTypeModal'

export interface FieldMapping {
  deepSyncField: string
  description: string
  required: boolean
  mappedColumn: string | null
}

interface FieldMappingModalProps {
  isOpen: boolean
  onClose: () => void
  matchType: MatchType | null
  fileColumns: string[]
  onProcess: (mappings?: FieldMapping[]) => void
}

const DEFAULT_FIELDS: Record<MatchType, FieldMapping[]> = {
  pii: [
    {
      deepSyncField: 'First Name',
      description: 'Customer first name',
      required: true,
      mappedColumn: null,
    },
    {
      deepSyncField: 'Last Name',
      description: 'Customer last name',
      required: true,
      mappedColumn: null,
    },
    {
      deepSyncField: 'Email Address',
      description: 'Primary email address',
      required: false,
      mappedColumn: null,
    },
    {
      deepSyncField: 'Phone Number',
      description: 'Primary phone number',
      required: false,
      mappedColumn: null,
    },
    {
      deepSyncField: 'Street Address',
      description: 'Mailing street address',
      required: false,
      mappedColumn: null,
    },
    {
      deepSyncField: 'City',
      description: 'City name',
      required: false,
      mappedColumn: null,
    },
    {
      deepSyncField: 'State',
      description: 'State or province',
      required: false,
      mappedColumn: null,
    },
    {
      deepSyncField: 'ZIP Code',
      description: 'Postal code',
      required: false,
      mappedColumn: null,
    },
    {
      deepSyncField: 'Date of Birth (MM/DD/YYYY)',
      description: 'Birth date',
      required: false,
      mappedColumn: null,
    },
  ],
  digital: [
    {
      deepSyncField: 'Mobile Ad ID (MAID)',
      description: 'Mobile advertising identifier',
      required: true,
      mappedColumn: null,
    },
    {
      deepSyncField: 'Cookie ID',
      description: 'Browser cookie identifier',
      required: false,
      mappedColumn: null,
    },
    {
      deepSyncField: 'IP Address',
      description: 'IP address',
      required: false,
      mappedColumn: null,
    },
    {
      deepSyncField: 'Device ID',
      description: 'Device identifier',
      required: false,
      mappedColumn: null,
    },
    {
      deepSyncField: 'Hashed Email',
      description: 'Hashed email address',
      required: false,
      mappedColumn: null,
    },
  ],
  transaction: [
    {
      deepSyncField: 'Card Number (Hashed)',
      description: 'Hashed credit card number',
      required: true,
      mappedColumn: null,
    },
    {
      deepSyncField: 'Transaction ID',
      description: 'Unique transaction identifier',
      required: false,
      mappedColumn: null,
    },
    {
      deepSyncField: 'Store Location',
      description: 'Store or location identifier',
      required: false,
      mappedColumn: null,
    },
    {
      deepSyncField: 'Purchase Date/Time',
      description: 'Transaction timestamp',
      required: false,
      mappedColumn: null,
    },
    {
      deepSyncField: 'Loyalty Card ID',
      description: 'Loyalty program identifier',
      required: false,
      mappedColumn: null,
    },
  ],
}

const FieldMappingModal = ({
  isOpen,
  onClose,
  matchType,
  fileColumns,
  onProcess,
}: FieldMappingModalProps) => {
  const [mappings, setMappings] = useState<FieldMapping[]>([])

  useEffect(() => {
    if (matchType) {
      const fields = DEFAULT_FIELDS[matchType]
      // Auto-map columns if names match (case-insensitive)
      const autoMapped = fields.map((field) => {
        const matchingColumn = fileColumns.find(
          (col) =>
            col.toLowerCase().replace(/[_\s]/g, '') ===
            field.deepSyncField.toLowerCase().replace(/[_\s]/g, '')
        )
        return {
          ...field,
          mappedColumn: matchingColumn || null,
        }
      })
      setMappings(autoMapped)
    }
  }, [matchType, fileColumns])

  const handleColumnChange = (fieldIndex: number, column: string) => {
    setMappings((prev) =>
      prev.map((mapping, idx) =>
        idx === fieldIndex ? { ...mapping, mappedColumn: column } : mapping
      )
    )
  }

  const handleProcess = () => {
    onProcess(mappings)
    // Note: mappings are passed to parent but may not be used immediately
  }

  const requiredFieldsMapped = mappings
    .filter((m) => m.required)
    .every((m) => m.mappedColumn !== null)

  if (!isOpen || !matchType) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal field-mapping-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Field Mapping</h2>
            <p className="modal-subtitle">Match your file columns to Deep Sync fields</p>
          </div>
          <button className="modal-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <div className="field-mapping-table">
            <div className="field-mapping-header">
              <div className="field-mapping-header-cell">Deep Sync Field</div>
              <div className="field-mapping-header-cell">Description</div>
              <div className="field-mapping-header-cell">Your Column</div>
              <div className="field-mapping-header-cell">Status</div>
            </div>

            <div className="field-mapping-rows">
              {mappings.map((mapping, index) => (
                <div key={index} className="field-mapping-row">
                  <div className="field-mapping-cell field-name-cell">
                    <span>
                      {mapping.deepSyncField}
                      {mapping.required && <span className="required-asterisk">*</span>}
                    </span>
                  </div>
                  <div className="field-mapping-cell field-description-cell">
                    {mapping.description}
                  </div>
                  <div className="field-mapping-cell field-column-cell">
                    <select
                      className="field-mapping-select"
                      value={mapping.mappedColumn || ''}
                      onChange={(e) =>
                        handleColumnChange(index, e.target.value || '')
                      }
                    >
                      <option value="">-- Select Column --</option>
                      {fileColumns.map((col) => (
                        <option key={col} value={col}>
                          {col}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="field-mapping-cell field-status-cell">
                    {mapping.mappedColumn ? (
                      <span className="field-status-mapped">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M13 4L6 11L3 8"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Mapped
                      </span>
                    ) : (
                      <span className="field-status-optional">
                        {mapping.required ? 'Required' : 'Optional'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="field-mapping-footer">
            <div className="field-mapping-status">
              {requiredFieldsMapped ? (
                <span className="field-mapping-ready">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M13 4L6 11L3 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Ready to process your data
                </span>
              ) : (
                <span className="field-mapping-warning">
                  Please map all required fields
                </span>
              )}
            </div>
            <button
              type="button"
              className="field-mapping-process-btn"
              onClick={handleProcess}
              disabled={!requiredFieldsMapped}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 12L8 8L4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Process Data
            </button>
          </div>

          <div className="field-mapping-tip">
            <p>
              <strong>Tip:</strong> Fields marked with * are required for PII matching. Mapping
              additional optional fields will improve match accuracy and data enrichment.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FieldMappingModal
