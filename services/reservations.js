const Resevation = require('../db/models/resevation');
const Amenity = require('../db/models/amenity');

exports.getResevations = async ({ filters, sort, group }) => {
  var resevations = await Resevation.find(filters).lean();
  if (sort)
    resevations = resevations.sort((a, b) =>
      sort.asc ? a[sort.by] - b[sort.by] : b[sort.by] - a[sort.by]
    );
  var amenities = await Amenity.find();
  resevations.forEach((r) => {
    const amenity = amenities[r['amenity_id']];
    r.amenity = amenity && amenity['name'];
    r.duration = r['end_time'] - r['start_time'];
    // that's my first contact with mongodb
    // finally we probably shouldn't duplicate id & _id
    // internal db versioning __v shouldn't be returned ???
    delete r._id;
    delete r.__v;
  });
  if (group)
    resevations = resevations.reduce((acc, cur) => {
      acc[cur[group.by]]
        ? acc[cur[group.by]].push(cur)
        : (acc[cur[group.by]] = [cur]);
      return acc;
    }, {});
  return resevations;
};
