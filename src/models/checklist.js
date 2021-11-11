const mongoose = require('mongoose')

//schema é uma estrutura basica de dados
const checklistSchema = mongoose.Schema({
    name:{type: String, required: true},
    //referencia com a collection task
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task "
    }]
})

module.exports = mongoose.model('Checklist', checklistSchema)