exports.validateSongsList = (song_id, playlist_id) => {
    const errores = [];
  
    if (!song_id  || isNaN(song_id)) {
      errores.push('Debes ingresar un valor numerico');
    }
  
    if (!playlist_id || isNaN(playlist_id)) {
        errores.push('Debes ingresar un valor numerico');
    }

   
  
    return errores;
  };
  