const csv = require('csvtojson');

const delimiter = process.env.DELIMITER || ';';

exports.parse = async (file) => {
  return csv({ delimiter }).fromString(file.data.toString('utf8'));
};
