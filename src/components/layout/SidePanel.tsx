import { Link, useLocation } from 'react-router-dom'
import { assetUrl } from '../../utils/assetPaths'
import { useServiceRegistry } from '../../hooks/useServiceRegistry'

interface SidePanelProps {
  isOpen: boolean
  onClose: () => void
}

interface NavItem {
  path: string
  label: string
  icon: React.ReactNode
  children?: NavItem[]
  disabled?: boolean
}

const SidePanel = ({ isOpen, onClose }: SidePanelProps) => {
  const location = useLocation()
  const { data: services, isLoading, isError } = useServiceRegistry()
  const firstPartyServices = (services ?? []).filter(
    (service) => service.isFirstParty !== false
  )

  const defaultServiceIcon = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="3" width="6" height="6" rx="1" fill="currentColor" />
      <rect x="11" y="3" width="6" height="6" rx="1" fill="currentColor" />
      <rect x="3" y="11" width="6" height="6" rx="1" fill="currentColor" />
      <rect x="11" y="11" width="6" height="6" rx="1" fill="currentColor" />
    </svg>
  )

  const serviceChildren: NavItem[] = isLoading
    ? [{ path: '#', label: 'Loading services...', icon: defaultServiceIcon, disabled: true }]
    : isError || firstPartyServices.length === 0
      ? [{ path: '#', label: 'No services available', icon: defaultServiceIcon, disabled: true }]
      : firstPartyServices.map((service) => ({
          path: `/${service.basePath}`,
          label: service.name,
          icon: service.iconUrl
            ? <img src={service.iconUrl} alt={`${service.name} icon`} width="20" height="20" />
            : defaultServiceIcon,
        }))

  const navItems: NavItem[] = [
    {
      path: '/',
      label: 'Home',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2L3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19H8V12H12V19H15C15.5304 19 16.0391 18.7893 16.4142 18.4142C16.7893 18.0391 17 17.5304 17 17V7L10 2Z" fill="currentColor" />
        </svg>
      ),
    },
    {
      path: '#',
      label: 'First Party Services',
      icon: (
        <img src={assetUrl('logo/Globe.svg')} alt="Globe" width="20" height="20" />
      ),
      children: serviceChildren,
    },
    {
      path: '/core-platforms',
      label: 'Core Platforms',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M3 8H17M8 3V17" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
  ]

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    if (path === '#') {
      return false
    }
    return location.pathname.startsWith(path)
  }

  const hasActiveChild = (item: NavItem): boolean => {
    if (!item.children) return false
    return item.children.some(child => isActive(child.path))
  }

  return (
    <>
      {isOpen && <div className="side-panel-overlay" onClick={onClose} />}
      <aside className={`side-panel ${isOpen ? 'open' : ''}`}>
        <div className="side-panel-content">
          <div className="side-panel-logo">
            <img
              src={assetUrl('logo/deep-sync-logo.jpg')}
              alt="Deep Sync"
              className="side-panel-logo-img"
            />
          </div>
          <nav className="side-panel-nav">
            {navItems.map((item) => {
              const active = isActive(item.path) || hasActiveChild(item)
              const hasChildren = item.children && item.children.length > 0

              if (hasChildren) {
                return (
                  <div key={item.path} className="side-panel-nav-group">
                    <div className={`side-panel-nav-item side-panel-nav-parent ${active ? 'active' : ''}`}>
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    <div className="side-panel-nav-children">
                      {item.children!.map((child) => {
                        const childActive = isActive(child.path)

                        if (child.disabled || child.path === '#') {
                          return (
                            <div
                              key={child.label}
                              className="side-panel-nav-item side-panel-nav-child side-panel-nav-child--disabled"
                            >
                              {child.icon}
                              <span>{child.label}</span>
                            </div>
                          )
                        }

                        return (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={`side-panel-nav-item side-panel-nav-child ${childActive ? 'active' : ''}`}
                            onClick={onClose}
                          >
                            {child.icon}
                            <span>{child.label}</span>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )
              }

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`side-panel-nav-item ${active ? 'active' : ''}`}
                  onClick={onClose}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}

export default SidePanel
