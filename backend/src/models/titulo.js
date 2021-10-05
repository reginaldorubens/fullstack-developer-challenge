const mongoose = require('../db')

const TituloSchema = new mongoose.Schema({
  descricao: {
    type: String,
    required: true,
  },
  dataCadastro: {
    type: Date,
    default: Date.now,
  },
  dataVencimento: {
    type: Date,
    required: true,
  },
  dataPagamento: {
    type: Date,
  },
  valor: {
    type: Number,
    required: true,
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    require: true,
  }
})

const Titulo = mongoose.model('Titulo', TituloSchema)

module.exports = Titulo