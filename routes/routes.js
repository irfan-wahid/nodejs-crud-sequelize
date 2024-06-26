const express = require('express');

const router = express.Router();

const controller = require('../controllers/index');

router.get("/transaction/:user_id", controller.transaction.getUserTransaction);
router.get("/transactions", controller.transaction.listTransaction);

router.get("/", controller.user.getAll);
router.get("/login", controller.user.login);
router.get("/:username", controller.user.getUsername);
router.post("/", controller.user.createNew);
router.patch("/:id", controller.user.updateData);
router.delete("/:id", controller.user.deleteData);

module.exports = router;