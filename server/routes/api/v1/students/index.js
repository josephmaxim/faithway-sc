const route = require('express').Router()
const Student = require('#db/models/students.js')
const securedRoute = require('#server/middleware/securedRoute.js')

route.get('/', securedRoute, async (req, res) => {

  const { gender, grade } = req.query;
  
  const students = await Student.find();
  
  return res.status(200).json(students)
})

route.use('/register', require('./register'))

module.exports = route;