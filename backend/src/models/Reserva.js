const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');
const Hotel = require('./Hotel');

const Reserva = sequelize.define('Reserva', {
  hospede_nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data_checkin: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  data_checkout: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
});

Hotel.hasMany(Reserva, { foreignKey: 'hotel_id' });
Reserva.belongsTo(Hotel, { foreignKey: 'hotel_id' });

module.exports = Reserva;