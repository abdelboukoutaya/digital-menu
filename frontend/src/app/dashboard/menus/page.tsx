"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRequireAdmin } from "@/lib/requireAdmin"
import { getAdminToken } from "@/lib/auth"

type Menu = {
    _id: string
    clientSlug: string
    language: string
    sections: any[]
    updatedAt?: string
}

export default function MenusPage() {
    useRequireAdmin()

    const [menus, setMenus] = useState<Menu[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        async function fetchMenus() {
            try {
                const token = getAdminToken()

                const res = await fetch(
                    "https://chic-renewal-production.up.railway.app/api/admin/menus",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                if (!res.ok) {
                    throw new Error("Erreur lors du chargement des menus")
                }

                const data = await res.json()

                // backend retourne un tableau direct
                setMenus(Array.isArray(data) ? data : [])
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchMenus()
    }, [])

    if (loading) return <p>Chargement...</p>
    if (error) return <p className="error">{error}</p>

    return (
        <>
            <h1>Menus</h1>

            {menus.length === 0 ? (
                <p>Aucun menu trouvé.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Client</th>
                            <th>Langue</th>
                            <th>Sections</th>
                            <th>Dernière mise à jour</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {menus.map((menu) => (
                            <tr key={menu._id}>
                                <td>{menu.clientSlug}</td>
                                <td>{menu.language}</td>
                                <td>{menu.sections?.length ?? 0}</td>
                                <td>
                                    {menu.updatedAt
                                        ? new Date(menu.updatedAt).toLocaleDateString()
                                        : "-"}
                                </td>
                                <td>
                                    <Link
                                        href={`/dashboard/menus/${menu._id}`}
                                        className="action-link"
                                    >
                                        Éditer
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
