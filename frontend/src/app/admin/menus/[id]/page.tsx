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

export default function EditMenu({ params }: { params: { id: string } }) {
    const [menu, setMenu] = useState<Menu | null>(null)

    useEffect(() => {
        fetchMenu()
    }, [])

    const fetchMenu = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/${params.id}`
        )
        const data = await res.json()
        setMenu(data)
    }

    const addSection = () => {
        if (!menu) return
        setMenu({
            ...menu,
            sections: [...menu.sections, { title: "Nouvelle section", categories: [] }]
        })
    }

    const saveMenu = async () => {
        await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/${menu?._id}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(menu)
            }
        )
        alert("Menu sauvegardé")
    }

    if (!menu) return <p>Chargement...</p>

    return (
        <main style={{ padding: 40 }}>
            <h2>
                Édition du menu — {menu.clientSlug} ({menu.language})
            </h2>

            <button onClick={addSection}>Ajouter une section</button>

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

                    <button
                        onClick={() => {
                            const sections = [...menu.sections]
                            sections[i].categories.push({ title: "Nouvelle catégorie", items: [] })
                            setMenu({ ...menu, sections })
                        }}
                    >
                        Ajouter catégorie
                    </button>

                    {section.categories.map((cat, j) => (
                        <div key={j} style={{ marginLeft: 20 }}>
                            <input
                                value={cat.title}
                                onChange={(e) => {
                                    const sections = [...menu.sections]
                                    sections[i].categories[j].title = e.target.value
                                    setMenu({ ...menu, sections })
                                }}
                            />

                            <button
                                onClick={() => {
                                    const sections = [...menu.sections]
                                    sections[i].categories[j].items.push({
                                        name: "Nouvel item",
                                        price: "0"
                                    })
                                    setMenu({ ...menu, sections })
                                }}
                            >
                                Ajouter item
                            </button>

                            {cat.items.map((item, k) => (
                                <div key={k} style={{ marginLeft: 20 }}>
                                    <input
                                        value={item.name}
                                        onChange={(e) => {
                                            const sections = [...menu.sections]
                                            sections[i].categories[j].items[k].name = e.target.value
                                            setMenu({ ...menu, sections })
                                        }}
                                    />
                                    <input
                                        value={item.price}
                                        onChange={(e) => {
                                            const sections = [...menu.sections]
                                            sections[i].categories[j].items[k].price = e.target.value
                                            setMenu({ ...menu, sections })
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}

            <button onClick={saveMenu} style={{ marginTop: 30 }}>
                Sauvegarder
            </button>
        </main>
    )
}
