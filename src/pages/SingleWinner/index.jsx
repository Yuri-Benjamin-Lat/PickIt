import { useState, useRef } from 'react'
import { withAccent } from '../../lib/accent'
import { pickRandom } from '../../utils/random'
import { ToolHero } from '../../components/ToolHero'
import { NameInput } from '../../components/NameInput'
import { Confetti } from '../../components/Confetti'
import { Countdown } from '../../components/Countdown'
import { StageEmpty } from '../../components/StageEmpty'
import { ToggleRow } from '../../components/ToggleRow'
import { Icon } from '../../components/Icon'

export default function SingleWinner() {
  const [names, setNames] = useState(['Avery', 'Beck', 'Cleo', 'Dex', 'Echo', 'Finch'])
  const [spinning, setSpinning] = useState(false)
  const [winner, setWinner] = useState(null)
  const [reelTransform, setReelTransform] = useState('translateY(0)')
  const [reelDur, setReelDur] = useState(3200)
  const [showCountdown, setShowCountdown] = useState(false)
  const [reelItems, setReelItems] = useState([])

  const spin = () => {
    if (names.length < 2 || spinning) return
    setWinner(null)
    setShowCountdown(true)
  }

  const startSpin = () => {
    setShowCountdown(false)
    setSpinning(true)
    const w = pickRandom(names)
    const filler = Array.from({ length: 26 }, () => pickRandom(names))
    const items = [...filler, w]
    setReelItems(items)
    setReelTransform('translateY(0)')
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const itemH = 130
        const targetIndex = items.length - 1
        const offset = -(targetIndex * itemH)
        const jitter = (Math.random() - 0.5) * 30
        setReelTransform(`translateY(${offset + jitter}px)`)
      })
    })
    setTimeout(() => {
      setSpinning(false)
      setWinner(w)
    }, reelDur + 100)
  }

  return (
    <div className="page" style={withAccent('single')}>
      <ToolHero
        kind="single" icon="trophy" title="Single Winner"
        sub="Drop in your names, hit Spin, and let Pickit crown one winner. Great for raffles, giveaways, or settling who buys lunch."
      />
      <div className="tool-layout">
        <aside className="tool-aside">
          <NameInput names={names} setNames={setNames} accent="var(--t-single)" />
          <div className="card">
            <div className="label">Spin speed</div>
            <ToggleRow
              value={reelDur}
              onChange={setReelDur}
              options={[
                { value: 1800, label: 'Snappy' },
                { value: 3200, label: 'Suspense' },
                { value: 5000, label: 'Marathon' },
              ]}
            />
          </div>
          <button
            className="btn btn-accent btn-lg"
            onClick={spin}
            disabled={names.length < 2 || spinning}
            style={{ width: '100%' }}
          >
            {spinning ? 'Spinning…' : winner ? 'Spin again' : 'Spin the wheel'}
            {!spinning && <Icon name="play" size={14} />}
          </button>
        </aside>

        <div className="tool-stage" style={{ minHeight: 560 }}>
          {showCountdown && <Countdown from={3} onDone={startSpin} />}
          {names.length < 2 && !spinning && !winner ? (
            <StageEmpty icon="trophy" message="Add at least 2 names to start spinning" />
          ) : (
            <div className="reel">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', position: 'absolute', top: 24, left: 0, right: 0, textAlign: 'center' }}>
                {winner ? 'Winner' : spinning ? 'Picking…' : 'Ready to spin'}
              </div>
              <div className="reel-window">
                <div
                  className="reel-track"
                  style={{
                    transform: reelTransform,
                    transition: spinning ? `transform ${reelDur}ms cubic-bezier(.15,.85,.15,1)` : 'none',
                  }}
                >
                  {reelItems.length > 0
                    ? reelItems.map((n, i) => <div key={i} className="reel-item">{n}</div>)
                    : names.slice(0, 5).map((n, i) => <div key={i} className="reel-item" style={{ opacity: 0.3 }}>{n}</div>)
                  }
                </div>
                <div className="reel-marker" />
              </div>
              {winner && !spinning && (
                <div className="winner-card fade-in" style={{ marginTop: 32 }}>
                  <div className="winner-label">🏆 The winner is</div>
                  <div className="winner-name">{winner}</div>
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
