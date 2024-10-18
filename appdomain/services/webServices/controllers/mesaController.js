const Mesa = require('../../../infrastructure/models/source/mesaDTO');
const runQuery = require('../../../infrastructure/config/poolbase');
const Constants = require('../../../infrastructure/resources/ConstantsQuery');

const mesaController = {

  get: async (req, res) => {
    try {
      //const { rows } = await dbServiceQuery.query(Constants.ServicesMethod.GetMesaKeyOrder, [estadoMesaId]);
      const rows = await runQuery(Constants.ServicesMethod.GetMesaKeyOrder);
      console.log('Rows result: ', rows)
      // Verificar si hay resultados
      if (rows.length == 0) {
        return res.status(400).json({ message: 'Todas están en uso por alguna orden activa' });
      }

      res.json({ result: rows });
    } catch (error) {
      console.error('Error al obtener mesa:', error);
      res.status(500).json({ message: 'Error al obtener mesa' });
    }
  },
  
  //4:Disponible - 5:Reservadas - 6:Descartadas
  getMesa: async (req, res) => {
    const estadoMesaId = req.params.id;
    try {
      const result = await Mesa.findAll({where: {id_estado : 1, estado_mesa : estadoMesaId}});
      res.json({ result });
    } catch (error) {
      console.error('Error al obtener mesa:', error);
      res.status(500).json({ message: 'Error al obtener mesa' });
    }
  },

  getMesaById: async (req, res) => {
    const Id = req.params.id;

    try {
      const result = await Mesa.findOne({ where: { id: Id } });

      if (!result) {
        return res.status(404).json({ message: 'mesa no encontrado' });
      }

      res.json({ result });
    } catch (error) {
      console.error('Error al obtener mesa por ID:', error);
      res.status(500).json({ message: 'Error al obtener mesa por ID' });
    }
  },

  postMesa: async (req, res) => {
    const { numero, nombre, capacidad } = req.body;

    try {
    const existing = await Mesa.findOne({ where: { numero, nombre } });
      if (existing) {
        return res.status(400).json({ message: 'El mesa ya existe' });
      }

      const result = await Mesa.create({
        numero,
        nombre,
        capacidad,
        estado_mesa : 4,
        id_estado : 1
      });

      res.json({ message: 'mesa registrado exitosamente', status: result });
    } catch (error) {
      console.error('Error al registrar mesa:', error);
      res.status(500).json({ message: 'Error al registrar mesa' });
    }
  },

  updateMesa: async (req, res) => {
    const Id = req.params.id;
    const { numero, nombre, capacidad } = req.body;

    try {
      const result = await Mesa.findOne({ where: { id: Id } });

      if (!result) {
        return res.status(404).json({ message: 'Mesa no encontrado' });
      }

      await Mesa.update(
        {
            numero,
            nombre,
            capacidad
        },
        { where: { id: Id } }
      );

      res.json({ message: 'Mesa actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar mesa:', error);
      res.status(500).json({ message: 'Error al actualizar mesa' });
    }
  },

  updateStatusMesa: async (req, res) => {
    const Id = req.params.id;
    const { estado_mesa } = req.body;

    try {
      const result = await Mesa.findOne({ where: { id: Id } });

      if (!result) {
        return res.status(404).json({ message: 'Mesa no encontrado' });
      }

      await Mesa.update(
        {
            estado_mesa
        },
        { where: { id: Id } }
      );

      res.json({ message: 'Mesa actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar mesa:', error);
      res.status(500).json({ message: 'Error al actualizar mesa' });
    }
  },

  deleteMesa: async (req, res) => {
    const Id = req.params.id;

    try {
      const result = await Mesa.findOne({ where: { id: Id } });

      if (!result) {
        return res.status(404).json({ message: 'Mesa no encontrado' });
      }

      await Mesa.update(
        {
            id_estado: 2
        },
        { where: { id: Id } }
      );

      res.json({ message: 'Mesa actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar mesa:', error);
      res.status(500).json({ message: 'Error al actualizar mesa' });
    }
  }
};

module.exports = {
    mesaController
};