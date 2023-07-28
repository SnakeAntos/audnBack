const playlistValidator = require('../../validators/playlistValidator');
const PlaylistModel = require("../../models/playlistModel");

exports.create = async (req, res) => {
  try {
    // Obtener los parámetros de la solicitud
    const playlist_name = req.body.name;
    const user_id = req.body.userID;

    // Validar los parámetros
    const errores = playlistValidator.validatePlaylist(playlist_name, user_id);
    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }

    // Crear la playlist
    const playlist = await PlaylistModel.create({
      playlist_name,
      user_id,
    });

    // Enviar la respuesta con el id de la playlist
    return res.json({ id_playlist: playlist.id_playlist });
  } catch (error) {
    // Registrar el error
    console.error(error);
    // Enviar la respuesta
    return res.status(500).send('Error al crear playlist.');
  }
};
exports.delete = async (req, res) => {
  try {
    // Obtener el id de cancion de los parámetros de la solicitud
    const { id } = req.params;
       
    // Eliminar cancion
    console.log(id);
    await PlaylistModel.delete(id);
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
    const playlists = await PlaylistModel.getAllPlaylists();
    // Enviar la respuesta con los usuarios
    return res.json(playlists);
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
    const playlist = await PlaylistModel.getByName(name);
    

    if (playlist) {
      // Enviar la respuesta con el usuario encontrado
      return res.json(playlist);
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

