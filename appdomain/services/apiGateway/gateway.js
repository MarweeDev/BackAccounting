const config = require('./config.json');

function gateway(req, res, next) {
  const path = req.path;
  const targetUrl = config.users[path];

  if (targetUrl) {
    req.headers.host = new URL(targetUrl).host;
    return next();
  } else {
    return res.status(404).json({ message: 'Endpoint no encontrado' });
  }
}

module.exports = gateway;