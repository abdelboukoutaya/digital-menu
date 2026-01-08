"use client"

import { useEffect, useState } from "react"

type DashboardStats = {
    clients: number
    menus: number
    orders: number
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchStats()
    }, [])

    const fetchStats = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("admin_token")}`
                }
            })


            if (!res.ok) {
                throw new Error("Erreur dashboard")
            }

            const data = await res.json()
            setStats(data)
        } catch (e) {
            setError("Impossible de charger le dashboard")
        }
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>
    }

    if (!stats) {
        return <p>Chargement du dashboard…</p>
    }

    return (
        <main style={{ padding: 40 }}>
            <h1>Dashboard Admin</h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 20,
                    marginTop: 30
                }}
            >
                <div
                    style={{
                        padding: 20,
                        border: "1px solid #ccc",
                        borderRadius: 8
                    }}
                >
                    <h3>Clients</h3>
                    <p style={{ fontSize: 32, fontWeight: "bold" }}>
                        {stats.clients}
                    </p>
                </div>

                <div
                    style={{
                        padding: 20,
                        border: "1px solid #ccc",
                        borderRadius: 8
                    }}
                >
                    <h3>Menus</h3>
                    <p style={{ fontSize: 32, fontWeight: "bold" }}>
                        {stats.menus}
                    </p>
                </div>

                <div
                    style={{
                        padding: 20,
                        border: "1px solid #ccc",
                        borderRadius: 8
                    }}
                >
                    <h3>Commandes</h3>
                    <p style={{ fontSize: 32, fontWeight: "bold" }}>
                        {stats.orders}
                    </p>
                </div>
            </div>
        </main>
    )
}
