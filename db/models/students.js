const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require("node:crypto")

const studentSchema = new Schema({
  fullName: {type: String, default: ""},
  gender: {type: String, default: ""},
  church: {type: String, default: ""},
  grade: {type: Number, default: 0},
  email: {type: String, default: ""},
  events: [
    {
      value: {type: String, default: ""},
      totalPoints: {type: Number, default: 0} 
    }
  ],
  mathGrade: {type: Number, default: 0},
  date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('student', studentSchema)