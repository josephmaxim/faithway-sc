const route = require('express').Router()
const Student = require('#db/models/students.js')
const securedRoute = require('#server/middleware/securedRoute.js')

route.get('/', securedRoute, async (req, res) => {
  
  try {

    const churches = await Student.distinct("church", {status: {$ne: 'deleted'}});
    return res.status(200).json(churches)

  } catch (error) {
    return res.status(500).json({message: "There was a problem with the server."})
  }
  
})

module.exports = route;