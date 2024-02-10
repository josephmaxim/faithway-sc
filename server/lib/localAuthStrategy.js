const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')
const User = require('#db/models/users.js')

const localStrategy = new LocalStrategy({usernameField:"email", passwordField:"password"},async (email, password, done) =>  {
  try {
    const user = await User.findOne({email})
    if (!user) return done(null, false, {message: 'No user by that email'})

    // verify password
    if(!await bcrypt.compare(password, user.password)) return done(null, false, {message: 'Not a matching password'})

    return done(null, user);

  } catch (error) {
    return done(error);
  }
});

module.exports = localStrategy