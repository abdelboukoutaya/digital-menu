"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLogin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    const login = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/admin/auth/login`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            }
        )

        if (!res.ok) {
            setError("Identifiants incorrects")
            return
        }

        const data = await res.json()
        localStorage.setItem("admin_token", data.token)
        router.push("/admin")
    }

    return (
        <main style={{ padding: 40 }}>
            <h1>Admin Login</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br /><br />

            <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br /><br />

            <button onClick={login}>Se connecter</button>
        </main>
    )
}
