exports.validateSong = (songname, album, artist, img) => {
    const errores = [];
  
    if (!songname || songname.trim() === '') {
      errores.push('Debes ingresar un nombre para la cancion');
    }
  
    if (!album || album.trim() === '') {
        errores.push('Debes ingresar un album');
    }

    if (!artist || artist.trim() === '') {
        errores.push('La cancion debe pertenecer a un artista');
    }
    if (!img || img.trim() === '') {
        errores.push('proporciona una imagen por favor');
    }
  
    return errores;
  };
  