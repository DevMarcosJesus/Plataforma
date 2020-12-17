const Sequelize = require('sequelize')
const db = require('./database')

Pergunta = db.define('perguntas', {
    titulo:{type: Sequelize.STRING, allowNull: false},
    descricao:{type: Sequelize.TEXT, allowNull:false}
})

Pergunta.sync({force: false}).then(() => {
    console.log('Create Table Success')
})

module.exports = Pergunta