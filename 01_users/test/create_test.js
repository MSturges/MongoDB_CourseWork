// assert comes with mocha
const assert = require('assert')
const User = require('../src/user');


// call a function called descripe
// pass it 'it functions', which will test a specific part of code.
describe('Creating records', () => {
  it('saves a user', (done) => {

    //mocha magic
    // Will record the value that is returned from asser
    //assert(1 +1 === 2);

    // creating an instance of User
    const joe = new User({ name: 'Joe' });

    // Joe is not a plain js object.  Has tons of functions attached to it
    // because save takes a certain amount of time it will retrun a promise
    // asynchronous in nature
    joe.save()
      .then(() => {
        // has joe been saved successfully?

        // when ever we have create a model and it is sitting in Mocha or node.js work space memory
        // mongoose will automactially place a flag on it called isNew
        // the record has not been saved to our data base isNew === true
        // One joe has been saved to the database isNew flag will be flipped to false
        // so we can test if joe has been saved by seeing if it has been set to false
        assert(!joe.isNew);

        // Mocha everything is done you can go onto your next test.
        // Done is available to as a call back to any 'it block'
        // dont need it but you mus use it if you pass it as a call back
        done();
      })
      .catch(() => {

      });



  });
});

// run our test we run the command.  ```npm run test````
