import { useState, useEffect } from 'react'

export function useTheme() {
  const [dark, setDark] = useState(() => localStorage.getItem('pickit-theme') === 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem('pickit-theme', dark ? 'dark' : 'light')
  }, [dark])

  const toggle = () => setDark(d => !d)
  return [dark, toggle]
}
