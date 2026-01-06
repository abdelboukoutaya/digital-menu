const express = require("express")
const router = express.Router()
const Order = require("../models/Order")

router.post("/", async (req, res) => {
    try {
        console.log("REQ BODY:", req.body)

        const order = await Order.create(req.body)
        res.status(201).json(order)
    } catch (e) {
        console.error("ORDER ERROR:", e)
        res.status(500).json({ message: "Order creation failed" })
    }
})

// ⚠️ PUBLIC — à sécuriser plus tard (ex: clé, token, rate limit)
router.get("/", async (req, res) => {

    const orders = await Order.find().sort({ createdAt: -1 })
    res.json(orders)
})

module.exports = router
