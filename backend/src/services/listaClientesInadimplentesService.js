const Titulo = require('../models/titulo')

class ListaClientesInadimplentesService {
  static async obterLista(txtBusca, campoOrdenacao) {
    let titulosEmAtraso = await this.obterTitulosEmAtraso()

    if ( txtBusca ) {
      titulosEmAtraso = this.filtrarTitulosEmAtraso(titulosEmAtraso, txtBusca)
    }

    let clientesInadimplentes = this.obterListaClientesInadimplentes(titulosEmAtraso)

    if ( campoOrdenacao ) {
      clientesInadimplentes = this.ordenarListaClientesInadimplente(
        clientesInadimplentes, 
        campoOrdenacao
      )
    }
   
    return clientesInadimplentes
  }

  static async obterTitulosEmAtraso() {
    return await Titulo.find({ $and: [
      { "dataVencimento": { $lte : new Date().toISOString() } }, 
      { $or: [
        { "dataPagamento": null },
        { "dataPagamento": { $exists: false } }
      ]}
    ]}).populate('cliente', {'_id': 1, 'nome': 1})
  }

  static filtrarTitulosEmAtraso(titulosEmAtraso, txtBusca) {
    const regex = new RegExp(txtBusca, 'g')
      
    return titulosEmAtraso.filter((titulo) => titulo.cliente.nome.match(regex))
  }

  static obterListaClientesInadimplentes(titulosEmAtraso) {
    return Object.values(
      titulosEmAtraso.reduce((lista, titulo) => {
        lista[titulo.cliente._id] = lista[titulo.cliente._id] || { idCliente: titulo.cliente._id, nomeCliente: titulo.cliente.nome, emAtrasoDesde: null, valorTotalEmAtraso: 0}

        if (lista[titulo.cliente._id].emAtrasoDesde === null || 
          lista[titulo.cliente._id].emAtrasoDesde > titulo.dataVencimento) {
            lista[titulo.cliente._id].emAtrasoDesde = titulo.dataVencimento  
        }

        lista[titulo.cliente._id].valorTotalEmAtraso += titulo.valor

        return lista
      }, Object.create(null))
    )
  }

  static ordenarListaClientesInadimplente(clientesInadimplentes, campoOrdenacao) {
    clientesInadimplentes.sort(this.ordernarPorCampo(campoOrdenacao))

    return clientesInadimplentes
  }

  static ordernarPorCampo(campoOrdenacao) {
    return function(a, b) {
      if ( a[campoOrdenacao] < b[campoOrdenacao]) {
        return -1
      }
      if (a[campoOrdenacao] > a[campoOrdenacao]) {
        return 1
      }
      return 0
    }
  }
}

module.exports = ListaClientesInadimplentesService