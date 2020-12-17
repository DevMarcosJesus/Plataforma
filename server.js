const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io');
const db = require('./Controller/database')
const bodyParser = require('body-parser')
const Pergunta = require('./Controller/Pergunta')

db.authenticate().then(() => {
    console.log('Connection Success Database')
}).catch((err) => {
    console.log(`${err}Not possible connection DB`)
})

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    Pergunta.findAll({raw: true, order:[
        ['id','DESC']
    ]}).then(perguntas => {
        res.render('index',{
            perguntas:perguntas
        })
    })

})

app.get('/pergunta', (req, res) => {
    res.render('plataforma')
})

app.post('/salvarpergunta', (req, res) => {
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    Pergunta.create({
        titulo:titulo,
        descricao:descricao,
    }).then(() => {res.redirect('/')})
})


http.listen(8000, () => {
    console.log('Server online.')
})