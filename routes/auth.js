const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const auth = require('../auth/auth');
const User = require('../db/models/user');
const authRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 */

/**
 * @swagger
 * /register:
 *  post:
 *    summary: create new user
 *    tags: [Auth]
 *    requestBody:
 *       content:
 *        application/json:
 *           schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Bad Request
 *      409:
 *        description: User exist
 *      500:
 *        description: ERROR
 *
 */
authRouter.post('/register', async (req, res) => {
  try {
    const body = req.body;
    if (!body || !body.username || !body.password) {
      return res.status(400).send('Bad Request');
    }
    const userExist = await User.find({ username: body.username });
    if (userExist.length) {
      return res.status(409).send('User exist');
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = new User({
      username: body.username,
      password: hashedPassword,
    });
    await user.save();
    return res.status(201).send('Created');
  } catch {
    return res.status(500).send('ERROR');
  }
});

/**
 * @swagger
 * /login:
 *  post:
 *    summary: login
 *    tags: [Auth]
 *    requestBody:
 *       content:
 *        application/json:
 *           schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: OK
 *      401:
 *        description: Unauthorized
 *
 */
authRouter.post('/login', passport.authenticate('local'), (req, res) =>
  res.status(200).send('OK')
);

/**
 * @swagger
 * /logout:
 *  post:
 *    summary: logout
 *    tags: [Auth]
 *    responses:
 *      200:
 *        description: OK
 *
 */
authRouter.post('/logout', (req, res) => {
  req.logOut();
  res.status(200).send('OK');
});

/**
 * @swagger
 * /user:
 *  get:
 *    summary: get current logged in user info
 *    tags: [Auth]
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/ExtUser'
 *      401:
 *        description: Unauthorized
 *
 */
authRouter.get('/user', auth.checkAuthenticated, (req, res) => {
  res.send(req.user);
});

module.exports = authRouter;
