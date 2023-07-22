const playlistController = require('../../controllers/playlistController');


var express = require('express');
var router = express.Router();

router.post('/new', playlistController.create);
router.get('/all', playlistController.obtain);
router.get('/:name', playlistController.obtainByName);


router.delete('/:id', playlistController.delete);//deberia agregar un control aqui para que no cualquiera pueda eliminar canciones

module.exports = router;