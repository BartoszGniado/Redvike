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
 *      500:
 *        description: ERROR
 *
 */
authRouter.post('/register', async (req, res) => {
  try {
    const body = req.body;
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = new User({
      username: body.username,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).send('Created');
  } catch {
    res.status(500).send('ERROR');
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
