const express = require('express');
const reservationRouter = express.Router();
const reservationService = require('../services/reservations');

/**
 * @swagger
 * tags:
 *   name: Reservation
 *   description: Reservations operations
 */

/**
 * @swagger
 * /reservation/amenity/{amenityId}/day/{timestamp}:
 *  get:
 *    summary: returns a list of all bookings from amenity with the given id and the selected day
 *    description: The list of reservations is sorted in ascending order by start time
 *    tags: [Reservation]
 *    parameters:
 *      - in: path
 *        name: amenityId
 *        schema:
 *          type: int
 *        description: amenity id
 *        example:
 *          1
 *      - in: path
 *        name: timestamp
 *        schema:
 *          type: int
 *        description: searched day - timestamp of the day, hour 00:00
 *        example:
 *          1592611200000
 *    responses:
 *      200:
 *        description: parsed content
 *        content:
 *           application/json:
 *             schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/ExtReservation'
 *      401:
 *        description: Unauthorized
 *
 */
reservationRouter.get(
  '/amenity/:amenityId/day/:timestamp',
  reservationService.fillAmenity,
  async (req, res) => {
    const { amenity, amenityId, timestamp } = req.params;
    if (!amenityId || !timestamp) {
      return res.status(400).send('Bad Request');
    }
    try {
      const result = await reservationService.getReservations({
        filters: {
          amenity,
          date: timestamp,
        },
        sort: {
          start_time: 'asc',
        },
      });
      return res.send(result);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  }
);

/**
 * @swagger
 * /reservation/user/{userId}:
 *  get:
 *    summary: returns a list of all bookings for this user grouped by days
 *    description: The list of reservations is sorted in ascending order by date
 *    tags: [Reservation]
 *    parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: int
 *        description: user id
 *        example:
 *          1
 *    responses:
 *      200:
 *        description: bookings for given user grouped by days
 *        content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                1592611200000:
 *                  type: array
 *                  items:
 *                     $ref: '#/components/schemas/ExtReservation'
 *      401:
 *        description: Unauthorized
 *
 */
reservationRouter.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).send('Bad Request');
  }
  try {
    const result = await reservationService.getReservations({
      filters: {
        user_id: userId,
      },
      sort: {
        date: 'asc',
      },
      group: {
        by: 'date',
      },
    });
    return res.send(result);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = reservationRouter;
