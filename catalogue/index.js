// Aquí se construira el servidor y lo que necesitemos
const express = require('express');

const config = require('../config.js')
const playlists = require('./components/playlists/network');
const errors = require('../network/errors');

const app = express();


app.use(express.json());

// router
app.use('/api/playlists', playlists);

// ultimo middleware
app.use(errors);

app.listen(config.catalogue.port, () => {
  console.log('Catalogue listening port: ' + config.catalogue.port)
});