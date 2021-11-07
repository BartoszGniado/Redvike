const mongoose = require('mongoose');
const dbConfig = require('./db.config');
const dataLoader = require('./satrtupDataLoader');
const AutoIncrement = require('mongoose-sequence')(mongoose);

exports.connect = () => {
  mongoose.connect(dbConfig.DATABASE_URL, { useNewUrlParser: true });
  const db = mongoose.connection;
  db.on('error', (error) => console.error(error));
  db.once('open', async () => {
    console.log('Connected to Database');
    // wouldn't be needed with persistent databese
    dataLoader.load();
  });
};

exports.AutoIncrement = AutoIncrement;
