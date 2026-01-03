const Order = require("../models/Order")

exports.getOrders = async (req, res) => {
    const orders = await Order.find().sort({ createdAt: -1 })
    res.json(orders)
}

exports.updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        )
        res.json(order)
    } catch (e) {
        res.status(400).json({ message: "Order update failed" })
    }
}
