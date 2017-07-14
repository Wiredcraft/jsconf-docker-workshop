'use strict'

const mongoose = require('mongoose')
const { Schema } = mongoose

const peopleSchema = new Schema({
  count: { type: Number, default: 0 }
})

const { dbHost, db, dbPort, port, env } = require('../config')
let peopleCount = 0
let People;
function isMonngoDBEnable() {
  return dbHost && db
}
exports.boot = (callback) => {
  // Connect MongoDB
  if (!isMonngoDBEnable()) {
    return callback()
  }
  mongoose.model('People', peopleSchema)
  People = mongoose.model('People')
  mongoose.connect(`mongodb://${dbHost}:${dbPort}/${db}`, { useMongoClient: true })
  .on('error', console.log)
  .once('open', () => {
    callback()
  });
};

exports.find = () => {
  if (!isMonngoDBEnable()) {
    return Promise.resolve({ count: peopleCount })
  }
  return People.findOne().then(result => {
    if (!result) {
      return People.create({}).then(result => {
        return { count: result.count }
      })
    }
    return { count: result.count }
  })
}

exports.update = () => {
  if (!isMonngoDBEnable()) {
    peopleCount ++
    return Promise.resolve({ count: peopleCount })
  }
  return People.findOneAndUpdate({}, { $inc: { count: 1 } }, { new: true }).then(result => {
    return { count: result.count }
  })
}

exports.removeAll = () => {
  if (!isMonngoDBEnable()) {
    peopleCount = 0
    return Promise.resolve()
  }
  return People.remove({})
}
                   
exports.reset = () => {
  if (!isMonngoDBEnable()) {
    peopleCount = 0
    return Promise.resolve();
  }
  return People.remove({});
}
