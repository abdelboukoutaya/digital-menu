const express = require("express")
const cors = require("cors")

const adminAuth = require("./middlewares/adminAuth")

const app = express()

/* ───────── MIDDLEWARES GLOBAUX ───────── */

app.use(express.json())

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
)

/* ───────── ROUTES PUBLIQUES ───────── */

app.use("/api/menus", require("./routes/menus.routes"))
app.use("/api/orders", require("./routes/orders.routes"))

app.get("/api/health", (req, res) => {
    res.json({ status: "ok" })
})

/* ───────── ROUTES ADMIN ───────── */

/**
 * AUTH ADMIN (NON PROTÉGÉE)
 * POST /api/admin/login
 */
app.use("/api/admin", require("./routes/admin.auth.routes"))

/**
 * ROUTES ADMIN PROTÉGÉES
 */
app.use("/api/admin/clients", adminAuth, require("./routes/admin.clients.routes"))
app.use("/api/admin/menus", adminAuth, require("./routes/admin.menus.routes"))
app.use("/api/admin/orders", adminAuth, require("./routes/admin.orders.routes"))
app.use("/api/admin/stats", adminAuth, require("./routes/admin.stats.routes"))

/* ───────── EXPORT ───────── */

module.exports = app
