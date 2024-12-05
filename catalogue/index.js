// Aquí se construira el servidor y lo que necesitemos
const express = require('express');

const config = require('../config.js')
const playlists = require('./components/playlists/network');
const songs = require('./components/songs/network');
const likes = require('./components/likes/network');
const errors = require('../network/errors');

const app = express();
const cors = require('cors');
const whiteList = ['http://localhost:5500', 'http://localhost:3000', 'http://localhost:5173'];
const options = {
    origin: (origin, cb) => {
        if (!origin || whiteList.includes(origin)) {
            cb(null, true);
        } else {
            cb(new Error('No permitido'));
        }
    }
}

app.use(cors(options));


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