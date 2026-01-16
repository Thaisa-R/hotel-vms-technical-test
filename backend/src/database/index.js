const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
    logging: false
  }
);

module.exports = sequelize;

async function conectar() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o PostgreSQL (Hotel VMS) estabelecida!');

    require('../models/Hotel');
    require('../models/Reserva');
    
    await sequelize.sync(); 
    console.log('Tabelas sincronizadas com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao banco:', error.message);
  }
}

conectar();