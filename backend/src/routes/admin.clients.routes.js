const express = require("express")
const router = express.Router()

const Client = require("../models/Client")

const {
    getClients,
    createClient,
    updateClient,
    deleteClient
} = require("../controllers/admin.clients.controller")

// 🔹 LISTE DES CLIENTS
router.get("/", getClients)

// 🔹 GET CLIENT PAR ID (⚠️ AVANT put/delete)
router.get("/:id", async (req, res) => {
    try {
        const client = await Client.findById(req.params.id)

        if (!client) {
            return res.status(404).json({ message: "Client not found" })
        }

        res.json(client)
    } catch (e) {
        res.status(400).json({ message: "Invalid client id" })
    }
})

// 🔹 CRÉATION
router.post("/", createClient)

// 🔹 MISE À JOUR
router.put("/:id", updateClient)

// 🔹 SUPPRESSION
router.delete("/:id", deleteClient)

module.exports = router
