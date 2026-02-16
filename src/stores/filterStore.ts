import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

// Match type filters used on the Overview page
// Keep in sync with MATCH_TYPES in pages/Overview/components/FilterPills.tsx
export type MatchTypeFilter = 'PII' | 'Transaction' | 'Digital'

interface FilterState {
  // Overview page filters
  searchTerm: string
  matchTypeFilters: MatchTypeFilter[]
  setSearchTerm: (term: string) => void
  toggleMatchType: (type: MatchTypeFilter) => void
  clearFilters: () => void

  // Intelligence page filters
  attributeSearchQuery: string
  selectedCategory: string
  setAttributeSearchQuery: (query: string) => void
  setSelectedCategory: (category: string) => void
}

export const useFilterStore = create<FilterState>()(
  devtools(
    (set) => ({
      searchTerm: '',
      matchTypeFilters: [],
      attributeSearchQuery: '',
      selectedCategory: 'all',
      setSearchTerm: (term) => set({ searchTerm: term }),
      toggleMatchType: (type) =>
        set((state) => ({
          matchTypeFilters: state.matchTypeFilters.includes(type)
            ? state.matchTypeFilters.filter((t) => t !== type)
            : [...state.matchTypeFilters, type],
        })),
      clearFilters: () => set({ matchTypeFilters: [], searchTerm: '' }),
      setAttributeSearchQuery: (query) => set({ attributeSearchQuery: query }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
    }),
    { name: 'Filter Store' }
  )
)
