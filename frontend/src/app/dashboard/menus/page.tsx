"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRequireAdmin } from "@/lib/requireAdmin"
import { getAdminToken } from "@/lib/auth"

const API = "https://chic-renewal-production.up.railway.app"

type Menu = {
    _id: string
    clientSlug: string
    language: string
    sections: any[]
}

export default function MenusPage() {
    useRequireAdmin()

    const [menus, setMenus] = useState<Menu[]>([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${API}/api/admin/menus`, {
            headers: {
                Authorization: `Bearer ${getAdminToken()}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error()
                return res.json()
            })
            .then((data) => {
                setMenus(data)
                setLoading(false)
            })
            .catch(() => {
                setError("Impossible de charger les menus")
                setLoading(false)
            })
    }, [])

    if (loading) return <p>Chargement…</p>
    if (error) return <p className="error">{error}</p>

    return (
        <>
            <h1>Menus</h1>

            <table>
                <thead>
                    <tr>
                        <th>Client</th>
                        <th>Langue</th>
                        <th>Sections</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {menus.map((m) => (
                        <tr key={m._id}>
                            <td>{m.clientSlug}</td>
                            <td>{m.language}</td>
                            <td>{m.sections.length}</td>
                            <td>
                                <Link href={`/dashboard/menus/${m._id}`}>
                                    Gérer
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
