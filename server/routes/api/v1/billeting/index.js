const route = require('express').Router()
const Billeting = require('#db/models/billetings.js');
const sendEmail = require('#server/lib/sendEmail.js')
const { billetingEmailTemplate }= require('#server/lib/emailTemplates.js');
const { isDev } = require('#utils/commons.js');
const securedRoute = require('#server/middleware/securedRoute.js');
const mongoose = require('mongoose')

route.post('/', async (req, res) => {

  const { church, primaryContact, phone, email, list, password } = req.body;

  if(password == '' || password != process.env.FORM_PASS) return res.status(403).json({message: "Invalid password. Please try again."})

  if(church == '' || primaryContact == '' || phone == '' || email == '') return res.status(401).json({
    message: "Please fill out the required fields."
  })

  let persons = Object.keys(list).reduce((personList, item) => {
    const data = list[item];
    const formatItemList = data.map((name) => {return {name, type: item.toUpperCase() }})
    personList = [...personList, ...formatItemList];
    return personList;
  }, [])

  try {
    const newBilleting = new Billeting({
      church,
      primaryContact,
      phone: parseInt(phone),
      email,
      persons
    })

    const savedBilleting = await newBilleting.save()

    //send email
    await sendEmail({
      from: "FaithWay Student Convention <faithway@plasmacreative.com>",
      to: email,
      cc: isDev ? "" : 'dlindhorst@faithway.org',
      bcc: isDev ? "" : 'faithway@plasmacreative.com',
      subject: `Billeting Confirmation (${church})`,
      html: billetingEmailTemplate({...req.body, _id: savedBilleting._id}),
      'h:Reply-To': 'dlindhorst@faithway.org',
    })

    return res.json(savedBilleting);

  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "There is an error on our end. please contact support."})
  }
})

route.get('/', securedRoute, async (req, res) => {
  
  const billetings = await Billeting.find().sort({date: -1});;
  
  return res.status(200).json(billetings)
})

route.get('/:billetId', securedRoute, async (req, res) => {

  const { billetId } = req.params;

  if(!mongoose.Types.ObjectId.isValid(billetId)) return res.status(400).json({message: "Not a valid id!"})
  
  const billet = await Billeting.findById(billetId)
  
  return res.status(200).json(billet)
})


module.exports = route;