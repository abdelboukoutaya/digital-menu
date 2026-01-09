"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import AdminGuard from "@/components/AdminGuard"

export default function EditMenuClient() {
    const params = useParams()
    const router = useRouter()
    const id = params?.id as string | undefined

    const [menu, setMenu] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!id) {
            setError("ID menu manquant")
            setLoading(false)
            return
        }

        const fetchMenu = async () => {
            const token = localStorage.getItem("admin_token")

            if (!token) {
                setError("Non authentifié")
                setLoading(false)
                router.replace("/admin/login")
                return
            }

            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                if (!res.ok) {
                    throw new Error("Erreur API")
                }

                const data = await res.json()
                setMenu(data)
            } catch (e) {
                setError("Impossible de charger le menu")
            } finally {
                setLoading(false)
            }
        }

        fetchMenu()
    }, [id, router])

    if (loading) {
        return (
            <AdminGuard>
                <p style={{ padding: 40 }}>Chargement du menu…</p>
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

    if (!menu) {
        return (
            <AdminGuard>
                <p style={{ padding: 40 }}>Menu introuvable</p>
            </AdminGuard>
        )
    }

    return (
        <AdminGuard>
            <main style={{ padding: 40 }}>
                <h2>MENU CHARGÉ ✅</h2>
                <p>
                    <strong>Client :</strong> {menu.clientSlug} <br />
                    <strong>Langue :</strong> {menu.language}
                </p>

                <pre
                    style={{
                        marginTop: 20,
                        padding: 20,
                        background: "#111",
                        color: "#0f0",
                        overflow: "auto"
                    }}
                >
                    {JSON.stringify(menu, null, 2)}
                </pre>
            </main>
        </AdminGuard>
    )
}
