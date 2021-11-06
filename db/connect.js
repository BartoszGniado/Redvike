const mongoose = require('mongoose');
const dbConfig = require('./db.config');

exports.connect = () => {
  mongoose.connect(dbConfig.DATABASE_URL, { useNewUrlParser: true });
  const db = mongoose.connection;
  db.on('error', (error) => console.error(error));
  db.once('open', () => console.log('Connected to Database'));
};
