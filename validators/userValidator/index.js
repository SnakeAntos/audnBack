exports.validateUser = (username, password) => {
    const errores = [];
  
    if (!username || username.trim() === '') {
      errores.push('El nombre de usuario es obligatorio');
    }
  
    if (!password || password.trim() === '') {
        errores.push('La clave es obligatoria');
    }

    if (password && password.trim().length < 8) {
        errores.push('La clave debe tener al menos 8 caracteres');
    }
  
    return errores;
  };
  