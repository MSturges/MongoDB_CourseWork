const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPosts');

describe('Middleware', () => {
  let joe, blogPost;

  beforeEach((done) => {

    joe = new User({name: 'Joe'});
    blogPost = new BlogPost({ title: 'JS is Great', content: 'yup it is'});


    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()])
      .then(() => done() );

  });

  it('users clean up dangling bloposts on remove', (done) => {

    joe.remove()
      // .then(() =>     User.find({ name: 'Joe'}) )
      // .then((user) => {
      //   console.log('!!!!!!!!!!!', user)
      //   done()
      // })
      .then(() => BlogPost.count())
      .then((count) => {
        assert(count === 0);
        done();
      });
  });

});
