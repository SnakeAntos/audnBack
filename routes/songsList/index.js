
const songsListController = require('../../controllers/songsListController');


var express = require('express');
var router = express.Router();

const cors = require('cors');
router.use(cors());

router.post('/new', songsListController.create);
router.get('/byplaylistname', songsListController.obtainByPlaylistID);


//estas rutas no funcionan.
//router.delete('/deletesong/:id', songsListController.deleteBySongId);
//router.delete('/deleteplaylist/:id', songsListController.deleteByPlaylistID);//deberia agregar un control aqui para que no cualquiera pueda eliminar canciones

module.exports = router;