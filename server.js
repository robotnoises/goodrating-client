'use strict';

let express = require('express');
let compression = require('compression');
let app = express();
let appDir = (process.env.GOODRATING_PRODUCTION) ? '/dist' : '/src';

console.log('Starting.');

app.use(express.Router());
app.use(compression());
app.use(express.static(__dirname + appDir));

app.listen(process.env.PORT || 8000, () => {
  console.log('Server started.');
});

