const express = require("express")
const router = express.Router()

const { adminLogin } = require("../controllers/admin.auth.controller")

/**
 * POST /api/admin/login
 */
router.post("/login", adminLogin)

module.exports = router
