const express = require("express")
const router = express.Router()

const { getStats } = require("../controllers/admin.stats.controller")

router.get("/", getStats)

module.exports = router
