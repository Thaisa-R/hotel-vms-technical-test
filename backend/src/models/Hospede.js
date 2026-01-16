const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');
const Reserva = require('./Reserva');

const Hospede = sequelize.define('Hospede', {
  nome: { type: DataTypes.STRING, allowNull: false },
  documento: { type: DataTypes.STRING, allowNull: false }
});

Reserva.hasMany(Hospede, { foreignKey: 'reserva_id' });
Hospede.belongsTo(Reserva, { foreignKey: 'reserva_id' });

module.exports = Hospede;