const express = require("express");
const cors = require("cors");

const app = express();



app.use(cors());
app.use(express.json());

// Routes API
app.use("/api/menus", require("./routes/menus.routes"));
app.use("/api/orders", require("./routes/orders.routes"))
app.use("/api/admin/clients", require("./routes/admin.clients.routes"))


app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});

app.get("/api/orders-test", (req, res) => {
    res.json({ ok: true })
})

module.exports = app;

