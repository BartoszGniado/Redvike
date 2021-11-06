const express = require('express');
const reservationRouter = express.Router();

reservationRouter.get('/amenity/:amenityId/day/:timestamp', (req, res) => {
  const { amenityId, timestamp } = req.params;
  if (!amenityId || !timestamp) {
    return res.status(400).send('Bad Request');
  }
  try {
    // TODO implement tast 1.
    throw new Error('Not implemanted!');
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

reservationRouter.get('/user/:userId', (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).send('Bad Request');
  }
  try {
    // TODO implement tast 2.
    throw new Error('Not implemanted!');
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = reservationRouter;
