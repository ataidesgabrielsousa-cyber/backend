require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const livrosRouter = require('./controllers/livrocontroller');

const app = express();
app.use(express.json());

// Conexão com MongoDB Atlas
mongoose.connect(
  `mongodb+srv://GabrielAtaidesdesousa:64739705@cluster0.l0mkbxz.mongodb.net/?appName=Cluster0`
)
.then(() => console.log('✅ Conectado ao MongoDB Atlas'))
.catch(err => console.error('❌ Erro ao conectar:', err));

// Rotas
app.use('/livros', livrosRouter);

// Iniciar servidor
app.listen(3000, () => console.log('🚀 Servidor rodando na porta 3000'));
