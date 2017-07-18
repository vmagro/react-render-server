import http from 'http';
import winston from 'winston';

import config from './config';

const {isDev} = config;

import render from './render';


function handleWithError(req, res) {
  try {
    render(req, res);
  } catch(err) {
    res.statusCode = 500;
    if (isDev) {
      winston.error(err);
      res.write(err);
      res.end();
    } else {
      res.write('Something broke!');
    }
    res.end();
  }
}

const server = http.createServer(handleWithError);

export default server;
