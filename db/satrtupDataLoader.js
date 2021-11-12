// wouldn't be needed with persistent databese
const csvParser = require('../scripts/csv-parser');
const Reservation = require('./models/reservation');
const Amenity = require('./models/amenity');

exports.load = async () => {
  const currentResv = await Reservation.find();
  if (!currentResv.length) {
    const reservations = await csvParser.getReservations();
    var models = reservations.map((r) => new Reservation(r));
    models.forEach((m) => m.save());
    const amenities = await csvParser.getAmenities();
    models = amenities.map((r) => new Amenity(r));
    models.forEach((m) => m.save());
    const User = require('./models/user');
    const testUser = new User({
      username: 'user',
      password: '$2b$10$/XLVGsy2CB90lZCGh3pi8.sl.o9teV6ZOiv/znkpy7dyqnNiEY/72',
    });
    testUser.save();
  }
};
