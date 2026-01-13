"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const res = await fetch(
                "https://chic-renewal-production.up.railway.app/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                }
            )

            if (!res.ok) {
                throw new Error("Email ou mot de passe incorrect")
            }

            const data = await res.json()

            // ⚠️ temporaire (on supprimera ça à l’étape middleware)
            localStorage.setItem("admin_token", data.accessToken)

            router.replace("/admin")
        } catch (err: any) {
            setError(err.message || "Erreur de connexion")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="login-container">
            <h1>Admin Login</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && <p className="error">{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "Connexion..." : "Connexion"}
                </button>
            </form>
        </div>
    )
}
