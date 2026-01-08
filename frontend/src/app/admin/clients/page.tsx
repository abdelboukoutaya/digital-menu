"use client"

import { useEffect, useState } from "react"
import AdminGuard from "@/components/AdminGuard"
import AdminLogout from "@/components/AdminLogout"

type Client = {
    _id: string
    name: string
    slug: string
    orderMode: string
    theme?: {
        primaryColor?: string
    }
}

export default function AdminClientsPage() {
    const [clients, setClients] = useState<Client[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchClients = async () => {
            const token = localStorage.getItem("admin_token")

            if (!token) {
                setError("Non authentifié")
                setLoading(false)
                return
            }

            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/clients`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                if (!res.ok) {
                    throw new Error("Erreur API")
                }

                const data = await res.json()
                setClients(data)
            } catch (e) {
                setError("Impossible de charger les clients")
            } finally {
                setLoading(false)
            }
        }

        fetchClients()
    }, [])

    return (
        <AdminGuard>
            <main style={{ padding: 40 }}>
                <h1>Clients</h1>

                <AdminLogout />

                {loading && <p>Chargement…</p>}

                {error && (
                    <p style={{ color: "red", marginTop: 20 }}>
                        {error}
                    </p>
                )}

                {!loading && !error && clients.length === 0 && (
                    <p>Aucun client trouvé</p>
                )}

                {!loading && clients.length > 0 && (
                    <table
                        border={1}
                        cellPadding={10}
                        style={{
                            marginTop: 30,
                            width: "100%",
                            borderCollapse: "collapse"
                        }}
                    >
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Slug</th>
                                <th>Couleur</th>
                                <th>Mode commande</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map((client) => (
                                <tr key={client._id}>
                                    <td>{client.name}</td>
                                    <td>{client.slug}</td>
                                    <td>
                                        <span
                                            style={{
                                                display: "inline-block",
                                                width: 18,
                                                height: 18,
                                                backgroundColor:
                                                    client.theme
                                                        ?.primaryColor ||
                                                    "#ccc",
                                                borderRadius: 4,
                                                border: "1px solid #555"
                                            }}
                                        />
                                    </td>
                                    <td>{client.orderMode}</td>
                                    <td>
                                        <a
                                            href={`/admin/clients/${client._id}`}
                                            style={{
                                                color: "#4ade80",
                                                fontWeight: "bold",
                                                textDecoration:
                                                    "underline"
                                            }}
                                        >
                                            Éditer
                                        </a>
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
