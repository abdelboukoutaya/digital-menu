"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

type Client = {
    _id: string
    name: string
    slug: string
    orderMode: string
    theme?: {
        primaryColor?: string
        font?: string
    }
}

export default function ClientDetailPage() {
    const { id } = useParams<{ id: string }>()
    const [client, setClient] = useState<Client | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const token = localStorage.getItem("admin_token")
        if (!token) return

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/clients/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                if (!res.ok) throw new Error("Client introuvable")
                return res.json()
            })
            .then(setClient)
            .catch(() => setError("Impossible de charger le client"))
            .finally(() => setLoading(false))
    }, [id])

    if (loading) return <p>Chargement…</p>
    if (error) return <p style={{ color: "red" }}>{error}</p>
    if (!client) return null

    return (
        <div>
            <h1 style={{ marginBottom: 10 }}>{client.name}</h1>
            <p style={{ opacity: 0.7, marginBottom: 20 }}>
                Slug : <strong>{client.slug}</strong>
            </p>

            {/* NAVIGATION CLIENT */}
            <div style={styles.tabs}>
                <Tab label="Infos" />
                <Tab label="Menu" />
                <Tab label="Styles" />
                <Tab label="Domaines" />
                <Tab label="Commandes" />
            </div>

            {/* CONTENU V1 */}
            <section style={styles.box}>
                <h2>Informations générales</h2>

                <p>
                    <strong>Mode de commande :</strong>{" "}
                    {client.orderMode}
                </p>

                <p>
                    <strong>Couleur principale :</strong>{" "}
                    {client.theme?.primaryColor || "—"}
                </p>

                <p>
                    <strong>Police :</strong>{" "}
                    {client.theme?.font || "—"}
                </p>
            </section>
        </div>
    )
}

/* ───────── COMPONENTS ───────── */

function Tab({ label }: { label: string }) {
    return (
        <div style={styles.tab}>
            {label}
        </div>
    )
}

/* ───────── STYLES ───────── */

const styles: Record<string, React.CSSProperties> = {
    tabs: {
        display: "flex",
        gap: 10,
        marginBottom: 30
    },
    tab: {
        padding: "8px 14px",
        borderRadius: 8,
        background: "#1f2937",
        cursor: "pointer",
        fontSize: 14
    },
    box: {
        padding: 20,
        borderRadius: 12,
        background: "#111",
        border: "1px solid #333"
    }
}
