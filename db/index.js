const mongoose = require('mongoose')
const env = process.env
const dev = process.env.NODE_ENV !== 'production'

const connectToDatabase = async () => {
  try {
    const connectionString = `mongodb://${env.DB_USER}:${env.DB_PASS}@${!dev ? env.DB_HOST : `127.0.0.1` }:27017/faithwaysc`


    console.log(connectionString)
    await mongoose.connect(connectionString)

    console.log(`Connected to database 👍`)
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectToDatabase