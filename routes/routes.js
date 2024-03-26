const express = require('express');

const router = express.Router();

const controller = require('../controllers/index');

router.get("/", controller.user.getAll);
router.get("/:username", controller.user.getUsername);
router.post("/", controller.user.createNew);
router.patch("/:id", controller.user.updateData);
router.delete("/:id", controller.user.deleteData);

router.get("/transaction/:user_id", controller.transaction.getUserTransaction);

module.exports = router;