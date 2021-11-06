const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const auth = require('../auth/auth');

exports.init = (passport) => {
  const authenticateUser = async (username, password, done) => {
    const user = await auth.getUser(username);
    console.log('login user');
    console.log(user);
    if (user == null) {
      return done(null, false, { message: 'No user with that username' });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new LocalStrategy({}, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.username));
  passport.deserializeUser(async (username, done) => {
    const user = await auth.getUser(username);
    return done(null, user);
  });
};
