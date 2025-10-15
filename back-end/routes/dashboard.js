const express = require('express');
const { getItensBBTS } = require('../utils/csvReader');
const { 
  calcularEstoqueDisponivel, 
  classificarStatusEstoque,
  calcularEstoqueDefeituoso 
} = require('../utils/calculosEstoque');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const itens = await getItensBBTS();
    
    // Filtrar apenas itens com estoque relevante
    const itensRelevantes = itens.filter(item => 
      parseInt(item.saldo_manut) > 0 || parseInt(item.cmm) > 0
    );
    
    const itensCriticos = itensRelevantes.filter(item => 
      classificarStatusEstoque(item) === 'critico'
    ).length;
    
    const itensAlerta = itensRelevantes.filter(item => 
      classificarStatusEstoque(item) === 'alerta'
    ).length;
    
    const totalDefeituosos = itensRelevantes.reduce((total, item) => 
      total + calcularEstoqueDefeituoso(item), 0
    );
    
    // Alertas (apenas itens críticos)
    const alertas = itensRelevantes
      .filter(item => classificarStatusEstoque(item) === 'critico')
      .slice(0, 3)
      .map(item => ({
        codigo: item.codigo,
        descricao: `Item ${item.abc}-${item.tipo}`,
        tipo: 'ESTOQUE CRÍTICO',
        estoqueAtual: calcularEstoqueDisponivel(item),
        cmm: item.cmm,
        localizacao: 'SP-01',
        prioridade: 'alta'
      }));
    
    res.json({
      metricas: {
        itensCriticos,
        itensAlerta,
        pecasDefeituosas: totalDefeituosos,
        totalItens: itensRelevantes.length
      },
      alertas
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar dashboard' });
  }
});

module.exports = router;