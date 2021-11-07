const express = require('express');
const csvParser = require('../scripts/csv-parser');
const csvRouter = express.Router();
const { checkAuthenticated } = require('../auth/auth');

/**
 * @swagger
 * tags:
 *   name: CSV
 *   description: CSV operations
 */

/**
 * @swagger
 * /csv/parse:
 *  post:
 *    summary: accepts a CSV file and returns data from this file, parsed to JSON
 *    description: available only for authenticated users
 *    tags: [CSV]
 *    requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *    responses:
 *      200:
 *        description: parsed content
 *        content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                type: object
 *      401:
 *        description: Unauthorized
 *
 */
csvRouter.post('/parse', checkAuthenticated, async (req, res) => {
  if (!req.files) {
    return res.status(400).send('No file uploaded');
  }
  try {
    // assume one file
    const fieldName = Object.keys(req.files)[0];
    const parsed = await csvParser.parse(req.files[fieldName]);
    return res.send(parsed);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = csvRouter;
