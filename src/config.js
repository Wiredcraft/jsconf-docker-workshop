'use strict'

exports.env = process.env.NODE_ENV || 'development'

exports.dbHost = process.env.DB_HOST
exports.db = process.env.DB
exports.dbPort = parseInt(process.env.DB_PORT, 10) || 27017

exports.port = parseInt(process.env.PORT, 10) || 3000
