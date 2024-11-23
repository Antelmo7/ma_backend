const express = require('express');
const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

router.get('/', (req, res) => {
  controller.list()
    .then(list => {
      response.success(req, res, list, 200);
    })
    .catch(err => {
      response.success(req, res, err.message, 200);
    });
});

router.post('/', (req, res) => {
  let data = req.body;
  controller.upsert(data)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch((err) => {
      response.success(req, res, err.message, 200);
    });
});

router.get('/:id', (req, res) => {
  controller.get(req.params.id)
    .then(user => {
      response.success(req, res, user, 200);
    })
    .catch(err => {
      response.success(req, res, err.message, 200);
    });
});

module.exports = router;