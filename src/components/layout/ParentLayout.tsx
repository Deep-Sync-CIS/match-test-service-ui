import { useState, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import TopNavigation from './TopNavigation'
import SidePanel from './SidePanel'

interface ParentLayoutProps {
  children?: ReactNode
}

const ParentLayout = ({ children }: ParentLayoutProps) => {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen)
  }

  const closeSidePanel = () => {
    setIsSidePanelOpen(false)
  }

  return (
    <div className="parent-app-container">
      <TopNavigation onMenuClick={toggleSidePanel} />
      <SidePanel isOpen={isSidePanelOpen} onClose={closeSidePanel} />
      <main className="parent-main-content">
        {children || <Outlet />}
      </main>
    </div>
  )
}

export default ParentLayout
