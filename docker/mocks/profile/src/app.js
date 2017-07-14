'use strict';

var express = require('express')
var app = express()

app.get('/profiles/:userName', function (req, res) {
  if (req.params.userName === 'bob') {
    return res.json({ name: 'bob', isGood: false})
  }
  return res.json({ name: req.param.userName, isGood: true })
})

app.listen(3003, () => {
  console.log('Mock Profile listening on port 3003');
})

