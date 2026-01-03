const { Schema, model } = require("mongoose")

const MenuSchema = new Schema(
    {
        clientSlug: { type: String, required: true },
        language: { type: String, default: "fr" },
        sections: [
            {
                title: String,
                categories: [
                    {
                        title: String,
                        items: [
                            {
                                name: String,
                                price: String
                            }
                        ]
                    }
                ]
            }
        ]
    },
    { timestamps: true }
)

module.exports = model("Menu", MenuSchema)
