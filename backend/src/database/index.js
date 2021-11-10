const Sequelize = require('sequelize');
require('dotenv/config');

const {
  Address,
  Establishment,
  EstablishmentOwner,
  EstablishmentPhone,
  EstablishmentOwnerPhone,
  Products,
} = require('../app/models');

const models = [
  Address,
  Establishment,
  EstablishmentOwner,
  EstablishmentPhone,
  EstablishmentOwnerPhone,
  Products,
];

class Database {
  constructor() {
    this.sequelize();
  }

  sequelize() {
    this.sequelizeConnection = new Sequelize(
      process.env.DATABASE,
      process.env.DB_USERNAME,
      process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT
    });

    this.sequelizeConnection.authenticate().then(() => {
      console.log('Sequelize connected to database');
    }).catch((err) => {
      console.log(`Sequelize not connected to database: ${err}`);
    });

    models
      .map(model => model.init(this.sequelizeConnection))
      .map(model => model.associate && model.associate(this.sequelizeConnection.models))
  }
}

module.exports = new Database();
