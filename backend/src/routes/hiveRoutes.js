const express = require("express");
const hiveController = require("../controllers/hiveController");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.use(authenticate);
router.post("/", hiveController.createHive);
router.get("/me", hiveController.getMyHive);
router.post("/join", hiveController.joinHive);

module.exports = router;
