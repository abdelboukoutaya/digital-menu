import { config } from "../config/env.js"
import { generateAdminToken } from "../utils/jwt.js"

export function adminLogin(req, res) {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            message: "Email et mot de passe requis"
        })
    }

    if (
        email !== config.ADMIN_EMAIL ||
        password !== config.ADMIN_PASSWORD
    ) {
        return res.status(401).json({
            message: "Identifiants invalides"
        })
    }

    const token = generateAdminToken()

    return res.json({
        token,
        role: "admin"
    })
}
