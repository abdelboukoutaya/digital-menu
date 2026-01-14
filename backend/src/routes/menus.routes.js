const express = require("express")
const router = express.Router()
const Menu = require("../models/Menu")
const Client = require("../models/Client")

/* ───────── MENU PUBLIC ───────── */
router.get("/:clientSlug", async (req, res) => {
    try {
        const { clientSlug } = req.params

        const menu = await Menu.findOne({ clientSlug })
        if (!menu) {
            return res.status(404).json({ message: "Menu introuvable" })
        }

        const client = await Client.findOne({ slug: clientSlug })

        res.json({
            ...menu.toObject(),
            menuType: client?.menuType || "catalogue",
            orderMode:
                client?.menuType === "boutique"
                    ? client.orderMode
                    : "none",
            whatsappNumber:
                client?.menuType === "boutique"
                    ? client.whatsappNumber || null
                    : null,
        })
    } catch (err) {
        console.error("MENU PUBLIC ERROR:", err)
        res.status(500).json({ message: "Erreur serveur menu public" })
    }
})

module.exports = router
