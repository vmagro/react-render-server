const express = require('express');
const morgan = require('morgan');

// this is probably really bad for production, look into later
require('babel-register')({presets: ['env', 'react']});
require('babel-polyfill');

const app = require('./lib/app').default;

const port = app.get('port') || 3000;

app.listen(port, () => {
  console.log('Listening on port ' + port);
});