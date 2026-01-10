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
        setLoading(false)
    }

    useEffect(() => {
        fetchOrders()
    }, [])

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

    return (
        <AdminGuard>
            <main style={{ padding: 40 }}>
                <h1>Commandes</h1>

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
