"use client"

import { useEffect, useState } from "react"

type Section = {
    title: string
    categories: any[]
}

type Menu = {
    _id: string
    clientSlug: string
    language: string
    sections: Section[]
}

export default function EditMenuClient({ id }: { id: string }) {
    const [menu, setMenu] = useState<Menu | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!id) {
            setError("ID manquant")
            return
        }

        fetchMenu()
    }, [id])

    const fetchMenu = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/${id}`
            )

            if (!res.ok) {
                throw new Error("Erreur API")
            }

            const data = await res.json()
            setMenu(data)
        } catch (err) {
            setError("Impossible de charger le menu")
        }
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>
    }

    if (!menu) {
        return <p>Chargement du menu…</p>
    }

    return (
        <main style={{ padding: 40 }}>
            <h2>
                Édition du menu — {menu.clientSlug} ({menu.language})
            </h2>

            <pre>{JSON.stringify(menu, null, 2)}</pre>
        </main>
    )
}
