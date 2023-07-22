const cupidValidator = require('../../validators/cupidValidator');
const CupidModel = require("../../models/cupidModel");

exports.create = async (req, res) => {
  try {
    // Obtener los parámetros de la solicitud
    const user_id = req.body.userID;
    const song_id = req.body.songID;
    const isMatch = req.body.match;
    
    // Validar los parámetros
    const errores = cupidValidator.validateCupid(user_id, song_id, isMatch);
    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }    
    // Crear el cupido
    await CupidModel.create({
      user_id,
      song_id,
      isMatch,
      
    });
    // Enviar la respuesta
    return res.send('El registro ha sido creado con éxito.');
  } catch (error) {
    // Registrar el error
    console.error(error);
    // Enviar la respuesta
    return res.status(500).send('Error al crear cupido.');
  }
};

exports.delete = async (req, res) => {
  try {
    // Obtener el id del cupid de los parámetros de la solicitud
    const { id } = req.params;
       
    // Eliminar cancion
    
    await CupidModel.delete(id);
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
    const songs = await CupidModel.getAllCupids();
    // Enviar la respuesta con los usuarios
    return res.json(songs);
  } catch (error) {
    // Registrar el error
    console.error(error);
    // Enviar la respuesta de error
    return res.status(500).send('Error al obtener las listas.');
  }
};

exports.obtainByUserId = async (req, res) => {
  try {
    // Obtener el username del parámetro de la ruta
    const { id } = req.params;

    // Obtener el usuario de la base de datos por el username
    const cupid = await CupidModel.getByUserId(id);
    

    if (cupid) {
      // Enviar la respuesta con el usuario encontrado
      return res.json(cupid);
    } else {
      // Si no se encuentra el usuario, enviar una respuesta 404 (no encontrado)
      return res.status(404).json({ message: 'lista no encontrada' });
    }
  } catch (error) {
    // Registrar el error
    console.error(error);
    // Enviar la respuesta de error
    return res.status(500).send('Error al obtener la cancion.');
  }
};
