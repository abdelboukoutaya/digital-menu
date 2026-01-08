const express = require("express")
const router = express.Router()

const {
    getClients,
    createClient,
    updateClient,
    deleteClient
} = require("../controllers/admin.clients.controller")

router.get("/", getClients)
router.get("/:id", async (req, res) => {
    try {
        const Client = require("../models/Client")
        const client = await Client.findById(req.params.id)

        if (!client) {
            return res.status(404).json({ message: "Client not found" })
        }

        res.json(client)
    } catch (e) {
        res.status(400).json({ message: "Invalid client id" })
    }
})

router.post("/", createClient)
router.put("/:id", updateClient)
router.delete("/:id", deleteClient)

module.exports = router
