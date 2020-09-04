const db = require('./index');
//const arango = require('./index').arango;
const axios = require('axios');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const neatCsv = require('neat-csv');

const COLLECTIONS = ['games', 'edges', 'traits'];

const collections = {
  games: db.collection('games'),
  traits: db.collection('traits'),
  edges: db.collection('edges')
};

const loadData = async () => {
  let files = [];
  let dir = fs.readdir(path.resolve(__dirname, 'data'), (err, inFiles) => (files = inFiles));
  let start = Date.now();

  await setupCollections();
  console.log('Collections setup.');

  // let filteredFiles = files.filter((file) => file.match(COLLECTIONS[i]));
  for (let j = 0; j < files.length; j++) {
    let data = fs.readFileSync(path.resolve(__dirname, 'data', files[j]), 'utf8');
    let collection = files[j].match(/(.+?)(?=\d|\.)/)[0];
    data = await neatCsv(data);
    await insertData(data, collections[collection]);
  }

  let end = Date.now();

  console.log('Completed in ' + (end - start) + 'ms.');

  console.log('done');
};

const insertData = async (data, collection) => {
  let result = await collection.import(data);

  return result;
};

const setupCollections = async () => {
  if (collections.games) collections.games.drop();
  if (collections.traits) collections.traits.drop();
  if (collections.edges) collections.edges.drop();

  await collections.games.create();
  await collections.traits.create();
  await collections.edges.create({ type: 'edge' });
};

module.exports = {
  loadData
};
