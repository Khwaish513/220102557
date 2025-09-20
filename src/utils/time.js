export function minutesFromNow(m) {
  const d = new Date()
  d.setMinutes(d.getMinutes() + (Number.isFinite(m) ? m : 30))
  return d
}

export function fmt(dt) {
  return new Date(dt).toLocaleString()
}
