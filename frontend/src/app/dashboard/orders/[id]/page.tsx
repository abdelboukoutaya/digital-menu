"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useRequireAdmin } from "@/lib/requireAdmin"
import { getAdminToken } from "@/lib/auth"

type OrderItem = {
    name: string
    price?: string
}

type Order = {
    _id: string
    clientSlug: string
    items: OrderItem[]
    status: string
    source: string
    createdAt: string
}

export default function OrderDetailPage() {
    useRequireAdmin()

    const { id } = useParams<{ id: string }>()
    const router = useRouter()

    const [order, setOrder] = useState<Order | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        async function fetchOrder() {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${getAdminToken()}`,
                        },
                    }
                )

                if (!res.ok) throw new Error("Impossible de charger la commande")

                const data = await res.json()
                setOrder(data)
            } catch (e: any) {
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }

        fetchOrder()
    }, [id])

    async function updateStatus(status: string) {
        if (!order) return

        await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders/${order._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getAdminToken()}`,
                },
                body: JSON.stringify({ status }),
            }
        )

        setOrder({ ...order, status })
    }

    if (loading) return <p>Chargement...</p>
    if (error) return <p className="error">{error}</p>
    if (!order) return null

    return (
        <>
            <h1>Détail commande</h1>

            <p>
                <strong>Client :</strong> {order.clientSlug}
            </p>
            <p>
                <strong>Source :</strong> {order.source}
            </p>
            <p>
                <strong>Status :</strong> {order.status}
            </p>
            <p>
                <strong>Date :</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
            </p>

            <h3>Produits</h3>
            <ul>
                {order.items.map((item, i) => (
                    <li key={i}>
                        {item.name} — {item.price || "-"}
                    </li>
                ))}
            </ul>

            <div style={{ marginTop: 20 }}>
                <button onClick={() => updateStatus("pending")}>
                    Pending
                </button>
                <button onClick={() => updateStatus("processed")}>
                    Processed
                </button>
                <button onClick={() => updateStatus("cancelled")}>
                    Cancelled
                </button>
            </div>

            <button
                style={{ marginTop: 20 }}
                onClick={() => router.push("/dashboard/orders")}
            >
                Retour
            </button>
        </>
    )
}
