import jwt from "jsonwebtoken"
import { config } from "../config/env.js"

export function generateAdminToken() {
    return jwt.sign(
        { role: "admin" },
        config.JWT_SECRET,
        { expiresIn: "1d" }
    )
}
