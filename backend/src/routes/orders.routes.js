const express = require("express")
const router = express.Router()
const Order = require("../models/Order")

router.post("/", async (req, res) => {
    const { clientSlug, items, source, name, phone } = req.body

    if (!clientSlug || !items || items.length === 0) {
        return res.status(400).json({ message: "Commande invalide" })
    }

    const order = await Order.create({
        clientSlug,
        items,
        source,
        customer: { name, phone },
        status: "pending",
    })

    res.status(201).json(order)
})

module.exports = router
