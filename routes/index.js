const express = require("express");
const auth = require("./auth");
const message = require("./message");
const chat = require("./chat");
const router = express.Router();

router.use(auth);
router.use(message);
router.use(chat);

module.exports = router;
