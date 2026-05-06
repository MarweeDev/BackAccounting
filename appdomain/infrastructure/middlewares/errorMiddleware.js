function notFoundHandler(req, res) {
  res.status(404).json({ message: 'Ruta no encontrada' });
}

function errorHandler(error, req, res, next) {
  console.error('Error no controlado:', error);

  if (res.headersSent) {
    return next(error);
  }

  res.status(error.status || 500).json({
    message: error.message || 'Error interno del servidor'
  });
}

module.exports = {
  errorHandler,
  notFoundHandler
};
