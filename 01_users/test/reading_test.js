const assert = require('assert');
const User = require('../src/user');

describe('reading users out of the database', () => {

  let joe, maria, alex, zach;

  beforeEach((done) => {
    alex = new User({ name: 'Alex'});
    joe = new User({ name: 'Joe'});
    maria = new User({ name: 'Maria'});
    zach = new User({ name: 'Zach'});

    Promise.all([joe.save(), alex.save(), zach.save(), maria.save()])
      .then(() => {
        done();
      });
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


  it('can skip and limit the result set', (done) => {

    // skip first user and limit to two users
    User.find({})
    // sort key name by alphabetical order asending -1 would be opposit
    .sort({ name: 1 })
    //skip first
    .skip(1)
    // limit to two
    .limit(2)
    .then((users) => {

      assert(users.length === 2);
      assert(users[0].name === 'Joe');
      assert(users[1].name === 'Maria');
      done();

    })

  });

});
