import { upsertUrl, getUrl } from './storage'
import { log } from '../middleware/logger'
import { minutesFromNow } from '../utils/time'

const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

function randomCode(len = 6) {
  let out = ''
  for (let i = 0; i < len; i++) out += ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
  return out
}

function isValidCode(code) {
  return /^[a-zA-Z0-9]{3,20}$/.test(code)
}

export function ensureUniqueCode(preferred) {
  let code = preferred && isValidCode(preferred) ? preferred : randomCode()
  while (getUrl(code)) code = randomCode()
  return code
}

export function createShortUrl({ originalUrl, validityMinutes = 30, preferredCode }) {
  const code = ensureUniqueCode(preferredCode)
  const now = new Date()
  const expiresAt = minutesFromNow(validityMinutes)

  const record = {
    code,
    originalUrl,
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
    clicks: []
  }

  upsertUrl(code, record)
  log('URL_CREATED', { code, originalUrl, validityMinutes })
  return record
}

export function recordClick(code, meta) {
  const rec = getUrl(code)
  if (!rec) return null
  rec.clicks.push(meta)
  upsertUrl(code, rec)
}

export function hasExpired(rec) {
  return new Date(rec.expiresAt).getTime() <= Date.now()
}
