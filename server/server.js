/* eslint-disable no-loop-func */
/* eslint-disable no-console */
const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
});
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const morgan = require('morgan');

const routes = require('../routes');
const MAX_PRODUCTS = 4;

const app = express();

app.use(cors());
app.use('/', express.static('public', { fallthrough: true }));

app.use('/:product_id', express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use('/traits', routes);
app.get('/:product_id', (req, res) => {
  const product_id = req.params.product_id;
  res.redirect(`/traits/${product_id}`);
  res.end();
});

module.exports = app;
