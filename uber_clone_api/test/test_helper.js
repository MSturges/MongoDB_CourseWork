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

beforeEach(done => {

  const { drivers } = mongoose.connection.collections;
  drivers.drop()
    .then((yo) => {
      done();
    })
    .catch(() => done());

});
