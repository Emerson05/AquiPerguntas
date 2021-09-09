const express = require('express');
const app = express();
const connection = require('./database/database');
const Pergunta = require('./database/pergunta');
require('dotenv/config');

console.log(process.env.APP_NAME);

connection
        .authenticate()
        .then(()=>{
            console.log("Conexão feita com sucesso")
        })
        .catch((smgerro)=>{
            console.log(msgerro);
        })


app.set('view engine','ejs')
app.use(express.static('public'))
app.use (express.urlencoded ({ extended: true }))
app.use (express.json())



app.get("/",(req,res)=>{
    Pergunta.findAll({raw: true , order:[
        ["id", "DESC"] 
    ]}).then(perguntas=>{
        res.render("index",{
            perguntas : perguntas
        }) 
        
        
    })
  
})

app.get('/perguntas',(req,res)=>{
    
    res.render('perguntar');
});

app.post('/savequestion',(req,res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo : titulo,
        descricao :descricao

    }).then(()=>{
        res.redirect('/')

    });

    
});

app.listen(8080,()=>{console.log("Funcionou");})