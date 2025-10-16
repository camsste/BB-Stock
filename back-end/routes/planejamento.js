const express = require('express');
const router = express.Router();
const planejamentoData = require('../data/planejamento.json');

const transportOrders = planejamentoData.copyWithin();

// Endpoint para listar todos os registros
router.get('', (req, res) => {
  res.json(transportOrders);
});

// Endpoint para listar um único registro pelo ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const order = transportOrders.find(o => o.id === parseInt(id));
  if (!order) {
    return res.status(404).json({ message: 'Ordem de transporte não encontrada' });
  }
  res.json(order);
});

// Endpoint para criar um novo registro
router.post('', (req, res) => {
  const { data_ordem, data_necessidade, observacao, items } = req.body;

  if (!data_ordem || !data_necessidade || !observacao || !items || !Array.isArray(items)) {
    return res.status(400).json({ message: 'Dados inválidos' });
  }

  const newOrder = {
    id: transportOrders.length + 1, // Simula um id único
    data_ordem,
    data_necessidade,
    observacao,
    items
  };

  transportOrders.push(newOrder);
  res.status(201).json(newOrder);
});

// Endpoint para atualizar um registro pelo ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { data_ordem, data_necessidade, observacao, items } = req.body;

  const orderIndex = transportOrders.findIndex(o => o.id === parseInt(id));
  if (orderIndex === -1) {
    return res.status(404).json({ message: 'Ordem de transporte não encontrada' });
  }

  // Atualiza o registro
  transportOrders[orderIndex] = {
    id: parseInt(id),
    data_ordem,
    data_necessidade,
    observacao,
    items
  };

  res.json(transportOrders[orderIndex]);
});

// Endpoint para deletar um registro pelo ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const orderIndex = transportOrders.findIndex(o => o.id === parseInt(id));
  if (orderIndex === -1) {
    return res.status(404).json({ message: 'Ordem de transporte não encontrada' });
  }

  transportOrders.splice(orderIndex, 1); // Deleta o item do array
  res.status(204).send();
});

module.exports = router;