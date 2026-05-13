export const SAMPLE_NAMES = [
  'Avery', 'Beck', 'Cleo', 'Dex', 'Echo', 'Finch', 'Gus', 'Hana',
  'Indie', 'Juno', 'Koa', 'Luca', 'Maya', 'Niko', 'Onyx', 'Pax',
  'Quinn', 'Rio', 'Sage', 'Tilly',
]

export function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function shuffle(arr) {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

export function splitIntoTeams(arr, numTeams) {
  const shuffled = shuffle(arr)
  const teams = Array.from({ length: numTeams }, () => [])
  shuffled.forEach((item, i) => teams[i % numTeams].push(item))
  return teams
}
