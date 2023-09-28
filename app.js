const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.get('/quotes', (req, res) => {
  res.send('quotes here')
})

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`)
})
