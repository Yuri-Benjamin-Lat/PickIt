import { useState, useRef } from 'react'
import { shuffle, SAMPLE_NAMES } from '../../utils/random'
import { Icon } from '../Icon'

export function NameInput({ names, setNames, accent = 'var(--indigo)', placeholder = 'Add a name…', label = 'Participants', counterLabel = 'in pool', showSample = true }) {
  const [val, setVal] = useState('')
  const inputRef = useRef(null)

  const add = () => {
    const v = val.trim()
    if (!v) return
    const parts = v.split(/[,\n]+/).map(s => s.trim()).filter(Boolean)
    if (parts.length) setNames([...names, ...parts.filter(p => !names.includes(p))])
    setVal('')
    inputRef.current?.focus()
  }

  const remove = (n) => setNames(names.filter(x => x !== n))
  const clear = () => setNames([])
  const loadSample = () => setNames(shuffle(SAMPLE_NAMES).slice(0, 8))

  return (
    <div className="card" style={{ '--accent': accent }}>
      <div className="between" style={{ marginBottom: 14 }}>
        <div className="label" style={{ margin: 0 }}>{label}</div>
        <div className="counter"><b>{names.length}</b> {counterLabel}</div>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); add() }} style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <input
          ref={inputRef}
          className="input"
          placeholder={placeholder}
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
        <button type="submit" className="btn btn-primary btn-sm" style={{ padding: '0 16px', flexShrink: 0 }}>
          <Icon name="plus" size={14} />
        </button>
      </form>
      {names.length > 0 ? (
        <div className="chip-list">
          {names.map((n) => (
            <span key={n} className="name-chip">
              <span className="swatch" style={{ '--c': accent }}></span>
              {n}
              <span className="x" onClick={() => remove(n)}>×</span>
            </span>
          ))}
        </div>
      ) : (
        <div style={{ fontSize: 13, color: 'var(--muted)', padding: '12px 0', textAlign: 'center', border: '1px dashed var(--line)', borderRadius: 12 }}>
          No names yet. Type above or load a sample.
        </div>
      )}
      <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
        {showSample && (
          <button className="btn btn-ghost btn-sm" onClick={loadSample}>
            <Icon name="sparkle" size={12} /> Sample set
          </button>
        )}
        {names.length > 0 && (
          <button className="btn btn-ghost btn-sm" onClick={clear}>Clear all</button>
        )}
      </div>
    </div>
  )
}
