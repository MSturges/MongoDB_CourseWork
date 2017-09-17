const mongoose = require('mongoose');

before(done => {
  // console.log('connnnnneccccttttttttd ')
  mongoose.connect('mongodb://localhost/uber_test');
  mongoose.connection
    .once('open', () => {
      done()
    })
    .on('error', err => {
      console.warn('WARNING!!!', err);
      done();
    });
});

// ensureIndex makes sure that their is an index presnet on the geomerty.coordinates
// property on the drivers co9llec tion

beforeEach(done => {

  const { drivers } = mongoose.connection.collections;
  drivers.drop().then(() => drivers.ensureIndex({ 'geometry.coordinates': '2dsphere' }))
    .then((yo) => {
      done();
    })
    .catch(() => done());

});
