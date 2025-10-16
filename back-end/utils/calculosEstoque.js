// Cálculos baseados no CSV real do hackathon
const calcularEstoqueDisponivel = (item) => {
  return parseInt(item.saldo_manut) -
    parseInt(item.stage_manut) -
    parseInt(item.pecas_teste_kit) -
    parseInt(item.pecas_teste);
};

const calcularEstoqueDefeituoso = (item) => {
  return parseInt(item.fornecedor_reparo) +
    parseInt(item.laboratorio) +
    parseInt(item.wr) +
    parseInt(item.wrcr) +
    parseInt(item.stage_wr);
};

const calcularNecessidadeCompra = (item) => {
  const estoqueDisponivel = calcularEstoqueDisponivel(item);
  const cmm = parseFloat(item.cmm) || 0;
  const coefPerda = parseFloat(item.coef_perda) || 0;

  const cmmAjustado = cmm * (1 + coefPerda);
  const estoqueMinimo = cmmAjustado * 1.5; // 1.5 meses de segurança

  const necessidade = estoqueMinimo - estoqueDisponivel;
  return Math.max(0, Math.ceil(necessidade));
};

const classificarStatusEstoque = (item) => {
  const disponivel = calcularEstoqueDisponivel(item);
  const cmm = parseFloat(item.cmm) || 1;
  const estoqueMinimo = cmm * 1.5;

  if (disponivel <= estoqueMinimo * 0.3) return 'critico';
  if (disponivel <= estoqueMinimo * 0.6) return 'alerta';
  return 'normal';
};

const getDescricaoPorTipo = (tipo) => {
  const tipos = {
    '15': 'Processador Intel i7',
    '8': 'Memória DDR4 8GB',
    '50': 'HD SSD 500GB',
    '2': 'Placa de Vídeo RTX',
    '12': 'Fonte ATX 600W',
    '25': 'Monitor 24" LED',
    '20': 'Item Tipo 20',
    '19': 'Item Tipo 19'
  };
  return tipos[tipo] || `Item Tipo ${tipo}`;
};

const getPrecoPorABC = (abc) => {
  const precos = { 'A': 1000, 'B': 500, 'C': 200 };
  return precos[abc] || 100;
};

module.exports = {
  calcularEstoqueDisponivel,
  calcularEstoqueDefeituoso,
  calcularNecessidadeCompra,
  classificarStatusEstoque,
  getDescricaoPorTipo,
  getPrecoPorABC
};