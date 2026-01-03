const Client = require("../models/Client")

exports.getClients = async (req, res) => {
    const clients = await Client.find()
    res.json(clients)
}

exports.createClient = async (req, res) => {
    try {
        const client = await Client.create(req.body)
        res.status(201).json(client)
    } catch (e) {
        res.status(400).json({ message: "Client creation failed" })
    }
}

exports.updateClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.json(client)
    } catch (e) {
        res.status(400).json({ message: "Client update failed" })
    }
}

exports.deleteClient = async (req, res) => {
    await Client.findByIdAndDelete(req.params.id)
    res.status(204).end()
}
