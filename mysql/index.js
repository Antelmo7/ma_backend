const express = require('express');
const config = require('../config');

const router = require('./network');

const app = express();
app.use(express.json());

// rutas
app.use('/', router);

app.listen(config.mysql_service.port, () => {
  console.log('DB service listening in port: ', config.mysql_service.port)
});