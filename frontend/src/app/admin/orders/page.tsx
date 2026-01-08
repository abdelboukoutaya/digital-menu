"use client"

import { useEffect, useState } from "react"

type Order = {
    _id: string
    clientSlug: string
    source: string
    status: string
    createdAt: string
}

export default function AdminOrders() {
    const [orders, setOrders] = useState<Order[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard`, {
                headers: {
                    "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_API_KEY as string
                }
            })


            if (!res.ok) {
                throw new Error("Erreur chargement commandes")
            }

            const data = await res.json()
            setOrders(data)
        } catch (e) {
            setError("Impossible de charger les commandes")
        } finally {
            setLoading(false)
        }
    }

    const updateStatus = async (id: string, status: string) => {
        await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders/${id}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status })
            }
        )

        fetchOrders()
    }

    if (loading) return <p>Chargement des commandes…</p>
    if (error) return <p style={{ color: "red" }}>{error}</p>

    return (
        <main style={{ padding: 40 }}>
            <h2>Commandes (ADMIN)</h2>

            {orders.length === 0 && <p>Aucune commande</p>}

            {orders.length > 0 && (
                <table border={1} cellPadding={8}>
                    <thead>
                        <tr>
                            <th>Client</th>
                            <th>Source</th>
                            <th>Statut</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order.clientSlug}</td>
                                <td>{order.source}</td>
                                <td>{order.status}</td>
                                <td>
                                    {order.status === "new" ? (
                                        <button
                                            onClick={() =>
                                                updateStatus(
                                                    order._id,
                                                    "processed"
                                                )
                                            }
                                        >
                                            Marquer traité
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                updateStatus(order._id, "new")
                                            }
                                        >
                                            Repasser nouveau
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </main>
    )
}
