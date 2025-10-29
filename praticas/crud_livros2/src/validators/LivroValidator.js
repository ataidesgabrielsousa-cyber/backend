const yup = require('yup');

const criarLivroSchema = yup.object().shape({
  titulo: yup.string().required('O título é obrigatório.'),
  autor: yup.string().required('O autor é obrigatório.'),
  editora: yup.string().required('A editora é obrigatória.'),
  ano: yup.number().typeError('O ano deve ser um número.').required('O ano é obrigatório.'),
  preco: yup.number().typeError('O preço deve ser um número.').positive('O preço deve ser positivo.').required('O preço é obrigatório.')
});

const atualizarLivroSchema = yup.object().shape({
  titulo: yup.string(),
  autor: yup.string(),
  editora: yup.string(),
  ano: yup.number().typeError('O ano deve ser um número.'),
  preco: yup.number().typeError('O preço deve ser um número positivo.').positive()
});

async function validarNovoLivro(req, res, next) {
  try {
    await criarLivroSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    return res.status(400).json({ erros: err.errors });
  }
}

async function validarAtualizacao(req, res, next) {
  try {
    await atualizarLivroSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    return res.status(400).json({ erros: err.errors });
  }
}

module.exports = { validarNovoLivro, validarAtualizacao };
