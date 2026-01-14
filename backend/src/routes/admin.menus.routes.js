const express = require("express")
const router = express.Router()
const Menu = require("../models/Menu")
const Client = require("../models/Client")

router.get("/:id", async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id)
        if (!menu) return res.status(404).json({ message: "Menu introuvable" })

        const client = await Client.findOne({ slug: menu.clientSlug })

        res.json({
            ...menu.toObject(),
            menuType: client?.menuType || "catalogue",
            orderMode: client?.orderMode || "none",
        })
    } catch (e) {
        res.status(500).json({ message: "Erreur serveur" })
    }
})

router.put("/:id", async (req, res) => {
    try {
        const menu = await Menu.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.json(menu)
    } catch (e) {
        res.status(400).json({ message: "Erreur mise à jour menu" })
    }
})

module.exports = router
