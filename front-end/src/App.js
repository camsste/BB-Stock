import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import SugestoesScreen from './screens/SugestoesScreen';
import { styles } from './styles/styles';

function App() {
  const [usuario, setUsuario] = useState(null);

  return (
    <Router>
      <div style={styles.app}>
        <Routes>
          <Route 
            path="/login" 
            element={
              usuario ? <Navigate to="/dashboard" /> : <LoginScreen setUsuario={setUsuario} />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              usuario ? <DashboardScreen usuario={usuario} /> : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/sugestoes" 
            element={
              usuario ? <SugestoesScreen usuario={usuario} /> : <Navigate to="/login" />
            } 
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;