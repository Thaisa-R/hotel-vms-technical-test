const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');

const Hotel = sequelize.define('Hotel', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: false
  },
  qtd_quartos: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Hotel;