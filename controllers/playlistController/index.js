const playlistValidator = require('../../validators/playlistValidator');
const PlaylistModel = require("../../models/playlistModel");

exports.create =  (req, res) => {
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
      PlaylistModel.create({
      playlist_name,
      user_id,
    })
    .then(playlist=>{
      console.log(playlist);
      console.log(playlist[0].id_playlist);
      return res.json({ id_playlist: playlist[0].id_playlist });
    })
    ;   
   
    
  } catch (error) {
    // Registrar el error
    console.error(error);
    // Enviar la respuesta
    return res.status(500).send('Error al crear playlist.');
  }
};
exports.getByNameAndId = async (req, res) => {
  
  const name = req.params.name;
  const id = req.params.id;

  try {
    const playlists = await PlaylistModel.getByIDuserPlusName(id, name);
    
    return res.status(200).json(playlists);
  } catch (error) {
    console.error("Error al obtener playlists:", error);
    return res.status(500).json({ mensaje: "Error del servidor" });
  }
};
exports.getByNameAndIdAndListSongs = async (req, res) => {
  const id = req.params.id;

  try {
    const songs = await PlaylistModel.getByIDandShowSongs(id);
    return res.status(200).json(songs);
  } catch (error) {
    console.error("Error al obtener las canciones de la playlist:", error);
    return res.status(500).json({ mensaje: "Error del servidor" });
  }
};


exports.delete = async (req, res) => {
  try {   
    const { id } = req.params;   
    console.log(id);
    await PlaylistModel.delete(id);   
    return res.send('El registro ha sido eliminado con éxito.');
  } catch (error) {    
    console.error(error);    
    return res.status(500).send('Error al eliminar.');
  }
};

exports.obtain = async (req, res) => {
  try {   
    const playlists = await PlaylistModel.getAllPlaylists();   
    return res.json(playlists);
  } catch (error) {   
    console.error(error);   
    return res.status(500).send('Error al obtener las canciones.');
  }
};

exports.obtainByName = async (req, res) => {
  try {  
    const { name } = req.params;   
    const playlist = await PlaylistModel.getByName(name);
    if (playlist) {     
      return res.json(playlist);
    } else {    
      return res.status(404).json({ message: 'Cancion no encontrada' });
    }
  } catch (error) {
    // Registrar el error
    console.error(error);
    // Enviar la respuesta de error
    return res.status(500).send('Error al obtener la cancion.');
  }
};

