'use strict'

const path = require('path')
const fs = require('fs')
const express = require('express')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const { dbHost, db, dbPort, port, env } = require('./config')
const PplModel = require('../src/models/people');

const app = express()

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
      PplModel.update().then(body => {
        res.status(200).json(body)
      });
  }
})
app.use('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, './static') })
})


PplModel.boot(() => {
  app.listen(port, () => {
    console.log(`Listening on ${port}`)
  })
})

module.exports = app;
