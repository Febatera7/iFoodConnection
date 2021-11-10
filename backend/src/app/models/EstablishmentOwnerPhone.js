const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class EstablishmentOwnerPhone extends Model {
    static init(sequelize) {
        super.init(
            {
                nr_ddd: Sequelize.STRING,
                nr_telefone: Sequelize.STRING,
                cd_telefone: Sequelize.STRING,
            },
            {
                sequelize,
                tableName: 't_ifd_tel_resp',
            },
        )

        return this;
    }

    static associate(models) {
        this.belongsTo(models.EstablishmentOwner, { foreignKey: 't_ifd_rest_cd_resp', as: 'owner' });
    }
}

module.exports = EstablishmentOwnerPhone;
