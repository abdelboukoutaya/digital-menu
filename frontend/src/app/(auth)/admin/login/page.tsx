"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLogin() {
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    // 🔁 Si déjà connecté → dashboard
    useEffect(() => {
        const token = localStorage.getItem("admin_token")
        if (token) {
            router.replace("/admin")
        }
    }, [router])

    const login = async () => {
        setError("")
        setLoading(true)

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/admin/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                }
            )

            if (!res.ok) {
                setError("Email ou mot de passe incorrect")
                setLoading(false)
                return
            }

            const data = await res.json()

            // 🔑 STOCKAGE UNIQUE DU TOKEN
            localStorage.setItem("admin_token", data.token)
            localStorage.setItem("admin_role", data.role)


            router.replace("/admin")
        } catch (e) {
            setError("Erreur réseau")
        } finally {
            setLoading(false)
        }
    }

    return (
        <main
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#000",
                color: "#fff"
            }}
        >
            <div style={{ width: 320 }}>
                <h1 style={{ marginBottom: 24 }}>Admin Login</h1>

                {error && (
                    <p style={{ color: "#ef4444", marginBottom: 16 }}>
                        {error}
                    </p>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        width: "100%",
                        padding: 10,
                        marginBottom: 12
                    }}
                />

                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        width: "100%",
                        padding: 10,
                        marginBottom: 16
                    }}
                />

                <button
                    onClick={login}
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: 12,
                        background: "#22c55e",
                        color: "#000",
                        fontWeight: "bold",
                        cursor: loading ? "not-allowed" : "pointer"
                    }}
                >
                    {loading ? "Connexion..." : "Se connecter"}
                </button>
            </div>
        </main>
    )
}