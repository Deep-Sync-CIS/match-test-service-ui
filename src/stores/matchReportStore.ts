import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

// Match types used in the Run Match Report flow
export type MatchType = 'pii' | 'digital' | 'transaction'

interface MatchReportState {
  // File upload state
  selectedFile: File | null
  fileColumns: string[]
  setSelectedFile: (file: File | null) => void
  setFileColumns: (columns: string[]) => void

  // Match type and field mapping
  selectedMatchType: MatchType | null
  setSelectedMatchType: (type: MatchType | null) => void

  // Modal states
  showMatchTypeModal: boolean
  showFieldMappingModal: boolean
  setShowMatchTypeModal: (show: boolean) => void
  setShowFieldMappingModal: (show: boolean) => void

  // Reset all state
  reset: () => void
}

const initialState: Omit<MatchReportState, 'setSelectedFile' | 'setFileColumns' | 'setSelectedMatchType' | 'setShowMatchTypeModal' | 'setShowFieldMappingModal' | 'reset'> = {
  selectedFile: null,
  fileColumns: [],
  selectedMatchType: null,
  showMatchTypeModal: false,
  showFieldMappingModal: false,
}

export const useMatchReportStore = create<MatchReportState>()(
  devtools(
    (set) => ({
      ...initialState,
      setSelectedFile: (file) => set({ selectedFile: file }),
      setFileColumns: (columns) => set({ fileColumns: columns }),
      setSelectedMatchType: (type) => set({ selectedMatchType: type }),
      setShowMatchTypeModal: (show) => set({ showMatchTypeModal: show }),
      setShowFieldMappingModal: (show) => set({ showFieldMappingModal: show }),
      reset: () => set(initialState),
    }),
    { name: 'Match Report Store' }
  )
)
