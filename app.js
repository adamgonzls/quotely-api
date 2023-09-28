const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('hi this is the home page')
})

app.get('/quotes', (req, res) => {
  res.send('quotes here')
})

app.get('/quotes/new', (req, res) => {
  res.send('new quote form')
})

app.get('/quotes/:id', (req, res) => {
  const { id } = req.params
  res.send(`view quote ${id} here`)
})

app.get('/quotes/:id/edit', (req, res) => {
  const { id } = req.params
  res.send('show edit form')
})

app.put('/quotes', (req, res) => {
  res.send('Process the edited data')
})

app.post('/quotes', (req, res) => {
  res.send('Process the new quote data')
})

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`)
})
