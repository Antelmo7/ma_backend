const nanoid = require('nanoid');
const TABLE = 'playlist_users';

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
    let playlist = {
      user_id: data.user_id,
      playlist_id: data.playlist_id,
    }

    return store.upsert(TABLE, playlist);
  }

  return {
    list,
    get,
    upsert
  }
}