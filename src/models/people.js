'use strict'

const mongoose = require('mongoose')
const { Schema } = mongoose

const peopleSchema = new Schema({
  count: { type: Number, default: 0 }
})

mongoose.model('People', peopleSchema)