const express = require('express')

const Titulo = require('../models/titulo')

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const titulo = await Titulo.create(req.body)

    return res.status(201).send({titulo})
  }
  catch(error) {
    return res.status(400).send({erro: 'Erro ao incluir novo título.'})
  }
})

router.get('/', async (req, res) => {
  try {
    const titulos = await Titulo.find().populate('cliente', {'_id': 1, 'nome': 1})

    return res.send({titulos})
  }
  catch(error) {
    return res.status(500).send({erro: 'Erro ao listar títulos.'})
  }
})

router.get('/emAtraso', async (req, res) => {
  try {
    let titulosEmAtraso = await Titulo.find({ $and: [
      { "dataVencimento": { $lte : new Date().toISOString() } }, 
      { $or: [
        { "dataPagamento": null },
        { "dataPagamento": { $exists: false } }
      ]}
    ]}).populate('cliente', {'_id': 1, 'nome': 1})
   
    res.send(titulosEmAtraso)
  }
  catch(error) {
    return res.status(500).send({erro: 'Erro ao listar títulos em atraso.'})
  }
})

router.get('/:tituloId', async (req, res) => {
  try {
    const titulo = await Titulo.findById(req.params.tituloId).populate('cliente', {'_id': 1, 'nome': 1})

    if (!titulo) {
      return res.status(404).send({mensagem: 'Título não encontrado.'})
    }

    return res.send({titulo})
  }
  catch(error) {
    console.error(error)
    return res.status(400).send({erro: 'Erro ao carregar detalhes do título.'})
  }
})

router.delete('/:tituloId', async (req, res) => {
  try {
    const titulo = await Titulo.findByIdAndRemove(req.params.tituloId)

    return res.status(204).end()
  }
  catch(error) {
    console.error(error)
    return res.status(400).send({erro: 'Erro ao excluir título.'})
  }
})

module.exports = app => app.use('/api/v1/titulos', router)