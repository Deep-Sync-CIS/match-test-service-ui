import { ReactNode } from 'react'
import Sidebar from './Sidebar'

interface LayoutProps {
  children: ReactNode
  userName?: string
  onLogout?: () => void
}

const Layout = ({ children, userName, onLogout }: LayoutProps) => {
  return (
    <div className="app-container">
      <Sidebar userName={userName} onLogout={onLogout} />
      <main className="main-content">
        {children}
      </main>
    </div>
  )
}

export default Layout
