//inicialização do port do mongoose
const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

//conectar o banco de dados que fizemos no MongoDb 
mongoose.connect('mongodb://localhost/todolist', {useNewUrlParser: true, useUnifiedTopology:true})
    .then(()=>console.log('conectado ao MongoDb'))
    .catch((err)=>console.error(err))