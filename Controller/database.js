const Sequelize = require('sequelize')
const db = new Sequelize('plataforma','root','123123',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = db 
