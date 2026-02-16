import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { logout } from '../../utils/logout'
import { assetUrl } from '../../utils/assetPaths'

interface TopNavigationProps {
  onMenuClick: () => void
}

function getInitials(userName: string): string {
  const parts = userName.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase().slice(0, 2)
  }
  return userName.slice(0, 2).toUpperCase() || '?'
}

const TopNavigation = ({ onMenuClick }: TopNavigationProps) => {
  const { authUser, clearAuthUser } = useAuth()
  const navigate = useNavigate()
  const [logoError, setLogoError] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const logoSrc = assetUrl('logo/Globe.svg')
  const userInitials = authUser?.userName ? getInitials(authUser.userName) : '?'

  useEffect(() => {
    // Check if logo exists by trying to load it
    const img = new Image()
    img.onerror = () => setLogoError(true)
    img.onload = () => setLogoError(false)
    img.src = logoSrc
  }, [logoSrc])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showUserMenu])

  const handleUserMenuToggle = () => {
    setShowUserMenu(!showUserMenu)
  }

  const handleChangeOrganization = () => {
    setShowUserMenu(false)
    navigate('/auth/select-organization')
  }

  const handleLogout = async () => {
    setShowUserMenu(false)
    // Call production-ready logout function
    // This will:
    // 1. Call backend logout endpoint to revoke session
    // 2. Clear refresh_token cookie (handled by backend)
    // 3. Clear frontend auth state
    // 4. Redirect to login page
    await logout(clearAuthUser, '/login')
  }

  return (
    <nav className="top-navigation">
      <div className="top-nav-left">
        <button className="menu-toggle-btn" onClick={onMenuClick} aria-label="Open menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="6" height="6" rx="1" fill="currentColor"/>
            <rect x="11" y="3" width="6" height="6" rx="1" fill="currentColor"/>
            <rect x="3" y="11" width="6" height="6" rx="1" fill="currentColor"/>
            <rect x="11" y="11" width="6" height="6" rx="1" fill="currentColor"/>
          </svg>
        </button>
        <div className="logo-container">
          {!logoError && (
            <img 
              src={logoSrc} 
              alt="Deep Sync Cloud Platform" 
              className="logo-image"
              onError={() => setLogoError(true)}
            />
          )}
          {logoError && (
            <span className="logo-text">Deep Sync Cloud Platform</span>
          )}
        </div>
      </div>
      <div className="top-nav-right">
        <button className="nav-icon-btn" aria-label="Search">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M15 15L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <button className="nav-icon-btn notification-btn" aria-label="Notifications">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2C8.9 2 8 2.9 8 4V5.5C6.2 6.1 5 7.7 5 9.5V13L3 15V16H17V15L15 13V9.5C15 7.7 13.8 6.1 12 5.5V4C12 2.9 11.1 2 10 2Z" fill="currentColor"/>
          </svg>
          <span className="notification-badge">1</span>
        </button>
        <button className="nav-icon-btn" aria-label="Help">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M10 7V10M10 13H10.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <div className="user-menu-container" ref={userMenuRef}>
          <button
            className="user-avatar-btn"
            aria-label="User menu"
            onClick={handleUserMenuToggle}
            aria-expanded={showUserMenu}
          >
            <span className="user-initials">{userInitials}</span>
          </button>
          {showUserMenu && (
            <div className="user-menu-dropdown">
              <div className="user-menu-header">
                <div className="user-menu-avatar">
                  <span className="user-menu-initials">{userInitials}</span>
                </div>
                <div className="user-menu-info">
                  <div className="user-menu-name">{authUser?.userName ?? 'User'}</div>
                  <div className="user-menu-email">{authUser?.userEmail ?? ''}</div>
                </div>
              </div>
              <div className="user-menu-divider"></div>
              <div className="user-menu-items">
                <button
                  type="button"
                  className="user-menu-item"
                  onClick={handleChangeOrganization}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M6 2V14M10 2V14M2 6H14M2 10H14" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  <span>Change Organization</span>
                </button>
                <button
                  type="button"
                  className="user-menu-item user-menu-item--danger"
                  onClick={handleLogout}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 14H3C2.44772 14 2 13.5523 2 13V3C2 2.44772 2.44772 2 3 2H6M10 11L14 7M14 7L10 3M14 7H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default TopNavigation
