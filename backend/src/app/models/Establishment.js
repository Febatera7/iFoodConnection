const mongoose = require('mongoose');

const EstablishmentSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cnpj: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    addressComplement: {
      type: String,
      required: false
    },
    phones: [
      {
        ddd: {
          type: Number,
          required: true,
        },
        number: {
          type: Number,
          required: true,
        },
      },
    ],
    last_login: {
      type: Date,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Establishment', EstablishmentSchema);
