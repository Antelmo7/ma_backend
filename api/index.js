const express = require('express');
const config = require('../config');
const users = require('./components/users/network');

const app = express();
app.use(express.json()); // para poder recibir y responder json

// rutas
app.use('/api/users', users);

app.listen(config.api.port, () => {
  console.log('Listening port: ' + config.api.port);
});