<template>
  <div class="container">
    <h1 style="margin-bottom: 50px;">Lista de clientes inadimplentes</h1>
    <form class="form-row" style="margin-bottom: 30px;">
      <div class="col-4">
         <input type="text" class="form-control mb-2" name="txtBusca" id="txtBusca">
      </div>
      <div class="col-auto">
         <button type="button" class="btn btn-primary mb-2" v-on:click="aplicarBusca()">Buscar</button>
      </div><div class="col-auto">
        <button type="button" class="btn btn-light mb-2" v-on:click="limparBusca()">Limpar busca</button>
      </div>
    </form>
    <table class="table table-striped table-hover">
      <tr>
        <th class="text-left" v-on:click="alterarOrdenacao('nomeCliente')">Nome do cliente</th>
        <th class="text-right" v-on:click="alterarOrdenacao('valorTotalEmAtraso')">Valor</th>
        <th class="text-center" v-on:click="alterarOrdenacao('emAtrasoDesde')">Desde</th>
      </tr>
      <tr v-for="clienteInadimplente of clientesInadimplentes" v-bind:key="clienteInadimplente.idCliente">
        <td class="text-left">{{clienteInadimplente.nomeCliente}}</td>
        <td class="text-right">{{clienteInadimplente.valorTotalEmAtraso}}</td>
        <td class="text-center">{{clienteInadimplente.emAtrasoDesde}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      clientesInadimplentes: [],
      txtBusca: '',
      campoOrdenacao : 'nomeCliente'
    }
  },

  methods: {
    async lerDadosDaAPI() {
      try {
        let urlAPI = "http://localhost:3000/api/v1/clientes/inadimplentes?campoOrdenacao=" + this.campoOrdenacao

        if ( this.txtBusca ) {
          urlAPI = urlAPI + '&txtBusca=' + this.txtBusca
        }

        const response = await axios.get(
          urlAPI
        )

        this.clientesInadimplentes = response.data
        this.clientesInadimplentes = this.clientesInadimplentes.map((c) => {
          c.emAtrasoDesde = this.converterData(c.emAtrasoDesde)
          c.valorTotalEmAtraso = parseFloat(c.valorTotalEmAtraso).toFixed(2).replace('.', ',')
          return c
        })
      }
      catch(error) {
        console.log(error)
      }
    },

    converterData(dataISO) {
      const d = new Date(dataISO)
      let dia = d.getDate()
      let mes = d.getMonth()+1
      const ano = d.getFullYear()

      if ( dia < 10 ) {
        dia = '0' + dia
      }

      if ( mes < 10 ) {
        mes = '0' + mes
      }

      return dia + '/' + mes + '/' + ano
    },

    alterarOrdenacao(campoOrdenacao) {
      this.campoOrdenacao = campoOrdenacao

      this.lerDadosDaAPI()
    },

    aplicarBusca() {
      this.txtBusca = document.getElementById('txtBusca').value

      this.lerDadosDaAPI()
    },

    limparBusca() {
      document.getElementById('txtBusca').value = ''

      this.txtBusca = ''

      this.lerDadosDaAPI()
    }
  },

  created() {
    this.lerDadosDaAPI()
  }
}
</script>