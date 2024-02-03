require('dotenv').config()
const express = require('express')
const next = require('next')
const cookieParser = require('cookie-parser')

const { isDev, urlHost } = require('#utils/commons.js')
const env = process.env
const app = next({ dev: isDev })
const handle = app.getRequestHandler()
const connectToDatabase = require('./db/index')

const routes = require('./server/routes')

app.prepare()
.then(async() => {
  const server = express()

  await connectToDatabase();

  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));
  server.use(cookieParser())

  server.use((req, res, next) => {
    res.set('credentials', 'include');
    res.set('Access-Control-Allow-Credentials', true);
    res.set('Access-Control-Allow-Origin', urlHost);
    res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    return next();
  });

  server.use(routes)

  server.get('*', (req, res) => {
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