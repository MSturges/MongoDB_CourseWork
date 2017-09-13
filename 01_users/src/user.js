const mongoose = require('mongoose');
//importing our sub document schema and embeding it into our user model
const PostSchema = require('./post');
const Schema = mongoose.Schema;
// A user model represents all of the data in a single collection in our mongodb
// So when we create a user model, mongoose will automactially create a collection
// of users in our database as well.
// an instance of our use model is a single user


// create our schema
const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2 ,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

// by calling virtual we are telling mongoose that we want to define a virtual field
// get
UserSchema.virtual('postCount').get(function() {

  return this.posts.length

});


// This is mongoose pre middleware
// We use function so we have a reference to this.
// this = to the user instance
UserSchema.pre('remove', function(next) {
  // This is what is going to be called before a record is removed
  const BlogPost = mongoose.model('blogPost');

  //this.blogPosts is a reference to joe and  will be an array of all the blogPosts
  // that we want to delete using the remove method
  // if the id is $in this array of blog posts ? delete blogpost

  // next is used for middleware.

  BlogPost.remove({ _id: { $in: this.blogPosts } })
    .then(() => next() )
});

// Where mongoose begins to do a lot of work:
// - mongoose do you have a collection call 'users' ?  : I'll make it with the provided Schema
//

//mongoose is just a wrapper around our mongoDB
const User = mongoose.model('user', UserSchema);

// export this file so anyone can gain access to this project.
module.exports = User;
