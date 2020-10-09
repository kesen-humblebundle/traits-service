const express = require('express');
const axios = require('axios');

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
      let products = await db.fetchProductsForTrait(traits[i], id);
      let prodArray = [];

      products = products.map((product) => product.slice(6));

      let moddedIDs = products.map((product) => product % 100);
      moddedIDs = JSON.stringify(moddedIDs);

      // let thumbnails = await axios.get(
      //   `http://ec2-52-14-126-227.us-east-2.compute.amazonaws.com:3001/api/${moddedIDs}?type=thumbnail`
      // );

      //thumbnails = thumbnails.data;

      products.forEach((product) => {
        prodArray.push({
          product_id: product,
          thumbnail:
            'https://sdc-kesen-images.s3.us-east-2.amazonaws.com/desktop/small_thumbnail.png'
        });
      });

      let traitName = await db.getTraitNameFromId(traits[i]);

      prodArray.push(traitName);

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
// Add a new trait
routes.post('/', async (req, res) => {
  const { trait } = req.body;

  try {
    let response = await db.addTraitToDatabase(trait);

    if (response === 0) {
      return res.status(417).send('Could not add trait to database.');
    }

    return res.status(201).send('Trait added to databse.');
  } catch (err) {
    console.log("POST /traits: Couldn't add trait to database.", err);

    res
      .status(500)
      .send('Internal server error adding trait. Please contact system admin for support.\n');
  }
});

routes.post('/product', async (req, res) => {
  const { trait, product_id } = req.body;

  try {
    let response = await db.addEdgeToDatabase(product_id, trait);

    if (response === 0) {
      return res.status(417).send('Could not add trait to game.');
    }

    return res.status(201).send('Trait added to game.');
  } catch (err) {
    console.log('POST /traits/product: Could not add trait to game.', err);

    res
      .status(500)
      .send('Internal server error adding trait. Please contact system admin for support.\n');
  }
});

module.exports = routes;
