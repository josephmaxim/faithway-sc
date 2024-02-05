const mongoose = require('mongoose')
const Schema = mongoose.Schema

const billetingSchema = new Schema({
  church: {type: String, default: ""},
  primaryContact: {type: String, default: ""},
  phone: {type: Number, default: 0},
  email: {type: String, default: ""},
  persons: [
    {
      name: {type: String, default: ""},
      type: {type: String, enum: ['FEMALE', 'MALE', 'SPONSORS'], default: ""}
    }
  ],
  date: {type: Date, default: Date.now}
})

module.exports = mongoose.model('billeting', billetingSchema)