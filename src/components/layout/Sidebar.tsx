import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

const INTELLIGENCE_SUB_TABS = [
  { tab: 'job-overview', label: 'Job Overview', icon: 'document' },
  { tab: 'identity-analysis', label: 'Identity Analysis', icon: 'people' },
  { tab: 'enrich-data', label: 'Enrich Data', icon: 'database' },
  { tab: 'recommendations', label: 'Recommendations', icon: 'lightbulb' },
  { tab: 'full-report', label: 'Full Report', icon: 'document' },
] as const

interface SidebarProps {
  userName?: string
  onLogout?: () => void
}

const Sidebar = ({ userName, onLogout }: SidebarProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  const isIntelligencePage = location.pathname.includes('/intelligence')
  const currentTab = new URLSearchParams(location.search).get('tab') || 'job-overview'

  const handleGoToPlatform = () => {
    navigate('/')
  }

  const handleLogout = async () => {
    if (onLogout) {
      await onLogout()
    }
  }

  const navItems = [
    {
      to: 'connections',
      label: 'Connections',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M3 8H17M8 3V17" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
    },
    {
      to: '.',
      label: 'Overview',
      end: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="3" width="6" height="6" rx="1" fill="currentColor"/>
          <rect x="11" y="3" width="6" height="6" rx="1" fill="currentColor"/>
          <rect x="3" y="11" width="6" height="6" rx="1" fill="currentColor"/>
          <rect x="11" y="11" width="6" height="6" rx="1" fill="currentColor"/>
        </svg>
      ),
    },
    {
      to: 'run',
      label: 'Run',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M6 4L14 10L6 16V4Z" fill="currentColor"/>
        </svg>
      ),
    },
  ]

  const renderSubIcon = (icon: string) => {
    if (icon === 'document') {
      return (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V16C4 16.5304 4.21071 17.0391 4.58579 17.4142C4.96086 17.7893 5.46957 18 6 18H14C14.5304 18 15.0391 17.7893 15.4142 17.4142C15.7893 17.0391 16 16.5304 16 16V6L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 2V6H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
    if (icon === 'people') {
      return (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <circle cx="7" cy="5" r="2.5" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="13" cy="5" r="2.5" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M2 16C2 13.5 4 12 7 12M13 12C16 12 18 13.5 18 16M7 12C5.5 12 4 12.5 2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    }
    if (icon === 'database') {
      return (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M3 8H17M8 3V17" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    }
    if (icon === 'lightbulb') {
      return (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path d="M10 2C7 2 5 4.5 5 7.5C5 9.5 6 11 7.5 12V14H12.5V12C14 11 15 9.5 15 7.5C15 4.5 13 2 10 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 14V16H12V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    }
    return (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V16C4 16.5304 4.21071 17.0391 4.58579 17.4142C4.96086 17.7893 5.46957 18 6 18H14C14.5304 18 15.0391 17.7893 15.4142 17.4142C15.7893 17.0391 16 16.5304 16 16V6L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 2V6H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo-container">
          <span className="sidebar-logo-text">Deep Sync Lab</span>
        </div>
        <p className="sidebar-logo-tagline">Sync Builder Alpha</p>
      </div>
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {navItems.map((item) => {
            const isOverview = item.to === '.' && item.end
            return (
              <li key={item.to} className="nav-list-item">
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
                {isOverview && isIntelligencePage && (
                  <ul className="nav-sublist">
                    {INTELLIGENCE_SUB_TABS.map((sub) => (
                      <li key={sub.tab}>
                        <Link
                          to={`intelligence?tab=${sub.tab}`}
                          className={`nav-sublink ${currentTab === sub.tab ? 'active' : ''}`}
                        >
                          <span className="nav-sublink-icon">{renderSubIcon(sub.icon)}</span>
                          <span>{sub.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
      <button className="platform-btn platform-btn--outline" onClick={handleGoToPlatform}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M6 2L2 6L6 10M2 6H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Back to Platform</span>
      </button>
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <span className="sidebar-user-icon" aria-hidden>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M4 18C4 14.686 6.686 12 10 12s6 2.686 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </span>
          <span className="sidebar-user-name">{userName ?? 'User'}</span>
          {onLogout && (
            <button
              type="button"
              className="sidebar-logout-btn"
              onClick={handleLogout}
              title="Logout"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 14H3C2.44772 14 2 13.5523 2 13V3C2 2.44772 2.44772 2 3 2H6M10 11L14 7M14 7L10 3M14 7H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
