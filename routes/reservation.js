const express = require('express');
const reservationRouter = express.Router();
const reservationService = require('../services/reservations');

reservationRouter.get(
  '/amenity/:amenityId/day/:timestamp',
  async (req, res) => {
    const { amenityId, timestamp } = req.params;
    if (!amenityId || !timestamp) {
      return res.status(400).send('Bad Request');
    }
    try {
      const result = await reservationService.getResevations({
        filters: {
          amenity_id: amenityId,
          date: timestamp,
        },
        sort: {
          asc: true,
          by: 'start_time',
        },
      });
      return res.send(result);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  }
);

reservationRouter.get('/user/:userId', (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).send('Bad Request');
  }
  try {
    // TODO implement task 2.
    throw new Error('Not implemanted!');
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = reservationRouter;
