const route = require('express').Router()
const passport = require('passport');

route.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    if (! user) {
      return res.status(401).send(info);
    }

    req.login(user, function(err){
      if(err){
        return next(err);
      }
      return res.status(200).send({message: 'Authentication succeeded'});        
    });
  })(req, res, next);
});

module.exports = route