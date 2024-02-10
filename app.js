require('dotenv').config()
const express = require('express')
const next = require('next')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')

const { isDev, urlHost } = require('#utils/commons.js')
const env = process.env
const app = next({ dev: isDev })
const handle = app.getRequestHandler()
const connectToDatabase = require('./db/index')
const User = require('#db/models/users.js')
const localAuthStrategy = require('#server/lib/localAuthStrategy.js')
const securedPages = require('#utils/securedPages.js')

const routes = require('./server/routes')

app.prepare()
.then(async() => {
  const server = express()

  await connectToDatabase();

  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));
  server.use(cookieParser())

  server.use(session({
    secret: env.SESSION_SECRET,
    resave: true,
    proxy: true,
    saveUninitialized: false,
    cookie:{
      maxAge: 1000 * 60 * 60 * 24 * 15,
      // sameSite: true,
      secure: isDev ? false : true,
      httpOnly: true,
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    })
  }));

  server.use((req, res, next) => {
    res.set('credentials', 'include');
    res.set('Access-Control-Allow-Credentials', true);
    res.set('Access-Control-Allow-Origin', urlHost);
    res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    return next();
  });

  server.use(passport.initialize());
  server.use(passport.session());
  passport.use(localAuthStrategy);
  passport.serializeUser((user, done) => {done(null, user._id)})
  passport.deserializeUser(async (id, done) => {done (null, await User.findById(id).select('-__v'))}) 

  server.use(routes)

  server.get('*', (req, res) => {
    const {path} = req
    const redirectPath = urlHost + req.url;

    if(securedPages.includes(path) && !req.isAuthenticated()) return res.redirect(302, `/login?redirect=${encodeURIComponent(redirectPath)}`)
    if(path == '/login' && req.isAuthenticated()) return res.redirect(302, '/dashboard')
    return handle(req, res)
  })

  server.listen(env.PORT, (err) => {
    if (err) throw err
    console.log(`> Ready on ${urlHost}`)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})