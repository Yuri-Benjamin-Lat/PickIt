import { withAccent, KIND_LABEL } from '../../lib/accent'
import { Icon } from '../Icon'

export function ToolHero({ icon, title, sub, kind }) {
  return (
    <div className="tool-hero" style={withAccent(kind)}>
      <div>
        <div className="pill pill-accent" style={{ marginBottom: 14 }}>
          <span className="nav-dot" style={{ width: 6, height: 6 }}></span>
          {KIND_LABEL[kind] || 'Randomizer'}
        </div>
        <h1 className="tool-title">{title}</h1>
        <p className="tool-sub">{sub}</p>
      </div>
      <div className="tool-icon"><Icon name={icon} size={32} /></div>
    </div>
  )
}
