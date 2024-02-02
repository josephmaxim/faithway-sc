const route = require('express').Router()

route.use('/api/v1', require('./api/v1'))

module.exports = route;