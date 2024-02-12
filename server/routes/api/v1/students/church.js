const route = require('express').Router()
const Student = require('#db/models/students.js')
const securedRoute = require('#server/middleware/securedRoute.js')

route.get('/', securedRoute, async (req, res) => {
  
  const churches = await Student.distinct("church");
  
  return res.status(200).json(churches)
})

module.exports = route;