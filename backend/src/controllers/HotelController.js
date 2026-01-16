const Hotel = require('../models/Hotel');

module.exports = {
  // Criar Hotel
  async store(req, res) {
    try {
      const { nome, cidade, qtd_quartos } = req.body;
      const hotel = await Hotel.create({ nome, cidade, qtd_quartos });
      return res.status(201).json(hotel);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao cadastrar hotel' });
    }
  },

  // Listar Hotéis
  async index(req, res) {
    try {
      const hoteis = await Hotel.findAll();
      return res.json(hoteis);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar hotéis' });
    }
  }
};