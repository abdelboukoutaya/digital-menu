"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError("")

        try {
            const res = await fetch(
                "https://chic-renewal-production.up.railway.app/api/admin/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                }
            )

            const data = await res.json()
            if (!res.ok) throw new Error(data.message)

            localStorage.setItem("admin_token", data.token)
            router.push("/dashboard")
        } catch (err: any) {
            setError(err.message)
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

                {error && <p style={{ color: "red" }}>{error}</p>}

                <button type="submit">Connexion</button>
            </form>
        </div>
    )
}
