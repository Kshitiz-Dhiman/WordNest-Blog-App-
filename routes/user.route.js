const express = require("express");
const router = express.Router();
const { getUser, createUser } = require("../controller/user.controller");

router.get("/get-user", getUser);
router.post("/create-user", createUser);

module.exports = router;
