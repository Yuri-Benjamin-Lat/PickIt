import { useState } from 'react'
import { withAccent } from '../../lib/accent'
import { pickRandom } from '../../utils/random'
import { ToolHero } from '../../components/ToolHero'
import { NameInput } from '../../components/NameInput'
import { StageEmpty } from '../../components/StageEmpty'
import { ToggleRow } from '../../components/ToggleRow'
import { Icon } from '../../components/Icon'

const DEFAULTS = ['🍕 Free pizza', '⭐ MVP for a day', '🎟 Movie ticket', '☕ Coffee on me', '🍦 Ice cream', '🎮 Game night pick']

export default function MysteryReward() {
  const [rewards, setRewards] = useState(DEFAULTS)
  const [revealed, setRevealed] = useState({})
  const [allowMulti, setAllowMulti] = useState(false)
  const [poppingIdx, setPoppingIdx] = useState(null)

  const reset = () => { setRevealed({}); setPoppingIdx(null) }

  const reveal = (idx) => {
    if (revealed[idx] !== undefined) return
    if (!allowMulti && Object.keys(revealed).length >= 1) return
    const used = new Set(Object.values(revealed))
    const remaining = rewards.filter(r => !used.has(r))
    if (remaining.length === 0) return
    const pick = pickRandom(remaining)
    setPoppingIdx(idx)
    setTimeout(() => {
      setRevealed(prev => ({ ...prev, [idx]: pick }))
      setPoppingIdx(null)
    }, 280)
  }

  const boxCount = Math.max(rewards.length, 1)

  return (
    <div className="page" style={withAccent('mystery')}>
      <ToolHero
        kind="mystery" icon="gift" title="Mystery Reward"
        sub="Build a pool of prizes, then tap a mystery box to reveal what fate had in mind. Perfect for classrooms, loot drops, or any surprise giveaway."
      />
      <div className="tool-layout">
        <aside className="tool-aside">
          <NameInput names={rewards} setNames={setRewards} accent="var(--t-mystery)" placeholder="Add a prize…" />
          <div className="card">
            <div className="label">Reveal mode</div>
            <ToggleRow
              value={allowMulti ? 'multi' : 'one'}
              onChange={(v) => { setAllowMulti(v === 'multi'); setRevealed({}) }}
              options={[
                { value: 'one', label: 'One pick' },
                { value: 'multi', label: 'Open all' },
              ]}
            />
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 12, lineHeight: 1.5 }}>
              {allowMulti ? 'Keep tapping boxes to reveal each prize.' : 'Tap one box. The pick is final until you reset.'}
            </div>
          </div>
          <button className="btn btn-ghost btn-lg" onClick={reset} disabled={Object.keys(revealed).length === 0} style={{ width: '100%' }}>
            <Icon name="rotate" size={14} /> Reset boxes
          </button>
        </aside>

        <div className="tool-stage">
          {rewards.length === 0 ? (
            <StageEmpty icon="gift" message="Add at least one prize to begin" />
          ) : (
            <div className="mystery-grid">
              {Array.from({ length: boxCount }).map((_, i) => {
                const r = revealed[i]
                return (
                  <div
                    key={i}
                    className={`mystery-box ${r ? 'revealed' : ''} ${poppingIdx === i ? 'popping' : ''}`}
                    onClick={() => reveal(i)}
                  >
                    {r || null}
                  </div>
                )
              })}
            </div>
          )}
          {!allowMulti && revealed[Object.keys(revealed)[0]] && (
            <div style={{ position: 'absolute', bottom: 32, left: 0, right: 0, textAlign: 'center' }}>
              <div className="pill pill-accent">🎁 {revealed[Object.keys(revealed)[0]]} · Box {Number(Object.keys(revealed)[0]) + 1}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
