const express = require("express");
const router = express.Router();

const { login, signin } = require("../Controllers/Auth");
// const { verifyToken } = require("../middleware/authmiddleware");

router.post("/login", login);
router.post("/signin", signin);

module.exports = router;
