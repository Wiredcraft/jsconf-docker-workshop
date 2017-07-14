'use strict';

var express = require('express')
var app = express()

app.get('/profiles/:userName', function (req, res) {
  // Bob is a bad guy 
  if (req.params.userName === 'bob') {
    return res.json({ name: 'bob', isGood: false})
  }
  return res.json({ name: req.params.userName, isGood: true })
})

app.listen(3007, () => {
  console.log('Mock Profile listening on port 3007');
})

