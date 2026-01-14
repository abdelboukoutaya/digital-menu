"use client"

import { useEffect, useState } from "react"
import { useRequireAdmin } from "@/lib/requireAdmin"
import { getAdminToken } from "@/lib/auth"
import Link from "next/link"

type Stats = {
    clients: number
    menus: number
    orders: number
}

export default function DashboardPage() {
    useRequireAdmin()

    const [stats, setStats] = useState<Stats | null>(null)
    const [error, setError] = useState("")

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/stats`, {
            headers: {
                Authorization: `Bearer ${getAdminToken()}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Erreur chargement dashboard")
                return res.json()
            })
            .then(setStats)
            .catch(() => setError("Impossible de charger le dashboard"))
    }, [])

    if (error) return <p className="error">{error}</p>
    if (!stats) return <p>Chargement…</p>

    return (
        <>
            <h1>Dashboard</h1>

            <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
                <div className="card">
                    <h3>Clients</h3>
                    <p>{stats.clients}</p>
                    <Link href="/dashboard/clients">Voir</Link>
                </div>

                <div className="card">
                    <h3>Menus</h3>
                    <p>{stats.menus}</p>
                    <Link href="/dashboard/menus">Voir</Link>
                </div>

                <div className="card">
                    <h3>Commandes</h3>
                    <p>{stats.orders}</p>
                    <Link href="/dashboard/orders">Voir</Link>
                </div>
            </div>
        </>
    )
}
