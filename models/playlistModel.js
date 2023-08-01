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

  getByIDandShowSongs(id) {
    return knex('songs_list')
      .select('song_id') // Obtén solo la columna song_id para obtener la lista de IDs de las canciones
      .where({ playlist_id: id })
      .then((songIds) => {
        // Extraer los IDs de las canciones de la consulta anterior y formar un array de IDs
        const songIdsArray = songIds.map((song) => song.song_id);
        
        // Ahora realiza otra consulta para obtener los detalles completos de las canciones usando los IDs
        return knex('song')
          .select('id_song', 'song_name', 'img') // Puedes seleccionar las columnas que necesitas
          .whereIn('id_song', songIdsArray);
      })
      .catch((error) => {
        console.error('Error al obtener las canciones de la playlist:', error);
      });
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
