const express = require('express');
const path = require('path');
const constants = require('./const');
const app = express();

app.use(
  '/static',
  express.static(path.resolve(__dirname, '../../dist/static'))
);
app.use(
  '/assets',
  express.static(path.resolve(__dirname, '../../dist/assets'))
);
app.use('/app', express.static(path.resolve(__dirname, '../../dist/app')));

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});

app.listen(constants.PORT, () => {
  console.log(`Сервер начал свою работа на порте - ${constants.PORT}`);
});
