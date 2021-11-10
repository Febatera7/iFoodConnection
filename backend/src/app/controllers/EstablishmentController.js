const { Op } = require('sequelize');
const Establishment = require('../models/Establishment');
const EstablishmentOwner = require('../models/EstablishmentOwner');
const EstablishmentPhone = require('../models/EstablishmentPhone');
const Address = require('../models/Address');

class EstablishmentController {
  async create(req, res) {
    try {
      const {
        corporateName,
        establishmentName,
        plan,
        especiality,
        email,
        cnpj,
        address,
        phone
      } = req.body;

      const owner = await EstablishmentOwner.findOne({
        where: {
          cd_usuario: req.user
        }
      });

      if (!owner) {
        return res.status(400).json({
          message: 'User not found'
        });
      }

      const userAlreadyHaveEstablishment = await Establishment.findOne({
        where: {
          t_ifd_rest_cd_resp: req.user
        }
      });

      if (userAlreadyHaveEstablishment) {
        return res.status(400).json({
          message: "User already have establishment"
        })
      }

      const cnpjOrEmailExists = await Establishment.findOne({
        where: {
          [Op.or]: [
            { nr_cnpj: cnpj },
            { ds_email: email }
          ],
        },
      });

      if (cnpjOrEmailExists) {
        return cnpjOrEmailExists.nr_cnpj === cnpj ?
          res.status(400).json({ message: 'CPF already registered' }) :
          cnpjOrEmailExists.ds_email === email ?
            res.status(400).json({ message: 'E-mail already registered' }) :
            res.status(400).json({ message: 'Something went wrong :(' });
      }

      let randomNumericEstablishmentId = Math.floor(Math.random() * 9999999999);

      const findEqualEstablishmentIdOnDB = await Establishment.findOne({
        where: {
          cd_rest: randomNumericEstablishmentId
        },
      });

      if (findEqualEstablishmentIdOnDB) {
        randomNumericEstablishmentId = Math.floor(Math.random() * 9999999999);
      }

      const establishment = await Establishment.create({
        cd_rest: randomNumericEstablishmentId,
        nm_usuario: owner.nm_responsavel,
        ds_email: email,
        nm_razao_social: corporateName,
        nm_loja: establishmentName,
        nr_cnpj: cnpj,
        ds_plano: plan,
        ds_especialidade: especiality,
        t_ifd_rest_cd_resp: owner.cd_usuario,
      });

      if (!establishment) {
        return res.status(400).json({ message: 'Fail to create establishment' });
      }

      let randomNumericAddressId = Math.floor(Math.random() * 99999999);

      const findEqualAddressIdOnDB = await Establishment.findByPk(randomNumericAddressId);

      if (findEqualAddressIdOnDB) {
        randomNumericAddressId = Math.floor(Math.random() * 99999999);
      }

      const establishmentAddress = await Address.create({
        cd_end: randomNumericAddressId,
        ds_cep: address.cep,
        ds_uf: address.state,
        ds_cidade: address.city,
        ds_bairro: address.neighborhood,
        ds_rua: address.street,
        nr_restaurante: address.number,
        ds_complemento: address.addressComplement,
        t_ifd_rest_cd_rest: establishment.cd_rest,
      });

      if (!establishmentAddress) {
        return res.status(400).json({ message: 'Fail to create establishment address' });
      }

      const establishmentPhone = await EstablishmentPhone.create({
        cd_telefone: `${phone.ddd}${phone.number}`,
        nr_ddd: phone.ddd,
        nr_telefone: phone.number,
        t_ifd_end_cd_end: establishmentAddress.cd_end,
      });

      if (!establishmentPhone) {
        return res.status(400).json({ message: 'Fail to create establishment phone' });
      }

      return res.status(201).json({
        message: "Created establishment",
        establishment,
        establishmentAddress,
        establishmentPhone
      });
    } catch (err) {
      return res.status(400).json({
        message: "Error",
        err
      });
    }
  }

  async read(req, res) {
    try {
      const establishment = await Establishment.findOne({
        where: {
          t_ifd_rest_cd_resp: req.user
        }
      });
      
      if (!establishment) {
        return res.status(400).json({ message: "Establishment not found" });
      }
      
      const address = await Address.findOne({
        where: {
          t_ifd_rest_cd_rest: establishment.cd_rest,
        },
      });
      
      const phone = await EstablishmentPhone.findAll({
        where: {
          t_ifd_end_cd_end: address.cd_end,
        },
      });

      return res.status(200).json({
        establishment,
        address,
        phone,
      });
    } catch (err) {
      return res.status(400).json({
        message: "Error",
        err
      });
    }
  }

  async update(req, res) {
    try {
      const {
        responsible,
        corporateName,
        establishmentName,
        plan,
        especiality,
        email,
        cnpj,
        address,
        phone
      } = req.body;

      const establishment = await Establishment.findOne({
        where: {
          t_ifd_rest_cd_resp: req.user
        }
      });

      if (!establishment) {
        return res.status(400).json({ message: "Establishment not found" });
      }

      await establishment.update({
        nm_usuario: responsible,
        ds_email: email,
        nm_razao_social: corporateName,
        nm_loja: establishmentName,
        nr_cnpj: cnpj,
        ds_plano: plan,
        ds_especialidade: especiality,
      });

      console.log(establishment);

      let addressUpdate;

      if (address) {
        addressUpdate = await Address.findOne({
          where: {
            t_ifd_rest_cd_rest: establishment.cd_rest,
          },
        });

        await addressUpdate.update({
          ds_cep: address.cep,
          ds_uf: address.state,
          ds_cidade: address.city,
          ds_bairro: address.neighborhood,
          ds_rua: address.street,
          nr_restaurante: address.number,
          ds_complemento: address.addressComplement,
        });
      }

      let phoneUpdate;

      if (phone) {
        const addressUpdatedOrNot = await Address.findOne({
          where: {
            t_ifd_rest_cd_rest: establishment.cd_rest,
          },
        });

        phoneUpdate = await EstablishmentPhone.findOne({
          where: {
            t_ifd_end_cd_end: addressUpdatedOrNot.cd_end,
          },
        });

        await phoneUpdate.update({
          nr_ddd: phone.ddd,
          nr_telefone: phone.number,
          cd_telefone: phone.ddd && !phone.number ? `${phone.ddd}${phoneUpdate.nr_telefone}` :
            phone.number && !phone.ddd ? `${phoneUpdate.nr_ddd}${phone.number}` :
              `${phone.ddd}${phone.number}`,
        });
      }


      return res.status(200).json({
        message: "Updated establishment data",
        establishment,
        addressUpdate,
        phoneUpdate
      });
    } catch (err) {
      return res.status(400).json({
        message: "Error",
        err
      });
    }
  }

  async delete(req, res) {
    try {
      const establishment = await Establishment.findOne({
        where: {
          t_ifd_rest_cd_resp: req.user
        }
      });

      if (!establishment) {
        return res.status(400).json({ message: "Establishment not found" });
      }

      await establishment.destroy();

      return res.status(200).json({ message: "Deleted establishment" });
    } catch (err) {
      return res.status(400).json({
        message: "Error",
        err
      });
    }
  }
}

module.exports = new EstablishmentController();
