const route = require('express').Router()
const sendEmail = require('#server/lib/sendEmail.js')
const { studentRegistrationEmailTemplate }= require('#server/lib/emailTemplates.js');
const Student = require('#db/models/students.js');
const { isDev, sanitizeInput } = require('#utils/commons.js');

// returns students data
route.post('/', async (req, res, next) => {
  const { fullName, gender, church, grade, email, selectedEvents, mathGrade, password } = req.body;

  if(password == '' || password != process.env.FORM_PASS) return res.status(403).json({message: "Invalid password. Please try again."})

  if(fullName == '' || gender == '' || church == '' || grade == '' || email == '') return res.status(400).json({ message: "One of the required fields are empty. Please try again."})

  const events = selectedEvents.map((i) => {return {
    value: i,
    totalPoints: 0
  }})

  // TODO: save to database...
  const newStudent = new Student({
    fullName: sanitizeInput(fullName),
    gender: gender,
    church: sanitizeInput(church),
    grade: grade,
    email: sanitizeInput(email),
    events: events,
    mathGrade: mathGrade != '' ? parseInt(mathGrade) : 0
  })

  const savedStudent = await newStudent.save()

  //send email
  await sendEmail({
    from: "FaithWay Student Convention <faithway@plasmacreative.com>",
    to: email,
    cc: isDev ? "" : 'dlindhorst@faithway.org',
    bcc: isDev ? "" : 'faithway@plasmacreative.com',
    subject: `Registration (${fullName})`,
    html: studentRegistrationEmailTemplate({...req.body, _id: savedStudent._id}),
    'h:Reply-To': 'dlindhorst@faithway.org',
  })

  return res.json(req.body)
});

module.exports = route;