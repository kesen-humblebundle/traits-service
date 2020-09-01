const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env')
});
const db = require('../index.js');
// const seed = require('../seed.js');

const fetchTraitsQueryString = `SELECT traits.trait
  FROM traits
  INNER JOIN traits_products
  ON traits.id = traits_products.trait_id
  INNER JOIN products
  ON products.product_id = traits_products.product_id
  WHERE traits_products.product_id = ?`;

const fetchProductsForTraitQueryString = `SELECT products.product_id
  FROM products
  INNER JOIN traits_products
  ON products.product_id = traits_products.product_id
  INNER JOIN traits
  ON traits.id = traits_products.trait_id
  WHERE traits.trait = ?`;

const fetchTraitsForProduct = (id) => {
  return new Promise((resolve, reject) => {
    db.connection.query(fetchTraitsQueryString, [id], (err, traits) => {
      if (err) {
        reject(err);
      }
      const traitsArray = traits.map((trait) => {
        return trait.trait;
      });
      const traitsObj = {
        product_id: id,
        traits: traitsArray
      };
      resolve(traitsObj);
    });
  });
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

module.exports.fetchTraitsForProduct = fetchTraitsForProduct;
module.exports.fetchProductsForTrait = fetchProductsForTrait;
