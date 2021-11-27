// wouldn't be needed with persistent database
const csvParser = require('../scripts/csv-parser');
const Reservation = require('./models/reservation');
const Amenity = require('./models/amenity');
const mongoose = require('mongoose');

const load = async () => {
  const currentResv = await Reservation.find();
  if (currentResv.length) return;

  const amenities = await csvParser.getAmenities();
  const amenitiesModels = amenities.map((r) => new Amenity(r));
  amenitiesModels.forEach((m) => m.save());

  const fillAmenity = (reservation) => {
    if (reservation.amenity_id) {
      const amenity = amenitiesModels.find(
        (a) => a.id == reservation.amenity_id
      );
      reservation.amenity = new mongoose.Types.ObjectId(amenity._id.toString());
    }
    delete reservation.amenity_id;
    return reservation;
  };

  const reservations = await csvParser.getReservations();
  reservations
    .map(fillAmenity)
    .map((r) => new Reservation(r))
    .forEach((m) => m.save());

  const User = require('./models/user');
  const testUser = new User({
    username: 'user',
    password: '$2b$10$/XLVGsy2CB90lZCGh3pi8.sl.o9teV6ZOiv/znkpy7dyqnNiEY/72',
  });
  testUser.save();
};

exports.load = load;

exports.reload = async () => {
  const User = require('./models/user');

  Reservation.deleteMany(() => true);
  Amenity.deleteMany(() => true);
  User.deleteMany(() => true);

  load();
};
