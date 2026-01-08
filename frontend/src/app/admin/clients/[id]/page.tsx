"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminGuard from "@/components/AdminGuard"

type Client = {
    _id: string
    name: string
    slug: string
    orderMode: string
    theme?: {
        primaryColor?: string
    }
}

export default function EditClientPage({
    params
}: {
    params: { id: string }
}) {
    const router = useRouter()
    const [client, setClient] = useState<Client | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchClient = async () => {
            const token = localStorage.getItem("admin_token")
            if (!token) return

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/admin/clients`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )

            const data: Client[] = await res.json()
            const found = data.find((c) => c._id === params.id)
            setClient(found || null)
            setLoading(false)
        }

        fetchClient()
    }, [params.id])

    const save = async () => {
        if (!client) return

        const token = localStorage.getItem("admin_token")

        await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/admin/clients/${client._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(client)
            }
        )

        alert("Client sauvegardé")
        router.push("/admin/clients")
    }

    if (loading) {
        return <AdminGuard>Chargement…</AdminGuard>
    }

    if (!client) {
        return <AdminGuard>Client introuvable</AdminGuard>
    }

    return (
        <AdminGuard>
            <main style={{ padding: 40 }}>
                <h1>Éditer le client</h1>

                <p>
                    <strong>{client.name}</strong> ({client.slug})
                </p>

                <div style={{ marginTop: 20 }}>
                    <label>Mode de commande</label>
                    <br />
                    <select
                        value={client.orderMode}
                        onChange={(e) =>
                            setClient({
                                ...client,
                                orderMode: e.target.value
                            })
                        }
                    >
                        <option value="whatsapp">WhatsApp</option>
                        <option value="form">Formulaire</option>
                    </select>
                </div>

                <div style={{ marginTop: 20 }}>
                    <label>Couleur principale</label>
                    <br />
                    <input
                        type="color"
                        value={
                            client.theme?.primaryColor || "#000000"
                        }
                        onChange={(e) =>
                            setClient({
                                ...client,
                                theme: {
                                    primaryColor: e.target.value
                                }
                            })
                        }
                    />
                </div>

                <button
                    onClick={save}
                    style={{
                        marginTop: 30,
                        padding: "10px 20px",
                        backgroundColor: "#16a34a",
                        color: "white",
                        borderRadius: 6,
                        fontWeight: "bold"
                    }}
                >
                    Sauvegarder
                </button>
            </main>
        </AdminGuard>
    )
}
