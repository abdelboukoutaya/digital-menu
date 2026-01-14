"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useRequireAdmin } from "@/lib/requireAdmin"
import { getAdminToken } from "@/lib/auth"

type Menu = {
    _id: string
    clientSlug: string
    language: string
    sections: any[]
}

export default function MenuPage() {
    useRequireAdmin()

    const { menuId } = useParams<{ menuId: string }>()
    const router = useRouter()

    const [menu, setMenu] = useState<Menu | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        async function fetchMenu() {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/${menuId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${getAdminToken()}`,
                        },
                    }
                )

                if (!res.ok) throw new Error("Impossible de charger le menu")

                const data = await res.json()
                setMenu(data)
            } catch (e: any) {
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }

        fetchMenu()
    }, [menuId])

    if (loading) return <p>Chargement...</p>
    if (error) return <p className="error">{error}</p>
    if (!menu) return null

    return (
        <>
            <h1>Menu</h1>

            <div style={{ marginBottom: 20 }}>
                <p>
                    <strong>Client :</strong> {menu.clientSlug}
                </p>
                <p>
                    <strong>Langue :</strong> {menu.language}
                </p>
                <p>
                    <strong>Sections :</strong> {menu.sections.length}
                </p>
            </div>

            <button
                onClick={() =>
                    router.push(`/dashboard/menus/${menu._id}/sections`)
                }
            >
                Gérer les sections
            </button>
        </>
    )
}
