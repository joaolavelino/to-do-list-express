const express = require('express')

const router = express.Router();

router.get('/', (req, res) => {
    console.log('greeting GET');
    console.log(req.body)
    res.send("<h1>HELLO WORLD</h1><a href='localhost:4000/checklist'>Checklist</a>")
})

module.exports = router;