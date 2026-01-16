const Reserva = require('../models/Reserva');
const Hotel = require('../models/Hotel');

module.exports = {
  // Criar uma nova Reserva
  async store(req, res) {
    try {
      const { hotel_id, hospede_nome, data_checkin, data_checkout } = req.body;

      // Validação: Verifica se o hotel realmente existe
      const hotel = await Hotel.findByPk(hotel_id);
      if (!hotel) {
        return res.status(404).json({ error: 'Hotel não encontrado' });
      }

      const reserva = await Reserva.create({
        hotel_id,
        hospede_nome,
        data_checkin,
        data_checkout
      });

      return res.status(201).json(reserva);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao criar reserva' });
    }
  },

  // Listar todas as Reservas
  async index(req, res) {
    try {
      const reservas = await Reserva.findAll({
        include: [{ model: Hotel, attributes: ['nome', 'cidade'] }]
      });
      return res.json(reservas);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar reservas' });
    }
  }
};