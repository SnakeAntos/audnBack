exports.validatePlaylist = (name, user_id) => {
    const errores = [];
  
    if (!name || name.trim() === '') {
      errores.push('Debes ingresar un nombre para la playlist');
    }
  
    if (!user_id || !Number.isInteger(user_id)) {
      errores.push('El user_id debe ser un número entero');
    }
  
    return errores;
  };
  