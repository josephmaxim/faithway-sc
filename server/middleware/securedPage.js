const { urlHost } = require('#utils/commons.js')

const securedPage = (req, res, next) => {
  const {path} = req
  const redirectPath = urlHost + req.url;
  if(!req.isAuthenticated()) return res.redirect(302, `/login?redirect=${encodeURIComponent(redirectPath)}`)
  return next()
}

module.exports = securedPage;