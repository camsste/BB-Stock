import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styles } from '../styles/styles';
import { dashboardAPI } from '../services/api';

const DashboardScreen = ({ usuario }) => {
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    carregarDashboard();
  }, []);

  const carregarDashboard = async () => {
    try {
      const response = await dashboardAPI.getDashboard();
      setDados(response.data);
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
    }
    setLoading(false);
  };

  if (loading) return <div style={styles.loading}>Carregando dashboard...</div>;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>BBStock</h1>
        <div>
          <span style={styles.userInfo}>👋 {usuario.nome} </span>
          <button onClick={() => navigate('/sugestoes')} style={styles.loginButton}>
            📋 Sugestões
          </button>
          <button onClick={() => {}} style={{...styles.loginButton, backgroundColor: '#e74c3c', marginLeft: '0.5rem'}}>
            🚪 Sair
          </button>
        </div>
      </div>
      
      {/* Visão Geral */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>📊 VISÃO GERAL BBTS</h2>
        
        {dados && (
          <div style={styles.metricsGrid}>
            <div style={{...styles.metricCard, ...styles.critical}}>
              <div style={styles.metricValue}>{dados.metricas.itensCriticos}</div>
              <div style={styles.metricLabel}>Itens Críticos</div>
            </div>
            
            <div style={{...styles.metricCard, ...styles.warning}}>
              <div style={styles.metricValue}>{dados.metricas.itensAlerta}</div>
              <div style={styles.metricLabel}>Itens em Alerta</div>
            </div>
            
            <div style={{...styles.metricCard, ...styles.info}}>
              <div style={styles.metricValue}>{dados.metricas.pecasDefeituosas}</div>
              <div style={styles.metricLabel}>Peças Defeituosas</div>
            </div>
            
            <div style={{...styles.metricCard, ...styles.success}}>
              <div style={styles.metricValue}>{dados.metricas.totalItens}</div>
              <div style={styles.metricLabel}>Total de Itens</div>
            </div>
          </div>
        )}
      </div>

      {/* Alertas */}
      {dados && dados.alertas.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>🚨 ALERTAS CRÍTICOS</h2>
          {dados.alertas.map((alerta, index) => (
            <div key={index} style={styles.alertItem}>
              <div style={styles.alertCodigo}>🔴 {alerta.codigo} - {alerta.tipo}</div>
              <div>Estoque: {alerta.estoqueAtual} | CMM: {alerta.cmm}</div>
              <div>Local: {alerta.localizacao}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardScreen;