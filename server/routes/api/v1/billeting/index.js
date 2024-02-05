const route = require('express').Router()
const Billeting = require('#db/models/billetings.js');

route.post('/', async (req, res) => {

  const { church, primaryContact, phone, email, list } = req.body;

  if(church == '' || primaryContact == '' || phone == '' || email == '') return res.status(401).json({
    message: "Please fill out the required fields."
  })

  console.log(req.body)

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

    // TODO: send email

    return res.json(savedBilleting);

  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "There is an error on our end. please contact support."})
  }
})

module.exports = route;