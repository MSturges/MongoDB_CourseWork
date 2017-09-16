const Artist = require('../models/artist');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 */
module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {

  // es5 solution:
  //create and object
  // give it a property sortProperty and set it = 1
  // then pass this object to the sort call

  // const sortOrder = {};
  // sortOrder[sortProperty] = 1;

  //es6 interpolated keys
  // at run time look a sortProperty variable, what ever it is = to
  // add that property to the [sortProperty] and then give it a value of 1
  //



  const query = Artist.find(buildQuery(criteria))
    .sort({ [sortProperty] : 1})
    .skip(offset)
    .limit(limit);

    return Promise.all([query, Artist.find(buildQuery(criteria)).count()])
      .then((results) => {
        return {
          all: results[0],
          count: results[1],
          offset: offset,
          limit: limit
        };
      });

};

const buildQuery = (criteria) => {

  const query = {};
  console.log(criteria)

  if(criteria.name) {
    query.$text = { $search: criteria.name }
  }

  if(criteria.age) {

    query.age = {
      $gte: criteria.age.min,
      $lte: criteria.age.max
    }
  }
  if(criteria.yearsActive) {
    query.yearsActive = {
      $gte: criteria.yearsActive.min,
      $lte: criteria.yearsActive.max
    }
  }

  return query




};
