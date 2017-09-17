const Driver = require('../models/driver');

module.exports = {

  greeting(req, res) {
    res.send({ hi: 'there'});
  },


  // 200 K 200,000 meters
  index(req, res, next) {
    const { lng, lat } = req.query;
    //http://google.com?lng=80&lad=20;

    Driver.geoNear(
      { type: 'Point',
        coordinates: [parseFloat(lng), parseFloat(lat)]
      },
      {
        spherical: true,
        maxDistance: 200000
      }
    )
    .then(drivers => res.send(drivers))
    .catch(next);

  },

  create(req, res, next) {
    const driverProps = req.body;

    Driver.create(driverProps)
      .then(driver => res.send(driver))
      .catch(next)
  },

  edit(req, res, next) {
    const driverId = req.params.id;
    const driverProps = req.body;

      Driver.findByIdAndUpdate({ _id: driverId}, driverProps)
        .then(() => Driver.findById({ _id: driverId}))
        .then(driver => res.send(driver))
        .catch(next)
  },

  delete(req, res, next) {
    const driverId = req.params.id;

    Driver.findByIdAndRemove({ _id: driverId})
      .then(driver => res.status(204).send(driver))
      .catch(next);
    },




};
