module.exports = function adminAuth(req, res, next) {
    const adminKey = req.headers["x-admin-key"]

    if (!adminKey || adminKey !== process.env.ADMIN_API_KEY) {
        return res.status(401).json({ message: "Unauthorized admin access" })
    }

    next()
}
