import { Link, useLocation } from 'react-router-dom'
import { ROUTE_TITLES } from '../../lib/routes'
import { Icon } from '../Icon'

export default function Topbar() {
  const { pathname } = useLocation()
  const title = ROUTE_TITLES[pathname] || 'Pickit'
  const isHome = pathname === '/'

  return (
    <div className="topbar">
      <div className="crumbs">
        Pickit / <b>{title}</b>
      </div>
      <div className="top-right">
        <div className="pill" style={{ background: 'transparent', border: '1px solid var(--line)' }}>
          <span className="nav-dot" style={{ width: 6, height: 6, background: 'var(--lime)' }} />
          v1.0
        </div>
        {!isHome && (
          <Link to="/" className="btn btn-ghost btn-sm">
            <Icon name="home" size={13} /> Home
          </Link>
        )}
      </div>
    </div>
  )
}
