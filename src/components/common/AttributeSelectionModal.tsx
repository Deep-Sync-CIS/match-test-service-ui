import { useState, useMemo } from 'react'
import Modal from './Modal'
import { AttributeCategory } from '../../types'
import { ALL_ATTRIBUTES, ATTRIBUTE_CATEGORIES, getAttributesByCategory, getCategoryStats } from '../../utils/attributeData'

interface AttributeSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  selectedAttributeIds: string[]
  onSelectionChange: (selectedIds: string[]) => void
}

const AttributeSelectionModal = ({
  isOpen,
  onClose,
  selectedAttributeIds,
  onSelectionChange,
}: AttributeSelectionModalProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<AttributeCategory | 'all'>('all')

  const categoryStats = useMemo(() => getCategoryStats(selectedAttributeIds), [selectedAttributeIds])

  const filteredAttributes = useMemo(() => {
    let filtered = ALL_ATTRIBUTES

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(attr => attr.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(attr =>
        attr.name.toLowerCase().includes(query) ||
        attr.category.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [searchQuery, selectedCategory])

  const handleToggleAttribute = (attributeId: string) => {
    const newSelection = selectedAttributeIds.includes(attributeId)
      ? selectedAttributeIds.filter(id => id !== attributeId)
      : [...selectedAttributeIds, attributeId]
    onSelectionChange(newSelection)
  }

  const handleToggleCategory = (category: AttributeCategory) => {
    const categoryAttrs = getAttributesByCategory(category)
    const categoryAttrIds = categoryAttrs.map(attr => attr.id)
    const allSelected = categoryAttrIds.every(id => selectedAttributeIds.includes(id))

    if (allSelected) {
      // Deselect all in category
      onSelectionChange(selectedAttributeIds.filter(id => !categoryAttrIds.includes(id)))
    } else {
      // Select all in category
      const newSelection = [...selectedAttributeIds]
      categoryAttrIds.forEach(id => {
        if (!newSelection.includes(id)) {
          newSelection.push(id)
        }
      })
      onSelectionChange(newSelection)
    }
  }

  const handleSelectAll = () => {
    onSelectionChange(ALL_ATTRIBUTES.map(attr => attr.id))
  }

  const handleDeselectAll = () => {
    onSelectionChange([])
  }

  const selectedCount = selectedAttributeIds.length
  const totalCount = ALL_ATTRIBUTES.length
  const projectedCoverage = Math.round((selectedCount / totalCount) * 100)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Select Attributes"
      subtitle={`Choose from ${totalCount.toLocaleString()}+ Deep Sync attributes`}
      size="large"
    >
      <div className="attribute-selection-modal-content">
        <div className="attribute-selection-main">
          {/* Search Bar */}
          <div className="attribute-selection-search">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="attribute-selection-search-icon">
              <path
                d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16ZM19 19l-4.35-4.35"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="text"
              placeholder="Search attributes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="attribute-selection-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="attribute-selection-search-clear"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="attribute-selection-categories">
            <button
              type="button"
              className={`attribute-selection-category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All ({totalCount})
            </button>
            {ATTRIBUTE_CATEGORIES.map((category) => {
              const stats = categoryStats[category]
              return (
                <button
                  key={category}
                  type="button"
                  className={`attribute-selection-category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category} ({stats.selected}/{stats.total})
                </button>
              )
            })}
          </div>

          {/* Attributes Grid */}
          <div className="attribute-selection-grid">
            {filteredAttributes.map((attribute) => {
              const isSelected = selectedAttributeIds.includes(attribute.id)
              return (
                <div
                  key={attribute.id}
                  className={`attribute-selection-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleToggleAttribute(attribute.id)}
                >
                  <div className="attribute-selection-item-checkbox">
                    {isSelected && (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M3 8L6 11L13 4"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="attribute-selection-item-content">
                    <div className="attribute-selection-item-name">{attribute.name}</div>
                    <div className="attribute-selection-item-category">{attribute.category}</div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Bulk Actions */}
          <div className="attribute-selection-actions">
            <button type="button" className="attribute-selection-action-btn" onClick={handleSelectAll}>
              Select All
            </button>
            <button type="button" className="attribute-selection-action-btn" onClick={handleDeselectAll}>
              Deselect All
            </button>
            {selectedCategory !== 'all' && (
              <button
                type="button"
                className="attribute-selection-action-btn"
                onClick={() => handleToggleCategory(selectedCategory)}
              >
                {categoryStats[selectedCategory].selected === categoryStats[selectedCategory].total
                  ? 'Deselect Category'
                  : 'Select Category'}
              </button>
            )}
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="attribute-selection-sidebar">
          <div className="attribute-selection-summary">
            <h3 className="attribute-selection-summary-title">Selection Summary</h3>
            
            <div className="attribute-selection-summary-tile">
              <div className="attribute-selection-summary-label">Selected Attributes</div>
              <div className="attribute-selection-summary-value">{selectedCount.toLocaleString()}</div>
            </div>

            <div className="attribute-selection-summary-tile">
              <div className="attribute-selection-summary-label">Projected Coverage</div>
              <div className="attribute-selection-summary-value">{projectedCoverage}%</div>
            </div>

            {/* Category Breakdown */}
            <div className="attribute-selection-category-breakdown">
              <h4 className="attribute-selection-breakdown-title">By Category</h4>
              {ATTRIBUTE_CATEGORIES.map((category) => {
                const stats = categoryStats[category]
                const percentage = stats.total > 0 ? Math.round((stats.selected / stats.total) * 100) : 0
                return (
                  <div key={category} className="attribute-selection-category-item">
                    <div className="attribute-selection-category-header">
                      <span className="attribute-selection-category-name">{category}</span>
                      <span className="attribute-selection-category-count">
                        {stats.selected}/{stats.total}
                      </span>
                    </div>
                    <div className="attribute-selection-category-progress">
                      <div
                        className="attribute-selection-category-progress-bar"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="attribute-selection-sidebar-actions">
            <button type="button" className="attribute-selection-cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button
              type="button"
              className="attribute-selection-apply-btn"
              onClick={onClose}
            >
              Apply Selection ({selectedCount})
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default AttributeSelectionModal
