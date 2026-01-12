const express = require("express")
const cors = require("cors")

const app = express()

app.use(express.json())

/**
 * ✅ CORS SIMPLE & SÛR (DEV + PROD)
 */
app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "https://digital-menu-one-kappa.vercel.app"
        ],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    })
)

/**
 * 🔹 ROUTES PUBLIQUES
 */
app.use("/api/menus", require("./routes/menus.routes"))
app.use("/api/orders", require("./routes/orders.routes"))
app.use("/api/admin/orders", adminAuth, require("./routes/admin.orders.routes"))
app.use("/api/admin/stats", adminAuth, require("./routes/admin.stats.routes"))

/**
 * 🔹 AUTH ADMIN
 */
app.use("/api/admin/auth", require("./routes/admin.auth.routes"))

/**
 * 🔹 ROUTES ADMIN PROTÉGÉES
 */
const adminAuth = require("./middlewares/adminAuth")

app.use("/api/admin/dashboard", adminAuth, require("./routes/admin.dashboard.routes"))
app.use("/api/admin/clients", adminAuth, require("./routes/admin.clients.routes"))
app.use("/api/admin/menus", adminAuth, require("./routes/admin.menus.routes"))
app.use("/api/admin/orders", adminAuth, require("./routes/admin.orders.routes"))

/**
 * 🔹 HEALTH CHECK
 */
app.get("/api/health", (req, res) => {
    res.json({ status: "ok" })
})

module.exports = app
