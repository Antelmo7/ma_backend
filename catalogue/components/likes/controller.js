const plUsers = require('../playlist_users');
const nanoid = require('nanoid');
const TABLE = 'likes';

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
    let like = {
      user_id: data.user_id,
      song_id: data.song_id
    }

    return store.upsert(TABLE, like);
  }

  return {
    list,
    get,
    upsert
  }
}