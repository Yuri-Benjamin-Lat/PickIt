import { useState } from 'react'
import { withAccent } from '../../lib/accent'
import { shuffle } from '../../utils/random'
import { ToolHero } from '../../components/ToolHero'
import { NameInput } from '../../components/NameInput'
import { StageEmpty } from '../../components/StageEmpty'
import { ToggleRow } from '../../components/ToggleRow'
import { NumberStepper } from '../../components/NumberStepper'
import { Icon } from '../../components/Icon'

const TEAM_COLORS = [
  { c: 'var(--indigo)', g: 'var(--indigo-glow)' },
  { c: 'var(--pink)',   g: 'var(--pink-glow)' },
  { c: 'var(--teal)',   g: 'rgba(43,212,196,0.35)' },
  { c: 'var(--amber)',  g: 'rgba(255,178,63,0.35)' },
  { c: 'var(--violet)', g: 'rgba(166,109,255,0.35)' },
  { c: 'var(--red)',    g: 'rgba(255,90,90,0.35)' },
]
const TEAM_NAMES = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot', 'Golf', 'Hotel']

export default function TeamMaker() {
  const [names, setNames] = useState(['Avery', 'Beck', 'Cleo', 'Dex', 'Echo', 'Finch', 'Gus', 'Hana', 'Indie', 'Juno'])
  const [mode, setMode] = useState('count')
  const [n, setN] = useState(2)
  const [teams, setTeams] = useState(null)
  const [reveal, setReveal] = useState(0)

  const make = () => {
    if (names.length < 2) return
    const shuffled = shuffle(names)
    const teamCount = mode === 'count' ? n : Math.max(1, Math.ceil(names.length / n))
    const buckets = Array.from({ length: teamCount }, () => [])
    shuffled.forEach((nm, i) => buckets[i % teamCount].push(nm))
    const result = buckets.map((members, i) => ({
      name: `Team ${TEAM_NAMES[i] || (i + 1)}`,
      members,
      color: TEAM_COLORS[i % TEAM_COLORS.length],
    }))
    setTeams(result)
    setReveal(0)
    result.forEach((_, i) => setTimeout(() => setReveal(i + 1), 200 + i * 220))
  }

  return (
    <div className="page" style={withAccent('team')}>
      <ToolHero
        kind="team" icon="users" title="Team Maker"
        sub="Split your group into balanced, randomly assigned teams. Choose the number of teams or the team size — Pickit divides everyone fairly."
      />
      <div className="tool-layout">
        <aside className="tool-aside">
          <NameInput names={names} setNames={setNames} accent="var(--t-team)" />
          <div className="card">
            <div className="label">Split by</div>
            <ToggleRow
              value={mode}
              onChange={setMode}
              options={[
                { value: 'count', label: 'Team count' },
                { value: 'size',  label: 'Team size' },
              ]}
            />
            <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div className="label" style={{ marginBottom: 4 }}>{mode === 'count' ? 'Number of teams' : 'Players per team'}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                  {mode === 'count'
                    ? `≈ ${Math.ceil(names.length / Math.max(n, 1))} per team`
                    : `${Math.max(1, Math.ceil(names.length / n))} teams total`}
                </div>
              </div>
              <NumberStepper value={n} onChange={setN} min={1} max={12} />
            </div>
          </div>
          <button className="btn btn-accent btn-lg" onClick={make} disabled={names.length < 2} style={{ width: '100%' }}>
            <Icon name="shuffle" size={14} /> {teams ? 'Reshuffle teams' : 'Make teams'}
          </button>
        </aside>

        <div className="tool-stage">
          {!teams ? (
            <StageEmpty icon="users" message="Add at least 2 names, then split them up" />
          ) : (
            <div className="teams-grid">
              {teams.map((t, i) => (
                <div
                  key={i}
                  className="team-card fade-in"
                  style={{
                    opacity: i < reveal ? 1 : 0.1,
                    transform: i < reveal ? 'translateY(0)' : 'translateY(8px)',
                    transition: 'all 400ms cubic-bezier(.2,.8,.3,1)',
                    boxShadow: i < reveal ? `0 8px 24px ${t.color.g}` : 'none',
                  }}
                >
                  <div className="team-head" style={{ background: t.color.c }}>
                    <h4>{t.name}</h4>
                    <div className="count">{t.members.length} {t.members.length === 1 ? 'player' : 'players'}</div>
                  </div>
                  <div className="team-body">
                    {t.members.map((m, j) => (
                      <div key={j} className="team-member">
                        <span className="num">{String(j + 1).padStart(2, '0')}</span>
                        <span>{m}</span>
                      </div>
                    ))}
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
