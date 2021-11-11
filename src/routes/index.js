//1 - requerer o express
const express = require('express');
//não tem model aqui
//2 - criar a rota
const router = express.Router();

//ROTA GET 
router.get('/', async (req, res) => {
    //devolver uma view
    res.render('pages/index')
});

module.exports = router;