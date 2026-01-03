const express = require("express")
const router = express.Router()

const {
    getMenus,
    createMenu,
    updateMenu,
    deleteMenu
} = require("../controllers/admin.menus.controller")

router.get("/", getMenus)
router.post("/", createMenu)
router.get("/:id", async (req, res) => {
    const menu = await require("../models/Menu").findById(req.params.id)
    res.json(menu)
})

router.put("/:id", updateMenu)
router.delete("/:id", deleteMenu)

module.exports = router
