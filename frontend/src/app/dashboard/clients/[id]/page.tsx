"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getAdminToken } from "@/lib/auth"
import { useRequireAdmin } from "@/lib/requireAdmin"

export default function EditClientPage() {
    useRequireAdmin()

    const { id } = useParams<{ id: string }>()
    const router = useRouter()

    const [client, setClient] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/clients/${id}`, {
            headers: {
                Authorization: `Bearer ${getAdminToken()}`,
            },
        })
            .then((r) => r.json())
            .then((data) => {
                setClient({
                    ...data,
                    menuType: data.menuType || "catalogue",
                    orderMode: data.orderMode || "none",
                })
                setLoading(false)
            })
    }, [id])

    async function save(e: any) {
        e.preventDefault()

        await fetch(
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

        router.push("/dashboard/clients")
    }

    if (loading) return <p>Chargement...</p>

    return (
        <form onSubmit={save}>
            <h1>Client</h1>

            <input
                value={client.name}
                onChange={(e) => setClient({ ...client, name: e.target.value })}
                placeholder="Nom"
            />

            <input
                value={client.email}
                onChange={(e) => setClient({ ...client, email: e.target.value })}
                placeholder="Email"
            />

            <input value={client.slug} disabled />

            <select
                value={client.menuType}
                onChange={(e) =>
                    setClient({ ...client, menuType: e.target.value })
                }
            >
                <option value="catalogue">Catalogue</option>
                <option value="boutique">Boutique</option>
            </select>

            <select
                value={client.orderMode}
                onChange={(e) =>
                    setClient({ ...client, orderMode: e.target.value })
                }
            >
                <option value="none">Aucune commande</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="form">Formulaire</option>
            </select>

            {client.orderMode === "whatsapp" && (
                <input
                    value={client.whatsappNumber || ""}
                    onChange={(e) =>
                        setClient({ ...client, whatsappNumber: e.target.value })
                    }
                    placeholder="Numéro WhatsApp"
                />
            )}

            <button type="submit">Enregistrer</button>
        </form>
    )
}
