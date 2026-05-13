const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 12;

function isBcryptHash(value) {
  return typeof value === 'string' && /^\$2[aby]\$\d{2}\$/.test(value);
}

async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

async function verifyPassword(password, storedPassword) {
  if (!password || !storedPassword) {
    return false;
  }

  if (isBcryptHash(storedPassword)) {
    return bcrypt.compare(password, storedPassword);
  }

  return password === storedPassword;
}

function getPasswordFromBody(body) {
  return body.password || body.pass || body.contrasena || body.contraseña || body['contraseÃ±a'];
}

module.exports = {
  getPasswordFromBody,
  hashPassword,
  isBcryptHash,
  verifyPassword
};
