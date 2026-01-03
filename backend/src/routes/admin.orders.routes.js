const express = require("express")
const router = express.Router()

const {
    getOrders,
    updateOrderStatus
} = require("../controllers/admin.orders.controller")

router.get("/", getOrders)
router.put("/:id", updateOrderStatus)

module.exports = router
