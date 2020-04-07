/**
 * 验证token
 */

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
const mongoose = require('mongoose')
const User = mongoose.model("User")
module.exports = passport => {
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    //console.log(jwt_payload);
    /**
     * { id: '5e8c1e0038af14053851bc8d',
          name: 'lg3',
          iat: 1586253126,
          exp: 1586256726 
        }
     */
    User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user)
          }
          return done(null, false)
        })
        .catch(err => {
          console.log(err);
        })
  }));
}
