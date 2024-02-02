const route = require('express').Router()
const sendEmail = require('#server/lib/sendEmail.js')
const { studentRegistrationEmailTemplate }= require('#server/lib/emailTemplates.js');

// returns students data
route.post('/', async (req, res, next) => {
  const { fullName, gender, church, grade, email } = req.body;
  if(fullName == '' || gender == '' || church == '' || grade == '' || email == '') return res.status(400).json({
    message: "One of the required fields are empty. Please try again."
  })

  // TODO: save to database...

  // send email
  await sendEmail({
    from: "FaithWay Student Convention <faithway@plasmacreative.com>",
    to: email,
    cc: 'dlindhorst@faithway.org',
    bcc: ['faithway@plasmacreative.com', 'familyaquino@rogers.com'],
    subject: `Registration (${fullName})`,
    html: studentRegistrationEmailTemplate(req.body),
    'h:Reply-To': 'dlindhorst@faithway.org',
  })

  return res.json(req.body)
});

module.exports = route;