const express = require('express');
const csvParser = require('../scripts/csv-parser');
const csvRouter = express.Router();
const auth = require('../auth/auth');

csvRouter.post('/parse', auth.checkAuthenticated, async (req, res) => {
  if (!req.files) {
    res.status(400).send('No file uploaded');
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
