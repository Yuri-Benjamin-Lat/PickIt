export function Icon({ name, size = 20, stroke = 2 }) {
  const s = { width: size, height: size, strokeWidth: stroke, fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' }
  const paths = {
    home:     <><path d="M3 11L12 4l9 7"/><path d="M5 10v10h14V10"/></>,
    trophy:   <><path d="M8 4h8v4a4 4 0 0 1-8 0V4z"/><path d="M8 6H5v2a3 3 0 0 0 3 3"/><path d="M16 6h3v2a3 3 0 0 1-3 3"/><path d="M12 14v3"/><path d="M9 20h6"/></>,
    gift:     <><rect x="3" y="8" width="18" height="4" rx="1"/><rect x="5" y="12" width="14" height="9"/><path d="M12 8v13"/><path d="M12 8c-2 0-4-1.5-4-3a2 2 0 0 1 4 0c0 1.5 0 3 0 3z"/><path d="M12 8c2 0 4-1.5 4-3a2 2 0 0 0-4 0c0 1.5 0 3 0 3z"/></>,
    list:     <><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/></>,
    tag:      <><path d="M20 12l-8 8-9-9V3h8l9 9z"/><circle cx="7.5" cy="7.5" r="1.2"/></>,
    users:    <><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 19c0-3 3-5 6-5s6 2 6 5"/><path d="M14 18c0-2 2-3.5 4-3.5s3.5 1.5 3.5 3.5"/></>,
    bracket:  <><path d="M3 5h4v4H3z"/><path d="M3 15h4v4H3z"/><path d="M10 9h4v6h-4z"/><path d="M17 11h4v2h-4z"/><path d="M7 7h3"/><path d="M7 17h3"/><path d="M14 12h3"/></>,
    play:     <><path d="M6 4l14 8-14 8V4z"/></>,
    plus:     <><path d="M12 5v14"/><path d="M5 12h14"/></>,
    shuffle:  <><path d="M16 3h5v5"/><path d="M4 20L21 3"/><path d="M21 16v5h-5"/><path d="M15 15l6 6"/><path d="M4 4l5 5"/></>,
    arrow:    <><path d="M5 12h14"/><path d="M13 5l7 7-7 7"/></>,
    sparkle:  <><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/></>,
    rotate:   <><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/></>,
    flame:    <><path d="M12 3c1 4 5 4 5 9a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3-1-3 1-5 1-8z"/></>,
    dice:     <><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.3" fill="currentColor" stroke="none"/><circle cx="16" cy="16" r="1.3" fill="currentColor" stroke="none"/><circle cx="16" cy="8" r="1.3" fill="currentColor" stroke="none"/><circle cx="8" cy="16" r="1.3" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/></>,
    crown:    <><path d="M3 18h18l-2-9-4 4-4-7-4 7-4-4z"/></>,
  }
  return <svg viewBox="0 0 24 24" style={s} aria-hidden="true">{paths[name] || paths.sparkle}</svg>
}
