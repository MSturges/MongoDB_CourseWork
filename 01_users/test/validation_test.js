const assert = require('assert');
const User = require('../src/user');

describe('validating record', () => {

  it('Requires a Username', () => {
    const user = new User( { name: undefined });
    const validationResult = user.validateSync();
    const  { message } = validationResult.errors.name

    assert(message === 'Name is required.');

  });

  it('requires a user\`s name longer than 2 characters', (done) => {
    const user = new User ( { name: 'al' });
    // Synchronous
    const validationResult = user.validateSync();
    const  { message } = validationResult.errors.name;

    assert(message === 'Name must be longer than 2 characters.');
    done();
  });

  it('disallows invalid records from being saved', (done) => {
    const user = new User({name: 'Al'});
    user.save()
      .catch((validationResult) => {

        const { message } = validationResult.errors.name;

        assert(message === 'Name must be longer than 2 characters.');
        done();
      });
  });

});
