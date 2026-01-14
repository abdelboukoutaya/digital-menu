"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useRequireAdmin } from "@/lib/requireAdmin"
import { getAdminToken } from "@/lib/auth"

export default function EditMenuPage() {
    useRequireAdmin()

    const { id } = useParams()
    const router = useRouter()

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchMenu() {
            try {
                const token = getAdminToken()

                const res = await fetch(
                    `https://chic-renewal-production.up.railway.app/api/admin/menus/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                if (!res.ok) {
                    throw new Error("Impossible de charger le menu")
                }

                const data = await res.json()
                setName(data.name || "")
                setPrice(data.price ? String(data.price) : "")
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchMenu()
    }, [id])

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        try {
            const token = getAdminToken()

            const res = await fetch(
                `https://chic-renewal-production.up.railway.app/api/admin/menus/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name,
                        price: price ? Number(price) : undefined,
                    }),
                }
            )

            if (!res.ok) {
                throw new Error("Échec de la mise à jour du menu")
            }

            router.push("/dashboard/menus")
        } catch (err: any) {
            setError(err.message)
        }
    }

    if (loading) return <p>Chargement...</p>

    return (
        <>
            <h1>Éditer menu</h1>

            <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nom du menu"
                    required
                />

                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Prix"
                />

                {error && <p className="error">{error}</p>}

                <button type="submit">Enregistrer</button>
            </form>
        </>
    )
}
