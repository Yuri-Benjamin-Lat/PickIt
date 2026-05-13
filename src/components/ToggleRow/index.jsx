export function ToggleRow({ value, onChange, options }) {
  return (
    <div className="toggle-row">
      {options.map(o => (
        <button
          key={o.value}
          type="button"
          className={value === o.value ? 'on' : ''}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
