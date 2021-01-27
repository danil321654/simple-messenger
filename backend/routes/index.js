const express = require("express");
const auth = require("./auth");
const message = require("./message");
const dialog = require("./dialog");
const router = express.Router();

router.use(auth);
router.use(message);
router.use(dialog);

module.exports = router;
