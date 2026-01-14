const mongoose = require("mongoose")

const ClientSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        slug: { type: String, unique: true, required: true },

        menuType: {
            type: String,
            enum: ["catalogue", "boutique"],
            default: "catalogue",
        },

        orderMode: {
            type: String,
            enum: ["none", "whatsapp", "form"],
            default: "none",
        },

        whatsappNumber: String,
    },
    { timestamps: true }
)

module.exports = mongoose.model("Client", ClientSchema)
