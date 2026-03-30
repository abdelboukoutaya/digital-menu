const express = require("express")
const router = express.Router()
const Menu = require("../models/Menu")
const Client = require("../models/Client")

/* ───────── GET ALL MENUS (ADMIN) ───────── */
router.get("/", async (req, res) => {
    try {
        const menus = await Menu.find().sort({ updatedAt: -1 })
        res.json(menus)
    } catch (err) {
        res.status(500).json({ message: "Erreur chargement menus" })
    }
})

/* ───────── GET MENU BY ID (ADMIN) ───────── */
router.get("/:id", async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id)
        if (!menu) {
            return res.status(404).json({ message: "Menu introuvable" })
        }

        const client = await Client.findOne({ slug: menu.clientSlug })

        res.json({
            ...menu.toObject(),
            menuType: client?.menuType || "catalogue",
            orderMode: client?.orderMode || "none",
        })
    } catch (err) {
        res.status(500).json({ message: "Erreur chargement menu" })
    }
})

/* ───────── UPDATE MENU (ADMIN) ───────── */
router.put("/:id", async (req, res) => {
    try {
        const menu = await Menu.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        if (!menu) {
            return res.status(404).json({ message: "Menu introuvable" })
        }

        res.json(menu)
    } catch (err) {
        res.status(400).json({ message: "Erreur mise à jour menu" })
    }
})

/* ───────── CREATE MENU (ADMIN) ───────── */
router.post("/", async (req, res) => {
    try {
        const menu = await Menu.create(req.body)
        res.status(201).json(menu)
    } catch (err) {
        res.status(400).json({ message: "Erreur création menu" })
    }
})

/* ───────── DELETE MENU (ADMIN) ───────── */
router.delete("/:id", async (req, res) => {
    try {
        await Menu.findByIdAndDelete(req.params.id)
        res.status(204).end()
    } catch (err) {
        res.status(500).json({ message: "Erreur suppression menu" })
    }
})

module.exports = router
