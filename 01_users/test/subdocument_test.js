const assert = require('assert');
const User = require('../src/user');

describe('subdocuments', () => {

  it('can create a subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{title: 'PostTitle'}]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe'}))
      .then((user) => {
        assert(user.posts[0].title === 'PostTitle' );
        done();
      });
  });

  it('can add subdocuments to an existing record', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: []
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe'}))
      .then((user) => {
        user.posts.push({title: 'New Post'});
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe'}))
      .then((user) => {
        assert(user.posts[0].title === 'New Post');
        done();
      });

  });

  it('can remove an existing subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{title: 'it is late and i\'m working too much'}]
    });

    joe.save()
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {

        const post = user.posts[0];
        // removes a sub document on the objec but does not call mongo
        post.remove();

        return user.save();
      })
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {

        assert(user.posts.length === 0);

        done();
      });

  });

});
