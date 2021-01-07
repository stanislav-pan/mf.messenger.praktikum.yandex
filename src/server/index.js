const express = require('express');
const compression = require('compression');
const path = require('path');
const constants = require('./const');
const app = express();
const { getPortFromArgv } = require('./utils/get-port-from-argv');

app.use(compression());

app.use(
  '/static',
  express.static(path.resolve(__dirname, '../../dist/static'), {
    maxAge: constants.ONE_HOUR_IN_SECONDS,
  })
);

app.use(
  '',
  express.static(path.resolve(__dirname, '../../dist/'), {
    maxAge: constants.ONE_HOUR_IN_SECONDS,
  })
);

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});

const port = process.env.PORT || constants.PORT;

app.listen(port, () => {
  console.log(`Сервер начал свою работа на порте - ${port}`);
});
