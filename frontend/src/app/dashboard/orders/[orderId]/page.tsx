"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useRequireAdmin } from "@/lib/requireAdmin"
import { getAdminToken } from "@/lib/auth"

const API = "https://chic-renewal-production.up.railway.app"

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

    const { orderId } = useParams<{ orderId: string }>()
    const [order, setOrder] = useState<Order | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        fetch(`${API}/api/admin/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${getAdminToken()}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Impossible de charger la commande")
                return res.json()
            })
            .then(setOrder)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false))
    }, [orderId])

    function updateStatus(status: string) {
        if (!order) return

        fetch(`${API}/api/admin/orders/${order._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAdminToken()}`,
            },
            body: JSON.stringify({ status }),
        }).then(() => setOrder({ ...order, status }))
    }

    if (loading) return <p>Chargement…</p>
    if (error) return <p className="error">{error}</p>
    if (!order) return null

    return (
        <>
            {/* BREADCRUMB */}
            <nav style={{ marginBottom: 20 }}>
                <Link href="/dashboard/orders">Commandes</Link> {" > "}
                <strong>Détail</strong>
            </nav>

            <h1>Détail commande</h1>

            <p><b>Client :</b> {order.clientSlug}</p>
            <p><b>Source :</b> {order.source}</p>
            <p><b>Status :</b> {order.status}</p>
            <p>
                <b>Date :</b>{" "}
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
        </>
    )
}
