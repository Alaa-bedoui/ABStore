const router = require('express').Router();
const itemController = require("../controllers/controller");

router.get("/getAll", itemController.selectAllItems);
router.get("/getOne/:id", itemController.selectOne);
router.post("/signUp",itemController.signUp)
router.post("/login", itemController.login)
router.put("/update/:id", itemController.update);
router.delete("/delete/:id", itemController.remove);

module.exports = router;
