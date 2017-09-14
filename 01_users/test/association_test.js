const assert = require('assert');
// Pulling in our models
const User = require('../src/user');
const Comment = require('../src/comments');
const BlogPost = require('../src/blogPosts');

describe('Associations', () => {

  let joe, blogPost, comment;

  beforeEach((done) => {

    // creating our instances
    joe = new User({name: 'Joe'});
    blogPost = new BlogPost({ title: 'JS is Great', content: 'yup it is'});
    comment = new Comment({ content: 'Congrats on a great post'});


    // a user instance. (defined in our Schema) has many blogPosts
    joe.blogPosts.push(blogPost);

    // a blogPost instance. (defined in our Schema) has many comments

    //comments should be recording id, mongoose will work magic here
    // mongoose will create an id for us, so it saves a reference and not
    // a sub document
    blogPost.comments.push(comment)

    // mongoose magic, creates our id reference as well.
    // mongoose has a setter going on behind the scenes
    comment.user = joe;

    // blogPost.save();
    // comment.save();

    // es6 code. promise takes an array of promises to resolve
    Promise.all([joe.save(), blogPost.save(), comment.save() ])
      .then(() => done() );

  });

  it('saves a relation between a user and a blogpost', (done) => {
    User.findOne({name: 'Joe'})
      // this is the property on user to get blogPosts
      .populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].title === 'JS is Great')
        done();
      });
  });


  // populate gives you the path where u reference the property
  // then the model allows you to specify the model
  // then you can do populate that to grab the property user and look in the model

  it('saves a full relation graph', (done) => {
    User.findOne({name: 'Joe'})
    .populate({
      path: 'blogPosts',
      populate: {
        path: 'comments',
        model: 'comment',
        populate: {
          path: 'user',
          model: 'user'
        }
      }
    }).then((user) => {

      assert(user.name === 'Joe');
      assert(user.blogPosts[0].title === 'JS is Great');
      assert(user.blogPosts[0].comments[0].content === 'Congrats on a great post')
      assert(user.blogPosts[0].comments[0].user.name === 'Joe')

      done();
    });



  });


});
