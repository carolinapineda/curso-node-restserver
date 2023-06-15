const { Router } = require('express');
const { buscar } = require('../controller/buscar');


const router = Router();


router.get('/:coleccion/:termino', buscar);


module.exports = router;