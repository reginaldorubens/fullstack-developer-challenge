const Titulo = require('../models/titulo')
const Cliente = require('../models/cliente')

function getRandomInt(max) {
  min = 0
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

class Seeder {
  static async seed() {  
    if (Cliente.find().length === 0 && Titulo.find().length) {
      const novosClientes = [
        {
          nome: 'Luke Skywalker',
          email: 'skywalker.luke@starwars.com'
        },
        {
          nome: 'Han Solo',
          email: 'solo.han@starwars.com'
        },
        {
          nome: 'Obi-Wan Kenobi',
          email: 'kenobi.obi-wan@starwars.com'
        },
        {
          nome: 'Leia Organa',
          email: 'organa.leia@starwars.com'
        },
        {
          nome: 'Lando Carlrissian',
          email: 'carlrissina.lando@starwars.com'
        }
      ]

      try {
        await Cliente.insertMany(novosClientes)

        const clientesCadastrados = await Cliente.find()

        const novosTitulos = [
          {
            descricao: 'Pedido nº: 123456',
            dataVencimento: '2021-05-30',
            dataPagamento: null,
            valor: 250.00,
            cliente: clientesCadastrados[getRandomInt(clientesCadastrados.length)]._id.toString()
          },
          {
            descricao: 'Pedido nº: 234567',
            dataVencimento: '2022-02-15',
            dataPagamento: null,
            valor: 125.50,
            cliente: clientesCadastrados[getRandomInt(clientesCadastrados.length)]._id.toString()
          },
          {
            descricao: 'Pedido nº: 121212',
            dataVencimento: '2021-07-18',
            dataPagamento: '2021-07-15',
            valor: 200.00,
            cliente: clientesCadastrados[getRandomInt(clientesCadastrados.length)]._id.toString()
          },
          {
            descricao: 'Pedido nº: 212112',
            dataVencimento: '2021-07-22',
            dataPagamento: null,
            valor: 100.00,
            cliente: clientesCadastrados[getRandomInt(clientesCadastrados.length)]._id.toString()
          },
          {
            descricao: 'Pedido nº: 233322',
            dataVencimento: '2021-07-20',
            dataPagamento: null,
            valor: 100.00,
            cliente: clientesCadastrados[getRandomInt(clientesCadastrados.length)]._id.toString()
          },
          {
            descricao: 'Pedido nº: 332211',
            dataVencimento: '2021-07-20',
            dataPagamento: '2021-07-20',
            valor: 352.38,
            cliente: clientesCadastrados[getRandomInt(clientesCadastrados.length)]._id.toString()
          },
          {
            descricao: 'Pedido nº: 233322',
            dataVencimento: '2021-07-20',
            dataPagamento: null,
            valor: 100.00,
            cliente: clientesCadastrados[getRandomInt(clientesCadastrados.length)]._id.toString()
          },
          {
            descricao: 'Pedido nº: 554433',
            dataVencimento: '2020-01-20',
            dataPagamento: null,
            valor: 500.00,
            cliente: clientesCadastrados[getRandomInt(clientesCadastrados.length)]._id.toString()
          },
          {
            descricao: 'Pedido nº: 665566',
            dataVencimento: '2022-07-20',
            dataPagamento: null,
            valor: 110.00,
            cliente: clientesCadastrados[getRandomInt(clientesCadastrados.length)]._id.toString()
          },
          {
            descricao: 'Pedido nº: 220022',
            dataVencimento: '2021-01-08',
            dataPagamento: null,
            valor: 1250.23,
            cliente: clientesCadastrados[getRandomInt(clientesCadastrados.length)]._id.toString()
          },
          {
            descricao: 'Pedido nº: 111110',
            dataVencimento: '2021-08-10',
            dataPagamento: null,
            valor: 200.00,
            cliente: clientesCadastrados[getRandomInt(clientesCadastrados.length)]._id.toString()
          },
          {
            descricao: 'Pedido nº: 111128',
            dataVencimento: '2021-06-02',
            dataPagamento: '2021-06-02',
            valor: 105.00,
            cliente: clientesCadastrados[getRandomInt(clientesCadastrados.length)]._id.toString()
          },
          {
            descricao: 'Pedido nº: 221138',
            dataVencimento: '2021-09-30',
            dataPagamento: null,
            valor: 322.00,
            cliente: clientesCadastrados[getRandomInt(clientesCadastrados.length)]._id.toString()
          }
        ]

        await Titulo.insertMany(novosTitulos)

        console.log('Data seeding succeed')
      }
      catch(error) {
        console.error('Error seeding data: ' + error)
      }
    }
  }
}

Seeder.seed()
