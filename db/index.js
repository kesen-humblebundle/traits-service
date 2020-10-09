const { Database } = require('arangojs');
const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
});

const { DB_USER, DB_PW, DB1, DB2, DB3, DB4, DB5 } = process.env;

const db = new Database({
  url: [DB1, DB2, DB3, DB4, DB5],
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
})();

const traitsDB = db.database('traitsDB');

//db.useDatabase('traitsDB');

module.exports = traitsDB;
