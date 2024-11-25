const express = require('express');
const controller = require('./index');
const response = require('../../../network/response')
const secure = require('./secure');

const router = express.Router();

router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
router.put('/', secure('update'),upsert);

function list(req, res) {
  controller.list()
    .then((list) => {
      response.success(req, res, list, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
}

function get(req, res) {
  controller.get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
}

function upsert(req, res) {
  let data = req.body;
  controller.upsert(data)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
}

module.exports = router;