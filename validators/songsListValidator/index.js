exports.validateSong = (song_id, playlist_id) => {
    const errores = [];
  
    if (!song_id || song_id.trim() === '' || isNaN(song_id)) {
      errores.push('Debes ingresar un valor numerico');
    }
  
    if (!playlist_id || playlist_id.trim() === '' || isNaN(playlist_id)) {
        errores.push('Debes ingresar un valor numerico');
    }

   
  
    return errores;
  };
  