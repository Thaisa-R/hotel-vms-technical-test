const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const auth = require('./middleware/auth');
const Hotel = require('./models/Hotel'); 
const Reserva = require('./models/Reserva');
const Hospede = require('./models/Hospede');

// Rota de Login
router.post('/login', (req, res) => {
  const { usuario, senha } = req.body;
  if (usuario === 'admin' && senha === '123456') {
    const secret = process.env.JWT_SECRET || 'hotel_vms_secret';
    const token = jwt.sign({ id: 1 }, secret, { expiresIn: '1d' });
    return res.json({ token });
  }
  return res.status(401).json({ error: 'Usuário ou senha inválidos' });
});

// Rota para listar Hotéis
router.get('/hoteis', auth, async (req, res) => {
  try {
    const hoteis = await Hotel.findAll();
    res.json(hoteis);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar hotéis' });
  }
});

// Rota para criar novo Hotel
router.post('/hoteis', auth, async (req, res) => {
  try {
    const { nome, cidade, qtd_quartos } = req.body;
    const hotel = await Hotel.create({ nome, cidade, qtd_quartos });
    return res.status(201).json(hotel);
  } catch (error) {

    return res.status(400).json({ error: 'Erro ao cadastrar hotel' });
  }
});

// Rota para atualizar Hotel
router.put('/hoteis/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, cidade, qtd_quartos } = req.body;
    
    const hotel = await Hotel.findByPk(id);
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel não encontrado' });
    }
    
    await hotel.update({ nome, cidade, qtd_quartos });
    return res.json(hotel);
  } catch (error) {
    return res.status(400).json({ error: 'Erro ao atualizar hotel' });
  }
});

// Rota para excluir Hotel
router.delete('/hoteis/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    const hotel = await Hotel.findByPk(id);
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel não encontrado' });
    }
    
    await hotel.destroy();
    return res.json({ message: 'Hotel excluído com sucesso' });
  } catch (error) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(500).json({ message: 'Não é possível excluir: existem vínculos ativos' });
    }
    return res.status(400).json({ error: 'Erro ao excluir hotel' });
  }
});


// Rota para listar Reservas
router.get('/reservas', auth, async (req, res) => {
  try {
    const reservas = await Reserva.findAll({ 
      include: { model: Hotel }
    });
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar reservas' });
  }
});

// Rota para criar nova Reserva
router.post('/reservas', auth, async (req, res) => {
  try {
    const { hospede_nome, data_checkin, data_checkout, hotel_id } = req.body;
    const reserva = await Reserva.create({ 
      hospede_nome, 
      data_checkin, 
      data_checkout, 
      hotel_id 
    });
    return res.status(201).json(reserva);
  } catch (error) {
    return res.status(400).json({ error: 'Erro ao cadastrar reserva' });
  }
});

// Rota para atualizar Reserva
router.put('/reservas/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { hospede_nome, data_checkin, data_checkout, hotel_id } = req.body;
    
    const reserva = await Reserva.findByPk(id);
    if (!reserva) {
      return res.status(404).json({ error: 'Reserva não encontrada' });
    }
    
    // Validação: Verifica se o hotel realmente existe
    if (hotel_id) {
      const hotel = await Hotel.findByPk(hotel_id);
      if (!hotel) {
        return res.status(404).json({ error: 'Hotel não encontrado' });
      }
    }
    
    await reserva.update({ hospede_nome, data_checkin, data_checkout, hotel_id });
    return res.json(reserva);
  } catch (error) {
    return res.status(400).json({ error: 'Erro ao atualizar reserva' });
  }
});

// Rota para excluir Reserva
router.delete('/reservas/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    const reserva = await Reserva.findByPk(id);
    if (!reserva) {
      return res.status(404).json({ error: 'Reserva não encontrada' });
    }
    
    await reserva.destroy();
    return res.json({ message: 'Reserva excluída com sucesso' });
  } catch (error) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(500).json({ message: 'Não é possível excluir: existem vínculos ativos' });
    }
    return res.status(400).json({ error: 'Erro ao excluir reserva' });
  }
});

// Rota para listar hóspedes por reserva
router.get('/reservas/:id/hospedes', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const hospedes = await Hospede.findAll({ 
      where: { reserva_id: id },
      include: { model: Reserva }
    });
    res.json(hospedes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar hóspedes da reserva' });
  }
});

// Rota para listar todos os hóspedes com os dados da reserva associada
router.get('/hospedes', auth, async (req, res) => {
  try {
    const hospedes = await Hospede.findAll({ include: Reserva });
    res.json(hospedes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar hóspedes' });
  }
});

// Cadastrar novo hóspede vinculado a uma reserva
router.post('/hospedes', auth, async (req, res) => {
  try {
    const { nome, documento, reserva_id } = req.body;
    const hospede = await Hospede.create({ nome, documento, reserva_id });
    res.status(201).json(hospede);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao cadastrar hóspede' });
  }
});

// Rota para atualizar Hóspede
router.put('/hospedes/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, documento, reserva_id } = req.body;
    
    const hospede = await Hospede.findByPk(id);
    if (!hospede) {
      return res.status(404).json({ error: 'Hóspede não encontrado' });
    }
    
    await hospede.update({ nome, documento, reserva_id });
    return res.json(hospede);
  } catch (error) {
    return res.status(400).json({ error: 'Erro ao atualizar hóspede' });
  }
});

// Rota para excluir Hóspede
router.delete('/hospedes/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    const hospede = await Hospede.findByPk(id);
    if (!hospede) {
      return res.status(404).json({ error: 'Hóspede não encontrado' });
    }
    
    await hospede.destroy();
    return res.json({ message: 'Hóspede excluído com sucesso' });
  } catch (error) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(500).json({ message: 'Não é possível excluir: existem vínculos ativos' });
    }
    return res.status(400).json({ error: 'Erro ao excluir hóspede' });
  }
});

module.exports = router;