const route = require('express').Router()

// returns students data
route.post('/', (req, res, next) => {
  return res.json('students')
});

module.exports = route;