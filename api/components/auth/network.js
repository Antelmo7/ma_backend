const express = require('express');
const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

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

module.exports = router;