const express = require('express');
const router = express.Router();
const estoqueData = require('../data/estoque.json');

router.get('/', async (req, res) => {
  try {
    res.json(estoqueData);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.get("/:codigo", (req, res) => {
  const { codigo } = req.params;
  const item = estoqueData.find(i => i.codigo === codigo);
  
  if (item) {
    res.json(item);
  } else {
    res.status(404).send("Item não encontrado");
  }
});

router.post("/", (req, res) => {
  const novoItem = req.body;

  if (!novoItem.codigo || !novoItem.saldo_manut) {
    return res.status(400).send("Código e saldo de manutenção são obrigatórios");
  }

  estoqueData.push(novoItem);
  res.status(201).json(novoItem);
});

router.put("/:codigo", (req, res) => {
  const { codigo } = req.params;
  const itemIndex = estoqueData.findIndex(i => i.codigo === codigo);
  
  if (itemIndex === -1) {
    return res.status(404).send("Item não encontrado");
  }

  const itemAtualizado = { ...estoque[itemIndex], ...req.body };
  estoque[itemIndex] = itemAtualizado;
  
  res.json(itemAtualizado);
});

router.delete("/:codigo", (req, res) => {
  const { codigo } = req.params;
  const itemIndex = estoqueData.findIndex(i => i.codigo === codigo);
  
  if (itemIndex === -1) {
    return res.status(404).send("Item não encontrado");
  }

  estoqueData.splice(itemIndex, 1);
  res.status(204).send();
});

module.exports = router;