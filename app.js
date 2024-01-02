require('dotenv').config()
const express = require('express')
const next = require('next')

const { isDev, urlHost } = require('#utils/commons.js')
const env = process.env
const app = next({ dev: isDev })
const handle = app.getRequestHandler()


app.prepare()
.then(async() => {
  const server = express()

  server.use((req, res, next) => {
    res.set('credentials', 'include');
    res.set('Access-Control-Allow-Credentials', true);
    res.set('Access-Control-Allow-Origin', urlHost);
    res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    return next();
  });


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