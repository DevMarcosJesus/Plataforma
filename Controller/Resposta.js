const Sequelize = require('sequelize')
const db = require('./database')

const Resposta = db.define('respostas',{
    corpo:{type: Sequelize.TEXT, allowNull: false},
    perguntaId:{type: Sequelize.INTEGER, allowNull: false},
})

Resposta.sync({force: false}).then(() =>{
    console.log('Resposta Create Success')
})

module.exports = Resposta