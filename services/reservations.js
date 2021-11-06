const csvParser = require('../scripts/csv-parser');

exports.getResevations = async ({ filters, sort }) => {
  var resevations = await csvParser.getResevations();
  for (const filter in filters) {
    resevations = resevations.filter((r) => r[filter] == filters[filter]);
  }
  if (sort)
    resevations = resevations.sort((a, b) =>
      sort.asc ? a[sort.by] - b[sort.by] : b[sort.by] - a[sort.by]
    );
  var amenities = await csvParser.getAmenities();
  resevations.forEach((r) => {
    const amenity = amenities[r['amenity_id']];
    r.amenity = amenity && amenity['name'];
    r.duration = r['end_time'] - r['start_time'];
  });
  return resevations;
};
