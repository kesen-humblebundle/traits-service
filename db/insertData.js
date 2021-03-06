const db = require('./index');
const fs = require('fs');
const path = require('path');
const neatCsv = require('neat-csv');

const collections = {
  games: db.collection('games'),
  traits: db.collection('traits'),
  edges: db.collection('edges')
};

const loadData = async () => {
  let files = [];
  let dir = fs.readdir(path.resolve(__dirname, 'data'), (err, inFiles) => (files = inFiles));
  let start = Date.now();
  let { games, traits, edges } = collections;

  await setupCollections();

  // const { id } = await db.beginTransaction({
  //   write: [games, traits, edges]
  // });
  //const trx = db.transaction(id);

  for (let j = 0; j < files.length; j++) {
    let data = fs.readFileSync(path.resolve(__dirname, 'data', files[j]), 'utf8');
    let collection = files[j].match(/(.+?)(?=\d|\.)/)[0];
    data = await neatCsv(data);
    console.log('Inserting ' + files[j]);
    await insertData(data, collections[collection]);
  }

  //trx.commit();

  let end = Date.now();

  console.log('Completed in ' + (end - start) + 'ms.');

  console.log('done');
};

const insertData = async (data, collection, trx) => {
  let result = await collection.import(data);

  return result;
};

const setupCollections = async () => {
  let { games, traits, edges } = collections;

  try {
    // if (games) await games.drop();
    // if (traits) await traits.drop();
    // if (edges) await edges.drop();

    await games.create();
    await traits.create();
    await edges.create({ type: 'edge' });

    return [games, traits, edges];
  } catch (err) {
    console.log('Error setting up collections.');
    console.log(err.stack);
  }
};

module.exports = loadData;
