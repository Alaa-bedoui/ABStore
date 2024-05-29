const router = require('express').Router();
const itemController = require("../controllers/controller");

router.get("/getAll", itemController.selectAll);
router.get("/getOne/:id", itemController.selectOne);
router.get("/getFav/:iduser", itemController.getFavByUser);
router.post("/signUp",itemController.signUp)
router.post("/login", itemController.login)
router.post("/:iduser/:iditem", itemController.addFav)
router.post("/add", itemController.add);
router.put("/update/:id", itemController.update);
router.delete("/delete/:id", itemController.remove);
router.post('/verify-email/:token', itemController.verifyEmail)
module.exports = router;
