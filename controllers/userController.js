const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userValidator = require('../validators/userValidator');
const UserModel = require("../models/userModel");

exports.create = async (req, res) => {
  try {
    // Obtener los parámetros de la solicitud
    const user_name = req.body.username;
    const user_password = req.body.password;
    // Validar los parámetros
    const errores = userValidator.validateUser(user_name, user_password);
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
    const id_user = req.params.id_user;
    // Comprobar si el usuario a eliminar es el mismo que está haciendo la solicitud
    if (id_user != req.user.id) {
      return res.send('No puedes eliminar los usuarios de otros usuarios.');
    }
    // Eliminar el usuario
    await UserModel.delete(id_user);
    // Enviar la respuesta
    return res.send('El registro ha sido eliminado con éxito.');
  } catch (error) {
    // Registrar el error
    console.error(error);
    // Enviar la respuesta
    return res.status(500).send('Error al eliminar.');
  }
};

exports.login = async (req, res) => {
  try {
    // Obtener los parámetros de la solicitud
    const user_name = req.body.username;
    const user_password = req.body.password;
    // Validar los parámetros
    const errores = userValidator.validateUser(user_name, user_password);
    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }
    // Comprobar si el usuario existe
    const user = await UserModel.getByUser(user_name);
    if (user) {
      // Comprobar si las contraseñas coinciden
      const match = await bcrypt.compare(user_password, user.password);
      if (match) {
        // Generar un token JWT con cierta información
        const accessToken = await jwt.sign({
          id: user.id_user,
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
