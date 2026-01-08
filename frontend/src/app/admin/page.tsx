"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminGuard from "@/components/AdminGuard"
import AdminLogout from "@/components/AdminLogout"

type DashboardStats = {
    clients: number
    menus: number
    orders: number
}

export default function AdminDashboard() {
    const router = useRouter()

    const [stats, setStats] = useState<DashboardStats | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            const token = localStorage.getItem("admin_token")

            console.log("API URL =", process.env.NEXT_PUBLIC_API_URL)
            console.log("TOKEN =", token)

            if (!token) {
                setError("Non authentifié")
                setLoading(false)
                router.replace("/admin/login")
                return
            }

            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                if (res.status === 401) {
                    localStorage.removeItem("admin_token")
                    router.replace("/admin/login")
                    return
                }

                if (!res.ok) {
                    throw new Error(`HTTP ${res.status}`)
                }

                const data = await res.json()
                setStats(data)
            } catch (e: any) {
                console.error("DASHBOARD FETCH ERROR:", e)
                setError("Impossible de charger le dashboard")
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [router])

    if (loading) {
        return (
            <AdminGuard>
                <p style={{ padding: 40 }}>Chargement…</p>
            </AdminGuard>
        )
    }

    if (error) {
        return (
            <AdminGuard>
                <p style={{ padding: 40, color: "red" }}>{error}</p>
            </AdminGuard>
        )
    }

    if (!stats) {
        return null
    }

    return (
        <AdminGuard>
            <main style={{ padding: 40 }}>
                <h1>Dashboard Admin</h1>

                <AdminLogout />

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 20,
                        marginTop: 30
                    }}
                >
                    <div style={cardStyle}>
                        <h3>Clients</h3>
                        <p style={numberStyle}>{stats.clients}</p>
                    </div>

                    <div style={cardStyle}>
                        <h3>Menus</h3>
                        <p style={numberStyle}>{stats.menus}</p>
                    </div>

                    <div style={cardStyle}>
                        <h3>Commandes</h3>
                        <p style={numberStyle}>{stats.orders}</p>
                    </div>
                </div>
            </main>
        </AdminGuard>
    )
}

const cardStyle = {
    padding: 20,
    border: "1px solid #444",
    borderRadius: 8
}

const numberStyle = {
    fontSize: 32,
    fontWeight: "bold"
}
