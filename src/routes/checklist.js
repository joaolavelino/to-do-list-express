//criar as rotas
const express = require('express');
const checklist = require('../models/checklist');
const { updateOne } = require('../models/checklist');
//requerer o MODEL da Collection do Mongo
const Checklist = require('../models/checklist');

const router = express.Router();

//---------------------GET--------------------------
//dentro dessa chamada eu posso definir o endpoint aqui mesmo ('/checklist' ...) - assim eu não preciso chamar o endpoint no arquivo principal. Eu posso deixar esse endpoint em aberto aqui ('/' ...) e depois chamar o endpoint no arquivo principal onde concentro todas as rotas.
router.get('/', async (req, res) => {
    console.log('checklist GET');
    try{
        let checklists = await Checklist.find({})
        // res.status(200).json(checklists)
        //eu não quero mais que o que seja devolvido seja um json, mas sim uma página
        res.status(200).render('checklists/index', {checklists: checklists})
    }catch (error){
        //uso o 500 porque não houveram parametros para a busca
        // res.status(500).json(error)
        res.status(500).render('pages/error', {error: 'Erro ao exibir as listas'})
    }
})

router.get('/new', async (req, res) => {
    console.log('checklist GET');
  try{
    //falar pro mongoose criar um checklist vazio
    let checklist = new Checklist()
    res.status(200).render('checklists/new' , {checklist: checklist})
  } catch (error) {
    res.status(500).render('pages/error', {error: 'Erro ao carregar o formulário'})
  }
})

router.get('/:id/edit', async (req, res) => {
    console.log('checklist GET');
  try{
        // o populate serve pra que ele traga as tasks
    let checklist = await Checklist.findById(req.params.id).populate(tasks)
    res.status(200).render('checklists/edit.ejs' , {checklist: checklist})
  }catch (error){
    res.status(500).render('pages/error', {error: 'Erro ao exibir a edição da lista'})
  }
})

router.get('/:id', async (req,res)=>{
    console.log('checklist GET');
    try{
        let checklist = await Checklist.findById(req.params.id);
        // res.status(200).json(checklist)
        res.status(200).render('checklists/show', {checklist: checklist})
    } catch (error) {
        // res.status(500).json(error)
        res.status(500).render('pages/error', {error: 'Erro ao exibir as listas'})
    }
})



//---------------------POST--------------------------
router.post('/', async (req, res) => {
    //para extrair um parâmetro
    // dessa forma ele está puxando só a chave name dentro do req body
    //agora adiciono o checklist - pra que seja esse o elemento puxado
    let {name} = req.body.checklist
    let checklist = new Checklist({name})
    //ou podemos fazer assim:
    // console.log(req.body['name'])

    //agora eu preciso puxar aquele model que fizemos e criar a collection
    try{
        await checklist.save()
        //200 - sucesso! - ele vai devolver no postman esssa collection...
        //nela vão ter todas as infos que colocamos no model

        //não quero mais que devolva um json, mas sim que me redirecione à lista de checklists
        // res.status(200).json(checklist)
        res.redirect('/checklist')
    } catch (error) {
        //422 - erro na requisição - volta para pagina de formulário
        res.status(422).render('checklists/new', {checklists: {...checklst, error}})
    }

    // res.status(200).json(req.body)
})

//agora estou colocando um id como complemento do endpoint, SEMPRE COM OS 2 PONTOS..
// router.get('/:id', (req, res) => {
//     //eu coloco após o req o .params, que ele vai ler o que há depois dos 2pontos
//    console.log(req.params.id)
//    res.send(`id: ${req.params.id}`)
// })

// A ALTERAÇÂO VEM  NA REQUISIÇÃO
router.put('/:id', async(req, res) => {
    console.log("PUT")
    let {name} = req.body.checklist
    let checklist = await Checklist.findById(req.params.id)

    try{
        await checklist.updateOne({name})
        res.redirect('/checklist')
    } catch (error){
        let errors = error.errors;
        res.status(422).render('checklist/edit', {checklist: {...checklist, errors}})
    }
})



router.delete('/:id', async (req, res) => {
    try{
        let checklist = await Checklist.findByIdAndRemove(req.params.id)
        res.redirect('/checklist')
    }catch (error){
        res.status(500).render('pages/error', {error: 'Erro ao deletar a lista'})
    }
})

//exportar a rota
module.exports = router;