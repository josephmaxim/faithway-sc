const route = require('express').Router()
const securedRoute = require('#server/middleware/securedRoute.js')

// returns user data
route.get('/', (req, res, next) => {
  const userData = {...req.user?._doc}

  delete userData.password

  return res.json(userData)
});

route.use('/login', require('./login'));
route.use('/logout', require('./logout'));

module.exports = route;