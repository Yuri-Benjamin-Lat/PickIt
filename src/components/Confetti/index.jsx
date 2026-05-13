import { useMemo } from 'react'

const COLORS = ['#5B5BF4', '#FF4D8D', '#C6F94D', '#FFB23F', '#2BD4C4', '#A66DFF']

export function Confetti({ active, count = 60, fixed = false }) {
  const pieces = useMemo(() => {
    if (!active) return []
    return Array.from({ length: count }).map((_, i) => {
      const angle = (Math.random() * 2 - 1) * Math.PI
      const dist = 200 + Math.random() * 280
      return {
        i,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist - 100,
        rot: Math.random() * 360,
        color: COLORS[i % COLORS.length],
        delay: Math.random() * 200,
        dur: 1600 + Math.random() * 1200,
      }
    })
  }, [active, count])

  if (!active) return null
  return (
    <div className="confetti-layer" style={fixed ? { position: 'fixed' } : {}}>
      {pieces.map(p => (
        <span key={p.i} className="confetti-piece" style={{
          background: p.color,
          '--dx': `${p.dx}px`,
          '--dy': `${p.dy}px`,
          '--rot': `${p.rot}deg`,
          '--dur': `${p.dur}ms`,
          animationDelay: `${p.delay}ms`,
        }} />
      ))}
    </div>
  )
}
