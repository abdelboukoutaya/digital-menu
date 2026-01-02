const { Schema, model } = require("mongoose");

const MenuSchema = new Schema(
    {
        clientSlug: { type: String, required: true },
        language: { type: String, default: "fr" },

        sections: {
            type: Array,
            default: []
        }
    },
    { timestamps: true }
);

module.exports = model("Menu", MenuSchema);
