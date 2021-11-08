const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const authConfig = require('../../config/auth');
const Establishment = require('../models/Establishment');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  const [, token] = authHeader.split(' ');

  if (!token) {
    return res.status(401).json({
      mensagem: 'Não autorizado',
    });
  }

  try {
    const establishment = await Establishment.findOne({ token });

    if (!establishment) {
      return res.status(401).json({ mensagem: 'Não autorizado' });
    }

    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.establishmentId = decoded._id ? decoded._id : decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({
      mensagem: 'Sessão expirada',
    });
  }
};
