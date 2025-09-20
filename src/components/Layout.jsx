import React from 'react'
import { AppBar, Box, Container, CssBaseline, Toolbar, Typography, Button } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { Link as RouterLink } from 'react-router-dom'
import theme from '../theme'

export default function Layout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Affordmed URL Shortener</Typography>
          <Button component={RouterLink} to="/" color="inherit">Shorten</Button>
          <Button component={RouterLink} to="/stats" color="inherit">Statistics</Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ py: 4 }}>
        <Container maxWidth="md">{children}</Container>
      </Box>
    </ThemeProvider>
  )
}
