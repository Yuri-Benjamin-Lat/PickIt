import { useState, useEffect, useRef } from 'react'
import { withAccent } from '../../lib/accent'
import { ToolHero } from '../../components/ToolHero'
import { NameInput } from '../../components/NameInput'
import { StageEmpty } from '../../components/StageEmpty'
import { ToggleRow } from '../../components/ToggleRow'
import { Confetti } from '../../components/Confetti'
import { Icon } from '../../components/Icon'

export default function Elimination() {
  const [names, setNames] = useState(['Avery', 'Beck', 'Cleo', 'Dex', 'Echo', 'Finch', 'Gus', 'Hana'])
  const [pool, setPool] = useState([])
  const [eliminated, setEliminated] = useState([])
  const [running, setRunning] = useState(false)
  const [paceMs, setPaceMs] = useState(900)
  const timeoutRef = useRef(null)

  const start = () => {
    if (names.length < 2 || running) return
    setPool(names.map(n => ({ name: n, alive: true })))
    setEliminated([])
    setRunning(true)
  }

  useEffect(() => {
    if (!running) return
    const alive = pool.filter(p => p.alive)
    if (alive.length <= 1) { setRunning(false); return }
    timeoutRef.current = setTimeout(() => {
      const aliveIdx = pool.map((p, i) => p.alive ? i : -1).filter(i => i >= 0)
      const killIdx = aliveIdx[Math.floor(Math.random() * aliveIdx.length)]
      const killName = pool[killIdx].name
      setPool(prev => prev.map((p, i) => i === killIdx ? { ...p, alive: false } : p))
      setEliminated(prev => [...prev, killName])
    }, paceMs)
    return () => clearTimeout(timeoutRef.current)
  }, [running, pool, paceMs])

  const reset = () => {
    clearTimeout(timeoutRef.current)
    setRunning(false)
    setPool([])
    setEliminated([])
  }

  const survivors = pool.filter(p => p.alive)
  const lastStanding = !running && pool.length > 0 && survivors.length === 1 ? survivors[0].name : null

  return (
    <div className="page" style={withAccent('elim')}>
      <ToolHero
        kind="elim" icon="flame" title="One by One Elimination"
        sub="Knock players out of the pool one at a time until only one name is left standing. Tense, dramatic, impossible to predict."
      />
      <div className="tool-layout">
        <aside className="tool-aside">
          <NameInput names={names} setNames={setNames} accent="var(--t-elim)" />
          <div className="card">
            <div className="label">Elimination pace</div>
            <ToggleRow
              value={paceMs}
              onChange={setPaceMs}
              options={[
                { value: 500,  label: 'Quick' },
                { value: 900,  label: 'Dramatic' },
                { value: 1800, label: 'Cruel' },
              ]}
            />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-accent btn-lg" onClick={start} disabled={names.length < 2 || running} style={{ flex: 1 }}>
              <Icon name="flame" size={14} /> {pool.length === 0 ? 'Begin' : 'Restart'}
            </button>
            {pool.length > 0 && (
              <button className="btn btn-ghost btn-lg" onClick={reset}>Reset</button>
            )}
          </div>
        </aside>

        <div className="tool-stage">
          {pool.length === 0 ? (
            <StageEmpty icon="flame" message="Add at least 2 names to begin the elimination" />
          ) : (
            <div className="elim-stage">
              <div className="between">
                <div className="counter">
                  <b>{survivors.length}</b> remaining · <b>{eliminated.length}</b> eliminated
                </div>
                {running && <div className="pill pill-accent">● Live</div>}
              </div>
              <div className="elim-pool">
                {pool.map((p, i) => (
                  <span
                    key={i}
                    className={`elim-name ${!p.alive ? 'eliminated' : ''} ${lastStanding && p.alive ? 'last-standing' : ''}`}
                  >
                    {p.name}
                  </span>
                ))}
              </div>
              {eliminated.length > 0 && (
                <div>
                  <div className="label">Knock-out order</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)' }}>
                    {eliminated.map((e, i) => (
                      <span key={i}>{i + 1}. {e}{i < eliminated.length - 1 && ' →'}</span>
                    ))}
                  </div>
                </div>
              )}
              {lastStanding && (
                <div className="winner-card fade-in" style={{ marginTop: 12 }}>
                  <div className="winner-label">🔥 Last one standing</div>
                  <div className="winner-name">{lastStanding}</div>
                  <Confetti active count={80} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
