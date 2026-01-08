const express = require("express");
const cors = require("cors");
const adminAuth = require("./middlewares/adminAuth")

const app = express();

app.use(express.json());

// ⚠️ ORIGINS AUTORISÉES (corrigé)
const allowedOrigins = [
    "http://localhost:3000",
    "https://digital-menu-livid.vercel.app",
    "https://digital-menu-one-kappa.vercel.app"
];

app.use(
    cors({
        origin: function (origin, callback) {
            // Autoriser Postman / SSR / appels serveur
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            } else {
                console.error("CORS BLOCKED:", origin);
                return callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"],
        credentials: true
    })
);

// Routes API
app.use("/api/menus", require("./routes/menus.routes"));
app.use("/api/orders", require("./routes/orders.routes"));
app.use("/api/admin/clients", adminAuth, require("./routes/admin.clients.routes"))
app.use("/api/admin/menus", adminAuth, require("./routes/admin.menus.routes"))
app.use("/api/admin/orders", adminAuth, require("./routes/admin.orders.routes"))
app.use("/api/admin/dashboard", adminAuth, require("./routes/admin.dashboard.routes"))
app.use("/api/admin/auth", require("./routes/admin.auth.routes"))



app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});

app.get("/api/orders-test", (req, res) => {
    res.json({ ok: true });
});

module.exports = app;
