const express = require('express');
const { getUsuarios } = require('../utils/csvReader');
const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { cpf, senha } = req.body;
    const usuarios = await getUsuarios();
    
    const usuario = usuarios.find(u => u.cpf === cpf && u.senha === senha);
    
    if (!usuario) {
      return res.status(401).json({ error: 'CPF ou senha inválidos' });
    }
    
    res.json({
      success: true,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        cargo: usuario.cargo,
        localizacao: usuario.localizacao
      }
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;