import { useState } from 'react'

export type MatchType = 'pii' | 'digital' | 'transaction'

interface SelectMatchTypeModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (matchType: MatchType) => void
}

const MATCH_TYPES = [
  {
    id: 'pii' as MatchType,
    title: 'PII Match',
    description: 'Match based on personally identifiable information',
    identifiers: [
      'Full Name',
      'Email Address',
      'Phone Number',
      'Mailing Address',
      'Date of Birth',
    ],
    bestFor: 'Customer databases, CRM exports',
    iconColor: '#667eea',
  },
  {
    id: 'digital' as MatchType,
    title: 'Digital Match',
    description: 'Match based on digital identifiers and device data',
    identifiers: [
      'Mobile Ad ID (MAID)',
      'Cookie ID',
      'IP Address',
      'Device ID',
      'Hashed Email',
    ],
    bestFor: 'App data, web analytics, ad platforms.',
    iconColor: '#48bb78',
  },
  {
    id: 'transaction' as MatchType,
    title: 'Transaction Match',
    description: 'Match based on purchase and transaction data',
    identifiers: [
      'Card Number (Hashed)',
      'Transaction ID',
      'Store Location',
      'Purchase Date/Time',
      'Loyalty Card ID',
    ],
    bestFor: 'POS data, e-commerce transactions.',
    iconColor: '#9f7aea',
  },
]

const SelectMatchTypeModal = ({
  isOpen,
  onClose,
  onSelect,
}: SelectMatchTypeModalProps) => {
  const [selectedType, setSelectedType] = useState<MatchType | null>(null)

  if (!isOpen) return null

  const handleSelect = (matchType: MatchType) => {
    setSelectedType(matchType)
    onSelect(matchType)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal select-match-type-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Select Match Type</h2>
            <p className="modal-subtitle">
              Choose the primary type of data you're uploading for matching
            </p>
          </div>
          <button className="modal-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <div className="match-type-cards">
            {MATCH_TYPES.map((type) => (
              <div
                key={type.id}
                className={`match-type-card ${selectedType === type.id ? 'selected' : ''}`}
                onClick={() => handleSelect(type.id)}
              >
                <div
                  className="match-type-icon"
                  style={{ backgroundColor: `${type.iconColor}20` }}
                >
                  {type.id === 'pii' && (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                        stroke={type.iconColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {type.id === 'digital' && (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <rect
                        x="5"
                        y="2"
                        width="14"
                        height="20"
                        rx="2"
                        stroke={type.iconColor}
                        strokeWidth="2"
                      />
                      <path
                        d="M12 18H12.01"
                        stroke={type.iconColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                  {type.id === 'transaction' && (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <rect
                        x="1"
                        y="4"
                        width="22"
                        height="16"
                        rx="2"
                        stroke={type.iconColor}
                        strokeWidth="2"
                      />
                      <path
                        d="M1 10H23"
                        stroke={type.iconColor}
                        strokeWidth="2"
                      />
                    </svg>
                  )}
                </div>
                <h3 className="match-type-title">{type.title}</h3>
                <p className="match-type-description">{type.description}</p>
                <ul className="match-type-identifiers">
                  {type.identifiers.map((identifier, idx) => (
                    <li key={idx} className="match-type-identifier">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M13 4L6 11L3 8"
                          stroke={type.iconColor}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>{identifier}</span>
                    </li>
                  ))}
                </ul>
                <p className="match-type-best-for">
                  <strong>Best for:</strong> {type.bestFor}
                </p>
              </div>
            ))}
          </div>

          <div className="match-type-tip">
            <p>
              <strong>Tip:</strong> Not sure which to choose? Select the match type based on the
              primary identifiers in your data. You can always include additional identifier types
              during column mapping.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectMatchTypeModal
