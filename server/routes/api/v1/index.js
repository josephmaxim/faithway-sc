const route = require('express').Router()

route.use('/auth', require('./auth'));
route.use('/student', require('./student'));

module.exports = route;