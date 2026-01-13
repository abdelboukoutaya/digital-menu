require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
import app from "./app.js"
import { config } from "./config/env.js"
import { errorHandler } from "./middlewares/error.middleware.js"
connectDB();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
