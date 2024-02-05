const route = require('express').Router()

route.use('/auth', require('./auth'));
route.use('/student', require('./student'));
route.use('/billeting', require('./billeting'));

module.exports = route;