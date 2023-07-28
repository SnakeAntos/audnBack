const knex = require("../db/db");

const PlaylistModel = {
  getByName(playlist_name) {
    return knex
      .select()
      .from("playlist")
      .where({ playlist_name: playlist_name })
      .first();
  },

  getByID(id) {
    return knex.select().from("playlist").where({ id_playlist: id }).first();
  },

  getByIDuserPlusName(id, name) {
    return knex('playlist')
      .select('id_playlist', 'playlist_name', 'user_id') 
      .where({ user_id: id, playlist_name: name })
      .first();
  },
  create(playlist) {
    return knex
      .insert({
        playlist_name: playlist.playlist_name,
        user_id: playlist.user_id,
      })
      .into("playlist")
      .returning("*");
  },

  delete(id) {
    return knex("playlist").where({ id_playlist: id }).del();
  },

  getAllPlaylists() {
    return knex.select().from("playlist");
  },
};

module.exports = PlaylistModel;
