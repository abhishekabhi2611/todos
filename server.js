const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')

const items = require('./Routes/api/Items')

const app = express()

app.use(bodyParser.json())

const db = require('./config/keys').mongoURI

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('MongoDB Connected Successfully')
  })
  .catch((err) => {
    console.error(err)
  })

app.use('/api/items', items)

// Serve static Assets for Production

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`server started at post ${port}`)
})
