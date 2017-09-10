const assert = require('assert');
const User = require('../src/user');

describe('reading users out of the database', () => {

  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe'});
    joe.save()
      .then(() => {
        done();
      })
  });

  it('finds all users with a name of joe', (done) => {

    // mongo query that returns an array of specified config
    User.find({ name: 'Joe'})
      .then((users) => {

        // console.log(users[0]._id);
        // console.log(joe._id)
        // even tho these console log the same, they will not evaluate to true
        // because they are wrapped in an
        // so u must call toString()

        assert(users[0]._id.toString() === joe._id.toString())

        done();
      });

  });

  it('find a user with a partictular id', (done) => {
    User.findOne({ _id: joe._id })
      .then((user) => {

        assert(user.name === 'Joe');

        done();
      })
  });

});
