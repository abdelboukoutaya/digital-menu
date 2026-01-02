const { Schema, model } = require("mongoose");

const ClientSchema = new Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },

        theme: {
            primaryColor: { type: String, default: "#000000" },
            font: { type: String, default: "sans-serif" }
        },

        orderMode: {
            type: String,
            enum: ["catalogue", "whatsapp", "form", "glovo"],
            default: "catalogue"
        }
    },
    { timestamps: true }
);

module.exports = model("Client", ClientSchema);
