const bcrypt = require('bcrypt');
const auth = require('../../../auth');

const TABLE = 'auth';

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) store = require('../../../store/dummy');

  async function upsert(data) {
    const authData = {
      id: data.id
    }
    if (data.email) authData.email = data.email;
    if (data.username) authData.username = data.username;
    if (data.password) authData.password = await bcrypt.hash(data.password, 5);

    return store.upsert(TABLE, authData);
  }

  async function login(email, password) {
    const data = await store.query(TABLE, {
      email: email
    });

    return bcrypt.compare(password, data.password)
      .then((sonIguales) => {
        if (sonIguales) {
          return auth.sign(data);
        } else {
          throw new Error('Invalid data');
        }
      });
  }

  return {
    upsert,
    login
  }
};