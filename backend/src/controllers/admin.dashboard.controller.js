const Client = require("../models/Client")
const Menu = require("../models/Menu")
const Order = require("../models/Order")

exports.getDashboardStats = async (req, res) => {
    try {
        const clientsCount = await Client.countDocuments()
        const menusCount = await Menu.countDocuments()
        const ordersCount = await Order.countDocuments()

        res.json({
            clients: clientsCount,
            menus: menusCount,
            orders: ordersCount
        })
    } catch (error) {
        console.error("DASHBOARD ERROR:", error)
        res.status(500).json({ message: "Dashboard stats failed" })
    }
}
