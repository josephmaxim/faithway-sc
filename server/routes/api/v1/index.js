const route = require('express').Router()

route.use('/auth', require('./auth'));
route.use('/students', require('./students'));
route.use('/billeting', require('./billeting'));
route.use('/dashboard', require('./dashboard'));

module.exports = route;