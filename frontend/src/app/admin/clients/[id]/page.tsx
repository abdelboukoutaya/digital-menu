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
    params: Promise<{ id: string }>
}) {
    const router = useRouter()

    const [clientId, setClientId] = useState<string | null>(null)
    const [client, setClient] = useState<Client | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // 🔹 EXTRAIRE L'ID CORRECTEMENT (APP ROUTER)
    useEffect(() => {
        const resolveParams = async () => {
            const resolved = await params
            setClientId(resolved.id)
        }
        resolveParams()
    }, [params])

    // 🔹 FETCH CLIENT UNE FOIS L'ID DISPONIBLE
    useEffect(() => {
        if (!clientId) return

        const fetchClient = async () => {
            const token = localStorage.getItem("admin_token")

            if (!token) {
                setError("Non authentifié")
                setLoading(false)
                return
            }

            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/clients/${clientId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                if (res.status === 404) {
                    setError("Client introuvable")
                    setLoading(false)
                    return
                }

                if (!res.ok) {
                    throw new Error("Erreur API")
                }

                const data = await res.json()
                setClient(data)
            } catch (e) {
                setError("Erreur lors du chargement du client")
            } finally {
                setLoading(false)
            }
        }

        fetchClient()
    }, [clientId])

    if (loading) {
        return (
            <AdminGuard>
                <p style={{ padding: 40 }}>Chargement…</p>
            </AdminGuard>
        )
    }

    if (error) {
        return (
            <AdminGuard>
                <p style={{ padding: 40, color: "red" }}>{error}</p>
            </AdminGuard>
        )
    }

    if (!client) {
        return (
            <AdminGuard>
                <p style={{ padding: 40 }}>Client introuvable</p>
            </AdminGuard>
        )
    }

    const save = async () => {
        const token = localStorage.getItem("admin_token")
        if (!token) return

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
                        <option value="catalog">catalogue</option>
                    </select>
                </div>

                <div style={{ marginTop: 20 }}>
                    <label>Couleur principale</label>
                    <br />
                    <input
                        type="color"
                        value={client.theme?.primaryColor || "#000000"}
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
