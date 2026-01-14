"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRequireAdmin } from "@/lib/requireAdmin"
import { getAdminToken } from "@/lib/auth"

const API =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://chic-renewal-production.up.railway.app"

type Menu = {
    _id: string
    clientSlug: string
    language: string
    sections: any[]
}

export default function MenusPage() {
    useRequireAdmin()

    const [menus, setMenus] = useState<Menu[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        fetch(`${API}/api/admin/menus`, {
            headers: {
                Authorization: `Bearer ${getAdminToken()}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("fetch failed")
                return res.json()
            })
            .then((data) => {
                setMenus(Array.isArray(data) ? data : [])
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

            <Link href="/dashboard/menus/create">
                <button>+ Créer un menu</button>
            </Link>

            {menus.length === 0 ? (
                <p>Aucun menu</p>
            ) : (
                <table style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Client</th>
                            <th>Langue</th>
                            <th>Sections</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {menus.map((menu) => (
                            <tr key={menu._id}>
                                <td>{menu.clientSlug}</td>
                                <td>{menu.language}</td>
                                <td>{menu.sections.length}</td>
                                <td>
                                    <Link href={`/dashboard/menus/${menu._id}`}>
                                        Gérer
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}
