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

  try {
    
    const students = await Student.find(query);
    return res.status(200).json(students)

  } catch (error) {
    return res.status(500).json({message: "Server error. Please try again."})
  }
})

route.use('/register', require('./register'))
route.use('/church', require('./church'))

route.get('/:studentId', securedRoute, async (req, res) => {

  const { studentId } = req.params;
  try {
    const student = await Student.findById(studentId);
    return res.status(200).json(student)
  } catch (error) {
    return res.status(500).json({message: "There was a server error while grabbing the student info. Please try again."})
  }
})

module.exports = route;