require('dotenv').config();
const connectToDatabase = require('#db/index.js')
const bcrypt = require('bcryptjs')
const User = require('#db/models/users.js')

console.log(process.env.DB_HOST)

async function initUsers(){

  const userList = [
    {
      fullName: "Debra Lindhorst",
      email: 'dlindhorst@faithway.org',
      password: 'Godi$love@1'
    },
    {
      fullName: "Ray Aquino",
      email: 'familyaquino@rogers.com',
      password: 'Godi$love@2'
    },
    {
      fullName: "Joseph Maxim",
      email: 'joseph@plasmacreative.com',
      password: 'Godi$love@3'
    }
  ];

  await connectToDatabase();

  userList.map(async (user) => {
    
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(user.password, salt);

    const isExist = await User.findOne({email: user.email});

    if(isExist) return user;

    const newUser = new User({
      ...user,
      password,
      permissions: ['admin']
    })

    await newUser.save();
  })
}

initUsers();