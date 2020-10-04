const express = require('express');
const path = require('path');
const constants = require('./const');
const app = express();

app.use(express.static(path.resolve(__dirname, '../client')));

app.listen(constants.PORT, () => {
    console.log(`Сервер начал свою работа на порте - ${constants.PORT}`);
});
