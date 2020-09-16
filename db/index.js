const { Database } = require('arangojs');
const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
});

const { DB_USER, DB_PW } = process.env;

const db = new Database({
  url: 'http://localhost:8529/',
  auth: {
    username: DB_USER,
    password: DB_PW
  },
  precaptureStackTraces: true
});

//onst arango = arangojs();
(async () => {
  let databases = await db.listDatabases();
  if (!databases.includes('traitsDB')) {
    await db.createDatabase('traitsDB');
  }

  db.useDatabase('traitsDB');
})();

module.exports = db;
