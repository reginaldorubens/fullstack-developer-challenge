<template>
  <lista-clientes-inadimplentes></lista-clientes-inadimplentes>
</template>

<script>
import ListaClientesInadimplentes from './components/ListaClientesInadimplentes.vue'

export default {
  name: 'App',
  components: {
    ListaClientesInadimplentes
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
