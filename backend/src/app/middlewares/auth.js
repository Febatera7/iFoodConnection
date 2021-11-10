const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const authConfig = require('../../config/auth');
const EstablishmentOwner = require('../models/EstablishmentOwner');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  const [, token] = authHeader.split(' ');

  if (!token) {
    return res.status(401).json({
      message: 'User not authorized',
    });
  }

  try {
    const owner = await EstablishmentOwner.findOne({ where: { ds_token: token } });

    if (!owner) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.user = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({
      message: 'Expired session',
    });
  }
};
