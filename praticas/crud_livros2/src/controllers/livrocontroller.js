const express = require('express');
const router = express.Router();
const Livro = require('../models/Livro');
const { validarNovoLivro, validarAtualizacao } = require('../validators/LivroValidator');
const validarID = require('../validators/IDValidator');

// Criar livro
router.post('/', validarNovoLivro, async (req, res) => {
  try {
    const novoLivro = await Livro.create(req.body);
    res.status(201).json(novoLivro);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar o livro.' });
  }
});

// Listar livros
router.get('/', async (req, res) => {
  try {
    const livros = await Livro.find();
    res.json(livros);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar livros.' });
  }
});

// Buscar por ID
router.get('/:id', validarID, async (req, res) => {
  try {
    const livro = await Livro.findById(req.params.id);
    if (!livro) return res.status(404).json({ erro: 'Livro não encontrado.' });
    res.json(livro);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar o livro.' });
  }
});

// Atualizar livro
router.put('/:id', validarID, validarAtualizacao, async (req, res) => {
  try {
    const livroAtualizado = await Livro.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!livroAtualizado) return res.status(404).json({ erro: 'Livro não encontrado.' });
    res.json(livroAtualizado);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar o livro.' });
  }
});

// Remover livro
router.delete('/:id', validarID, async (req, res) => {
  try {
    const livroRemovido = await Livro.findByIdAndDelete(req.params.id);
    if (!livroRemovido) return res.status(404).json({ erro: 'Livro não encontrado.' });
    res.json({ mensagem: 'Livro removido com sucesso.' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao remover o livro.' });
  }
});

module.exports = router;
