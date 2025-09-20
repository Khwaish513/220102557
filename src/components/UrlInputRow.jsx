import React from 'react'
import { Grid, TextField } from '@mui/material'

export default function UrlInputRow({ idx, values, errors, onChange }) {
  const v = values[idx] || { originalUrl: '', validityMinutes: 30, preferredCode: '' }
  const e = errors[idx] || {}

  const handle = (field) => (ev) => onChange(idx, { ...v, [field]: ev.target.value })

  return (
    <Grid container spacing={2} sx={{ mb: 1 }}>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Original URL"
          placeholder="https://example.com"
          value={v.originalUrl}
          onChange={handle('originalUrl')}
          error={!!e.originalUrl}
          helperText={e.originalUrl || ''}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          label="Validity (minutes)"
          value={v.validityMinutes}
          onChange={handle('validityMinutes')}
          error={!!e.validityMinutes}
          helperText={e.validityMinutes || 'Defaults to 30'}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          label="Preferred shortcode"
          value={v.preferredCode}
          onChange={handle('preferredCode')}
          error={!!e.preferredCode}
          helperText={e.preferredCode || ''}
        />
      </Grid>
    </Grid>
  )
}
