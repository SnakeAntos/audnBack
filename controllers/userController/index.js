const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userValidator = require('../../validators/userValidator');
const UserModel = require("../../models/userModel");

exports.create = async (req, res) => {
  try {
    // Obtener los parámetros de la solicitud
    const user_name = req.body.username;
    const user_password = req.body.password;
    const nickname = req.body.nickname;
    const email = req.body.email;
    // Validar los parámetros
    const errores = userValidator.validateUser(user_name, user_password);//agregar validaciones nickname email, etc
    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }
    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const encriptedPassword = await bcrypt.hash(user_password, salt);
    // Crear el usuario
    await UserModel.create({
      user_name,
      user_password: encriptedPassword,
      nickname,
      email,
    });
    // Enviar la respuesta
    return res.send('El registro ha sido creado con éxito.');
  } catch (error) {
    // Registrar el error
    console.error(error);
    // Enviar la respuesta
    return res.status(500).send('Error al crear el usuario.');
  }
};

exports.delete = async (req, res) => {
  try {
    // Obtener el id de usuario de los parámetros de la solicitud
    const { id } = req.params;
    //const id_user = req.params.id;   
    // Eliminar el usuario
    console.log(id);
    await UserModel.delete(id);
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
    // Obtener todos los usuarios de la base de datos
    const users = await UserModel.getAllUsers();
    // Enviar la respuesta con los usuarios
    return res.json(users);
  } catch (error) {
    // Registrar el error
    console.error(error);
    // Enviar la respuesta de error
    return res.status(500).send('Error al obtener los usuarios.');
  }
};

exports.obtainByUser = async (req, res) => {
  try {
    // Obtener el username del parámetro de la ruta
    const { nickname } = req.params;

    // Obtener el usuario de la base de datos por el username
    const user = await UserModel.getByUser(nickname);

    if (user) {
      // Enviar la respuesta con el usuario encontrado
      return res.json(user);
    } else {
      // Si no se encuentra el usuario, enviar una respuesta 404 (no encontrado)
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    // Registrar el error
    console.error(error);
    // Enviar la respuesta de error
    return res.status(500).send('Error al obtener el usuario.');
  }
};

exports.login = async (req, res) => {
  try {
    // Obtener los parámetros de la solicitud
    const user_name = req.body.username;
    const user_password = req.body.password;
    const nickname = req.body.nickname;
    const email = req.body.email;
    // Validar los parámetros
    const errores = userValidator.validateUser(user_name, user_password);
    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }
    // Comprobar si el usuario existe
    const user = await UserModel.getByUser(user_name);
    if (user) {
      // Comprobar si las contraseñas coinciden
      const match = await bcrypt.compare(user_password, user.user_password);
      if (match) {
        // Generar un token JWT con cierta información
        console.log(user)
        const accessToken = await jwt.sign({
          id_user: user.id_user,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRATION_TIME
        });
        // Responder con el token
        return res.json({ accessToken });
      }
    }
    return res.status(401).send('Usuario y/o clave inválida.' );
  } catch (error) {
    // Registrar el error
    console.error(error);
    // Enviar la respuesta
    return res.status(500).send('Error al iniciar sesión.' );
  }
};
