import { useState, useEffect, useRef } from 'react'
import { withAccent } from '../../lib/accent'
import { shuffle } from '../../utils/random'
import { ToolHero } from '../../components/ToolHero'
import { NameInput } from '../../components/NameInput'
import { StageEmpty } from '../../components/StageEmpty'
import { Confetti } from '../../components/Confetti'
import { Icon } from '../../components/Icon'

function buildBracket(participants) {
  let size = 1
  while (size < participants.length) size *= 2
  const seeded = [...shuffle(participants)]
  while (seeded.length < size) seeded.push(null)
  const current = seeded.map((p, i) => ({ name: p, seed: i + 1 }))
  const rounds = []
  let r0 = []
  for (let i = 0; i < current.length; i += 2) {
    r0.push({ a: current[i], b: current[i + 1], winner: null })
  }
  rounds.push(r0)
  while (rounds[rounds.length - 1].length > 1) {
    const prev = rounds[rounds.length - 1]
    const next = []
    for (let i = 0; i < prev.length; i += 2) {
      next.push({ a: null, b: null, winner: null })
    }
    rounds.push(next)
  }
  return rounds
}

function simulateBracket(rounds) {
  const r = rounds.map(round => round.map(m => ({ ...m })))
  for (let i = 0; i < r.length; i++) {
    for (let j = 0; j < r[i].length; j++) {
      const m = r[i][j]
      if (i > 0) {
        m.a = r[i - 1][j * 2]?.winner ?? null
        m.b = r[i - 1][j * 2 + 1]?.winner ?? null
      }
      if (m.a && m.b) m.winner = Math.random() < 0.5 ? m.a : m.b
      else if (m.a) m.winner = m.a
      else if (m.b) m.winner = m.b
    }
  }
  return r
}

function roundLabel(roundIdx, totalRounds) {
  const fromEnd = totalRounds - 1 - roundIdx
  if (fromEnd === 0) return 'Final'
  if (fromEnd === 1) return 'Semifinals'
  if (fromEnd === 2) return 'Quarterfinals'
  return `Round ${roundIdx + 1}`
}

export default function Bracket() {
  const [names, setNames] = useState(['Koa', 'Luca', 'Maya', 'Niko', 'Onyx', 'Pax', 'Quinn', 'Rio'])
  const [bracket, setBracket] = useState(null)
  const [progress, setProgress] = useState(0)
  const [running, setRunning] = useState(false)
  const roundRefs = useRef([])

  const generate = () => {
    if (names.length < 2) return
    const rounds = buildBracket(names)
    const simmed = simulateBracket(rounds)
    setBracket(simmed)
    setProgress(0)
    setRunning(true)
    simmed.forEach((_, i) => {
      setTimeout(() => {
        setProgress(i + 1)
        if (i === simmed.length - 1) setRunning(false)
      }, 600 + i * 900)
    })
  }

  useEffect(() => {
    if (progress > 0 && roundRefs.current[progress - 1]) {
      roundRefs.current[progress - 1].scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' })
    }
  }, [progress])

  const bracketSize = (() => { let s = 1; while (s < names.length) s *= 2; return s })()
  const byes = bracketSize - names.length
  const champion = bracket && progress >= bracket.length ? bracket[bracket.length - 1][0].winner?.name : null
  const colHeight = bracket ? Math.max(bracket[0].length * 100, 400) : 400

  return (
    <div className="page" style={withAccent('bracket')}>
      <ToolHero
        kind="bracket" icon="bracket" title="Bracket Tournament"
        sub="Auto-generate a full tournament bracket from your list. Random seeding, round-by-round progression, and one ultimate champion."
      />
      <div className="tool-layout">
        <aside className="tool-aside">
          <NameInput names={names} setNames={setNames} accent="var(--t-bracket)" />
          <div className="card">
            <div className="label">Bracket size</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 32, letterSpacing: '-0.02em' }}>
              {bracketSize}-player
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
              {byes > 0 ? `${byes} bye${byes === 1 ? '' : 's'} · seeding random` : 'No byes · seeding random'}
            </div>
          </div>
          <button className="btn btn-accent btn-lg" onClick={generate} disabled={names.length < 2 || running} style={{ width: '100%', color: 'var(--ink)' }}>
            <Icon name="bracket" size={14} /> {bracket ? 'Run new bracket' : 'Run bracket'}
          </button>
        </aside>

        <div className="tool-stage" style={{ overflow: 'auto' }}>
          {!bracket ? (
            <StageEmpty icon="bracket" message="Add at least 2 names to seed a bracket" />
          ) : (
            <div className="bracket-wrap">
              <div className="bracket">
                {bracket.map((round, ri) => (
                  <div className="bracket-round" key={ri} ref={el => { roundRefs.current[ri] = el }} style={{ height: colHeight }}>
                    <div className="bracket-round-label">{roundLabel(ri, bracket.length)}</div>
                    {round.map((m, mi) => {
                      const revealed = ri < progress
                      return (
                        <div key={mi} className="match" style={{
                          opacity: revealed ? 1 : 0.2,
                          transform: revealed ? 'translateY(0)' : 'translateY(4px)',
                          transition: 'all 400ms cubic-bezier(.2,.8,.3,1)',
                          borderColor: revealed && m.winner ? 'color-mix(in oklab, var(--accent) 50%, var(--line))' : 'var(--line)',
                        }}>
                          {[m.a, m.b].map((p, pi) => {
                            const isWinner = revealed && m.winner && p && p.name === m.winner.name
                            const isLoser  = revealed && m.winner && p && p.name !== m.winner.name
                            return (
                              <div key={pi} className={`match-row ${isWinner ? 'winner' : ''} ${isLoser ? 'loser' : ''}`}>
                                <span className="seed">{p?.seed != null ? `#${p.seed}` : '—'}</span>
                                <span>{p?.name || (ri === 0 ? <em style={{ color: 'var(--muted)' }}>bye</em> : '—')}</span>
                              </div>
                            )
                          })}
                        </div>
                      )
                    })}
                  </div>
                ))}
                {champion && (
                  <div className="bracket-round" style={{ justifyContent: 'center', height: colHeight }}>
                    <div className="bracket-round-label">Champion</div>
                    <div className="winner-card fade-in" style={{ padding: '24px 28px', position: 'relative' }}>
                      <div className="winner-label">👑 Champion</div>
                      <div className="winner-name" style={{ fontSize: 32 }}>{champion}</div>
                      <Confetti active count={70} fixed />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
