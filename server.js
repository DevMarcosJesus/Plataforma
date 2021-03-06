const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io');
const db = require('./Controller/database')
const bodyParser = require('body-parser')
const Pergunta = require('./Controller/Pergunta')
const Resposta = require('./Controller/Resposta')




// Some essentials settings
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static('public'))
app.set('view engine', 'ejs')




// Database connection
db.authenticate().then(() => {
    console.log('Connection Success Database')
}).catch((err) => {
    console.log(`${err}Not possible connection DB`)
})




app.get('/', (req, res) => {
    Pergunta.findAll({raw: true, order:[
        ['id','DESC']
    ]}).then(perguntas => {
        res.render('index',{
            perguntas:perguntas
        })
    })

});



app.get('/index', (req,res) => {
    res.render('index')
});



app.get('/pergunta', (req, res) => {
    res.render('plataforma')
});



app.post('/salvarpergunta', (req, res) => {
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    Pergunta.create({
        titulo:titulo,
        descricao:descricao,
    }).then(() => {
        res.redirect('/')
    })
});



app.get('/pergunta/:id', (req, res) => {
    let id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order:[['ID', 'DESC']],
            }).then(respostas => {
                res.render('pergunta',{
                    pergunta:pergunta,
                    respostas:respostas,
                })
            })
        }else{
            res.render('/')
        }
    })
});



app.post('/responder', (req, res) => {
    let corpo = req.body.corpo;
    let perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId:perguntaId,
    }).then(() =>{
        res.redirect(`/pergunta/${perguntaId}`)
    })

});




http.listen(8000, () => {
    console.log('Server online.')
});