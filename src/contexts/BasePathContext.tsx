import { createContext, useContext, ReactNode } from 'react'

const DEFAULT_BASE = '/match-test-service'

const BasePathContext = createContext<string>(DEFAULT_BASE)

export function BasePathProvider({
  basePath,
  children,
}: {
  basePath: string
  children: ReactNode
}) {
  const base = basePath.replace(/\/$/, '') || DEFAULT_BASE
  return (
    <BasePathContext.Provider value={base}>
      {children}
    </BasePathContext.Provider>
  )
}

export function useBasePath(): string {
  return useContext(BasePathContext)
}
