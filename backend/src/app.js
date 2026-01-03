const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
const allowedOrigins = [
    "http://localhost:3000",
    "https://digital-menu-livid.vercel.app"
];

app.use(
    cors({
        origin: function (origin, callback) {
            // Autoriser Postman / serveur / SSR
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"]
    })
);


// Routes API
app.use("/api/menus", require("./routes/menus.routes"));
app.use("/api/orders", require("./routes/orders.routes"))
app.use("/api/admin/clients", require("./routes/admin.clients.routes"))
app.use("/api/admin/menus", require("./routes/admin.menus.routes"))
app.use("/api/admin/orders", require("./routes/admin.orders.routes"))


app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});

app.get("/api/orders-test", (req, res) => {
    res.json({ ok: true })
})

module.exports = app;

