import { useState, useEffect } from 'react'

export function Countdown({ from = 3, onDone }) {
  const [n, setN] = useState(from)

  useEffect(() => {
    if (n <= 0) { onDone(); return }
    const t = setTimeout(() => setN(n - 1), 700)
    return () => clearTimeout(t)
  }, [n])

  if (n <= 0) return null
  return (
    <div className="countdown-overlay">
      <div className="countdown-num" key={n}>{n}</div>
    </div>
  )
}
