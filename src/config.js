'use strict'

exports.env = process.env.NODE_ENV || 'development'

exports.dbHost = process.env.DB_HOST || 'localhost'
exports.db = process.env.DB || 'test'
exports.dbPort = parseInt(process.env.DB_PORT, 10) || 27017

exports.port = parseInt(process.env.PORT, 10) || 3000
