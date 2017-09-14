const Artist = require('../models/artist');

/**
 * Deletes a single artist from the Artists collection
 * @param {string} _id - The ID of the artist to delete.
 * @return {promise} A promise that resolves when the record is deleted
 */
module.exports = (_id) => {

  //this is wrong because you are touching the database twice!!!
  // return Artist.findOne({ _id: _id })
  //   .then((artist) => {
  //      Artist.remove()
  //   });
// Artist.remove({ _id: _id })

  return Artist.remove({ _id });

};
