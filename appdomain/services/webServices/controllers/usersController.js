const jwt = require('jsonwebtoken');
const User = require('../../../infrastructure/models/source/usersDTO');
const config = require('../../../infrastructure/config/config.json');
const usersRepository = require('../repository/usersRepository');
const utilitys = require('../../../utility/utilitys');
const Constants = require('../../../infrastructure/resources/ConstantsQuery');
const runQuery = require('../../../infrastructure/config/poolbase');

const env = process.env.NODE_ENV || 'development';
const envConfig = config[env];

const usersRepository_ = new usersRepository();
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

    try {
      const rows = await runQuery(Constants.ServicesMethod.GetLogin, [email, email, pass]);
      console.log('Rows result: ', rows)
      // Verificar si hay resultados
      if (rows.length == 0) {
        return res.status(200).json({ message: 'No se encontro ningun usuario con las credenciales' });
      }

      res.json({ result: rows });
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
    const { usuario, contraseña, id_colaborador, id_rol, id_estado } = req.body;

    try {
      const existingUser = await User.findOne({ where: { usuario } });
      if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya existe' });
      }

      const fecha = utilitys_.getCurrentTimestamp();
      const newUser = await User.create({
        usuario,
        contraseña,
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
    const { usuario, contraseña, id_colaborador, id_rol, id_estado } = req.body;

    try {
      const user = await User.findOne({ where: { id: userId } });

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const fecha = utilitys_.getCurrentTimestamp();
      await User.update(
        {
          usuario,
          contraseña,
          id_colaborador,
          id_rol,
          id_estado,
          fecha_actualizacion : fecha
        },
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