"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useRequireAdmin } from "@/lib/requireAdmin"
import { getAdminToken } from "@/lib/auth"

type Client = {
    name: string
    email: string
    slug: string
    menuType: "catalogue" | "boutique"
    orderMode: "none" | "whatsapp" | "form"
    whatsappNumber?: string
}

export default function EditClientPage() {
    useRequireAdmin()

    const { id } = useParams<{ id: string }>()
    const router = useRouter()

    const [client, setClient] = useState<Client | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        async function fetchClient() {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/clients/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${getAdminToken()}`,
                        },
                    }
                )

                if (!res.ok) throw new Error("Impossible de charger le client")

                const data = await res.json()

                setClient({
                    ...data,
                    menuType: data.menuType || "catalogue",
                    orderMode: data.orderMode || "none",
                })
            } catch (e: any) {
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }

        fetchClient()
    }, [id])

    async function saveClient(e: React.FormEvent) {
        e.preventDefault()
        if (!client) return

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/admin/clients/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getAdminToken()}`,
                    },
                    body: JSON.stringify(client),
                }
            )

            if (!res.ok) throw new Error("Erreur sauvegarde client")

            router.push("/dashboard/clients")
        } catch (e: any) {
            setError(e.message)
        }
    }

    if (loading) return <p>Chargement...</p>
    if (error) return <p className="error">{error}</p>
    if (!client) return null

    return (
        <>
            <h1>Éditer client</h1>

            <form onSubmit={saveClient} style={{ maxWidth: 400 }}>
                <input
                    value={client.name}
                    onChange={(e) =>
                        setClient({ ...client, name: e.target.value })
                    }
                    placeholder="Nom"
                    required
                />

                <input
                    value={client.email}
                    onChange={(e) =>
                        setClient({ ...client, email: e.target.value })
                    }
                    placeholder="Email"
                    required
                />

                <input value={client.slug} disabled />

                <label>
                    Type de menu
                    <select
                        value={client.menuType}
                        onChange={(e) =>
                            setClient({
                                ...client,
                                menuType: e.target.value as any,
                            })
                        }
                    >
                        <option value="catalogue">Catalogue</option>
                        <option value="boutique">Boutique</option>
                    </select>
                </label>

                <label>
                    Mode de commande
                    <select
                        value={client.orderMode}
                        onChange={(e) =>
                            setClient({
                                ...client,
                                orderMode: e.target.value as any,
                            })
                        }
                    >
                        <option value="none">Aucun</option>
                        <option value="whatsapp">WhatsApp</option>
                        <option value="form">Formulaire</option>
                    </select>
                </label>

                {client.orderMode === "whatsapp" && (
                    <input
                        value={client.whatsappNumber || ""}
                        onChange={(e) =>
                            setClient({
                                ...client,
                                whatsappNumber: e.target.value,
                            })
                        }
                        placeholder="Numéro WhatsApp"
                        required
                    />
                )}

                <button type="submit">Enregistrer</button>
            </form>
        </>
    )
}
