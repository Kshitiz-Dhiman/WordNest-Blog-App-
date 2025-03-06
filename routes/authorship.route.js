const express = require("express");
const router = express.Router();
const { getAuthorship, createAuthorship } = require("../controller/authorship.controller");
router.get("/get-authorship", getAuthorship)
router.post("/create-authorship", createAuthorship);
module.exports = router;
