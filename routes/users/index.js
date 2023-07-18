const userController = require('../../../controllers/userController');
const verifyToken = require('../../../middlewares/validateJWT');

var express = require('express');
var router = express.Router();

router.post('/', userController.create);
router.post('/login', userController.login);
router.delete('/:user_id', verifyToken, userController.delete);

module.exports = router;