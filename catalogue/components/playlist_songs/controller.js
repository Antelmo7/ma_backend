const nanoid = require('nanoid');
const TABLE = 'playlist_songs';

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
    let song = {
      song_id: data.song_id,
      playlist_id: data.playlist_id,
    }

    return store.upsert(TABLE, song);
  }

  return {
    list,
    get,
    upsert
  }
}