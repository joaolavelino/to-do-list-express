const express = require('express')
//requerer as rotas
const rootRouter = require('./src/routes/index')
const checkListRouter = require('./src/routes/checklist')
const taskRouter = require('./src/routes/task')

const methodOverride = require('method-override')
//requerer o mongoose
require('./config/database')
//Requerer o path - caminho para as views
const path = require('path')

//colocando o express dentro de uma variável
const app = express()
//chamando o middleware JSON
app.use(express.json())
//chamando middleware pra ler form
app.use(express.urlencoded({extended:true}))
//junto com os middlewares , injetar o methodOverride - ele permite o HTML5 fazer requisições com métodos Put e delete
app.use(methodOverride('__method', {methods: ['POST', 'GET']}))


//habilitar o projeto para usar arquivos estáticos
//estou dizendo pro express que os arquivos estáticos estão todos na pasta PUBLIC
app.use(express.static(path.join(__dirname, 'public')))

//-------VIEWS-------
//usar o path que a gente chamou pra dizer onde estão as views
app.set('views', path.join(__dirname, 'src/views'))
//instalar a view engine
app.set('view engine', 'ejs')


//trazendo a rota de checklists
// se eu chamar apenas app.use(checkslistRouter), eu preciso definir o endpoint dentro do arquivo da rota (checklist.js)
// porém eu posso colocar o endpoint como argumento logo antes de chamar o arquivo da rota assim: app.use('/checklists' , checklistRouter). Dessa forma eu não preciso definir o endpoint dentro do arquivo da rota. 
app.use('/', rootRouter)
app.use('/checklist', checkListRouter)
app.use('/checklist', taskRouter.checklistDependent)



app.listen(4000, () => {
  console.log('servidor iniciado')
})

