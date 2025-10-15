import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styles } from '../styles/styles';
import { sugestoesAPI } from '../services/api';

const SugestoesScreen = ({ usuario }) => {
  const [sugestoes, setSugestoes] = useState([]);
  const [resumo, setResumo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    carregarSugestoes();
  }, []);

  const carregarSugestoes = async () => {
    try {
      const response = await sugestoesAPI.getSugestoes();
      setSugestoes(response.data.sugestoes);
      setResumo(response.data.resumo);
    } catch (error) {
      console.error('Erro ao carregar sugestões:', error);
    }
    setLoading(false);
  };

  if (loading) return <div style={styles.loading}>Carregando sugestões...</div>;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button onClick={() => navigate('/dashboard')} style={styles.loginButton}>
          ← Voltar
        </button>
        <h1 style={styles.headerTitle}>BBStock</h1>
        <span style={styles.userInfo}>👋 {usuario.nome}</span>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>💡 SUGESTÕES DE COMPRA</h2>
        
        {/* Prioridade Alta */}
        <h3>🎯 PRIORIDADE MÁXIMA</h3>
        {sugestoes
          .filter(s => s.prioridade === 'critico')
          .map((sugestao, index) => (
            <div key={index} style={{...styles.alertItem, borderLeftColor: '#e74c3c'}}>
              <div style={styles.alertCodigo}>🔴 {sugestao.codigo} - {sugestao.descricao}</div>
              <div>Comprar: {sugestao.quantidadeSugerida} unidades</div>
              <div>Estoque: {sugestao.estoqueAtual} | CMM: {sugestao.cmm}</div>
              <div>Classe: {sugestao.classe} | Valor: R$ {sugestao.valorEstimado.toLocaleString('pt-BR')}</div>
              <button style={styles.loginButton}>✅ CONFIRMAR COMPRA</button>
            </div>
          ))
        }

        {/* Resumo */}
        {resumo && (
          <div style={styles.section}>
            <div style={styles.alertCodigo}>
              📋 RESUMO: {resumo.totalItens} itens → R$ {resumo.valorTotal.toLocaleString('pt-BR')}
            </div>
            <button style={{...styles.loginButton, backgroundColor: '#27ae60'}}>
              📧 ENVIAR PARA APROVAÇÃO
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SugestoesScreen;