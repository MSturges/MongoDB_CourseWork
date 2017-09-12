const assert = require('assert');
const User = require('../src/user');

// a virtual type is any field on a model that does not get presisted in our mongodb
// it is calculated on the server side. It's a derivative

describe('virtual types', () => {
  it('post counts return number of posts', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{title: 'I\'m working way too late, but I\'ll be making more'}]
    });
    joe.postCount // undefined


    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.postCount === 1);
        done();
      });
  });
});
