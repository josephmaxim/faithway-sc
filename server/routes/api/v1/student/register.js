const route = require('express').Router()
const sendEmail = require('#server/lib/sendEmail.js')
const { studentRegistrationEmailTemplate }= require('#server/lib/emailTemplates.js');
const Student = require('#db/models/students.js');

// returns students data
route.post('/', async (req, res, next) => {
  const { fullName, gender, church, grade, email, selectedEvents, mathGrade } = req.body;
  if(fullName == '' || gender == '' || church == '' || grade == '' || email == '') return res.status(400).json({
    message: "One of the required fields are empty. Please try again."
  })

  const events = selectedEvents.map((i) => {return {
    value: i,
    totalPoints: 0
  }})

  // TODO: save to database...
  const newStudent = new Student({
    fullName,
    gender,
    church,
    grade,
    email,
    events,
    mathGrade: mathGrade != '' ? parseInt(mathGrade) : 0
  })

  const savedStudent = await newStudent.save()

  // send email
  // await sendEmail({
  //   from: "FaithWay Student Convention <faithway@plasmacreative.com>",
  //   to: email,
  //   cc: 'dlindhorst@faithway.org',
  //   bcc: ['faithway@plasmacreative.com', 'familyaquino@rogers.com'],
  //   subject: `Registration (${fullName})`,
  //   html: studentRegistrationEmailTemplate({...req.body, _id: savedStudent._id}),
  //   'h:Reply-To': 'dlindhorst@faithway.org',
  // })

  return res.json(req.body)
});

module.exports = route;