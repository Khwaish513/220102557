import React, { useState } from 'react'
import { Button, Typography, Paper, Box, Stack } from '@mui/material'
import UrlInputRow from '../components/UrlInputRow'
import ShortUrlList from '../components/ShortUrlList'
import { urlItemSchema } from '../utils/schema'
import { createShortUrl } from '../services/shortener'
import { log } from '../middleware/logger'

export default function ShortenerPage() {
  // Start with just 1 row
  const [rows, setRows] = useState([
    { originalUrl: '', validityMinutes: 30, preferredCode: '' }
  ])
  const [errors, setErrors] = useState([])
  const [results, setResults] = useState([])

  // Update row values
  const onChange = (idx, value) => {
    const next = [...rows]
    next[idx] = value
    setRows(next)
  }

  // Validate all rows
  async function validateAll() {
    const errs = []
    for (let i = 0; i < rows.length; i++) {
      try {
        await urlItemSchema.validate(rows[i], { abortEarly: false })
        errs[i] = {}
      } catch (e) {
        const errObj = {}
        e?.inner?.forEach((er) => { errObj[er.path] = er.message })
        errs[i] = errObj
      }
    }
    setErrors(errs)
    return errs.every((x) => Object.keys(x).length === 0)
  }

  // Handle Shorten Button
  const handleShorten = async () => {
    const ok = await validateAll()
    if (!ok) {
      log('VALIDATION_FAILED', { rows })
      return
    }
    const created = []
    rows.forEach((r) => {
      if (r.originalUrl) {
        created.push(createShortUrl({
          originalUrl: r.originalUrl,
          validityMinutes: Number(r.validityMinutes) || 30,
          preferredCode: r.preferredCode || undefined
        }))
      }
    })
    setResults(created)
  }

  // Add new row (max 5)
  const handleAddRow = () => {
    if (rows.length < 5) {
      setRows([...rows, { originalUrl: '', validityMinutes: 30, preferredCode: '' }])
    }
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>URL Shortener</Typography>
      <Paper sx={{ p: 2 }}>
        {rows.map((_, i) => (
          <UrlInputRow key={i} idx={i} values={rows} errors={errors} onChange={onChange} />
        ))}
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button variant="contained" onClick={handleShorten}>Shorten URLs</Button>
          <Button variant="outlined" onClick={handleAddRow} disabled={rows.length >= 5}>
            Add Another URL
          </Button>
        </Stack>
      </Paper>
      <ShortUrlList items={results} />
    </Box>
  )
}
