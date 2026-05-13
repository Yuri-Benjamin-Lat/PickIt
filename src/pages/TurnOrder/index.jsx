import { useState } from 'react'
import { withAccent } from '../../lib/accent'
import { shuffle } from '../../utils/random'
import { ToolHero } from '../../components/ToolHero'
import { NameInput } from '../../components/NameInput'
import { StageEmpty } from '../../components/StageEmpty'
import { Icon } from '../../components/Icon'

export default function TurnOrder() {
  const [names, setNames] = useState(['Avery', 'Beck', 'Cleo', 'Dex', 'Echo'])
  const [order, setOrder] = useState(null)
  const [highlightIdx, setHighlightIdx] = useState(-1)
  const [running, setRunning] = useState(false)

  const randomize = () => {
    if (names.length < 2 || running) return
    const shuffled = shuffle(names)
    setOrder(shuffled)
    setHighlightIdx(-1)
    setRunning(true)
    shuffled.forEach((_, i) => {
      setTimeout(() => setHighlightIdx(i), 400 + i * 380)
    })
    setTimeout(() => setRunning(false), 400 + shuffled.length * 380 + 200)
  }

  return (
    <div className="page" style={withAccent('turn')}>
      <ToolHero
        kind="turn" icon="list" title="Sequence / Turn Order"
        sub="Randomize the order of a list. Ideal for board games, presentations, or any situation where turn order actually matters."
      />
      <div className="tool-layout">
        <aside className="tool-aside">
          <NameInput names={names} setNames={setNames} accent="var(--t-turn)" />
          <button className="btn btn-accent btn-lg" onClick={randomize} disabled={names.length < 2 || running} style={{ width: '100%' }}>
            <Icon name="shuffle" size={14} /> {order ? 'Reshuffle order' : 'Randomize order'}
          </button>
        </aside>

        <div className="tool-stage">
          {!order ? (
            <StageEmpty icon="list" message="Add at least 2 names, then randomize" />
          ) : (
            <div className="order-stage">
              <div className="counter" style={{ marginBottom: 6 }}>
                Going first → last · <b>{order.length}</b> in order
              </div>
              {order.map((name, i) => (
                <div
                  key={i}
                  className={`order-row ${highlightIdx >= i ? 'highlight fade-in' : ''}`}
                  style={{
                    opacity: highlightIdx >= i ? 1 : 0.15,
                    transform: highlightIdx >= i ? 'translateX(0)' : 'translateX(-12px)',
                    animationDelay: `${i * 50}ms`,
                  }}
                >
                  <div className="order-rank">{i + 1}</div>
                  <div>{name}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}>
                    {i === 0 ? 'First up' : i === order.length - 1 ? 'Closer' : `Turn ${i + 1}`}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
