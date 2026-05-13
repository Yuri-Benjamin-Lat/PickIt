import { Link } from 'react-router-dom'
import { Icon } from '../../components/Icon'
import { withAccent } from '../../lib/accent'
import { TOOL_ROUTES } from '../../lib/routes'
import './Home.css'

const TOOLS = [
  { id: 'single',  icon: 'trophy',  title: 'Single Winner',           category: 'chance', desc: 'Crown one winner from the pool with a dramatic spin and a satisfying reveal.' },
  { id: 'mystery', icon: 'gift',    title: 'Mystery Reward',           category: 'chance', desc: 'Mystery boxes hide your prizes. Tap one, see what fate had in mind.' },
  { id: 'turn',    icon: 'list',    title: 'Sequence / Turn Order',    category: 'order',  desc: 'Randomize the order of a list. Numbered, animated, and impossible to argue with.' },
  { id: 'role',    icon: 'tag',     title: 'Role Assigner',            category: 'order',  desc: 'Give each player a randomly assigned role from your custom set.' },
  { id: 'team',    icon: 'users',   title: 'Team Maker',               category: 'group',  desc: 'Split your group into balanced teams. Set count or size — Pickit makes it fair.' },
  { id: 'elim',    icon: 'flame',   title: 'One by One Elimination',   category: 'elim',   desc: 'Knock players out one by one until a single name is left standing.' },
  { id: 'bracket', icon: 'bracket', title: 'Bracket Tournament',       category: 'elim',   desc: 'Auto-build a tournament bracket. Random seeding, round-by-round chaos.' },
]

const CATEGORIES = [
  { id: 'chance', label: 'Chance Games',      tag: '01 · Pure chance' },
  { id: 'order',  label: 'Order & Assignment', tag: '02 · Sequence & roles' },
  { id: 'group',  label: 'Group Games',        tag: '03 · Teams & balance' },
  { id: 'elim',   label: 'Elimination',        tag: '04 · Last one standing' },
]

export default function Home() {
  return (
    <div className="page">
      <section className="home-hero">
        <div>
          <div className="eyebrow"><span className="dot" />Pickit · v1.0 · May 2026</div>
          <h1 className="headline">Let chance<br /><em>do the work.</em></h1>
          <p className="headline-sub">
            Seven randomizers for groups, games, classrooms, and events. No sign-ups, no setup —
            just open it, drop in your names, and let fate take the wheel.
          </p>
          <div className="hero-cta">
            <Link to="/single-winner" className="btn btn-primary btn-lg">
              <Icon name="play" size={14} /> Try Single Winner
            </Link>
            <button className="btn btn-ghost btn-lg" onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}>
              See all 7 tools
            </button>
          </div>
        </div>
        <div className="chip-stack">
          <div className="chip chip-1">7</div>
          <div className="chip chip-2">P!</div>
          <div className="chip chip-3"><Icon name="dice" size={56} stroke={1.6} /></div>
          <div className="chip chip-4"><Icon name="sparkle" size={36} stroke={1.6} /></div>
        </div>
      </section>

      <section className="stat-strip">
        <div className="stat"><div className="n"><em>7</em> tools</div><div className="lbl">Built for any moment</div></div>
        <div className="stat"><div className="n">0 sign-ups</div><div className="lbl">Open it. Use it.</div></div>
        <div className="stat"><div className="n">∞ rerolls</div><div className="lbl">Until you're happy</div></div>
        <div className="stat"><div className="n">100% fair</div><div className="lbl">Cryptographically random*</div></div>
      </section>

      <div id="tools" />
      {CATEGORIES.map(cat => {
        const items = TOOLS.filter(t => t.category === cat.id)
        return (
          <section key={cat.id}>
            <div className="tools-section-head">
              <span className="cat-tag">{cat.tag}</span>
              <h2>{cat.label}</h2>
              <hr />
            </div>
            <div className="tools-grid fade-in-stagger">
              {items.map(t => (
                <Link key={t.id} to={TOOL_ROUTES[t.id]} className="tool-card" style={withAccent(t.id)}>
                  <div className="tool-card-icon"><Icon name={t.icon} size={22} /></div>
                  <h3>{t.title}</h3>
                  <p>{t.desc}</p>
                  <div className="go">Launch <Icon name="arrow" size={14} /></div>
                </Link>
              ))}
            </div>
          </section>
        )
      })}

      <section style={{ marginTop: 80, padding: '40px 0', borderTop: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
          <div>
            <div className="eyebrow"><span className="dot" />Built simple</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 36, letterSpacing: '-0.02em', margin: '0 0 12px', maxWidth: 520 }}>
              Frontend-only. <em style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', color: 'var(--indigo)', fontWeight: 400 }}>Zero friction.</em>
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.6, maxWidth: 520, margin: 0 }}>
              Everything runs in your browser. Your lists save locally so you can come back to them.
              No accounts, no tracking, no waiting.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {[
              { l: 'React 19', s: 'Composable UI' },
              { l: 'Vite',     s: 'Instant reload' },
              { l: 'Tailwind', s: 'Design tokens' },
              { l: 'localStorage', s: 'Persists locally' },
            ].map(s => (
              <div key={s.l} style={{ padding: 16, border: '1px solid var(--line)', borderRadius: 14, minWidth: 140 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}>{s.s}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ marginTop: 60, paddingTop: 24, borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: 'var(--muted)' }}>
        <div>Pickit — Simple. Random. Unforgettable.</div>
        <div style={{ fontFamily: 'var(--font-mono)' }}>*Math.random() in v1, crypto.getRandomValues() in v1.1</div>
      </div>
    </div>
  )
}
