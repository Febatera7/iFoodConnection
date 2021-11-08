const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Establishment = require('../models/Establishment');
const authConfig = require('../../config/auth');

class SessionController {
  async create(req, res) {
    try {
      const { email, password } = req.body;

      const establishment = await Establishment.findOne({ email });
  
      if (!establishment) {
        return res.status(401).json({ message: 'Usuário e/ou senha inválidos' });
      }
  
      if (!(await bcrypt.compare(password, establishment.password))) {
        return res.status(401).json({ message: 'Usuário e/ou senha inválidos' });
      }
  
      const token = jwt.sign({ id: establishment._id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      });
  
      await establishment.updateOne({
        token,
        last_login: new Date(),
      });
  
      const establishmentUpdated = await Establishment.findOne({ token });
  
      let data = new Date(establishmentUpdated.last_login.valueOf() - establishmentUpdated.last_login.getTimezoneOffset() * 60000);
      const ultimo_login = data.toISOString().replace(/\.\d{3}Z$/, '');
  
      return res.json({
        id: establishmentUpdated.id,
        nome: establishmentUpdated.name,
        email: establishmentUpdated.email,
        ultimo_login,
        token: establishmentUpdated.token,
        });  
    } catch(err) {
      return res.status(400).send(err);
    }
  }
}

module.exports = new SessionController();
