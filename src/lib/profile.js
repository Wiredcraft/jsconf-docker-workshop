'use strict';

const rp = require('request-promise')
const { profileService }  = require('../config')

exports.getProfile = (userName) => {
  const options = {
    uri: `${profileService}/profiles/${userName}`,
    method: 'GET',
    json: true
  }
  return rp(options)
}
