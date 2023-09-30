const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
const Quote = require('./models/quote')

mongoose
  .connect('mongodb://127.0.0.1:27017/quotely-api')
  .then(() => {
    console.log('Mongo quotely-api connection open!')
  })
  .catch((err) => {
    console.log('Oh no mongo error!')
    console.log(err)
  })

app.get('/', (req, res) => {
  res.send('hi this is the home page')
})

app.get('/quotes', async (req, res) => {
  const quotes = await Quote.find()
  res.send(quotes)
  // res.send('quotes here')
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

app.post('/quotes', async (req, res) => {
  const newQuote = new Quote({
    author: 'Adam',
    quote: 'Hey how are ya',
    profession: 'Web Developer',
  })
  await newQuote.save()
  res.redirect(`/quotes/${newCampground._id}`)
  // res.send('Process the new quote data')
})

// async function addItem() {
//   const newQuote = new Quote({
//     // author: 'Adam',
//     // quote: 'Hey how are ya',
//     // profession: 'Web Developer',
//     author: 'Jojo',
//     quote: 'Where is that key?',
//     profession: 'HR Specialist',
//   })
//   await newQuote.save()
// }
// addItem().then(() => {
//   mongoose.connection.close()
// })

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`)
})
