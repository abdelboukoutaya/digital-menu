"use client"

import { useEffect, useState } from "react"

export default function EditMenuClient({ id }: { id: string }) {
    const [menu, setMenu] = useState<any>(null)

    useEffect(() => {
        if (!id) return

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/${id}`)
            .then((res) => res.json())
            .then((data) => setMenu(data))
    }, [id])

    if (!id) return <p style={{ color: "red" }}>ID manquant</p>
    if (!menu) return <p>Chargement…</p>

    return (
        <main style={{ padding: 40 }}>
            <h2>MENU CHARGÉ</h2>
            <pre>{JSON.stringify(menu, null, 2)}</pre>
        </main>
    )
}
