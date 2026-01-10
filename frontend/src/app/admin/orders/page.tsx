"use client"

import { useEffect, useState } from "react"
import AdminGuard from "@/components/AdminGuard"

type Order = {
    _id: string
    clientSlug: string
    source: string
    status: string
    createdAt: string
}

export default function AdminOrders() {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem("admin_token")
        if (!token) return

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then(setOrders)
            .finally(() => setLoading(false))
    }, [])

    return (
        <AdminGuard>
            <main style={{ padding: 40 }}>
                <h1>Commandes</h1>

                {loading && <p>Chargement…</p>}

                {!loading && orders.length === 0 && (
                    <p>Aucune commande</p>
                )}

                {orders.length > 0 && (
                    <table border={1} cellPadding={10}>
                        <thead>
                            <tr>
                                <th>Client</th>
                                <th>Source</th>
                                <th>Statut</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((o) => (
                                <tr key={o._id}>
                                    <td>{o.clientSlug}</td>
                                    <td>{o.source}</td>
                                    <td>{o.status}</td>
                                    <td>
                                        {new Date(o.createdAt).toLocaleString()}
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
