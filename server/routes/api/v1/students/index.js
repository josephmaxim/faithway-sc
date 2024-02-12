const route = require('express').Router()
const Student = require('#db/models/students.js')
const securedRoute = require('#server/middleware/securedRoute.js')

route.get('/', securedRoute, async (req, res) => {

  const { gender, grade, church, event } = req.query;

  let query = {}

  if(gender) query['gender'] = gender;
  if(grade) query['grade'] = grade;
  if(church) query['church'] = church;
  if(event) query['events.value'] = event;
  
  const students = await Student.find(query);
  
  return res.status(200).json(students)
})

route.use('/register', require('./register'))
route.use('/church', require('./church'))

module.exports = route;