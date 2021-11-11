const mongoose = require('mongoose')

//schema é uma estrutura basica de dados
const taskSchema = mongoose.Schema({
    name:{type: String, required: true},
    done:{type: Boolean, default: false},
    //referencia para a collection  checklist
    checklist:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Checklist',
        required: true
    }
})

module.exports = mongoose.model('Task', taskSchema)