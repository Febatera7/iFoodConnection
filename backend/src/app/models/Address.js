const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Address extends Model {
    static init(sequelize) {
        super.init(
            {
                cd_end: Sequelize.INTEGER,
                ds_cep: Sequelize.STRING,
                ds_uf: Sequelize.STRING,
                ds_cidade: Sequelize.STRING,
                ds_bairro: Sequelize.STRING,
                ds_rua: Sequelize.STRING,
                nr_restaurante: Sequelize.STRING,
                ds_complemento: Sequelize.STRING,
            },
            {
                sequelize,
                tableName: 't_ifd_end'
            },
        )

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Establishment, { foreignKey: 't_ifd_rest_cd_rest', as: 'establishment' });
    }
}

module.exports = Address
