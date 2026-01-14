"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRequireAdmin } from "@/lib/requireAdmin"
import { getAdminToken } from "@/lib/auth"

type Client = {
    _id: string
    name: string
    email: string
}

export default function ClientsPage() {
    useRequireAdmin()

    const [clients, setClients] = useState<Client[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        async function fetchClients() {
            try {
                const token = getAdminToken()

                const res = await fetch(
                    "https://chic-renewal-production.up.railway.app/api/admin/clients",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                if (!res.ok) {
                    throw new Error("Erreur chargement clients")
                }

                const data = await res.json()
                setClients(data)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchClients()
    }, [])

    if (loading) return <p>Chargement...</p>
    if (error) return <p style={{ color: "red" }}>{error}</p>

    return (
        <>
            <h1>Clients</h1>

            <table style={{ width: "100%", marginTop: 20 }}>
                <thead>
                    <tr>
                        <th align="left">Nom</th>
                        <th align="left">Email</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client) => (
                        <tr key={client._id}>
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td>
                                <Link
                                    href={`/dashboard/clients/${client._id}`}
                                    className="action-link"
                                >
                                    Éditer
                                </Link>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
