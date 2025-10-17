require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Middleware para interpretar JSON
app.use(express.json());

// ✅ Conexão com MongoDB Atlas usando variáveis do .env
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
)
.then(() => console.log('Conectado ao MongoDB Atlas'))
.catch((err) => console.error('Erro na conexão:', err));

// ✅ Schema correto (definindo tipos, não valores fixos)
const livroSchema = new mongoose.Schema({
  titulo: String,
  autor: String,
  editora: String,
  ano: Number,
  preco: Number
});

const Livro = mongoose.model('Livro', livroSchema);

// ROTAS

// Criar livro
app.post('/livros', async (req, res) => {
  try {
    const novoLivro = new Livro(req.body);
    const livroSalvo = await novoLivro.save();
    res.status(201).json(livroSalvo);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao criar livro', detalhes: error.message });
  }
});

// Listar todos os livros
app.get('/livros', async (req, res) => {
  try {
    const livros = await Livro.find();
    res.json(livros);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar livros' });
  }
});

// Buscar livro por ID
app.get('/livros/:id', async (req, res) => {
  try {
    const livro = await Livro.findById(req.params.id);
    if (!livro) return res.status(404).json({ erro: 'Livro não encontrado' });
    res.json(livro);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar livro' });
  }
});

// Atualizar livro por ID
app.put('/livros/:id', async (req, res) => {
  try {
    const livroAtualizado = await Livro.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!livroAtualizado) return res.status(404).json({ erro: 'Livro não encontrado' });
    res.json(livroAtualizado);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao atualizar livro', detalhes: error.message });
  }
});

// Remover livro por ID
app.delete('/livros/:id', async (req, res) => {
  try {
    const livroRemovido = await Livro.findByIdAndDelete(req.params.id);
    if (!livroRemovido) return res.status(404).json({ erro: 'Livro não encontrado' });
    res.json({ mensagem: 'Livro removido com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao remover livro' });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
