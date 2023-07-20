const knex = require("../db/db");

const SongModel = {
  getByName(song_name) {
    return knex.select().from("song").where({ song_name: song_name }).first();
  },

  create(song) {
    return knex
      .insert({
        song_name: song.song_name,
        song_length: song.song_length,
        song_file: song.song_file,
        album: song.album,
        artist: song.artist,
        img: song.img,
        genre: song.genre,
        mood: song.mood,
        occasion: song.occasion,
        weather: song.weather,
      })
      .into("song")
      .returning("*");
  },

  delete(id) {
    return knex("song").where({ id_song: id }).del();
  },

  getAllSongs() {
    return knex.select().from("song");
  },
};

module.exports = SongModel;
