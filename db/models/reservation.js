const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    amenity: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Amenity',
      required: false,
    },
    user_id: {
      type: Number,
      required: true,
    },
    start_time: {
      type: Number,
      required: true,
    },
    end_time: {
      type: Number,
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

reservationSchema.virtual('duration').get(function () {
  return this['end_time'] - this['start_time'];
});

module.exports = mongoose.model('Reservation', reservationSchema);
