"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useRequireAdmin } from "@/lib/requireAdmin"
import { getAdminToken } from "@/lib/auth"

type Item = {
    name: string
    price: string
}

type Category = {
    title: string
    items: Item[]
}

type Section = {
    title: string
    categories: Category[]
}

type Menu = {
    clientSlug: string
    language: string
    sections: Section[]
}

export default function EditMenuPage() {
    useRequireAdmin()
    const { id } = useParams()

    const [menu, setMenu] = useState<Menu | null>(null)
    const [error, setError] = useState("")
    const [saving, setSaving] = useState(false)

    /* ───── LOAD MENU ───── */
    useEffect(() => {
        async function loadMenu() {
            try {
                const res = await fetch(
                    `https://chic-renewal-production.up.railway.app/api/admin/menus/${id}`,
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
            }
        }

        loadMenu()
    }, [id])

    /* ───── SAVE MENU ───── */
    async function saveMenu() {
        try {
            setSaving(true)

            const res = await fetch(
                `https://chic-renewal-production.up.railway.app/api/admin/menus/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getAdminToken()}`,
                    },
                    body: JSON.stringify(menu),
                }
            )

            if (!res.ok) throw new Error("Erreur lors de l’enregistrement")
            alert("Menu enregistré")
        } catch (e: any) {
            setError(e.message)
        } finally {
            setSaving(false)
        }
    }

    if (!menu) return <p>Chargement...</p>

    return (
        <>
            <h1>Édition du menu</h1>
            <p>
                Client : <strong>{menu.clientSlug}</strong> — Langue :{" "}
                <strong>{menu.language}</strong>
            </p>

            {menu.sections.map((section, sIndex) => (
                <div key={sIndex} style={{ marginTop: 30 }}>
                    <h2>Section</h2>

                    <input
                        value={section.title}
                        onChange={(e) => {
                            const copy = structuredClone(menu)
                            copy.sections[sIndex].title = e.target.value
                            setMenu(copy)
                        }}
                        placeholder="Titre de la section"
                    />

                    {section.categories.map((cat, cIndex) => (
                        <div key={cIndex} style={{ marginLeft: 20, marginTop: 15 }}>
                            <h3>Catégorie</h3>

                            <input
                                value={cat.title}
                                onChange={(e) => {
                                    const copy = structuredClone(menu)
                                    copy.sections[sIndex].categories[cIndex].title =
                                        e.target.value
                                    setMenu(copy)
                                }}
                                placeholder="Titre de la catégorie"
                            />

                            {cat.items.map((item, iIndex) => (
                                <div
                                    key={iIndex}
                                    style={{ display: "flex", gap: 10, marginTop: 8 }}
                                >
                                    <input
                                        value={item.name}
                                        onChange={(e) => {
                                            const copy = structuredClone(menu)
                                            copy.sections[sIndex].categories[cIndex].items[
                                                iIndex
                                            ].name = e.target.value
                                            setMenu(copy)
                                        }}
                                        placeholder="Produit"
                                    />

                                    <input
                                        value={item.price}
                                        onChange={(e) => {
                                            const copy = structuredClone(menu)
                                            copy.sections[sIndex].categories[cIndex].items[
                                                iIndex
                                            ].price = e.target.value
                                            setMenu(copy)
                                        }}
                                        placeholder="Prix"
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}

            {error && <p className="error">{error}</p>}

            <button onClick={saveMenu} disabled={saving}>
                {saving ? "Enregistrement..." : "Enregistrer le menu"}
            </button>
        </>
    )
}
