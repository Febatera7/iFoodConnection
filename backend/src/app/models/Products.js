const Sequelize = require('sequelize');
const { Model } = require('sequelize');
class Products extends Model {
    static init(sequelize) {
        super.init(
            {
                nm_alimento: Sequelize.STRING,
                ds_alimento: Sequelize.STRING,
                ds_tipo: Sequelize.STRING,
                vl_alimento: Sequelize.FLOAT,
            },
            {
                sequelize,
                tableName: 't_ifd_alime',
            },
        )

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Establishment, { foreignKey: 't_ifd_rest_cd_rest', as: 'establishment' });
    }
}

module.exports = Products;