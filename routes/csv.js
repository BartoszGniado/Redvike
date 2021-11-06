const express = require('express');
const csvRouter = express.Router();

csvRouter.post('/parse', (req, res) => {
  if (!req.files) {
    res.status(400).send('No file uploaded');
  }
  try {
    // TODO implement tast 3.
    throw new Error('Not implemanted!');
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = csvRouter;
