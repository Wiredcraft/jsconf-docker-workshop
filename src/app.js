'use strict'

const path = require('path')
const fs = require('fs')
const express = require('express')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const { dbHost, db, dbPort, port, env } = require('./config')

const app = express()

// Bootstrap models
fs.readdirSync(path.join(__dirname, './models'))
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(path.join(__dirname, './models', file)))

// Static files
app.use('/public', express.static(path.join(__dirname, './static')))
// Routes
app.use('/people/count', (req, res) => {
  const People = mongoose.model('People')
  switch (req.method) {
    case 'GET':
      People.findOne().then(result => {
        if (!result) {
          return People.create({}).then(result => {
            res.status(200).json({ count: result.count })
          })
        }
        res.status(200).json({ count: result.count })
      })
      break
    case 'POST':
      People.findOneAndUpdate({}, { $inc: { count: 1 } }, { new: true }).then(result => {
        res.status(200).json({ count: result.count })
      })
  }
})
app.use('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, './static') })
})

// Connect MongoDB
mongoose.connect(`mongodb://${dbHost}:${dbPort}/${db}`, { useMongoClient: true })
  .on('error', console.log)
  .once('open', () => {
    app.listen(port, () => {
      console.log(`Listening on ${port}`)
    })
  })
