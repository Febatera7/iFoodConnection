const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class EstablishmentOwner extends Model {
    static init(sequelize) {
        super.init(
            {
                cd_usuario: Sequelize.INTEGER,
                nm_responsavel: Sequelize.STRING,
                ds_senha: Sequelize.STRING,
                nr_cpf: Sequelize.STRING,
                ds_email: Sequelize.STRING,
                ds_token: Sequelize.STRING,
            },
            {
                sequelize,
                tableName: 't_ifd_resp',
            },
        )

        return this;
    }
}


module.exports = EstablishmentOwner;