import { useState } from 'react'
import { withAccent } from '../../lib/accent'
import { pickRandom } from '../../utils/random'
import { ToolHero } from '../../components/ToolHero'
import { NameInput } from '../../components/NameInput'
import { StageEmpty } from '../../components/StageEmpty'
import { ToggleRow } from '../../components/ToggleRow'
import { Icon } from '../../components/Icon'

export default function RoleAssigner() {
  const [names, setNames] = useState(['Maya', 'Niko', 'Onyx', 'Pax', 'Quinn'])
  const [roles, setRoles] = useState(['🕵️ Detective', '🦹 Villain', '👨‍⚕️ Medic', '🧙 Wizard', '🥷 Spy'])
  const [allowDupes, setAllowDupes] = useState(true)
  const [assignments, setAssignments] = useState(null)
  const [revealCount, setRevealCount] = useState(0)

  const assign = () => {
    if (names.length === 0 || roles.length === 0) return
    let pool = [...roles]
    const result = names.map(n => {
      let role
      if (allowDupes) {
        role = pickRandom(roles)
      } else {
        if (pool.length === 0) { role = '— (out of roles)' }
        else {
          const idx = Math.floor(Math.random() * pool.length)
          role = pool[idx]
          pool.splice(idx, 1)
        }
      }
      return { name: n, role }
    })
    setAssignments(result)
    setRevealCount(0)
    result.forEach((_, i) => setTimeout(() => setRevealCount(i + 1), 200 + i * 200))
  }

  return (
    <div className="page" style={withAccent('role')}>
      <ToolHero
        kind="role" icon="tag" title="Role Assigner"
        sub="Give every player a randomly assigned role. Great for game nights, icebreakers, mafia, secret santa setups, or team exercises."
      />
      <div className="tool-layout">
        <aside className="tool-aside">
          <NameInput names={names} setNames={setNames} accent="var(--t-role)" />
          <NameInput
            names={roles} setNames={setRoles}
            accent="var(--t-role)"
            placeholder="Add a role…"
            label="Role Pool"
            counterLabel="roles"
            showSample={false}
          />
          <div className="card">
            <div className="label">Allow duplicates</div>
            <ToggleRow
              value={allowDupes ? 'yes' : 'no'}
              onChange={(v) => setAllowDupes(v === 'yes')}
              options={[
                { value: 'yes', label: 'Roles repeat' },
                { value: 'no', label: 'Unique only' },
              ]}
            />
          </div>
          <button className="btn btn-accent btn-lg" onClick={assign} disabled={names.length === 0 || roles.length === 0} style={{ width: '100%' }}>
            <Icon name="shuffle" size={14} /> {assignments ? 'Reassign roles' : 'Assign roles'}
          </button>
        </aside>

        <div className="tool-stage">
          {!assignments ? (
            <StageEmpty icon="tag" message="Add players and roles, then assign" />
          ) : (
            <div className="role-grid">
              {assignments.map((a, i) => (
                <div
                  key={i}
                  className="role-card fade-in"
                  style={{ opacity: i < revealCount ? 1 : 0.15, animationDelay: `${i * 60}ms` }}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
                    Player {i + 1}
                  </div>
                  <div className="person">{a.name}</div>
                  <div className="arrow">↓ assigned to</div>
                  <div className="role-name">{a.role}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
