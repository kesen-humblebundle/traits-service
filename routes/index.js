const express = require('express');

const db = require('../db/models/index');

const routes = express();

routes.use(express.Router());

/* -----------  GET ROUTES --------------------------------------------------------------------------- */
routes.get('/:product_id', async (req, res) => {
  try {
    const id = +req.params.product_id;
    const traits = await db.fetchTraitsForProduct(id);
    let traitProducts = [];

    if (!traits || traits.length === 0) {
      return res.status(404).send('No traits found for this product.');
    }

    // TODO: Explore ways to improve this process
    for (let i = 0; i < traits.length; i++) {
      // TODO: Decide how to handle missing products for a single trait
      let products = await db.fetchProductsForTrait(traits[i].id, id);
      let prodArray = [];

      products = products.map((product) => product.slice(6));

      let moddedIDs = products.map((product) => product % 100);
      moddedIDs = JSON.stringify(moddedIDs);

      let thumbnails = await axios.get(
        `http://ec2-52-14-126-227.us-east-2.compute.amazonaws.com:3001/api/${moddedIDs}?type=thumbnail`
      );

      thumbnails = thumbnails.data;

      thumbnails.forEach((thumbnail, j) => {
        prodArray.push({
          product_id: products[j],
          thumbnail: thumbnail.thumbnail
        });
      });

      prodArray.push(traits[i].name);

      traitProducts.push(prodArray);
    }

    res.status(200).send(traitProducts);
  } catch (err) {
    console.log('Error getting products for trait.', err);
    res.status(500).send('Error getting products. Contact system admin.');
  }
});

routes.get('/products/:trait', async (req, res) => {
  try {
    let { trait } = req.params;
    let traitID = await db.getTraitIdFromName(trait);

    if (!traitID) {
      return res.status(400).send('Trait not found in database. Please try again.');
    }

    let products = await db.fetchProductsForTrait(traitID);

    if (!products || products.length === 0) {
      return res.status(404).send('No products were found with this trait. Please try again.');
    }

    res.status(200).send(products);
  } catch (err) {
    console.log('Error getting products for trait.', err);
    return res.status(500).send('Error getting products. Please contact system admin for support.');
  }
});

/* -----------  post ROUTES -------------------------------------------------------------------------- */
routes.post('/', (req, res) => {
  res.status(200).send('ok');
});

module.exports = routes;
