"use client"

import { useEffect, useState } from "react"

type Item = { name: string; price: string }
type Category = { title: string; items: Item[] }
type Section = { title: string; categories: Category[] }

type Menu = {
    _id: string
    clientSlug: string
    language: string
    sections: Section[]
}

export default function EditMenu({
    params
}: {
    params: { id?: string }
}) {
    const [menu, setMenu] = useState<Menu | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!params?.id) {
            setError("ID du menu manquant dans l’URL")
            return
        }

        fetchMenu(params.id)
    }, [params?.id])

    const fetchMenu = async (id: string) => {
        try {
            console.log("FETCH MENU ID:", id)

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/${id}`
            )

            console.log("STATUS:", res.status)

            if (!res.ok) {
                throw new Error("Erreur API menu")
            }

            const data = await res.json()
            console.log("MENU DATA:", data)

            setMenu(data)
        } catch (err) {
            setError("Impossible de charger le menu")
        }
    }

    if (error) {
        return (
            <main style={{ padding: 40 }}>
                <h2 style={{ color: "red" }}>Erreur</h2>
                <p>{error}</p>
            </main>
        )
    }

    if (!menu) {
        return (
            <main style={{ padding: 40 }}>
                <h2>Chargement du menu…</h2>
            </main>
        )
    }

    return (
        <main style={{ padding: 40 }}>
            <h2>
                Édition du menu — {menu.clientSlug} ({menu.language})
            </h2>

            <button
                onClick={() =>
                    setMenu({
                        ...menu,
                        sections: [
                            ...menu.sections,
                            { title: "Nouvelle section", categories: [] }
                        ]
                    })
                }
            >
                Ajouter une section
            </button>

            {menu.sections.map((section, i) => (
                <div key={i} style={{ marginTop: 20 }}>
                    <input
                        value={section.title}
                        onChange={(e) => {
                            const sections = [...menu.sections]
                            sections[i].title = e.target.value
                            setMenu({ ...menu, sections })
                        }}
                    />
                </div>
            ))}
        </main>
    )
}
