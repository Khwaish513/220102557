import React from 'react'
import { allUrls } from '../services/storage'
import { fmt } from '../utils/time'
import { Card, CardContent, Typography, Divider, Stack, Chip } from '@mui/material'

export default function StatsPage() {
  const urls = allUrls()
  return (
    <div>
      <Typography variant="h4" sx={{ mb: 2 }}>URL Shortener Statistics</Typography>
      <Stack spacing={2}>
        {urls.map((u) => (
          <Card key={u.code} variant="outlined">
            <CardContent>
              <Typography variant="h6">{window.location.origin}/{u.code}</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>→ {u.originalUrl}</Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                <Chip label={`Created: ${fmt(u.createdAt)}`} />
                <Chip label={`Expires: ${fmt(u.expiresAt)}`} />
                <Chip label={`Clicks: ${u.clicks.length}`} />
              </Stack>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle1">Clicks</Typography>
              {u.clicks.length === 0 ? (
                <Typography variant="body2">No clicks yet.</Typography>
              ) : (
                <Stack spacing={0.5}>
                  {u.clicks.map((c, i) => (
                    <Typography key={i} variant="body2">
                      {i + 1}. {fmt(c.ts)} • referrer: {c.referrer || 'direct'} • {c.geo?.timezone || ''} {c.geo?.lang ? `• ${c.geo.lang}` : ''}
                    </Typography>
                  ))}
                </Stack>
              )}
            </CardContent>
          </Card>
        ))}
      </Stack>
    </div>
  )
}
