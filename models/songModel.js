const knex = require("../db/db");

const SongModel = {
  getByName(song_name) {
    return knex.select().from("song").where({ song_name: song_name }).first();
  },
  getRandom() {
    return knex("song")
      .count("id_song as totalSongs")
      .then((result) => {
        const totalSongs = parseInt(result[0].totalSongs, 10);
        const randomIndex = Math.floor(Math.random() * totalSongs);
        return knex("song")
          .select()
          .offset(randomIndex)
          .limit(1)
          .then((randomSong) => randomSong[0]);
      });
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
