const express = require('express');
const compression  = require('compression');
const path = require('path');
const constants = require('./const');
const app = express();

app.use(compression());

app.use(
  '/static',
  express.static(path.resolve(__dirname, '../../dist/static'), {
    maxAge: constants.ONE_HOUR_IN_SECONDS,
  })
);

app.use(
  '/app',
  express.static(path.resolve(__dirname, '../../dist/app'), {
    maxAge: constants.ONE_HOUR_IN_SECONDS,
  })
);

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});

app.listen(constants.PORT, () => {
  console.log(`Сервер начал свою работа на порте - ${constants.PORT}`);
});
