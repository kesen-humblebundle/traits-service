const path = require('path');
const faker = require('faker');
const buzzphrase = require('buzzphrase');
const createCsvWriter = require('csv-writer').createArrayCsvWriter;
const shortid = require('shortid');

const CHUNK_SIZE = 100000;
const MAX_TRAITS = 100;

const setupTraits = async () => {
  const csvWriter = createCsvWriter({
    path: path.resolve(__dirname, 'data', 'traits.csv'),
    header: ['_key', 'name']
  });
  let traits = [];

  while (traits.length < MAX_TRAITS) {
    let trait = buzzphrase.get({ format: '{a}' });
    if (!traits.includes(trait)) {
      traits.push([shortid.generate(), trait]);
    }
  }

  await csvWriter.writeRecords(traits);

  return traits;
};

const setupGames = async (n) => {
  let chunks = Math.floor(n / CHUNK_SIZE) - 1;
  let count = 0;
  let games = [];
  try {
    for (let i = 0; i <= chunks; i++) {
      const csvWriter = createCsvWriter({
        path: path.resolve(__dirname, 'data', `games${i}.csv`),
        header: ['_key', 'product']
      });
      let chunk = [];

      for (let j = i * CHUNK_SIZE; j <= (i + 1) * CHUNK_SIZE - 1; j++) {
        let id = shortid.generate();
        games.push([id, j]);
        chunk.push([id, j]);
      }

      await csvWriter.writeRecords(chunk);
    }

    return games;
  } catch (err) {
    console.log(err);
  }
};

const drawEdges = async (traits, games) => {
  let chunks = Math.floor(games.length / CHUNK_SIZE);

  for (let i = 0; i < chunks; i++) {
    const csvWriter = createCsvWriter({
      path: path.resolve(__dirname, 'data', `edges${i}.csv`),
      header: ['_from', '_to']
    });
    let chunk = [];

    for (let j = i * CHUNK_SIZE; j < (i + 1) * CHUNK_SIZE; j++) {
      let used = [];
      for (let k = 0; k < 10; k++) {
        let rand = Math.floor(Math.random() * 100);
        while (used.includes(traits[rand][0])) {
          rand = Math.floor(Math.random() * 100);
        }
        try {
          used.push(traits[rand][0]);
          chunk.push([`games/${games[j][0]}`, `traits/${traits[rand][0]}`]);
        } catch (err) {
          console.log(err);
          console.log('J is ' + j);
        }
      }
    }

    await csvWriter.writeRecords(chunk);
  }
};

const buildData = async (n) => {
  console.log('Starting data generation.');

  let start = Date.now();
  let traits = await setupTraits();
  let games = await setupGames(n);

  await drawEdges(traits, games);
  let end = Date.now();
  console.log('Done.');
  console.log('Gen time is ' + (end - start) + ' ms.');
};

module.exports = buildData;