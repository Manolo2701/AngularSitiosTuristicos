const bcrypt = require('bcryptjs');

// Contraseña en texto plano que quieres hashear
const password = 'admin1'; // Cambia esto por la contraseña que desees

// Función para generar hash de la contraseña usando bcrypt
function generateHash(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  console.log('Hash generado:', hash);
  return hash;
}

// Ejecuta la función
const hashedPassword = generateHash(password);
console.log('Contraseña hasheada para db.json:', hashedPassword);
