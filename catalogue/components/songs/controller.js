const plUsers = require('../playlist_users');
const nanoid = require('nanoid');
const TABLE = 'songs';

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
    let song = {
      name: data.name,
      song_url: data.url
    }

    if (data.id) song.id = data.id;
    else song.id = nanoid();

    return store.upsert(TABLE, song);
  }

  return {
    list,
    get,
    upsert
  }
}