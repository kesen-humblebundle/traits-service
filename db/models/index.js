const db = require('../index.js');
const { aql } = require('arangojs');

/**
 * Gets a list of traits for a product
 * @param {String} id The ID of a product for which to find thje traits
 * @returns {array} - An array of trait ids
 */
const fetchTraitsForProduct = async (id) => {
  const edgesCollection = db.collection('edges');
  //const traitsCollection
  const game = await fetchGameFromProductId(id);
  let results = await db.query(aql`
        FOR doc in any ${game} ${edgesCollection}
          OPTIONS { bfs: true, uniqueVertices: 'global' }
          return { id: doc._id, name: doc.name }
    `);

  results = await results.map((trait) => trait);

  return results;
};

const fetchProductsForTrait = (traitStr) => {
  return new Promise((resolve, reject) => {
    db.connection.query(fetchProductsForTraitQueryString, [traitStr], (err, products) => {
      if (err) {
        reject(err);
      }
      const productsArray = products.map((product) => {
        return product.product_id;
      });

      const productsObj = {
        trait: traitStr,
        products: productsArray
      };
      resolve(productsObj);
    });
  });
};

/**
 * Gets the _id of a game from its product_id
 * @param {string|number} id - The product id of a game
 * @returns {string} - A game id i.e. 'games/XXXXXXXX'
 */
const fetchGameFromProductId = async (id) => {
  const gamesCollection = db.collection('games');
  try {
    const games = await db.query(aql`
      FOR game IN ${gamesCollection}
        FILTER game.product_id == ${String(id)}
        RETURN game._id
      `);

    for await (const game of games) {
      return game;
    }
  } catch (err) {
    console.log(err);
    return 'games/8n2UV5IIY_j';
  }
};

module.exports = {
  fetchProductsForTrait,
  fetchTraitsForProduct
};
