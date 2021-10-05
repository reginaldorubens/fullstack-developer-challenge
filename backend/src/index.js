const express = require('express')
const cors = require('cors')

const controllers = require('./controllers')

require('./db')

require('./seeders')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use(cors({
  origin: '*'
}))

require('./controllers/clientes')(app)
require('./controllers/titulos')(app)

app.listen(3000)

console.log('Listening on port', 3000)