const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ API (uniquement sous /api)
app.get("/api/health", (req, res) => {
  res.json({ status: "API OK ✅" });
});

// ✅ FRONT (backend/public)
app.use(express.static(path.join(__dirname, "public")));

// ✅ Fallback (toujours tout en bas)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log("✅ API running on port", PORT);
});
