import React from 'react'
import { Card, CardContent, Typography, Chip, Stack } from '@mui/material'
import { fmt } from '../utils/time'

export default function ShortUrlList({ items }) {
  if (!items?.length) return null
  return (
    <Stack spacing={2} sx={{ mt: 2 }}>
      {items.map((r) => (
        <Card key={r.code} variant="outlined">
          <CardContent>
            <Typography variant="h6" sx={{ mb: 1 }}>{window.location.origin}/{r.code}</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>→ {r.originalUrl}</Typography>
            <Stack direction="row" spacing={1}>
              <Chip label={`Created: ${fmt(r.createdAt)}`} />
              <Chip label={`Expires: ${fmt(r.expiresAt)}`} />
              <Chip label={`Clicks: ${r.clicks.length}`} />
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  )
}
