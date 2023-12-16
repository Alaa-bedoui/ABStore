const router = require('express').Router();
const itemController = require("../controllers/controller");

router.get("/getAll", itemController.selectAll);
router.get("/getOne/:id", itemController.selectOne);
router.post("/signUp",itemController.signUp)
router.post("/login", itemController.login)
router.post("/add", itemController.add);
router.put("/update/:id", itemController.update);
router.delete("/delete/:id", itemController.remove);

module.exports = router;
