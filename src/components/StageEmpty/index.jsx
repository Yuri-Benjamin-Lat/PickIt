import { Icon } from '../Icon'

export function StageEmpty({ icon = 'sparkle', message = 'Add some names to get started' }) {
  return (
    <div className="stage-empty">
      <div>
        <div className="glyph"><Icon name={icon} size={36} stroke={1.5} /></div>
        <div style={{ fontSize: 14 }}>{message}</div>
      </div>
    </div>
  )
}
