import { Link, useLocation } from 'react-router-dom'
import { NAV_GROUPS, TOOL_ROUTES } from '../../lib/routes'
import { ACCENT_VARS } from '../../lib/accent'

export default function Sidebar() {
  const { pathname } = useLocation()

  return (
    <aside className="sidebar">
      <Link to="/" className="brand">
        <div className="brand-mark" />
        <div className="brand-name">Pickit<span className="brand-dot">.</span></div>
      </Link>

      <div className="side-section">
        <div className="side-section-label">Workspace</div>
        <Link to="/" className={`nav-item ${pathname === '/' ? 'active' : ''}`}>
          <span className="nav-dot" style={{ background: 'var(--ink)' }} />
          <span>Home</span>
          <span className="nav-meta">⌘H</span>
        </Link>
      </div>

      {NAV_GROUPS.map((group, gi) => (
        <div key={gi} className="side-section">
          <div className="side-section-label">{group.label}</div>
          {group.items.map(item => {
            const path = TOOL_ROUTES[item.id]
            const accent = ACCENT_VARS[item.id]?.c
            return (
              <Link
                key={item.id}
                to={path}
                className={`nav-item ${pathname === path ? 'active' : ''}`}
              >
                <span className="nav-dot" style={{ background: accent }} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
      ))}

      <div className="side-foot">
        <b>Pickit v1.0</b><br />
        Frontend-only. Your lists save locally. No accounts, no tracking.
      </div>
    </aside>
  )
}
