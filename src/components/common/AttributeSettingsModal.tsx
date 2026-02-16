import { useState, useEffect, useMemo } from 'react'
import Modal from './Modal'
import { AttributeConfig, AttributeType } from '../../types'

interface AttributeSettingsModalProps {
  isOpen: boolean
  onClose: () => void
  attributeName: string
  attributeType: AttributeType
  currentConfig: AttributeConfig | null
  onSave: (config: AttributeConfig) => void
}

// Default configurations for common attributes
const DEFAULT_CONFIGS: Record<string, AttributeConfig> = {
  Age: {
    attributeName: 'Age',
    type: 'range',
    rangeConfig: { min: 18, max: 65 },
  },
  'Income Range': {
    attributeName: 'Income Range',
    type: 'range',
    rangeConfig: { min: 0, max: 250000 },
  },
  'Net Worth': {
    attributeName: 'Net Worth',
    type: 'range',
    rangeConfig: { min: 0, max: 10000000 },
  },
  Gender: {
    attributeName: 'Gender',
    type: 'categorical',
    categoricalConfig: {
      selected: [],
      options: ['Male', 'Female', 'Other', 'Prefer not to say'],
    },
  },
  'Marital Status': {
    attributeName: 'Marital Status',
    type: 'categorical',
    categoricalConfig: {
      selected: [],
      options: ['Single', 'Married', 'Divorced', 'Widowed', 'Separated'],
    },
  },
  Education: {
    attributeName: 'Education',
    type: 'categorical',
    categoricalConfig: {
      selected: [],
      options: [
        'High School',
        'Some College',
        "Bachelor's Degree",
        "Master's Degree",
        'Doctorate',
        'Professional',
      ],
    },
  },
  Occupation: {
    attributeName: 'Occupation',
    type: 'categorical',
    categoricalConfig: {
      selected: [],
      options: [
        'Professional',
        'Technical',
        'Healthcare',
        'Education',
        'Finance',
        'Sales',
        'Management',
        'Other',
      ],
    },
  },
}

const AttributeSettingsModal = ({
  isOpen,
  onClose,
  attributeName,
  attributeType,
  currentConfig,
  onSave,
}: AttributeSettingsModalProps) => {
  const defaultConfig = useMemo(
    () =>
      DEFAULT_CONFIGS[attributeName] || {
        attributeName,
        type: attributeType,
        ...(attributeType === 'range'
          ? { rangeConfig: { min: 0, max: 100 } }
          : {
              categoricalConfig: {
                selected: [],
                options: [],
              },
            }),
      },
    [attributeName, attributeType]
  )

  const [config, setConfig] = useState<AttributeConfig>(
    currentConfig || defaultConfig
  )

  useEffect(() => {
    if (isOpen) {
      setConfig(currentConfig || defaultConfig)
    }
  }, [isOpen, currentConfig, attributeName, defaultConfig])

  const handleRangeChange = (field: 'min' | 'max', value: number) => {
    if (config.type === 'range' && config.rangeConfig) {
      setConfig({
        ...config,
        rangeConfig: {
          ...config.rangeConfig,
          [field]: value,
        },
      })
    }
  }

  const handleCategoricalToggle = (option: string) => {
    if (config.type === 'categorical' && config.categoricalConfig) {
      const selected = config.categoricalConfig.selected.includes(option)
        ? config.categoricalConfig.selected.filter((s) => s !== option)
        : [...config.categoricalConfig.selected, option]

      setConfig({
        ...config,
        categoricalConfig: {
          ...config.categoricalConfig,
          selected,
        },
      })
    }
  }

  const handleReset = () => {
    setConfig(defaultConfig)
  }

  const handleSave = () => {
    onSave(config)
    onClose()
  }

  const handleSelectAll = () => {
    if (config.type === 'categorical' && config.categoricalConfig) {
      setConfig({
        ...config,
        categoricalConfig: {
          ...config.categoricalConfig,
          selected: [...config.categoricalConfig.options],
        },
      })
    }
  }

  const handleDeselectAll = () => {
    if (config.type === 'categorical' && config.categoricalConfig) {
      setConfig({
        ...config,
        categoricalConfig: {
          ...config.categoricalConfig,
          selected: [],
        },
      })
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Configure ${attributeName}`}
      subtitle="Set custom filters for this attribute"
    >
      <div className="attribute-settings-content">
        {config.type === 'range' && config.rangeConfig && (
          <div className="attribute-settings-range">
            <div className="attribute-settings-range-header">
              <label className="attribute-settings-label">Value Range</label>
              <span className="attribute-settings-range-display">
                {config.rangeConfig.min.toLocaleString()} -{' '}
                {config.rangeConfig.max.toLocaleString()}
              </span>
            </div>
            <div className="attribute-settings-range-slider-container">
              <div className="attribute-settings-range-slider-wrapper">
                <div className="attribute-settings-range-slider-track-bg" />
                <div 
                  className="attribute-settings-range-slider-track"
                  style={{
                    left: `${(config.rangeConfig.min / (attributeName === 'Age' ? 100 : attributeName === 'Income Range' ? 500000 : 20000000)) * 100}%`,
                    width: `${((config.rangeConfig.max - config.rangeConfig.min) / (attributeName === 'Age' ? 100 : attributeName === 'Income Range' ? 500000 : 20000000)) * 100}%`
                  }}
                />
                <input
                  type="range"
                  min={0}
                  max={attributeName === 'Age' ? 100 : attributeName === 'Income Range' ? 500000 : 20000000}
                  value={config.rangeConfig.min}
                  onChange={(e) => {
                    const newMin = parseInt(e.target.value)
                    if (newMin < config.rangeConfig!.max) {
                      handleRangeChange('min', newMin)
                    }
                  }}
                  className="attribute-settings-range-slider attribute-settings-range-slider-min"
                />
                <input
                  type="range"
                  min={0}
                  max={attributeName === 'Age' ? 100 : attributeName === 'Income Range' ? 500000 : 20000000}
                  value={config.rangeConfig.max}
                  onChange={(e) => {
                    const newMax = parseInt(e.target.value)
                    if (newMax > config.rangeConfig!.min) {
                      handleRangeChange('max', newMax)
                    }
                  }}
                  className="attribute-settings-range-slider attribute-settings-range-slider-max"
                />
              </div>
              <div className="attribute-settings-range-labels">
                <span className="attribute-settings-range-label-min">MIN</span>
                <span className="attribute-settings-range-label-max">MAX</span>
              </div>
            </div>
            <div className="attribute-settings-info-box">
              <p className="attribute-settings-info-text">
                Adjusting the range will filter the match report to only include records that fall within these specific {attributeName.toLowerCase()} values.
              </p>
            </div>
          </div>
        )}

        {config.type === 'categorical' && config.categoricalConfig && (
          <div className="attribute-settings-categorical">
            <div className="attribute-settings-categorical-header">
              <label className="attribute-settings-label">
                Select Categories
              </label>
              <div className="attribute-settings-categorical-actions">
                <button
                  type="button"
                  className="attribute-settings-link-btn"
                  onClick={handleSelectAll}
                >
                  Select All
                </button>
                <span className="attribute-settings-separator">|</span>
                <button
                  type="button"
                  className="attribute-settings-link-btn"
                  onClick={handleDeselectAll}
                >
                  Deselect All
                </button>
              </div>
            </div>
            <div className="attribute-settings-categorical-list">
              {config.categoricalConfig.options.map((option) => {
                const isSelected =
                  config.categoricalConfig?.selected.includes(option) || false
                return (
                  <label
                    key={option}
                    className={`attribute-settings-categorical-item ${
                      isSelected ? 'selected' : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleCategoricalToggle(option)}
                      className="attribute-settings-checkbox"
                    />
                    <span className="attribute-settings-checkbox-label">
                      {option}
                    </span>
                  </label>
                )
              })}
            </div>
            {config.categoricalConfig.selected.length === 0 && (
              <p className="attribute-settings-hint">
                No categories selected. All values will be included.
              </p>
            )}
          </div>
        )}

        <div className="attribute-settings-footer">
          <button
            type="button"
            className="attribute-settings-reset-btn"
            onClick={handleReset}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2V4M8 12V14M2 8H4M12 8H14M5.636 5.636L6.757 6.757M9.243 9.243L10.364 10.364M5.636 10.364L6.757 9.243M9.243 6.757L10.364 5.636" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Reset
          </button>
          <div className="attribute-settings-footer-actions">
            <button
              type="button"
              className="attribute-settings-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="attribute-settings-save-btn"
              onClick={handleSave}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 3H13V13H3V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 13V9H11V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 3V6H11V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default AttributeSettingsModal
