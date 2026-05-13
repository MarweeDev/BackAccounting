const Supplier = require('../../../infrastructure/models/source/supplierDTO');
const utilitys = require('../../../utility/utilitys');
const utilitys_ = new utilitys();

const supplierController = {
  get: async (req, res) => {
    try {
      const result = await Supplier.findAll({
        where: { id_estado: 1 },
        order: [['id', 'DESC']]
      });

      res.json({ result });
    } catch (error) {
      console.error('Error al obtener proveedores:', error);
      res.status(500).json({ message: 'Error al obtener proveedores' });
    }
  },

  getById: async (req, res) => {
    try {
      const result = await Supplier.findOne({ where: { id: req.params.id } });

      if (!result) {
        return res.status(404).json({ message: 'Proveedor no encontrado' });
      }

      res.json({ result });
    } catch (error) {
      console.error('Error al obtener proveedor:', error);
      res.status(500).json({ message: 'Error al obtener proveedor' });
    }
  },

  post: async (req, res) => {
    const { proveedor, descripcion, nit, contacto } = req.body;

    try {
      const existing = await Supplier.findOne({ where: { nit } });
      if (existing) {
        return res.status(400).json({ message: 'El proveedor ya existe' });
      }

      const result = await Supplier.create({
        proveedor,
        descripcion,
        nit,
        contacto,
        fecha: utilitys_.getCurrentTimestamp(),
        id_estado: 1
      });

      res.json({ message: 'Proveedor registrado exitosamente', result });
    } catch (error) {
      console.error('Error al registrar proveedor:', error);
      res.status(500).json({ message: 'Error al registrar proveedor' });
    }
  },

  update: async (req, res) => {
    const { proveedor, descripcion, nit, contacto } = req.body;

    try {
      const result = await Supplier.findOne({ where: { id: req.params.id } });

      if (!result) {
        return res.status(404).json({ message: 'Proveedor no encontrado' });
      }

      await Supplier.update(
        { proveedor, descripcion, nit, contacto },
        { where: { id: req.params.id } }
      );

      res.json({ message: 'Proveedor actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar proveedor:', error);
      res.status(500).json({ message: 'Error al actualizar proveedor' });
    }
  },

  delete: async (req, res) => {
    try {
      const result = await Supplier.findOne({ where: { id: req.params.id } });

      if (!result) {
        return res.status(404).json({ message: 'Proveedor no encontrado' });
      }

      await Supplier.update({ id_estado: 2 }, { where: { id: req.params.id } });
      res.json({ message: 'Proveedor eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar proveedor:', error);
      res.status(500).json({ message: 'Error al eliminar proveedor' });
    }
  }
};

module.exports = {
  supplierController
};
