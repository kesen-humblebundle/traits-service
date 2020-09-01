/* eslint-disable no-console */
const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
});
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.SQL_USER,
  password: process.env.SQL_PWD,
  port: process.env.SQL_PORT,
  database: 'traitsDB'
});

module.exports.connection = connection;
