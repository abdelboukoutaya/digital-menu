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

export default function EditMenuClient({ id }: { id: string }) {
    const [menu, setMenu] = useState<Menu | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchMenu()
    }, [])

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
