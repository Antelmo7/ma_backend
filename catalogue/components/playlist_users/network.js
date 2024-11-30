const express = require('express');

const controller = require('./index');
const response = require('../../../network/response');

const auth = require('../../../auth');

const router = express.Router();

router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);

function list(req, res, next) {
  controller.list()
    .then((list) => {
      response.success(req, res, list, 200);
    })
    .catch(next);
}

function get(req, res, next) {
  controller.get(req.params.id)
    .then((list) => {
      response.success(req, res, list, 200);
    })
    .catch(next);
}

function upsert(req, res, next) {
  controller.upsert({
    name: req.body.name,
  })
    .then((list) => {
      response.success(req, res, list, 200);
    })
    .catch(next);
}

module.exports = router;