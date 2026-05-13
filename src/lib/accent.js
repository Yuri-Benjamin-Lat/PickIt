export const ACCENT_VARS = {
  single:  { c: 'var(--t-single)',  g: 'var(--indigo-glow)' },
  mystery: { c: 'var(--t-mystery)', g: 'rgba(166,109,255,0.35)' },
  turn:    { c: 'var(--t-turn)',    g: 'rgba(43,212,196,0.35)' },
  role:    { c: 'var(--t-role)',    g: 'rgba(255,178,63,0.35)' },
  team:    { c: 'var(--t-team)',    g: 'var(--pink-glow)' },
  elim:    { c: 'var(--t-elim)',    g: 'rgba(255,90,90,0.35)' },
  bracket: { c: 'var(--t-bracket)', g: 'rgba(198,249,77,0.5)' },
  home:    { c: 'var(--indigo)',    g: 'var(--indigo-glow)' },
}

export function withAccent(key, style = {}) {
  const a = ACCENT_VARS[key] || ACCENT_VARS.home
  return { ...style, '--accent': a.c, '--accent-glow': a.g }
}

export const KIND_LABEL = {
  single:  'Chance · Single Winner',
  mystery: 'Chance · Mystery Reward',
  turn:    'Order · Sequence',
  role:    'Order · Roles',
  team:    'Groups · Teams',
  elim:    'Elimination · One by One',
  bracket: 'Elimination · Bracket',
}
