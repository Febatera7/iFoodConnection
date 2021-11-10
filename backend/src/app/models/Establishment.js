const Sequelize = require('sequelize');
const { Model } = require('sequelize');
class Establishment extends Model {
  static init(sequelize) {
    super.init(
      {
        nm_usuario: Sequelize.STRING,
        ds_email: Sequelize.STRING,
        nr_cnpj: Sequelize.STRING,
        nm_razao_social: Sequelize.STRING,
        nm_loja: Sequelize.STRING,
        ds_especialidade: Sequelize.STRING,
        ds_plano: Sequelize.STRING,
        dt_entrada: Sequelize.DATE,
      },
      {
        sequelize,
        tableName: 't_ifd_rest',
      },
    )

    return this;
  }

  static associate(models) {
    this.belongsTo(models.EstablishmentOwner, { foreignKey: 't_ifd_rest_cd_resp', as: 'owner' });
  }
}

module.exports = Establishment;
