const mongoose = require('../db')

const ClienteSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dataCadastro: {
    type: Date,
    default: Date.now,
  }
})

const Cliente = mongoose.model('Cliente', ClienteSchema)

module.exports = Cliente