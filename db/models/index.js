const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env')
});
const db = require('../index.js');
const { aql } = require('arangojs');

const fetchProductsForTraitQueryString = `SELECT products.product_id
  FROM products
  INNER JOIN traits_products
  ON products.product_id = traits_products.product_id
  INNER JOIN traits
  ON traits.id = traits_products.trait_id
  WHERE traits.trait = ?`;

const fetchTraitsForProduct = async (id) => {
  let edgesCollection = db.collection('edges');
  let game = await fetchGameFromProductId(id);
  let results = await db.query(aql`
  FOR edge in ${edgesCollection}
      FILTER edge._from == ${game}
      return edge._to
    `);

  results = await results.map((result) => result);

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
