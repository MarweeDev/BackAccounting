const ModelDTO = require('../../../infrastructure/models/shared/typePayDTO');
const ModelSubDTO = require('../../../infrastructure/models/shared/SubTypePayDto');

const typePayController = {
  
  get: async (req, res) => {
    try {
      const result = await ModelDTO.findAll({where: {id_estado : 1}});
      res.json({ result });
    } catch (error) {
      console.error('Error al obtener tipo de pago:', error);
      res.status(500).json({ message: 'Error al obtener tipo de pago' });
    }
  },

  getSubPay: async (req, res) => {
    const Id = req.params.id;
    try {
      const result = await ModelSubDTO.findAll({where: {id_tipopago: Id, id_estado : 1}});
      res.json({ result });
    } catch (error) {
      console.error('Error al obtener sub tipo de pago:', error);
      res.status(500).json({ message: 'Error al obtener sub tipo de pago' });
    }
  },

}

module.exports = {
    typePayController
};