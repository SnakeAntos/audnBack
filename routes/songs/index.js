const songController = require("../../controllers/songController");

var express = require("express");
var router = express.Router();

const cors = require("cors");
router.use(cors());

router.post("/new", songController.create);
router.get("/allsongs", songController.obtain);
router.get("/:name", songController.obtainByName);
router.get("/random/obtain", songController.obtainRandom);
router.get("/byGenre/obtain", songController.obtainbyGenre);

router.delete("/:id", songController.delete); //deberia agregar un control aqui para que no cualquiera pueda eliminar canciones

module.exports = router;
