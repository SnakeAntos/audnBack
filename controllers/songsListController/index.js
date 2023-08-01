const songsListValidator = require('../../validators/songsListValidator');
const SongListModel = require("../../models/songslistModel");
const SongsListModel = require('../../models/songslistModel');

exports.create = async (req, res) => {
  try {
    // Obtener los parámetros de la solicitud
    const song_id = req.body.songID;
    const playlist_id = req.body.playlistID;
    
    // Validar los parámetros
    const errores = songsListValidator.validateSongsList(playlist_id, song_id);
    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }    
    // Crear la cancion
    await SongsListModel.create({
      song_id,
      playlist_id,      
    });
    // Enviar la respuesta
    return res.json({message:'El registro ha sido creado con éxito.'});
  } catch (error) {
    // Registrar el error
    console.error(error);
    // Enviar la respuesta
    return res.status(500).json('Error al crear playlist.');
  }
};

exports.deleteBySongId = async (req, res) => {
  try {
    // Obtener el id de cancion de los parámetros de la solicitud
    const { id } = req.params;
       
    // Eliminar cancion
    console.log(id);
    await SongsListModel.deleteBySongId(id);
    // Enviar la respuesta
    return res.send('El registro ha sido eliminado con éxito.');
  } catch (error) {
    // Registrar el error
    console.error(error);
    // Enviar la respuesta
    return res.status(500).send('Error al eliminar.');
  }
};

exports.obtainByPlaylistID = async (req, res) => {
  try {
    // Obtener el username del parámetro de la ruta
    const { id } = req.params;

    // Obtener el usuario de la base de datos por el username
    const songsList = await SongsListModel.getByPlaylistID(id);
    

    if (songsList) {
      // Enviar la respuesta con el usuario encontrado
      return res.json(songsList);
    } else {
      // Si no se encuentra el usuario, enviar una respuesta 404 (no encontrado)
      return res.status(404).json({ message: 'Lista no encontrada' });
    }
  } catch (error) {
    // Registrar el error
    console.error(error);
    // Enviar la respuesta de error
    return res.status(500).json('Error al obtener la lista.');
  }
};

