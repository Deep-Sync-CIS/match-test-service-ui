import { useState, useEffect } from 'react'

export interface MatchRank {
  id: number
  name: string
  description: string
  enabled: boolean
  count: string
  category: 'name-postal' | 'email' | 'phone' | 'transaction' | 'store-location' | 'credit-card'
  matchType: 'all' | 'strict' | 'fuzzy' | 'none'
}

interface MatchFiltersModalProps {
  isOpen: boolean
  onClose: () => void
  ranks: MatchRank[]
  onRanksChange: (ranks: MatchRank[]) => void
}

const MatchFiltersModal = ({
  isOpen,
  onClose,
  ranks,
  onRanksChange,
}: MatchFiltersModalProps) => {
  const [localRanks, setLocalRanks] = useState<MatchRank[]>(ranks)
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['name-postal', 'email', 'phone', 'transaction', 'store-location', 'credit-card'])
  )
  const [isMinimized, setIsMinimized] = useState(false)

  // Update local ranks when ranks prop changes
  useEffect(() => {
    setLocalRanks(ranks)
  }, [ranks])

  const categories = [
    { id: 'name-postal', name: 'Name & Postal' },
    { id: 'email', name: 'Email' },
    { id: 'phone', name: 'Phone' },
    { id: 'transaction', name: 'Transaction' },
    { id: 'store-location', name: 'Store Location' },
    { id: 'credit-card', name: 'Credit Card' },
  ] as const

  const getRanksByCategory = (categoryId: string) => {
    return localRanks.filter((rank) => rank.category === categoryId)
  }

  const getCategoryStats = (categoryId: string) => {
    const categoryRanks = getRanksByCategory(categoryId)
    const enabledCount = categoryRanks.filter((r) => r.enabled).length
    const totalCount = categoryRanks.length
    return { enabledCount, totalCount }
  }

  const handleToggleRank = (rankId: number) => {
    setLocalRanks((prev) =>
      prev.map((rank) =>
        rank.id === rankId ? { ...rank, enabled: !rank.enabled } : rank
      )
    )
  }

  const handleCategoryMode = (categoryId: string, mode: 'all' | 'strict' | 'fuzzy' | 'none') => {
    setLocalRanks((prev) =>
      prev.map((rank) => {
        if (rank.category !== categoryId) return rank
        
        if (mode === 'none') {
          return { ...rank, enabled: false }
        }
        
        if (mode === 'all') {
          return { ...rank, enabled: true }
        }
        
        // For strict: only enable exact matches
        if (mode === 'strict') {
          return { ...rank, enabled: rank.matchType === 'all' || rank.matchType === 'strict' }
        }
        
        // For fuzzy: only enable fuzzy matches
        if (mode === 'fuzzy') {
          return { ...rank, enabled: rank.matchType === 'fuzzy' }
        }
        
        return rank
      })
    )
  }

  const handleToggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId)
      } else {
        newSet.add(categoryId)
      }
      return newSet
    })
  }

  const handleApply = () => {
    onRanksChange(localRanks)
    onClose()
  }

  const enabledCount = localRanks.filter((r) => r.enabled).length
  const totalCount = localRanks.length

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal large" onClick={(e) => e.stopPropagation()}>
        {/* Custom Header with Gradient */}
        <div className="advanced-match-filters-header">
          <div>
            <h2 className="advanced-match-filters-title">Advanced Match Filters</h2>
            <p className="advanced-match-filters-subtitle">Refine your audience by selecting specific match types</p>
          </div>
          <div className="advanced-match-filters-header-actions">
            <button
              type="button"
              className="advanced-match-filters-minimize-btn"
              onClick={() => setIsMinimized(!isMinimized)}
              aria-label={isMinimized ? 'Expand' : 'Minimize'}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d={isMinimized ? "M4 12L8 8L12 12" : "M4 4L8 8L12 4"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="advanced-match-filters-close-btn" onClick={onClose}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="modal-body">
          {isMinimized ? (
            <div className="advanced-match-filters-minimized">
              <p className="advanced-match-filters-minimized-text">
                {enabledCount} of {totalCount} match types selected
              </p>
              <button
                type="button"
                className="advanced-match-filters-expand-btn"
                onClick={() => setIsMinimized(false)}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 12L8 8L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Expand Filters
              </button>
            </div>
          ) : (
            <div className="advanced-match-filters-content">
              {/* Categories Grid */}
              <div className="advanced-match-filters-grid">
                {categories.map((category) => {
                  const categoryRanks = getRanksByCategory(category.id)
                  const stats = getCategoryStats(category.id)
                  const isExpanded = expandedCategories.has(category.id)

                  if (categoryRanks.length === 0) return null

                  return (
                    <div key={category.id} className="advanced-match-filters-category">
                      {/* Category Header */}
                      <div className="advanced-match-filters-category-header">
                        <button
                          type="button"
                          className="advanced-match-filters-category-toggle"
                          onClick={() => handleToggleCategory(category.id)}
                        >
                          <span className="advanced-match-filters-category-name">
                            {category.name}
                          </span>
                          <span className="advanced-match-filters-category-count">
                            ({stats.enabledCount}/{stats.totalCount})
                          </span>
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            className={`advanced-match-filters-caret ${
                              isExpanded ? 'expanded' : ''
                            }`}
                          >
                            <path
                              d="M3 4.5L6 7.5L9 4.5"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>

                      {isExpanded && (
                        <>
                          {/* Selection Modes */}
                          <div className="advanced-match-filters-modes">
                            <button
                              type="button"
                              className={`advanced-match-filters-mode-btn ${
                                categoryRanks.every((r) => r.enabled) ? 'active' : ''
                              }`}
                              onClick={() => handleCategoryMode(category.id, 'all')}
                            >
                              All
                            </button>
                            <button
                              type="button"
                              className={`advanced-match-filters-mode-btn ${
                                categoryRanks.every((r) => r.enabled && (r.matchType === 'all' || r.matchType === 'strict')) && 
                                categoryRanks.some((r) => r.matchType === 'strict') ? 'active' : ''
                              }`}
                              onClick={() => handleCategoryMode(category.id, 'strict')}
                            >
                              Strict
                            </button>
                            <button
                              type="button"
                              className={`advanced-match-filters-mode-btn ${
                                categoryRanks.every((r) => r.enabled && r.matchType === 'fuzzy') && 
                                categoryRanks.some((r) => r.matchType === 'fuzzy') ? 'active' : ''
                              }`}
                              onClick={() => handleCategoryMode(category.id, 'fuzzy')}
                            >
                              Fuzzy
                            </button>
                            <button
                              type="button"
                              className={`advanced-match-filters-mode-btn ${
                                categoryRanks.every((r) => !r.enabled) ? 'active' : ''
                              }`}
                              onClick={() => handleCategoryMode(category.id, 'none')}
                            >
                              None
                            </button>
                          </div>

                          {/* Ranks List */}
                          <div className="advanced-match-filters-ranks-list">
                            {categoryRanks.map((rank) => (
                              <div
                                key={rank.id}
                                className={`advanced-match-filters-rank-item ${
                                  rank.enabled ? 'enabled' : 'disabled'
                                }`}
                              >
                                <label className="advanced-match-filters-rank-label">
                                  <input
                                    type="checkbox"
                                    checked={rank.enabled}
                                    onChange={() => handleToggleRank(rank.id)}
                                    className="advanced-match-filters-rank-checkbox"
                                  />
                                  <div className="advanced-match-filters-rank-content">
                                    <div className="advanced-match-filters-rank-name">
                                      {rank.description}
                                    </div>
                                  </div>
                                  <div className="advanced-match-filters-rank-count">
                                    {rank.count}
                                  </div>
                                </label>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Footer Actions */}
              <div className="advanced-match-filters-footer">
                <button
                  type="button"
                  className="advanced-match-filters-apply-btn"
                  onClick={handleApply}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MatchFiltersModal
