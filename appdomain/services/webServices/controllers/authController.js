const jwt = require('jsonwebtoken');
const User = require('../../../infrastructure/models/source/usersDTO');
const config = require('../../../infrastructure/config/config.json');
const Constants = require('../../../infrastructure/resources/ConstantsQuery');
const runQuery = require('../../../infrastructure/config/poolbase');
const { getPasswordFromBody, hashPassword, isBcryptHash, verifyPassword } = require('../../../utility/passwords');

const env = process.env.NODE_ENV || 'development';
const envConfig = config[env];

function createAuthResponse(user, jwtSecret) {
  const token = jwt.sign(
    {
      legacyToken: user.token,
      id_usuario: user.id_usuario,
      id_pais: user.id_pais
    },
    jwtSecret,
    { expiresIn: '8h' }
  );

  return {
    token,
    user: {
      id_usuario: user.id_usuario,
      id_pais: user.id_pais
    },
    legacyToken: user.token
  };
}

function validateLoginBody(body) {
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const password = getPasswordFromBody(body);

  if (!email) {
    return { message: 'Email es obligatorio' };
  }

  if (!password || typeof password !== 'string') {
    return { message: 'Password es obligatorio' };
  }

  return null;
}

const authController = {
  login: async (req, res) => {
    const validationError = validateLoginBody(req.body);
    if (validationError) {
      return res.status(400).json(validationError);
    }

    const email = req.body.email.trim();
    const userPassword = getPasswordFromBody(req.body);

    const jwtSecret = process.env.JWT_SECRET || envConfig.jwtSecret;
    if (!jwtSecret || jwtSecret === 'change_me') {
      return res.status(500).json({ message: 'JWT_SECRET no esta configurado' });
    }

    try {
      const rows = await runQuery(Constants.ServicesMethod.GetLoginUser, [email, email]);

      if (rows.length === 0) {
        return res.status(401).json({ message: 'Credenciales invalidas' });
      }

      const user = rows[0];
      const validPassword = await verifyPassword(userPassword, user.password);

      if (!validPassword) {
        return res.status(401).json({ message: 'Credenciales invalidas' });
      }

      if (!isBcryptHash(user.password)) {
        await User.update(
          { contrasena: await hashPassword(userPassword) },
          { where: { id: user.id_usuario } }
        );
      }

      res.json(createAuthResponse(user, jwtSecret));
    } catch (error) {
      console.error('Error al iniciar sesion:', error);
      res.status(500).json({ message: 'Error al iniciar sesion' });
    }
  }
};

module.exports = {
  authController
};
