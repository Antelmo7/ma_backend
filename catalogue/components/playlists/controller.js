const nanoid = require('nanoid');
const TABLE = 'playlists';

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
      name: data.name,
    }

    if (data.id) playlist.id = data.id;
    else playlist.id = nanoid();

    return store.upsert(TABLE, playlist);
  }

  return {
    list,
    get,
    upsert
  }
}