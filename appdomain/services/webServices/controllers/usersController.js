const jwt = require('jsonwebtoken');
const User = require('../../../infrastructure/models/source/usersDTO');
const config = require('../../../infrastructure/config/config.json');
const utilitys = require('../../../utility/utilitys');
const Constants = require('../../../infrastructure/resources/ConstantsQuery');
const runQuery = require('../../../infrastructure/config/poolbase');
const { getPasswordFromBody, hashPassword, isBcryptHash, verifyPassword } = require('../../../utility/passwords');

const env = process.env.NODE_ENV || 'development';
const envConfig = config[env];

const utilitys_ = new utilitys();

const usersController = {
  
  getUser: async (req, res) => {
    try {
      const users = await User.findAll();
      res.json({ users });
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ message: 'Error al obtener usuarios' });
    }
  },

  getUserById: async (req, res) => {
    const userId = req.params.id;

    try {
      const user = await User.findOne({ where: { id: userId } });

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      res.json({ user });
    } catch (error) {
      console.error('Error al obtener usuario por ID:', error);
      res.status(500).json({ message: 'Error al obtener usuario por ID' });
    }
  },

  getLogin: async (req, res) => {
    const { email, pass } = req.query;
    res.set('Deprecation', 'true');
    res.set('Sunset', '2026-12-31');
    res.set('Link', '</appdomain/api/auth/login>; rel="successor-version"');

    try {
      const rows = await runQuery(Constants.ServicesMethod.GetLoginUser, [email, email]);
      // Verificar si hay resultados
      if (rows.length == 0) {
        return res.status(200).json({ message: 'No se encontro ningun usuario con las credenciales', status: 204, deprecated: true });
      }

      const validPassword = await verifyPassword(pass, rows[0].password);
      if (!validPassword) {
        return res.status(200).json({ message: 'No se encontro ningun usuario con las credenciales', status: 204, deprecated: true });
      }

      if (!isBcryptHash(rows[0].password)) {
        await User.update(
          { contrasena: await hashPassword(pass) },
          { where: { id: rows[0].id_usuario } }
        );
      }

      const result = rows.map(({ password, id_usuario, ...row }) => row);
      res.json({ result, deprecated: true });
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      res.status(500).json({ message: 'Error al obtener usuario' });
    }
  },

  getInfoUser: async (req, res) => {
    const { token } = req.query;

    try {
      const rows = await runQuery(Constants.ServicesMethod.GetInfoUser, [token]);
      console.log('Rows result: ', rows)
      // Verificar si hay resultados
      if (rows.length == 0) {
        return res.status(200).json({ message: 'No se encontro ninguna información del usuario' });
      }

      res.json({ result: rows });
    } catch (error) {
      console.error('Error al obtener información del usuario:', error);
      res.status(500).json({ message: 'Error al obtener información del usuario' });
    }
  },

  postUser: async (req, res) => {
    const { usuario, id_colaborador, id_rol, id_estado } = req.body;
    const password = getPasswordFromBody(req.body);

    try {
      if (!password) {
        return res.status(400).json({ message: 'La contraseña es obligatoria' });
      }

      const existingUser = await User.findOne({ where: { usuario } });
      if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya existe' });
      }

      const fecha = utilitys_.getCurrentTimestamp();
      const contrasena = await hashPassword(password);
      const newUser = await User.create({
        usuario,
        contrasena,
        id_colaborador,
        id_rol,
        id_estado,
        fecha_creacion : fecha
      });

      res.json({ message: 'Usuario registrado exitosamente', user: newUser });
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      res.status(500).json({ message: 'Error al registrar usuario' });
    }
  },

  updateUser: async (req, res) => {
    const userId = req.params.id;
    const { usuario, id_colaborador, id_rol, id_estado } = req.body;
    const password = getPasswordFromBody(req.body);

    try {
      const user = await User.findOne({ where: { id: userId } });

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const fecha = utilitys_.getCurrentTimestamp();
      const updateFields = {
        usuario,
        id_colaborador,
        id_rol,
        id_estado,
        fecha_actualizacion : fecha
      };

      if (password) {
        updateFields.contrasena = await hashPassword(password);
      }

      await User.update(
        updateFields,
        { where: { id: userId } }
      );

      res.json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      res.status(500).json({ message: 'Error al actualizar usuario' });
    }
  },

  deleteUser: async (req, res) => {
    const userId = req.params.id;

    try {
      const user = await User.findOne({ where: { id: userId } });

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      await User.update(
        {
          id_estado: 2
        },
        { where: { id: userId } }
      );

      res.json({ message: 'Estado del usuario actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar estado del usuario:', error);
      res.status(500).json({ message: 'Error al actualizar estado del usuario' });
    }
  }
};

module.exports = {
  usersController
};
