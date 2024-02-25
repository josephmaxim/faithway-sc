const route = require('express').Router()
const Student = require('#db/models/students.js')
const Billeting = require('#db/models/billetings.js');
const securedRoute = require('#server/middleware/securedRoute.js')

route.get('/', securedRoute, async (req, res) => {

  let data = {
    studentCount: 0,
    totalNumberEvents: 0,
    billetingCount: 0,
    totalBilletPersons: 0,
  }
  
  try {

    // Number of Students
    data['studentCount'] = await Student.countDocuments({status : {$ne: 'deleted'}})

    // Number of events
    const eventsCount = await Student.aggregate([
      { $project: { eventsCount: { $size: "$events" } } },
      { $group: { _id: null, totalEventsCount: { $sum: "$eventsCount" } } }
    ])

    data['totalNumberEvents'] = eventsCount[0].totalEventsCount

    // Total Billeting count
    data['billetingCount'] = await Billeting.countDocuments()

    // total persons in billeting
    const personsBilletCount = await Billeting.aggregate([
      { $project: { personsCount: { $size: "$persons" } } },
      { $group: { _id: null, totalPersonsCount: { $sum: "$personsCount" } } }
    ])
    data['totalBilletPersons'] = personsBilletCount[0].totalPersonsCount

    return res.status(200).json(data)

  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "There was a problem with the server."})
  }
  
})

module.exports = route;