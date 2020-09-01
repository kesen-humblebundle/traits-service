/* eslint-disable no-loop-func */
/* eslint-disable no-console */
const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
});
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const fetchers = require('../database-sql/models');

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

app.get('/traits/:product_id', (req, res) => {
  const id = +req.params.product_id;
  const traits = fetchers.fetchTraitsForProduct(id);

  traits.then((traitsData) => {
    const traitProducts = traitsData.traits.reduce((acc, trait) => {
      return acc.concat(fetchers.fetchProductsForTrait(trait, id));
    }, []);
    Promise.all(traitProducts)
      .then((resultsFinal) => {
        resultsFinal.forEach((result) => {
          if (result.products.indexOf(id) >= 0) {
            result.products = result.products.filter((product) => {
              return product !== id;
            });
            // eslint-disable-next-line no-param-reassign
          }
          while (result.products.length < 4) {
            const filler = Math.ceil(Math.random() * 100);
            if (!result.products.includes(filler) && filler !== id) {
              result.products.push(filler);
            }
          }
        });
        axios
          .all(
            resultsFinal.map((result) => {
              console.log(result.products);
              const requestArray = encodeURI(JSON.stringify(result.products));
              const requestURL = `http://ec2-52-14-126-227.us-east-2.compute.amazonaws.com:3001/api/${requestArray}?type=thumbnail`;

              return axios.get(requestURL);
            })
          )
          .then((resArray) => {
            const productArray = resArray.map((response) => {

              return response.data;
            });
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < productArray.length; i++) {
              if (
                productArray[i].every((item) => {
                  return resultsFinal[i].products.includes(item.product_id);
                })
              ) {
                console.log('trait', resultsFinal[i].trait);
                productArray[i].push(resultsFinal[i].trait);
              }
            }
            console.log('From Micko ', productArray);
            return productArray;
          })
          .then((resToClient) => {
            res.set({ 'Access-Control-Allow-Origin': '*' });
            res.status(200).send(resToClient);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send('there was a problem');
          });
      })
      .catch((err) => {
        if (err) {
          throw err;
        }
      });
  });
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
