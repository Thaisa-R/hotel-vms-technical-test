const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { sequelize } = require('./models/Hotel');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o PostgreSQL (Hotel VMS) estabelecida!');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso!');
    app.listen(PORT, () => {
      console.log(`Hotel VMS rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco:', err);
  });