const mongoose = require('mongoose');
const { AutoIncrement } = require('../connect');
const { getSchema } = require('../../scripts/yamlToSchema');
console.log(getSchema('UserWithPassword'));
const userSchema = new mongoose.Schema(getSchema('UserWithPassword'));
userSchema.plugin(AutoIncrement, { inc_field: 'id' });
module.exports = mongoose.model('User', userSchema);
