// wouldn't be needed with persistent databese
const csvParser = require('../scripts/csv-parser');
const Resevation = require('./models/resevation');
const Amenity = require('./models/amenity');

exports.load = async () => {
  const currentResv = await Resevation.find();
  if (!currentResv.length) {
    const reservations = await csvParser.getResevations();
    var models = reservations.map((r) => new Resevation(r));
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
