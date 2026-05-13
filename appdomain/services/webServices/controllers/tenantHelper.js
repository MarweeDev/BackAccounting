const User = require('../../../infrastructure/models/source/usersDTO');

async function getTenantId(req) {
  const userId = req.user?.id_usuario;

  if (!userId) {
    return null;
  }

  const user = await User.findOne({ where: { id: userId } });
  return user?.id_suscrito || null;
}

module.exports = {
  getTenantId
};
