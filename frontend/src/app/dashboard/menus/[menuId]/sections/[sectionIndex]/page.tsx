"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useRequireAdmin } from "@/lib/requireAdmin"
import { getAdminToken } from "@/lib/auth"

const API = "https://chic-renewal-production.up.railway.app"

type Category = {
    title: string
    items: any[]
}

export default function CategoriesPage() {
    useRequireAdmin()

    const { menuId, sectionIndex } = useParams<any>()
    const s = Number(sectionIndex)

    const [menu, setMenu] = useState<any>(null)
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${API}/api/admin/menus/${menuId}`, {
            headers: {
                Authorization: `Bearer ${getAdminToken()}`,
            },
        })
            .then((r) => r.json())
            .then((data) => {
                setMenu(data)
                setCategories(data.sections[s].categories || [])
                setLoading(false)
            })
    }, [menuId, s])

    function saveAll() {
        if (!menu) return

        const updatedMenu = {
            ...menu,
            sections: menu.sections.map((sec: any, i: number) =>
                i === s ? { ...sec, categories } : sec
            ),
        }

        fetch(`${API}/api/admin/menus/${menuId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAdminToken()}`,
            },
            body: JSON.stringify(updatedMenu),
        }).then(() => alert("Catégories enregistrées"))
    }

    if (loading) return <p>Chargement…</p>

    return (
        <>
            {/* BREADCRUMB */}
            <nav style={{ marginBottom: 20 }}>
                <Link href="/dashboard/menus">Menus</Link> {" > "}
                <Link href={`/dashboard/menus/${menuId}`}>Menu</Link> {" > "}
                <Link href={`/dashboard/menus/${menuId}/sections`}>Sections</Link> {" > "}
                <strong>{menu.sections[s].title}</strong>
            </nav>

            {/* HEADER */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1>Catégories</h1>
                <button onClick={saveAll}>💾 Enregistrer</button>
            </div>

            <button
                onClick={() =>
                    setCategories([
                        ...categories,
                        { title: "Nouvelle catégorie", items: [] },
                    ])
                }
            >
                + Ajouter une catégorie
            </button>

            <ul style={{ marginTop: 20 }}>
                {categories.map((cat, i) => (
                    <li key={i} style={{ marginBottom: 10 }}>
                        <input
                            value={cat.title}
                            onChange={(e) => {
                                const copy = [...categories]
                                copy[i].title = e.target.value
                                setCategories(copy)
                            }}
                        />

                        <Link
                            href={`/dashboard/menus/${menuId}/sections/${s}/categories/${i}`}
                            style={{ marginLeft: 10 }}
                        >
                            Produits
                        </Link>

                        <button
                            style={{ marginLeft: 10 }}
                            onClick={() =>
                                setCategories(categories.filter((_, x) => x !== i))
                            }
                        >
                            Supprimer
                        </button>
                    </li>
                ))}
            </ul>
        </>
    )
}
