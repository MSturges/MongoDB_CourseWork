// code sharing inside a node enviornment.
const mongoose = require ('mongoose');
// tells mongoose to connect to mongo using the connection method.
// requires you explicitly tell it where to connect to
// can specify port of a live application
// users_test is the name of our database instance running in mongo
mongoose.connect('mongodb://localhost/users_test');
mongoose.connection
  .once('open', () => console.log('good to go!'))
  .on('error', (error) => {
    console.log('warning,', error);
  });
