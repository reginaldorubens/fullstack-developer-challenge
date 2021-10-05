const express = require('express')

const Titulo = require('../models/titulo')
const Cliente = require('../models/cliente')

const ListaClientesInadimplentesService = require('../services/listaClientesInadimplentesService')

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body)

    return res.status(201).send({cliente})
  }
  catch(error) {
    return res.status(400).send({erro: 'Erro ao incluir novo cliente.'})
  }
})

router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.find()

    return res.send({clientes})
  }
  catch(error) {
    return res.status(500).send({erro: 'Erro ao listar clientes.'})
  }
})

router.get('/inadimplentes', async (req, res) => {
  try {
    const clientesInadimplentes = await ListaClientesInadimplentesService.obterLista(
      req.query.txtBusca,
      req.query.campoOrdenacao
    )
    
    return res.json(clientesInadimplentes)
  }
  catch(error) {
    console.error(error)

    return res.status(500).send({erro: 'Erro ao listar clientes inadimplentes.'})
  }
})

router.get('/:clienteId', async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.clienteId)

    if (!cliente) {
      return res.status(404).send({mensagem: 'Cliente não encontrado.'})
    }

    return res.send({cliente})
  }
  catch(error) {
    return res.status(400).send({erro: 'Erro ao carregar detalhes do cliente.'})
  }
})

router.delete('/:clienteId', async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndRemove(req.params.clienteId)

    return res.status(204).end()
  }
  catch(error) {
    return res.status(500).send({erro: 'Erro ao excluir cliente.'})
  }
})

module.exports = app => app.use('/api/v1/clientes', router)