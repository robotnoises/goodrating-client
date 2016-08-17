'use strict';

let express = require('express');
let compression = require('compression');
let app = express();

console.log('Starting.');

app.use(express.Router());
app.use(compression());
app.use(express.static(__dirname + '/dist'));

app.listen(process.env.PORT || 8000, () => {
  console.log('Server started.');
});

