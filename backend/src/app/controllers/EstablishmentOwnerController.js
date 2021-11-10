const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authConfig = require('../../config/auth');
const { Op } = require('sequelize');
const EstablishmentOwner = require('../models/EstablishmentOwner');
const EstablishmentOwnerPhone = require('../models/EstablishmentOwnerPhone');

class EstablishmentOwnerController {
    async create(req, res) {
        try {
            const {
                responsible,
                password,
                cpf,
                email,
                phone,
            } = req.body;

            const cpfOrEmailExists = await EstablishmentOwner.findOne({
                where: {
                    [Op.or]: [
                        { nr_cpf: cpf },
                        { ds_email: email }
                    ],
                },
            });

            if (cpfOrEmailExists) {
                return cpfOrEmailExists.nr_cpf === cpf ?
                    res.status(400).json({ message: 'CPF already registered' }) :
                    cpfOrEmailExists.ds_email === email ?
                        res.status(400).json({ message: 'E-mail already registered' }) :
                        res.status(400).json({ message: 'Something went wrong :(' });
            }

            let randomNumericId = Math.floor(Math.random() * 999999999);

            const passwordHash = await bcrypt.hash(password, 8);

            const findEqualIdOnDB = await EstablishmentOwner.findOne({
                where: {
                    cd_usuario: randomNumericId
                },
            });

            if (findEqualIdOnDB) {
                randomNumericId = Math.floor(Math.random() * 999999999);
            }

            const token = await jwt.sign({ id: randomNumericId }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            });

            const establishmentOwner = await EstablishmentOwner.create({
                cd_usuario: randomNumericId,
                nm_responsavel: responsible,
                ds_senha: passwordHash,
                nr_cpf: cpf,
                ds_email: email,
                ds_token: token,
            });

            if (!establishmentOwner) {
                return res.status(400).json({ message: 'Fail to create an user' });
            }

            const ownerPhone = await EstablishmentOwnerPhone.create({
                cd_telefone: `${phone.ddd}${phone.number}`,
                nr_ddd: phone.ddd,
                nr_telefone: phone.number,
                t_ifd_rest_cd_resp: establishmentOwner.cd_usuario,
            });

            if (!ownerPhone) {
                return res.status(400).json({ message: 'Fail to create user phone' });
            }

            return res.status(201).json({
                message: 'User succesfully created',
                establishmentOwner,
                ownerPhone,
            });
        } catch (err) {
            return res.status(400).json({
                message: "Error",
                err,
            });
        }
    }

    async read(req, res) {
        try {
            const establishmentOwner = await EstablishmentOwner.findOne({
                where: {
                    cd_usuario: req.user
                }
            });

            if (!establishmentOwner) {
                return res.status(400).json({ message: 'User not found' });
            }

            const ownerPhones = await EstablishmentOwnerPhone.findAll({
                where: {
                    t_ifd_rest_cd_resp: req.user,
                }
            });

            return res.status(200).json({
                establishmentOwner,
                ownerPhones,
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
                cpf,
                email,
                phone
            } = req.body;

            const establishmentOwner = await EstablishmentOwner.findOne({
                where: {
                    cd_usuario: req.user
                }
            });

            if (!establishmentOwner) {
                return res.status(400).json({ message: 'User not found' });
            }

            await establishmentOwner.update({
                nm_responsavel: responsible,
                nr_cpf: cpf,
                ds_email: email
            });

            let phoneUpdate;

            if (phone) {
                phoneUpdate = await EstablishmentOwnerPhone.findOne({
                    where: {
                        t_ifd_rest_cd_resp: establishmentOwner.cd_usuario,
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
                message: 'User succesfully created',
                establishmentOwner,
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
            const establishmentOwner = await EstablishmentOwner.findOne({
                where: {
                    cd_usuario: req.user
                }
            });

            if (!establishmentOwner) {
                return res.status(400).json({ message: 'User not found' });
            }

            await establishmentOwner.destroy();

            return res.status(200).json(establishmentOwner);
        } catch (err) {
            return res.status(400).json({
                message: "Error",
                err
            });
        }
    }
}

module.exports = new EstablishmentOwnerController();