const securedRoute = (req, res, next) => {
  if(!req.isAuthenticated()) return res.status(403).json({message: "Please Login"})
  return next()
}

module.exports = securedRoute