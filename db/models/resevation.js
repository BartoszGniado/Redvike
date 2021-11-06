const mongoose = require('mongoose');

const resevationSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  amenity_id: {
    type: Number,
    required: true,
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

module.exports = mongoose.model('Resevation', resevationSchema);
