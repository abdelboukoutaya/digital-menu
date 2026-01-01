const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "API OK ✅" });
});

app.listen(3000, () => {
  console.log("✅ API running on http://localhost:3000");
});
