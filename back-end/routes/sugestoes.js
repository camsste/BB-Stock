const express = require('express');
const { getItensBBTS } = require('../utils/csvReader');
const { 
  calcularNecessidadeCompra, 
  classificarStatusEstoque,
  getDescricaoPorTipo,
  getPrecoPorABC
} = require('../utils/calculosEstoque');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const itens = await getItensBBTS();
    
    const itensRelevantes = itens.filter(item => 
      parseInt(item.saldo_manut) > 0 || parseInt(item.cmm) > 0
    );
    
    const sugestoes = itensRelevantes
      .filter(item => classificarStatusEstoque(item) !== 'normal')
      .map(item => {
        const quantidadeSugerida = calcularNecessidadeCompra(item);
        const prioridade = classificarStatusEstoque(item);
        
        return {
          codigo: item.codigo,
          descricao: getDescricaoPorTipo(item.tipo),
          quantidadeSugerida,
          prioridade,
          estoqueAtual: parseInt(item.saldo_manut),
          cmm: item.cmm,
          classe: item.abc,
          valorEstimado: quantidadeSugerida * getPrecoPorABC(item.abc),
          status: 'pending'
        };
      })
      .sort((a, b) => {
        const prioridadeOrder = { 'critico': 1, 'alerta': 2 };
        return prioridadeOrder[a.prioridade] - prioridadeOrder[b.prioridade];
      });
    
    const resumo = {
      totalItens: sugestoes.length,
      valorTotal: sugestoes.reduce((sum, s) => sum + s.valorEstimado, 0),
      prioridadeAlta: sugestoes.filter(s => s.prioridade === 'critico').length,
      prioridadeMedia: sugestoes.filter(s => s.prioridade === 'alerta').length
    };
    
    res.json({ sugestoes, resumo });
    
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar sugestões' });
  }
});

module.exports = router;