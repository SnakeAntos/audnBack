const playlistController = require('../../controllers/playlistController');
const cors = require('cors');

var express = require('express');
var router = express.Router();
router.use(cors());


router.get('/getsongs/:id', playlistController.getByNameAndIdAndListSongs);
router.get('/:id/:name', playlistController.getByNameAndId);
router.get('/:name', playlistController.obtainByName);
router.get('/all', playlistController.obtain);
router.post('/new', playlistController.create);
router.delete('/:id', playlistController.delete);



router.delete('/:id', playlistController.delete);//deberia agregar un control aqui para que no cualquiera pueda eliminar canciones

module.exports = router;