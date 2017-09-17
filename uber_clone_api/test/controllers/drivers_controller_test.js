const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Driver = mongoose.model('driver');

describe('Drivers controller', () => {

  it('Post to /api/drivers creates a new driver', (done) => {
    Driver.count().then(count => {
      request(app)
        .post('/api/drivers')
        .send({ email: 'test@test.com'})
        .end(() => {
          Driver.count().then(newCount => {
            assert(count + 1 === newCount)
            done();
          });
        });
    });
  });

  it('Put to /api/drivers/id edits and existing driver', (done) => {
      const driver = new Driver({ email: 't@t.com', driving: false });

      driver.save().then(() => {
          request(app)
            .put( `/api/drivers/${driver._id}` )
            .send({ driving: true})
            .end(() => {
              Driver.findOne({ email: 't@t.com'})
                .then(updatedDriver => {
                  assert(updatedDriver.driving === true);
                  done();
                })
            });
        });
  });

  it('Delete /api/drivers/id deletes an existing a user', (done) => {
    const driver = new Driver({ email: 'driver1@gmail.com', driving: false });

    driver.save().then(() => {
      request(app)
        .delete(`/api/drivers/${driver._id}`)
        .end(() => {
          Driver.findOne({ email: 'driver1@gmail.com'})
            .then((deletedDriver) => {
              assert(deletedDriver === null)
              done();
            });
        });
    });
  });


});
