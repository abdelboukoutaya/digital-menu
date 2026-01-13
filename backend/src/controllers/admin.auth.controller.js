const jwt = require("jsonwebtoken")

/**
 * LOGIN ADMIN
 */
exports.adminLogin = (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            message: "Email et mot de passe requis",
        })
    }

    if (
        email !== process.env.ADMIN_EMAIL ||
        password !== process.env.ADMIN_PASSWORD
    ) {
        return res.status(401).json({
            message: "Identifiants invalides",
        })
    }

    const token = jwt.sign(
        { role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    return res.json({
        token,
        role: "admin",
    })
}
