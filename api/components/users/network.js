const express = require('express');
const response = require('../../../network/response');

const router = express.Router();

router.use('/', (req, res) => {
  response.success(req, res, 'Funcionando', 200);
});

module.exports = router;