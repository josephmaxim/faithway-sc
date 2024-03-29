const route = require('express').Router()
const Student = require('#db/models/students.js')
const securedRoute = require('#server/middleware/securedRoute.js');
const { sanitizeInput } = require('#utils/commons.js');
const mongoose = require('mongoose');


route.get('/', securedRoute, async (req, res) => {

  const { gender, grade, church, event } = req.query;

  let query = {}

  if(gender) query['gender'] = gender;
  if(grade) query['grade'] = grade;
  if(church) query['church'] = church;
  if(event) query['events.value'] = event;

  query['status'] = { $ne: 'deleted' }

  try {
    
    const students = await Student.find(query).sort({date: -1});
    return res.status(200).json(students)

  } catch (error) {
    return res.status(500).json({message: "Server error. Please try again."})
  }
})

route.use('/register', require('./register'))
route.use('/church', require('./church'))

route.get('/:studentId', securedRoute, async (req, res) => {

  const { studentId } = req.params;

  if(!mongoose.Types.ObjectId.isValid(studentId)) return res.status(400).json({message: "Not a valid id!"})

  try {
    const student = await Student.findById(studentId);
    return res.status(200).json(student)
  } catch (error) {
    return res.status(500).json({message: "There was a server error while grabbing the student info. Please try again."})
  }
})

route.put('/:studentId',securedRoute, async (req, res) => {
  const { studentId } = req.params;
  const { fullName, grade, gender, church } = req.body;

  if(fullName == '' || grade == 0 || gender == '' || church == '') return res.status(401).json({message: "All fields can't be empty."})

  try {
    const updatedStudent = await Student.findOneAndUpdate({_id: studentId}, {$set: {
      fullName: sanitizeInput(fullName),
      gender: gender,
      church: sanitizeInput(church),
      grade: grade, 
    } }, {new: true, useFindAndModify: false});

    if(updatedStudent) return res.status(200).json(updatedStudent);
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "There was a problem on our end. please try again."})
  }

})

route.put('/:studentId/delete', securedRoute, async (req, res, next) => {

  let { studentId } = req.params
  const { password } = req.body;

  if(password !== process.env.FORM_PASS) return res.status(403).json({message: "Please enter the form submission password."})

  try {

    const updatedStudent = await Student.findOneAndUpdate({_id: studentId}, {$set: {
      status: 'deleted'
    } }, {new: true, useFindAndModify: false});
   

    if(updatedStudent) return res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).send({error: "Something went wrong. Please contact JM."});
    console.log(error);
  }
});

route.put('/:studentId/edit-event/:eventKey', securedRoute, async (req, res, next) => {

  let { studentId, eventKey } = req.params
  const { value } = req.body;

  console.log(studentId, eventKey, value)

  try {

    const updatedStudent = await Student.findOneAndUpdate({_id: studentId}, {$set: {
      [`events.${eventKey}.totalPoints`] : parseInt(value)
    } }, {new: true, useFindAndModify: false});
   

    if(updatedStudent) return res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).send({error: "Something went wrong. Please contact JM."});
    console.log(error);
  }
});

route.post('/:studentId/delete-event/:eventId', securedRoute, async (req, res, next) => {

  let { studentId, eventId } = req.params

  try {

    const updatedStudent = await Student.findOneAndUpdate({_id: studentId}, { $pull: {events: {_id: eventId}}}, {new: true, useFindAndModify: false});
   

    if(updatedStudent) return res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).send({error: "Something went wrong. Please contact JM."});
    console.log(error);
  }
});


route.post('/:studentId/add-event', securedRoute, async (req, res, next) => {

  let { studentId } = req.params;
  const { event, mathEvent } = req.body;

  try {

    const updatedStudent = await Student.findOneAndUpdate({_id: studentId}, { $push: { events: {value: event, totalPoints: 0} }, $set: {mathGrade: mathEvent ? parseInt(mathEvent) : 0} }, {new: true, useFindAndModify: false});
   

    if(updatedStudent) return res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).send({error: "Something went wrong. Please contact JM."});
    console.log(error);
  }
});

module.exports = route;