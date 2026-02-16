interface HeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

const Header = ({ title, subtitle, actions }: HeaderProps) => {
  return (
    <header className="top-header">
      <div className="header-left">
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
      <div className="header-right">
        {actions || (
          <button className="share-btn">Share</button>
        )}
      </div>
    </header>
  )
}

export default Header
