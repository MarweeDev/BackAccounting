const jwt = require('jsonwebtoken');
const User = require('../../../infrastructure/models/usersDTO');
const config = require('../../../infrastructure/config/config.json');

const env = process.env.NODE_ENV || 'development';
const envConfig = config[env];

const usersController = {
  postUser : async (req, res) => {
    const { username, password, idEmpleado } = req.body;
  
    try {
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya existe' });
      }
  
      const newUser = await User.create({ username, password, idEmpleado });
  
      const token = jwt.sign({ userId: newUser.id }, envConfig.jwtSecret, { expiresIn: '1h' });
  
      res.json({ message: 'Usuario registrado exitosamente', user: newUser, token });
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      res.status(500).json({ message: 'Error al registrar usuario' });
    }
  },
  getUser: async (req, res) => {},
  updateUser: async (req, res) => {},
  deleteUser: async (req, res) => {}
};

module.exports = {
  usersController
};