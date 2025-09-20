const LOG_KEY = 'affordmed_logs_v1'

function readLogs() {
  try {
    return JSON.parse(localStorage.getItem(LOG_KEY)) || []
  } catch {
    return []
  }
}

function writeLogs(logs) {
  try {
    localStorage.setItem(LOG_KEY, JSON.stringify(logs))
  } catch (err) {
    console.error("Failed to write logs:", err)
  }
}

export function log(eventType, payload = {}) {
  const entry = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    eventType,
    payload,
    ts: new Date().toISOString()
  }
  const logs = readLogs()
  logs.push(entry)
  writeLogs(logs)
  return entry.id
}

export function getLogs(filter = null) {
  const logs = readLogs()
  if (!filter) return logs
  return logs.filter((l) => l.eventType === filter)
}

export function clearLogs() {
  writeLogs([])
}
