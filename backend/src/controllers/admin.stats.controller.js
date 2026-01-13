const Client = require("../models/Client")
const Menu = require("../models/Menu")
const Order = require("../models/Order")

exports.getStats = async (req, res) => {
    try {
        const clients = await Client.countDocuments()
        const menus = await Menu.countDocuments()
        const orders = await Order.countDocuments()

        res.json({ clients, menus, orders })
    } catch (e) {
        console.error("STATS ERROR:", e)
        res.status(500).json({ message: "Stats error" })
    }
}
