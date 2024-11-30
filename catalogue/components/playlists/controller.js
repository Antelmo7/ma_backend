const plUsers = require('../playlist_users');
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

  async function upsert(data, user_id) {
    let playlist = {
      name: data.name,
    }

    if (data.id) playlist.id = data.id;
    else playlist.id = nanoid();

    await plUsers.upsert({
      user_id: user_id,
      playlist_id: playlist.id,
    });

    return store.upsert(TABLE, playlist);
  }

  return {
    list,
    get,
    upsert
  }
}