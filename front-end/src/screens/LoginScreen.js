import React, { useState } from 'react';
import { styles } from '../styles/styles';
import { authAPI } from '../services/api';

const LoginScreen = ({ setUsuario }) => {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!cpf || !senha) {
      alert('Preencha CPF e senha!');
      return;
    }
    
    setLoading(true);
    try {
      const response = await authAPI.login(cpf, senha);
      if (response.data.success) {
        setUsuario(response.data.usuario);
      }
    } catch (error) {
      alert('CPF ou senha inválidos!');
    }
    setLoading(false);
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginBox}>
        <h1 style={styles.loginTitle}>[BBStock]</h1>
        <p style={styles.loginSubtitle}>Sistema de Gestão BB</p>
        
        <input
          style={styles.input}
          placeholder="📧 CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
        
        <input
          style={styles.input}
          placeholder="🔒 Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        
        <button 
          style={styles.loginButton} 
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Carregando...' : '[ → ENTRAR ]'}
        </button>
        
        <button style={styles.forgotPassword}>
          _Esqueci minha senha_
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;