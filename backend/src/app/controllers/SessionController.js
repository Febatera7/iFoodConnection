const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authConfig = require('../../config/auth');
const EstablishmentOwner = require('../models/EstablishmentOwner');

class SessionController {
  async create(req, res) {
    try {
      const { email, password } = req.body;

      const establishment = await EstablishmentOwner.findOne({ where: { ds_email: email } });

      if (!establishment) {
        return res.status(401).json({ message: 'Usuário e/ou senha inválidos' });
      }

      if (!(await bcrypt.compare(password, establishment.ds_senha))) {
        return res.status(401).json({ message: 'Usuário e/ou senha inválidos' });
      }

      const token = jwt.sign({ id: establishment.cd_usuario }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      });

      await establishment.update({
        ds_token: token,
      });

      return res.json({
        cd_usuario: establishment.cd_usuario,
        nome: establishment.nm_responsavel,
        email: establishment.ds_email,
        token: establishment.ds_token,
      });
    } catch (err) {
      return res.status(400).json({
        message: "Error",
        err
      });
    }
  }
}

module.exports = new SessionController();
