const express = require('express');
const router = express.Router();

router.use('/',(req, res) =>{
    res.send('ruta routeada accedida con exito')
});

module.exports = router;