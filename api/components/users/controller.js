const auth = require('../auth');
const nanoid = require('nanoid');
const TABLE = 'users';

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require('../../../store/dummy');
  }

  function list() {
    return store.list(TABLE);
  }

  function get(id) {
    return store.get(TABLE, id);
  }

  async function upsert(data) {
    const user = {
      name: data.name,
      username: data.username,
      age: data.age
    }
    if (data.id) user.id = data.id
    else user.id = nanoid();

    if (data.email || data.password) {
      await auth.upsert({
        id: user.id,
        email: data.email,
        password: data.password
      });
    }

    return store.upsert(TABLE, user);
  }

  return {
    list,
    get,
    upsert,
  };
};