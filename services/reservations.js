const Reservation = require('../db/models/reservation');
const Amenity = require('../db/models/amenity');

exports.getReservations = async ({ filters, sort, group }) => {
  const reservations = await Reservation.find(filters)
    .populate('amenity')
    .sort(sort);
  // TODO: group by db side
  if (group)
    return reservations.reduce((acc, cur) => {
      acc[cur[group.by]]
        ? acc[cur[group.by]].push(cur)
        : (acc[cur[group.by]] = [cur]);
      return acc;
    }, {});
  return reservations;
};

exports.fillAmenity = async (req, res, next) => {
  const { amenityId } = req.params;
  if (amenityId && !isNaN(Number(amenityId))) {
    const amenityInstance = (
      await Amenity.find({
        id: amenityId,
      })
    )[0];
    req.params.amenity = amenityInstance?._id;
  }
  next();
};
