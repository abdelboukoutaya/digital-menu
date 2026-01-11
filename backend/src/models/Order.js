const { Schema, model } = require("mongoose")

const OrderSchema = new Schema(
    {
        clientSlug: { type: String, required: true },
        items: [
            {
                name: String,
                price: String
            }
        ],
        source: {
            type: String,
            enum: ["whatsapp", "form"],
            default: "form"
        },
        status: {
            type: String,
            enum: ["new", "processed"],
            default: "new"
        },
        language: {
            type: String,
            default: "fr"
        }

    },
    { timestamps: true }
)

module.exports = model("Order", OrderSchema)
