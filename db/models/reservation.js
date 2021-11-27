const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('Reservation', reservationSchema);
