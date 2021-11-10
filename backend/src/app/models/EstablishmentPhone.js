const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class EstablishmentPhone extends Model {
    static init(sequelize) {
        super.init(
            {
                nr_ddd: Sequelize.STRING,
                nr_telefone: Sequelize.STRING,
                cd_telefone: Sequelize.STRING,
            },
            {
                sequelize,
                tableName: 't_ifd_tel_rest',
            },
        )

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Address, { foreignKey: 't_ifd_end_cd_end', as: 'endereco' });
    }
}

module.exports = EstablishmentPhone;
