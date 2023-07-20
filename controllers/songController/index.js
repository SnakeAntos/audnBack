const songValidator = require('../../validators/songValidator');
const SongModel = require("../../models/songModel");

exports.create = async (req, res) => {
  try {
    // Obtener los parámetros de la solicitud
    const song_name = req.body.name;
    const song_file = req.body.file;
    const album = req.body.album;
    const artist = req.body.artist;
    const img = req.body.image;
    const song_length = req.body.length;
    const genre = req.body.genre;
    const mood = req.body.mood;
    const occasion = req.body.occasion;
    const weather = req.body.weather;
    // Validar los parámetros
    const errores = songValidator.validateSong(song_name, album, artist, img);
    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }    
    // Crear la cancion
    await SongModel.create({
      song_name,
      song_file,
      album,
      artist,
      img,
      song_length,
      genre,
      mood,
      occasion,
      weather,
    });
    // Enviar la respuesta
    return res.send('El registro ha sido creado con éxito.');
  } catch (error) {
    // Registrar el error
    console.error(error);
    // Enviar la respuesta
    return res.status(500).send('Error al crear cancion.');
  }
};

exports.delete = async (req, res) => {
  try {
    // Obtener el id de cancion de los parámetros de la solicitud
    const { id } = req.params;
       
    // Eliminar cancion
    console.log(id);
    await SongModel.delete(id);
    // Enviar la respuesta
    return res.send('El registro ha sido eliminado con éxito.');
  } catch (error) {
    // Registrar el error
    console.error(error);
    // Enviar la respuesta
    return res.status(500).send('Error al eliminar.');
  }
};

exports.obtain = async (req, res) => {
  try {
    // Obtener todas las canciones
    const songs = await SongModel.getAllSongs();
    // Enviar la respuesta con los usuarios
    return res.json(songs);
  } catch (error) {
    // Registrar el error
    console.error(error);
    // Enviar la respuesta de error
    return res.status(500).send('Error al obtener las canciones.');
  }
};

exports.obtainByName = async (req, res) => {
  try {
    // Obtener el username del parámetro de la ruta
    const { name } = req.params;

    // Obtener el usuario de la base de datos por el username
    const song = await SongModel.getByName(name);
    console.log(`el objeto es ${song}`);

    if (song) {
      // Enviar la respuesta con el usuario encontrado
      return res.json(song);
    } else {
      // Si no se encuentra el usuario, enviar una respuesta 404 (no encontrado)
      return res.status(404).json({ message: 'Cancion no encontrada' });
    }
  } catch (error) {
    // Registrar el error
    console.error(error);
    // Enviar la respuesta de error
    return res.status(500).send('Error al obtener la cancion.');
  }
};


   
  

