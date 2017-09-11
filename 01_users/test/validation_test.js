const assert = require('assert');
const User = require('../src/user');

describe('validating record', () => {

  it('requires a username', () => {
    const user = new User( { name: undefined });
    const validationResult = user.validateSync();

  });

});
