"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useRequireAdmin } from "@/lib/requireAdmin"
import { getAdminToken } from "@/lib/auth"

export default function EditClientPage() {
    useRequireAdmin()

    const { id } = useParams()
    const router = useRouter()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchClient() {
            try {
                const token = getAdminToken()

                const res = await fetch(
                    `https://chic-renewal-production.up.railway.app/api/admin/clients/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                if (!res.ok) {
                    throw new Error("Impossible de charger le client")
                }

                const data = await res.json()
                setName(data.name)
                setEmail(data.email)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchClient()
    }, [id])

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        try {
            const token = getAdminToken()

            const res = await fetch(
                `https://chic-renewal-production.up.railway.app/api/admin/clients/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ name, email }),
                }
            )

            if (!res.ok) {
                throw new Error("Échec de la mise à jour")
            }

            router.push("/dashboard/clients")
        } catch (err: any) {
            setError(err.message)
        }
    }

    if (loading) return <p>Chargement...</p>

    return (
        <>
            <h1>Éditer client</h1>

            <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nom"
                    required
                />

                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />

                {error && <p style={{ color: "red" }}>{error}</p>}

                <button type="submit">Enregistrer</button>
            </form>
        </>
    )
}
