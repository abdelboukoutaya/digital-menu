const Menu = require("../models/Menu")

exports.getMenus = async (req, res) => {
    const menus = await Menu.find()
    res.json(menus)
}

exports.createMenu = async (req, res) => {
    try {
        const menu = await Menu.create(req.body)
        res.status(201).json(menu)
    } catch (e) {
        res.status(400).json({ message: "Menu creation failed" })
    }
}

exports.updateMenu = async (req, res) => {
    try {
        const menu = await Menu.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.json(menu)
    } catch (e) {
        res.status(400).json({ message: "Menu update failed" })
    }
}

exports.deleteMenu = async (req, res) => {
    await Menu.findByIdAndDelete(req.params.id)
    res.status(204).end()
}
