const Client = require("../models/Client")
const Menu = require("../models/Menu")

exports.getMenuByClient = async (req, res) => {
    try {
        const { slug } = req.params
        const { lang = "fr" } = req.query

        const client = await Client.findOne({ slug })
        if (!client) {
            return res.status(404).json({ message: "Client not found" })
        }

        const menu = await Menu.findOne({
            clientSlug: slug,
            language: lang
        })

        if (!menu) {
            return res.status(404).json({ message: "Menu not found" })
        }

        res.json({
            theme: client.theme,
            orderMode: client.orderMode,
            sections: menu.sections
        })
    } catch (error) {
        console.error("API ERROR:", error)
        res.status(500).json({ message: "Server error" })
    }
}
