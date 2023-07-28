const knex = require("../db/db");

const SongsListModel = {

  getByPlaylistID(id) {
    return knex.select().from("songs_list").where({ playlist_id: id }).first();
  },

  create(songList) {
    return knex
      .insert({
        song_id: songList.song_id,
        playlist_id: songList.playlist_id,
      })
      .into("songs_list")
      .returning("*");
  },

  deleteByPlaylistID(id) {
    return knex("songs_list").where({ playlist_id: id }).del();
  },
  deleteBySongID(id) {
    return knex("songs_list").where({ song_id: id }).del();
  },

  getAllSongLists() {
    return knex.select().from("songs_list");
  },
  getByPlaylistID(id) {
    return knex.select().from("songs_list").where({playlist_id: id});
  },
};

module.exports = SongsListModel;

//este es el modelo de la tabla relacional entre canciones y playlist