const express = require('express');
const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

router.get('/', list);

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  controller.login(email, password)
    .then((token) => {
      response.success(req, res, token, 200);
    })
    .catch((err) => {
      response.success(req, res, 'Invalid data', 400);
    })
});

function list(req, res) {
  controller.list()
    .then((list) => {
      response.success(req, res, list, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
}

module.exports = router;