"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

type Client = {
    _id: string
    name: string
    slug: string
    orderMode: string
    menuStyle?: string
}

export default function AdminClientsDashboard() {
    const [clients, setClients] = useState<Client[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem("admin_token")
        if (!token) return

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/clients`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then(setClients)
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <p>Chargement des clients…</p>

    return (
        <div>
            <h1 style={{ marginBottom: 20 }}>Clients</h1>

            <div style={styles.grid}>
                {clients.map((client) => (
                    <div key={client._id} style={styles.card}>
                        <div style={styles.header}>
                            <strong>{client.name}</strong>
                            <span style={styles.statusOnline}>● Online</span>
                        </div>

                        <p style={styles.slug}>
                            {client.slug}.digitalmenu.app
                        </p>

                        <div style={styles.meta}>
                            <Meta label="Menus" value="1" />
                            <Meta label="Commandes" value="—" />
                            <Meta
                                label="Style"
                                value={client.menuStyle || "classic"}
                            />
                        </div>

                        <Link
                            href={`/admin/clients/${client._id}`}
                            style={styles.link}
                        >
                            Gérer le client →
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ───────── COMPONENTS ───────── */

function Meta({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <div style={{ fontSize: 12, opacity: 0.6 }}>{label}</div>
            <div style={{ fontWeight: "bold" }}>{value}</div>
        </div>
    )
}

/* ───────── STYLES ───────── */

const styles: Record<string, React.CSSProperties> = {
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 20
    },
    card: {
        padding: 20,
        borderRadius: 12,
        background: "#0b0f19",
        border: "1px solid #1f2937"
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 6
    },
    statusOnline: {
        color: "#16a34a",
        fontSize: 12
    },
    slug: {
        fontSize: 13,
        opacity: 0.7,
        marginBottom: 12
    },
    meta: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 14
    },
    link: {
        display: "inline-block",
        marginTop: 10,
        fontSize: 14,
        color: "#38bdf8",
        textDecoration: "none"
    }
}
