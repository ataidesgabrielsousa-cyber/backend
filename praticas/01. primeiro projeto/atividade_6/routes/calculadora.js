const express = require('express');
const router = express.Router();

// Funções matemáticas
function somar(a, b) {
    return a + b;
}

function subtrair(a, b) {
    return a - b;
}

function multiplicar(a, b) {
    return a * b;
}

function dividir(a, b) {
    if (b === 0) return 'Erro: Divisão por zero';
    return a / b;
}

function aoQuadrado(a) {
    return a * a;
}

function raizQuadrada(a) {
    if (a < 0) return 'Erro: Raiz de número negativo';
    return Math.sqrt(a);
}

// Endpoints
router.get('/somar', (req, res) => {
    const a = Number(req.query.numA);
    const b = Number(req.query.numB);
    res.json({ resultado: somar(a, b) });
});

router.get('/subtrair', (req, res) => {
    const a = Number(req.query.numA);
    const b = Number(req.query.numB);
    res.json({ resultado: subtrair(a, b) });
});

router.get('/multiplicar', (req, res) => {
    const a = Number(req.query.numA);
    const b = Number(req.query.numB);
    res.json({ resultado: multiplicar(a, b) });
});

router.get('/dividir', (req, res) => {
    const a = Number(req.query.numA);
    const b = Number(req.query.numB);
    res.json({ resultado: dividir(a, b) });
});

router.get('/aoQuadrado', (req, res) => {
    const a = Number(req.query.numA);
    res.json({ resultado: aoQuadrado(a) });
});

router.get('/raizQuadrada', (req, res) => {
    const a = Number(req.query.numA);
    res.json({ resultado: raizQuadrada(a) });
});

module.exports = router;