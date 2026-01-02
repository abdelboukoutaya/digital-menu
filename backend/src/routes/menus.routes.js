const express = require("express");
const router = express.Router();

const { getMenuByClient } = require("../controllers/menus.controller");

router.get("/:slug", getMenuByClient);

module.exports = router;
