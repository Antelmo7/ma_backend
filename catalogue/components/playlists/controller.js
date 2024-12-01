const plUsers = require('../playlist_users');
const plSongs = require('../playlist_songs');
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

  function addSong(data) {
    return plSongs.upsert({
      song_id: data.song_id,
      playlist_id: data.playlist_id,
    });
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
    upsert,
    addSong
  }
}