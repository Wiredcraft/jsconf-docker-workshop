'use strict'

const path = require('path')
const fs = require('fs')
const express = require('express')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const { dbHost, db, dbPort, port, env } = require('./config')

const app = express()

let peopleCount = 0
// Bootstrap models
if (dbHost && db) {
  fs.readdirSync(path.join(__dirname, './models'))
    .filter(file => ~file.search(/^[^\.].*\.js$/))
    .forEach(file => require(path.join(__dirname, './models', file)))
}

// Static files
app.use('/public', express.static(path.join(__dirname, './static')))
// Routes

app.use('/people/count', (req, res) => {
  const People = (dbHost && db) ? mongoose.model('People') : undefined
  switch (req.method) {
    case 'GET':
      if (People) {
        People.findOne().then(result => {
        if (!result) {
          return People.create({}).then(result => {
            res.status(200).json({ count: result.count })
          })
        }
        res.status(200).json({ count: result.count })
      })
      } else {
        res.status(200).json({ count: peopleCount })
      }
      break
    case 'POST':
      if (People) {
        People.findOneAndUpdate({}, { $inc: { count: 1 } }, { new: true }).then(result => {
        res.status(200).json({ count: result.count })
      })
      } else {
        peopleCount ++
        res.status(200).json({ count: peopleCount })
      }
  }
})
app.use('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, './static') })
})

// Connect MongoDB
if (dbHost && db) {
  mongoose.connect(`mongodb://${dbHost}:${dbPort}/${db}`, { useMongoClient: true })
  .on('error', console.log)
  .once('open', () => {
    app.listen(port, () => {
      console.log(`Listening on ${port}`)
    })
  })
} else {
  app.listen(port, () => {
    console.log(`Listening on ${port}`)
  })
}

