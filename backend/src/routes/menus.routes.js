router.get("/:clientSlug", async (req, res) => {
    const menu = await Menu.findOne({
        clientSlug: req.params.clientSlug,
    })

    if (!menu) {
        return res.status(404).json({ message: "Menu introuvable" })
    }

    const client = await Client.findOne({
        slug: req.params.clientSlug,
    })

    res.json({
        ...menu.toObject(),
        menuType: client?.menuType || "catalogue",
        orderMode:
            client?.menuType === "boutique"
                ? client.orderMode
                : "none",
        whatsappNumber:
            client?.menuType === "boutique"
                ? client.whatsappNumber
                : null,
    })
})
