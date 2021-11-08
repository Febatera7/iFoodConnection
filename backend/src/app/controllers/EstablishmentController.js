const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const authConfig = require('../../config/auth');
const Establishment = require('../models/Establishment');

class EstablishmentController {
  async create(req, res) {
    try {
      const {
        name,
        email,
        password,
        cnpj,
        address,
        addressComplement = "",
        phones
      } = req.body;

      const emailExist = await Establishment.findOne({ email });

      if (emailExist) {
        return res.status(400).json({ message: 'E-mail já existente.' });
      }

      const _id = await crypto.randomBytes(4).toString('HEX');

      const token = await jwt.sign({ _id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      });

      const passwordHash = await bcrypt.hash(password, 8);

      const establishment = await Establishment.create({
        _id,
        name,
        email,
        password: passwordHash,
        cnpj,
        address,
        addressComplement,
        phones,
        last_login: new Date(),
        token,
      });

      const createdData = new Date(establishment.createdAt.valueOf() - establishment.createdAt.getTimezoneOffset() * 60000);
      const data_criacao = createdData.toISOString().replace(/\.\d{3}Z$/, '');

      const updatedData = new Date(establishment.updatedAt.valueOf() - establishment.updatedAt.getTimezoneOffset() * 60000);
      const data_atualizacao = updatedData.toISOString().replace(/\.\d{3}Z$/, '');

      return res.status(201).json({
        _id: establishment.id,
        nome: establishment.name,
        email: establishment.email,
        endereco: establishment.address,
        telefones: establishment.phones.map(p => {
          return {
            ddd: p.ddd,
            numero: p.number
          };
        }),
        data_criacao,
        data_atualizacao,
        token: establishment.token,
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  }

  async read(req, res) {
    try {
      const establishment = await Establishment.findOne({ _id: req.establishmentId });

      const createdData = new Date(establishment.createdAt.valueOf() - establishment.createdAt.getTimezoneOffset() * 60000);
      const data_criacao = createdData.toISOString().replace(/\.\d{3}Z$/, '');

      const updatedData = new Date(establishment.updatedAt.valueOf() - establishment.updatedAt.getTimezoneOffset() * 60000);
      const data_ultima_atualizacao = updatedData.toISOString().replace(/\.\d{3}Z$/, '');

      const sessionData = new Date(establishment.last_login.valueOf() - establishment.last_login.getTimezoneOffset() * 60000);
      const ultimo_login = sessionData.toISOString().replace(/\.\d{3}Z$/, '');

      return res.status(200).json({
        nome: establishment.name,
        email: establishment.email,
        cnpj: establishment.cnpj,
        endereço: establishment.address,
        telefones: establishment.phones,
        ultimo_login,
        data_criacao,
        data_ultima_atualizacao,
        token: establishment.token,
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  }

  async update(req, res) {
    try {
      const establishment = await Establishment.findOne({ _id: req.establishmentId });

      if (!establishment) {
        return res.status(400).json({ message: "Restaurante não encontrado." });
      }

      await Establishment.findOneAndUpdate(
        { _id: req.establishmentId },
        { $set: req.body }
      );

      return res.status(200).json({ message: "Dados do restaurante atualizados com sucesso." });
    } catch (err) {
      return res.status(400).send(err);
    }
  }

  async delete(req, res) {
    try {
      const establishment = await Establishment.findOne({ _id: req.establishmentId });

      if (!establishment) {
        return res.status(400).json({ message: "Restaurante não encontrado." });
      }

      await Establishment.findOneAndDelete({ _id: req.establishmentId });

      return res.status(200).json({ message: "Restaurante deletado com sucesso." });
    } catch (err) {
      return res.status(400).send(err);
    }
  }
}

module.exports = new EstablishmentController();
