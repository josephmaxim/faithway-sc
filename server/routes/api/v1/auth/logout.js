const route = require('express').Router();

route.get('/',  async (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    return res.redirect('/login');
  });
});
 
module.exports = route;