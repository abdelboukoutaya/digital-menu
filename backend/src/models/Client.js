const mongoose = require("mongoose")

const ClientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: String,

    slug: {
        type: String,
        required: true,
        unique: true,
    },

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

    whatsappNumber: {
        type: String,
    },
})

/* 🔒 GARDE-FOU MÉTIER */
ClientSchema.pre("save", function (next) {
    if (this.menuType === "catalogue") {
        this.orderMode = "none"
        this.whatsappNumber = undefined
    }

    if (this.menuType === "boutique" && this.orderMode === "whatsapp") {
        if (!this.whatsappNumber) {
            return next(
                new Error("WhatsApp requis pour une boutique WhatsApp")
            )
        }
    }

    next()
})

module.exports = mongoose.model("Client", ClientSchema)
