const songController = require('../../controllers/songController');


var express = require('express');
var router = express.Router();

router.post('/new', songController.create);
router.get('/allsongs', songController.obtain);
router.get('/:name', songController.obtainByName);

router.delete('/:id', songController.delete);//deberia agregar un control aqui para que no cualquiera pueda eliminar canciones

module.exports = router;