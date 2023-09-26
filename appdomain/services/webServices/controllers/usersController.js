const jwt = require('jsonwebtoken');
const User = require('../../../infrastructure/models/usersDTO');
const config = require('../../../infrastructure/config/config.json');
const usersRepository = require('../Repository/usersRepository');

const env = process.env.NODE_ENV || 'development';
const envConfig = config[env];

const usersRepository_ = new usersRepository();

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

  postUser: async (req, res) => {
    const { usuario, contraseña, id_colaborador, id_rol, id_estado } = req.body;

    try {
      const existingUser = await User.findOne({ where: { usuario } });
      if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya existe' });
      }

      const fecha = usersRepository_.getCurrentTimestamp();
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

      const fecha = usersRepository_.getCurrentTimestamp();
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
    const newEstadoId = req.body.id_estado;

    try {
      const user = await User.findOne({ where: { id: userId } });

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      await User.update(
        {
          id_estado: newEstadoId
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