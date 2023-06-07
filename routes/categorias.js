const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

/*{{url}}/api/categorias
*/
router.get('/', (req, res) => {
    res.json('Todo OK');
});

module.exports = router;