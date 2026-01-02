const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes API
app.use("/api/menus", require("./routes/menus.routes"));

app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});

module.exports = app;
