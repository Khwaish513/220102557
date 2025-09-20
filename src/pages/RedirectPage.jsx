import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getUrl } from '../services/storage'
import { recordClick } from '../services/shortener'
import { getCoarseGeo } from '../services/analytics'
import { log } from '../middleware/logger'

export default function RedirectPage() {
  const { code } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const rec = getUrl(code)
    if (!rec) {
      log('REDIRECT_NOT_FOUND', { code })
      navigate('/')
      return
    }
    const expired = new Date(rec.expiresAt).getTime() <= Date.now()
    if (expired) {
      log('REDIRECT_EXPIRED', { code })
      navigate('/')
      return
    }
    const meta = {
      ts: new Date().toISOString(),
      referrer: document.referrer || null,
      geo: getCoarseGeo()
    }
    recordClick(code, meta)
    log('REDIRECT', { code, ...meta })
    window.location.href = rec.originalUrl
  }, [code, navigate])

  return null
}
