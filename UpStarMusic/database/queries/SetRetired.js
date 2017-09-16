const Artist = require('../models/artist');

/**
 * Sets a group of Artists as retired
 * @param {array} _ids - An array of the _id's of of artists to update
 * @return {promise} A promise that resolves after the update
 */


//look at the id of every artist, and if there id is $in this list of
// _ids that we are passing as array
// then update the retired property to true


module.exports = (_ids) => {

  return Artist.update(
    { _id: { $in: _ids } },
    { retired: true },
    { multi: true }
  )
};
