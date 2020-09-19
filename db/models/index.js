const db = require('../index.js');
const { aql } = require('arangojs');

const MAX_RECORDS = 10000;
const NUM_GAMES_PER_TRAIT = 4;

/**
 * Gets a list of traits for a product
 * @param {String} id The ID of a product for which to find thje traits
 * @returns {array} - An array of trait ids
 */
const fetchTraitsForProduct = async (id) => {
  const edgesCollection = db.collection('edges');
  id = 'games/' + String(id); // the id in arango is 'collection/id_string'

  try {
    let results = await db.query(aql`
        FOR doc in any ${id} ${edgesCollection}
          OPTIONS { bfs: true, uniqueVertices: 'global' }
          return { id: doc._id, name: doc.name }
    `);

    results = await results.all();

    return results;
  } catch (err) {
    console.log('fetchTraitsForProduct: Error getting products from database.');
    return [];
  }
};

/**
 * Takes in a trait ID and gets four products with the same trait
 * for practical reasons the list of games is limited to 10k results
 * and four are randomly selected from that
 * @param {string} id - ID of a trait for which to find some randomish games
 * @returns {array} - array product ids associated with trait.
 */
const fetchProductsForTrait = async (trait, game) => {
  const edgesCollection = db.collection('edges');
  //const whichGames = getRandomGames();
  let count = 0;

  try {
    let results = await db.query(aql`
    FOR edge IN ${edgesCollection}
      FILTER edge._to == ${trait}
      LIMIT 10000
      return edge._from
  `);
    results = await results.all();
    results = getRandomGames(results);

    return results;
  } catch (err) {
    console.log('fetchProductsForTrait: Failed to find products for trait.', err);
  }
};

/**
 * This method takes a trait name and returns the matching trait id
 * @param {string} traitName - the name property of a trait
 * @returns {string} - the _id of the trait with the matching name property
 */
const getTraitIdFromName = async (traitName) => {
  const traitCollection = db.collection('traits');

  try {
    let result = await db.query(aql`
    FOR trait IN ${traitCollection}
      FILTER trait.name == ${traitName}
      RETURN trait._id
  `);

    result = await result.all();

    return result[0];
  } catch (err) {
    console.log('getTraitIdFromName: Failed to get trait id', err);

    return '';
  }
};

const getRandomGames = (results, id) => {
  let games = [];

  for (let i = 0; i < NUM_GAMES_PER_TRAIT; i++) {
    games.push(results[Math.floor(Math.random() * MAX_RECORDS)]);
  }

  return games;
};

module.exports = {
  fetchProductsForTrait,
  fetchTraitsForProduct,
  getTraitIdFromName
};
