const express = require("express")
const router = express.Router()
const Menu = require("../models/Menu")

// ⚠️ 1️⃣ GET MENU PAR ID — TOUJOURS EN PREMIER
router.get("/:id", async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id)
        res.json(menu)
    } catch (e) {
        res.status(404).json({ message: "Menu not found" })
    }
})

// 2️⃣ GET TOUS LES MENUS
router.get("/", async (req, res) => {
    const menus = await Menu.find()
    res.json(menus)
})

// 3️⃣ CREATE
router.post("/", async (req, res) => {
    const menu = await Menu.create(req.body)
    res.status(201).json(menu)
})

// 4️⃣ UPDATE
router.put("/:id", async (req, res) => {
    const menu = await Menu.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.json(menu)
})

// 5️⃣ DELETE
router.delete("/:id", async (req, res) => {
    await Menu.findByIdAndDelete(req.params.id)
    res.status(204).end()
})

module.exports = router
