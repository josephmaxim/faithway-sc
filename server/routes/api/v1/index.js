const route = require('express').Router()

route.use('/auth', require('./auth'));
route.use('/students', require('./students'));
route.use('/billeting', require('./billeting'));

module.exports = route;