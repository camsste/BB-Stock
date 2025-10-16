require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const sugestoesRoutes = require('./routes/sugestoes');
const estoqueRoutes = require('./routes/estoque');
const previsaoRoutes = require('./routes/previsao');
const ordemRoutes = require('./routes/ordem');
const planejamentoRoutes = require('./routes/planejamento');

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../data')));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/sugestoes', sugestoesRoutes);
app.use('/api/estoque', estoqueRoutes);
app.use('/api/previsao', previsaoRoutes);
app.use('/api/ordem', ordemRoutes);
app.use('/api/planejamento', planejamentoRoutes);

app.use(async (req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});