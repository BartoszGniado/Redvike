const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const auth = require('../auth/auth');
const User = require('../db/models/user');
const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
  try {
    const body = req.body;
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = new User({
      username: body.username,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).send('OK');
  } catch {
    res.status(500).send('ERROR');
  }
});

authRouter.post('/login', passport.authenticate('local'), (req, res) =>
  res.status(200).send('OK')
);

authRouter.post('/logout', (req, res) => {
  req.logOut();
  res.status(200).send('OK');
});

authRouter.get('/user', auth.checkAuthenticated, (req, res) => {
  res.send(req.user);
});

module.exports = authRouter;
