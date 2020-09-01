const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
});
const app = require('./index.js');

app.listen(process.env.TRAITS_PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log('server running on port', process.env.TRAITS_PORT);
});
