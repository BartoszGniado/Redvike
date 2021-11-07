const mongoose = require('mongoose');
const { AutoIncrement } = require('../connect');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
userSchema.plugin(AutoIncrement, { inc_field: 'id' });
module.exports = mongoose.model('User', userSchema);
