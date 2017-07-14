'use strict'

const path = require('path')
const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const { port } = require('./config')
const PplModel = require('../src/models/people');
const profile = require('../src/lib/profile')

const app = express()
// parse application/json
app.use(bodyParser.json())

// Static files
app.use('/public', express.static(path.join(__dirname, './static')))
// Routes
app.use('/people/count', (req, res) => {
  switch (req.method) {
    case 'GET':
      PplModel.find().then(body => {
        res.status(200).json(body)
      })
      break
    case 'POST':
      verify(req.body.name).then(isGood => {
        if (!isGood) {
          return res.status(403).end()
        }
        PplModel.update().then(body => {
          res.status(200).json(body)
        })
      })
  }
})

function verify(name) {
  return profile.getProfile(name).then(user => {
    return user && user.isGood
  })
}
app.use('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, './static') })
})


PplModel.boot(() => {
  app.listen(port, () => {
    console.log(`Listening on ${port}`)
  })
})

module.exports = app;
