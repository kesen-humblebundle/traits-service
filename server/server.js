/* eslint-disable no-loop-func */
/* eslint-disable no-console */
const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
});
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const db = require('../db/models/index');
const MAX_PRODUCTS = 4;

const app = express();

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
  const id = +req.params.product_id;
  const traits = await db.fetchTraitsForProduct(id);
  let traitProducts = [];

  if (!traits || traits.length === 0) {
    return res.status(404).send('No traits found for this product.');
  }

  for (let i = 0; i < traits.length; i++) {
    let products = await db.fetchProductsForTrait(traits[i].id, id);
    let prodArray = [traits[i].name];

    // image service only has 1000 products, so modding to get the images
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

    console.log(prodArray);
    // thumbnail = thumbnail.data;

    // prodArray.push({
    //   product_id: products[i],
    //   thumbnail
    // });

    // console.log(prodArray);

    traitProducts.push(prodArray);
  }

  res.status(200).send(traitProducts);
});

app.get('/traits/products/:trait', (req, res) => {
  console.log(req.params);
  fetchers
    .fetchProductsForTrait(req.params.trait)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      if (err) {
        res.status(500).send(err, 'Please try again');
      }
    });
});

module.exports = app;
