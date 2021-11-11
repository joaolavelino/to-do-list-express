//1 - requerer o express
const express = require('express');
//2 - requerer o model
const Checklist = require('../models/checklist');
const Task = require('../models/task');
//3 - criar a rota
const checklistDependentRoute=express.Router();

//CRIAR AS ROTAS
//1 - criar uma task nova - usa o GET porque é para abrir a pg de formulário
checklistDependentRoute.get('/:id/tasks/new', async (req, res) => {
    try{
        //mostrar uma task vazia para deixar o formulário em branco
        let task = Task()
        //renderizar a tela tasks/new - puxando esses parâmetros.
        res.status(200).render('tasks/new', {checklistId: req.params.id, task: task})
    }catch (error){
        res.status(422).render('pages/error', {errors: 'Erro ao carregar o formulário'})
    }
})

checklistDependentRoute.post('/:id/tasks', async (req,res)=>{
    const {name} = req.body.task;
    //no model da task a gente deixou um campo "checklist". ele é necessário para que a gente coloque na task qual é o checklist que ela pertence , para que o banco de dados poder fazer a relação... depois vamos precisar fazer a relação no caminho contrário.
    const task = new Task ({name, checklist: req.params.id})
    try{
        await task.save()
        //FAZER A RELAÇÃO ENTRE A COLLECTION CHECKLISTS E O ITEM TASK (caminho inverso do que fizemos)
        //1) buscar o checklist usando o id (req.params.id)
        let checklist = await Checklist.findById(req.params.id)
        //2) usar o PUSH (isso, do array mesmo) para inserir a task na collection
        //   --- no model do checklist a gente definiu que o Checklist teria um name e um array "tasks" dentro dele - e é  nesse array que vamos guardar a dependência.
        checklist.tasks.push(task)
        await checklist.save()
        res.redirect(`/checklist/${req.params.id}`)
    }catch(error){
        let errors=error.errors
        res.status(422).render('tasks/new', {task:{...task, errors}, checklistId: req.params.id})
    }
})

//exportar a rota
module.exports = {checklistDependent:checklistDependentRoute}