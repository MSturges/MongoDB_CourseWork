const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// A user model represents all of the data in a single collection in our mongodb
// So when we create a user model, mongoose will automactially create a collection
// of users in our database as well.
// an instance of our use model is a single user


// create our schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
  },
  postCount: Number
});

// Where mongoose begins to do a lot of work:
// - mongoose do you have a collection call 'users' ?  : I'll make it with the provided Schema
//

//mongoose is just a wrapper around our mongoDB
const User = mongoose.model('user', UserSchema);

// export this file so anyone can gain access to this project.
module.exports = User;
