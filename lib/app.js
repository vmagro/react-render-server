import express from 'express';
import morgan from 'morgan';

const app = express();

import render from './render';

if (app.get('env') != 'test') {
  app.use(morgan('dev'));
}

app.use(function (err, req, res, next) {
  console.error(err.stack)
  if (app.get('env') == 'development' ||
      app.get('env') == 'test') {
    res.status(500).send(err)
  } else {
    res.status(500).send('Something broke!')
  }
});

app.get('*', render);

export default app;
