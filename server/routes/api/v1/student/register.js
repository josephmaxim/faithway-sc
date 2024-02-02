const route = require('express').Router()

// returns students data
route.post('/', (req, res, next) => {
  console.log(req.body)
  return res.json(req.body)
});

module.exports = route;