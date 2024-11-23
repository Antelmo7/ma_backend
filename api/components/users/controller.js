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

  function upsert(data) {
    const user = {
      name: data.name,
      username: data.username,
      age: data.age
    }
    if (data.id) user.id = data.id
    else user.id = nanoid();

    return store.upsert(TABLE, user);
  }

  return {
    list,
    get,
    upsert,
  };
};