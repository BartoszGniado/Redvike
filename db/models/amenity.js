const mongoose = require('mongoose');

const amenitySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Amenity', amenitySchema);
