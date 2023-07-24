const cupidController = require('../../controllers/cupidController');


var express = require('express');
var router = express.Router();

router.post('/new', cupidController.create);
router.get('/allcupids', cupidController.obtain);
router.get('/:id', cupidController.obtainByUserId);//agregar un middleware para chequear token y que el usuario que ingrese
//tenga que estar logeado para consultar sus cupid... esto mismo se deberia hacer en otras consultas sensibles (creo)


router.delete('/:id', cupidController.delete);//deberia agregar un control aqui para que no cualquiera pueda eliminar canciones

module.exports = router;