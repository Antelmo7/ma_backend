const jwt = require('jsonwebtoken');
const config = require('../config');
const secret = config.jwt.secret;

const error = require('../utils/error');

function sign(data) {
  return jwt.sign(data, secret);
}

function verify(token) {
  return jwt.verify(token, secret)
}

function getToken(authorization) {
  if (!authorization) {
    throw new Error('No token');
  }

  if (authorization.indexOf('Bearer') === -1) {
    throw new Error('Invalid format');
  }

  let token = authorization.replace('Bearer ', '');
  return token;
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || '';
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;
  return decoded;
}

const check = {
  own: function (req, owner) {
    const decodedToken = decodeHeader(req);
    console.log(decodedToken);
    if (decodedToken.id !== owner) {
      throw error('Invalid token', 401);
    }
  }
}

module.exports = {
  sign,
  check
};