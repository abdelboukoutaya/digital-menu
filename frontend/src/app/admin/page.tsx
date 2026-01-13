"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const res = await fetch(
                "https://chic-renewal-production.up.railway.app/api/admin/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                }
            )

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || "Erreur de connexion")
            }

            // stockage temporaire (on améliorera plus tard)
            localStorage.setItem("admin_token", data.token)

            router.push("/dashboard")
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="login-box">
            <h1>Connexion administrateur</h1>

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

                {error && <p style={{ color: "#dc2626" }}>{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "Connexion..." : "Connexion"}
                </button>
            </form>
        </div>
    )
}
