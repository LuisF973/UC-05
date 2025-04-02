const express = require('express')
const EnderecoController = require('../controllers/index')

const router = express.Router()

// Buscar todos enderecos http://localhost:3000/endereco
router.get('/endereco', EnderecoController.listarEnderecos)

// Buscar endereco pelo CEP http://localhost:3000/endereco/cep/590000000
router.get('/endereco/cep/:cep',EnderecoController.listarEnderecoCEP)

// Buscar endereco pelo CIDADE http://localhost:3000/endereco/cidade/natal
router.get('/endereco/cidade/:cidade', EnderecoController.listarEnderecoCidade)

// Buscar endereco por matricula aluno http://localhost:3000/endereco/aluno/a1234
router.get('/endereco/aluno/:matricula', EnderecoController.listarEnderecoAluno)

// Criar endereco aluno http://localhost:3000/endereco
router.post('/endereco', EnderecoController.criarEndereco)

// Editar endereco aluno http://localhost:3000/endereco/a1234
router.put('/endereco/:matricula', EnderecoController.editarEnderecoAluno)

module.exports = router