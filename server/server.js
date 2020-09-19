/* eslint-disable no-loop-func */
/* eslint-disable no-console */
const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
});
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const db = require('../db/models/index');
const MAX_PRODUCTS = 4;

const app = express();

app.use(cors());
app.use('/', express.static('public', { fallthrough: true }));
app.use('/:product_id', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/:product_id', (req, res) => {
  const product_id = req.params.product_id;
  res.redirect(`/traits/${product_id}`);
  res.end();
});

app.get('/traits/:product_id', async (req, res) => {
  try {
    const id = +req.params.product_id;
    const traits = await db.fetchTraitsForProduct(id);
    let traitProducts = [];

    if (!traits || traits.length === 0) {
      return res.status(404).send('No traits found for this product.');
    }

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

app.get('/traits/products/:trait', async (req, res) => {
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

module.exports = app;
