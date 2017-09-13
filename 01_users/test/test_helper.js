// code sharing inside a node enviornment.
const mongoose = require ('mongoose');

// hey mongoose whenever you want to make a promise, use this implementaion of promises
// this is the es6 implementation.
mongoose.Promise = global.Promise;



// before call/hook, before is only ran one time for all our tests.
// pass a done call back, tell mocha to hold up before moving on to executing the next itme.

before((done) => {

  // tells mongoose to connect to mongo using the connection method.
  // requires you explicitly tell it where to connect to
  // can specify port of a live application
  // users_test is the name of our database instance running in mongo

  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection
    .once('open', () => {
      done();
    })
    .on('error', (error) => {
      console.log('warning,', error);
  });

});




//
// creating a hook - a function that will be executed before any test gets executed
// done tells Mocha that we have completed all of our logic in the beforeEach function
// beforeEach((done) => {

  // dropping all of our users in our collection of users
  // drop accepts a call back function as a parameter
  // this function will only be executed when drop has dropped our collection of users
  // mongoose.connection.collections.users.drop(() => {
  //   //ready to run our next test.
  //   done();
  // });

beforeEach((done) => {
  const {users, comments, blogposts } = mongoose.connection.collections;

  users.drop(() => {
      comments.drop(() => {
        blogposts.drop(() => {
          done();
        });
      });
  });

});
