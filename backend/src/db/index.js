const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect('mongodb://mongodb/titulos', { useNewUrlParser: true, useUnifiedTopology: true})
  .then(db => console.log('Db is connected to ', db.connection.host))
  .catch((error) => console.error(error))

module.exports = mongoose