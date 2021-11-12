const csv = require('csvtojson');
const path = require('path');

const delimiter = process.env.DELIMITER || ';';

exports.parse = async (file) => {
  return csv({ delimiter }).fromString(file.data.toString('utf8'));
};

exports.getReservations = () => {
  const filePath = path.resolve('./resources/Reservations.csv');
  return csv({ delimiter }).fromFile(filePath);
};

exports.getAmenities = () => {
  const filePath = path.resolve('./resources/Amenity.csv');
  return csv({ delimiter }).fromFile(filePath);
};
