const userController = require('../../controllers/userController');
const verifyToken = require('../../middlewares/validateJWT');

var express = require('express');
var router = express.Router();

const cors = require('cors');
router.use(cors());

router.post('/new', userController.create);
router.post('/login', userController.login);
router.get('/allusers', userController.obtain);//esta ruta es poco segura ya que muestra
//todos los usuarios sin ningun permiso de por medio, es temporal para chequear la base, etc. 
router.get('/:user_name', verifyToken, userController.obtainByUser);//por medio del verifyToken solo puedo buscar si estoy logeado.

router.delete('/:id', verifyToken, userController.delete);

module.exports = router;