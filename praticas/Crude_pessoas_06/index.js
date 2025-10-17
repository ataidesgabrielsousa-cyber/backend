const express = require('express')
const app = express()

const cors = require ('cors')
app.use(cors()) //habilitar o cors do browser
app.use(express.json()) //receber JSON no body da requisições

//mapear os meu routes


const pesssoasroutes = require('./routes/pessoas')
app.use = (pesssoasroutes)




//executar a aplicaçao
app.listen(3000,() => {
    console.log("aplicação rodando em http://localhost:3000")
})
