// Aquí se construira el servidor y lo que necesitemos
const express = require('express');

const config = require('../config.js')
const playlists = require('./components/playlists/network');
const songs = require('./components/songs/network');
const likes = require('./components/likes/network');
const errors = require('../network/errors');

const app = express();


app.use(express.json());

// router
app.use('/api/playlists', playlists);
app.use('/api/songs', songs);
app.use('/api/likes', likes);

// ultimo middleware
app.use(errors);

app.listen(config.catalogue.port, () => {
  console.log('Catalogue listening port: ' + config.catalogue.port)
});