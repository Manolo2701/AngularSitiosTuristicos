const bcrypt = require('bcryptjs');

const password = process.argv[2];

if (!password) {
  console.error('Uso: node generate-hash.js <contraseña>');
  process.exit(1);
}

const saltRounds = 10;

bcrypt.hash(password, saltRounds)
  .then((hash) => {
    console.log('Hash generado:');
    console.log(hash);
  })
  .catch((error) => {
    console.error('No se pudo generar el hash:', error.message);
    process.exitCode = 1;
  });
