"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

export default function EditMenuClient() {
    const params = useParams()
    const id = params?.id as string

    const [menu, setMenu] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!id) {
            setError("ID manquant (useParams)")
            return
        }

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Erreur API")
                return res.json()
            })
            .then((data) => setMenu(data))
            .catch(() => setError("Impossible de charger le menu"))
    }, [id])

    if (error) return <p style={{ color: "red" }}>{error}</p>
    if (!menu) return <p>Chargement du menu…</p>

    return (
        <main style={{ padding: 40 }}>
            <h2>MENU CHARGÉ (OK)</h2>
            <pre>{JSON.stringify(menu, null, 2)}</pre>
        </main>
    )
}
