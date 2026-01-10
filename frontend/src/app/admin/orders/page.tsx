"use client"

import { useEffect, useState } from "react"
import AdminGuard from "@/components/AdminGuard"

type Order = {
    _id: string
    clientSlug: string
    source: "whatsapp" | "form"
    status: "new" | "processed"
    createdAt: string
}

export default function AdminOrders() {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [updatingId, setUpdatingId] = useState<string | null>(null)
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

    const fetchOrders = async () => {
        const token = localStorage.getItem("admin_token")
        if (!token) return

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        const data = await res.json()
        setOrders(data)
        setLastUpdate(new Date())
        setLoading(false)
    }

    // 🔄 AUTO-REFRESH (C5)
    useEffect(() => {
        fetchOrders()
        const interval = setInterval(fetchOrders, 10000)
        return () => clearInterval(interval)
    }, [])

    // 🟢 ACTION : TRAITER COMMANDE
    const markAsProcessed = async (id: string) => {
        const token = localStorage.getItem("admin_token")
        if (!token) return

        setUpdatingId(id)

        await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ status: "processed" })
            }
        )

        await fetchOrders()
        setUpdatingId(null)
    }

    // 📊 STATS (C4)
    const total = orders.length
    const newOrders = orders.filter((o) => o.status === "new").length
    const processedOrders = orders.filter(
        (o) => o.status === "processed"
    ).length

    return (
        <AdminGuard>
            <main style={{ padding: 40 }}>
                <h1>Commandes</h1>

                {/* 📊 DASHBOARD */}
                <div
                    style={{
                        display: "flex",
                        gap: 20,
                        marginTop: 20,
                        marginBottom: 30
                    }}
                >
                    <StatCard label="Total" value={total} />
                    <StatCard
                        label="Nouvelles"
                        value={newOrders}
                        color="#dc2626"
                    />
                    <StatCard
                        label="Traitées"
                        value={processedOrders}
                        color="#16a34a"
                    />
                </div>

                {lastUpdate && (
                    <p style={{ fontSize: 12, opacity: 0.6 }}>
                        Dernière mise à jour :{" "}
                        {lastUpdate.toLocaleTimeString()}
                    </p>
                )}

                {loading && <p>Chargement…</p>}

                {!loading && orders.length === 0 && (
                    <p>Aucune commande</p>
                )}

                {orders.length > 0 && (
                    <table
                        border={1}
                        cellPadding={10}
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            marginTop: 20
                        }}
                    >
                        <thead>
                            <tr>
                                <th>Client</th>
                                <th>Source</th>
                                <th>Statut</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((o) => (
                                <tr key={o._id}>
                                    <td>{o.clientSlug}</td>
                                    <td>{o.source}</td>
                                    <td>
                                        {o.status === "new" ? (
                                            <span style={{ color: "#dc2626" }}>
                                                Nouveau
                                            </span>
                                        ) : (
                                            <span
                                                style={{ color: "#16a34a" }}
                                            >
                                                Traité
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        {new Date(
                                            o.createdAt
                                        ).toLocaleString()}
                                    </td>
                                    <td>
                                        {o.status === "new" ? (
                                            <button
                                                onClick={() =>
                                                    markAsProcessed(o._id)
                                                }
                                                disabled={
                                                    updatingId === o._id
                                                }
                                                style={{
                                                    padding: "6px 12px",
                                                    backgroundColor: "#16a34a",
                                                    color: "white",
                                                    borderRadius: 4,
                                                    border: "none",
                                                    cursor: "pointer"
                                                }}
                                            >
                                                {updatingId === o._id
                                                    ? "Traitement…"
                                                    : "Traiter"}
                                            </button>
                                        ) : (
                                            "—"
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </main>
        </AdminGuard>
    )
}

/* 🧩 COMPONENT : STAT CARD */

function StatCard({
    label,
    value,
    color
}: {
    label: string
    value: number
    color?: string
}) {
    return (
        <div
            style={{
                padding: 20,
                minWidth: 140,
                borderRadius: 8,
                background: "#111",
                border: "1px solid #333"
            }}
        >
            <div style={{ fontSize: 14, opacity: 0.7 }}>{label}</div>
            <div
                style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    color: color || "white"
                }}
            >
                {value}
            </div>
        </div>
    )
}
