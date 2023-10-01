const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
const path = require('path')
const Quote = require('./models/quote')
const methodOverride = require('method-override')

mongoose
  .connect('mongodb://127.0.0.1:27017/quotely-api')
  .then(() => {
    console.log('Mongo quotely-api connection open!')
  })
  .catch((err) => {
    console.log('Oh no mongo error!')
    console.log(err)
  })

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('hi this is the home page')
})

app.get('/quotes', async (req, res) => {
  const quotes = await Quote.find()
  res.json(quotes)
})

app.get('/quotes/new', (req, res) => {
  res.render('new')
})

app.get('/quotes/:id', async (req, res) => {
  const { id } = req.params
  const quote = await Quote.findById(id)
  res.json(quote)
})

app.get('/quotes/:id/edit', async (req, res) => {
  const { id } = req.params
  const quote = await Quote.findById(id)
  res.render('show edit form', { quote })
})

app.put('/quotes', (req, res) => {
  res.send('Process the edited data')
})

app.post('/quotes', async (req, res) => {
  const quote = new Quote(req.body)
  await quote.save()
  res.redirect(`/quotes/${quote._id}`)
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
