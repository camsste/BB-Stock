const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
  try {
        const { features } = req.body;
        
        // Fazer a requisição para o servidor Python
        const response = await axios.post(process.env.SERVICO_PREDICAO, {
            features: features
        });

        // Retornar a resposta da previsão
        res.json({ predicao: response.data.predicao });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
