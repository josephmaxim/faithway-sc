const route = require('express').Router()

route.use('/register', require('./register'))

module.exports = route;