exports.validateCupid = (user_id, song_id, is_match) => {
  const errores = [];

  if (!user_id || !Number.isInteger(user_id)) {
    errores.push("El user_id debe ser un número entero");
  }
  if (!song_id || !Number.isInteger(song_id)) {
    errores.push("El song_id debe ser un número entero");
  }

  if (!is_match || typeof is_match !== "boolean") {
    errores.push("match debe ser true o false");
  }

  return errores;
};
