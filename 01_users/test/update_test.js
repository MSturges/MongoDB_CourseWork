const assert = require('assert');
const User = require('../src/user');

describe('Updating records: ', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe'});
    joe.save()
      .then(() => {
        done();
      });
    });

    // this is a little bit of a helper function since we have redundant code
    function assertName(operation, done) {
      operation
        .then(() => User.find({}))
        .then((users) => {
          // console.log(users);
          assert(users.length === 1);
          assert(users[0].name === 'Alex');

          done();
        });
    };

    it('instance set n save', (done) => {

      joe.set('name', 'Alex'),

      assertName(
        joe.save(),
        done
      );
    });

    it('A model instance can update', (done) => {
      assertName(
        joe.update({name: 'Alex'}),
        done
      );

    });

    it('A model class can update', (done) => {

      assertName(
        User.update({ name: 'Joe'}, { name: 'Alex'}),
        done
      );

    });

    it('A model class can update one record', (done) => {
      assertName(
        User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }),
        done
      );
    });

    it('A model class can find a record with an ID and update', (done) => {
      assertName(
        User.findByIdAndUpdate(joe.id, { name: 'Alex' }),
        done
      );
    });

});
