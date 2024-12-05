const express = require('express');
const config = require('../config');
const users = require('./components/users/network');
const auth = require('./components/auth/network');
const errors = require('../network/errors');

const app = express();
app.use(express.json()); // para poder recibir y responder json

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

// rutas
app.use('/api/users', users);
app.use('/api/auth', auth);

// ultimo middleware de errores
app.use(errors);

app.listen(config.api.port, () => {
  console.log('Listening port: ' + config.api.port);
});