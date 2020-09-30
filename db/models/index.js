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
    console.log('fetchProductsForTrait: Failed to find products for trait.\n', err.response.body);
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
    console.log('getTraitIdFromName: Failed to get trait id\n', err.response.body);

    return '';
  }
};

/**
 * Adds a new trait to the database. Only a name needs to be provided. The database
 * automatically generates the _key and _id.
 *
 * Name must be unique.
 *
 * @param {string} traitName - name of trait to add to the databasze
 * @returns {number} - 1 for successful insert and 0 for no insert
 */
const addTraitToDatabase = async (traitName) => {
  const traitCollection = db.collection('traits');

  try {
    const result = await db.query(aql`
    INSERT { name: ${traitName}} INTO ${traitCollection}
  `);

    console.log(result);

    return 1;
  } catch (err) {
    console.log('addTraitToDatabase: Could not add trait.\n', err.response.body.errorMessage);
    return 0;
  }
};

/**
 * Adds a game to the database and creates edges for its traits
 * @param {string} id - The product id of the game to be added
 * @param {array} traits - Any traits the game should have
 */
const addGameToDatabase = async (id, traits) => {
  const gameCollection = db.collection('games');

  // TODO: What's the best approach if no traits are provided?

  try {
    await db.query(aql`
      INSERT { _key: ${id} } INTO ${gameCollection}
    `);

    // TODO: This assumes trait _id will be passed in. Allow for the contengency that it could
    // be the name or the _key
    for (trait of traits) {
      await addEdgeToDatabase('games/' + id, trait);
    }

    return 1;
  } catch (err) {
    console.log('addGameToDatabase: Failed to add new game.\n', err);
    return 0;
  }
};

/**
 * Creates an edge connecting a game to a trait
 * @param {string} game - _id of a game
 * @param {*} trait - _id of a trait
 */
const addEdgeToDatabase = async (game, trait) => {
  const edgeCollection = db.collection('edges');

  game = 'games/' + game;
  trait = 'traits/' + trait;

  try {
    await db.query(aql`
    INSERT { _from: ${game}, _to: ${trait} } INTO ${edgeCollection}
  `);

    return 1;
  } catch (err) {
    console.log('addEdge: Unable to add edge.\n', err.response.body.errorMessage);
    return 0;
  }
};

/**
 * Removes a game from the database.
 * @param {string} id - product id of the game to be removed
 * @returns {number} - 1 if successful, 0 if fails
 */
const removeGameFromDatabase = async (id) => {
  const gameCollection = db.collection('games');
  const edgeCollection = db.collection('edges');
  const gameID = 'games/' + id;

  try {
    let edges = await db.query(aql`
      FOR edge IN ${edgeCollection}
        FILTER edge._from == ${gameID}
        RETURN edge._key
    `);

    edges = await edges.all();

    console.log(edges);

    await db.query(aql`
      REMOVE { _key: ${id} } IN ${gameCollection}
    `);

    for (edge of edges) {
      await removeEdgeFromDatabase(edge);
    }

    return 1;
  } catch (err) {
    console.log('removeGameFromDatabase: Could not remove game.', err);
    return 0;
  }
};

/**
 * Removes an edge between a game and a trait
 * @param {string} edge - The _key of an edge
 * @returns {number} - 1 if successful, 0 if fails
 */
const removeEdgeFromDatabase = async (edge) => {
  const edgeCollection = db.collection('edges');

  try {
    await db.query(aql`
      REMOVE { _key: ${edge} } IN ${edgeCollection}
    `);

    return 1;
  } catch (err) {
    console.log('removeEdgeFromDatabase: Could not remove edge.\n', err.response.body.errorMessage);

    return 0;
  }
};

// helper method
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
  getTraitIdFromName,
  addTraitToDatabase,
  addGameToDatabase,
  addEdgeToDatabase,
  removeGameFromDatabase,
  removeEdgeFromDatabase
};
