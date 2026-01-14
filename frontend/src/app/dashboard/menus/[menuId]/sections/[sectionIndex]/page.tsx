"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useRequireAdmin } from "@/lib/requireAdmin"
import { getAdminToken } from "@/lib/auth"

type Category = {
    title: string
    items: any[]
}

export default function CategoriesPage() {
    useRequireAdmin()

    const { menuId, sectionIndex } = useParams<{
        menuId: string
        sectionIndex: string
    }>()

    const router = useRouter()

    const [categories, setCategories] = useState<Category[]>([])
    const [sectionTitle, setSectionTitle] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const sIndex = Number(sectionIndex)

    useEffect(() => {
        async function fetchSection() {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/${menuId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${getAdminToken()}`,
                        },
                    }
                )

                if (!res.ok) throw new Error("Erreur chargement catégories")

                const data = await res.json()
                const section = data.sections[sIndex]

                if (!section) throw new Error("Section introuvable")

                setSectionTitle(section.title)
                setCategories(section.categories || [])
            } catch (e: any) {
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }

        fetchSection()
    }, [menuId, sIndex])

    async function saveCategories(updated: Category[]) {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/${menuId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getAdminToken()}`,
                    },
                    body: JSON.stringify({
                        sections: (prev: any) => {
                            const copy = [...prev]
                            copy[sIndex].categories = updated
                            return copy
                        },
                    }),
                }
            )

            if (!res.ok) throw new Error()
        } catch {
            alert("Erreur sauvegarde catégories")
        }
    }

    function addCategory() {
        const updated = [
            ...categories,
            { title: "Nouvelle catégorie", items: [] },
        ]
        setCategories(updated)
        saveCategories(updated)
    }

    function updateTitle(index: number, title: string) {
        const updated = [...categories]
        updated[index].title = title
        setCategories(updated)
    }

    function removeCategory(index: number) {
        if (!confirm("Supprimer cette catégorie ?")) return
        const updated = categories.filter((_, i) => i !== index)
        setCategories(updated)
        saveCategories(updated)
    }

    if (loading) return <p>Chargement...</p>
    if (error) return <p className="error">{error}</p>

    return (
        <>
            <h1>Catégories</h1>
            <p>
                Section : <strong>{sectionTitle}</strong>
            </p>

            <button onClick={addCategory}>+ Ajouter une catégorie</button>

            <ul style={{ marginTop: 20 }}>
                {categories.map((cat, index) => (
                    <li key={index} style={{ marginBottom: 12 }}>
                        <input
                            value={cat.title}
                            onChange={(e) =>
                                updateTitle(index, e.target.value)
                            }
                            onBlur={() => saveCategories(categories)}
                        />

                        <button
                            onClick={() =>
                                router.push(
                                    `/dashboard/menus/${menuId}/sections/${sIndex}/categories/${index}`
                                )
                            }
                            style={{ marginLeft: 10 }}
                        >
                            Produits
                        </button>

                        <button
                            onClick={() => removeCategory(index)}
                            className="button-danger"
                            style={{ marginLeft: 10 }}
                        >
                            Supprimer
                        </button>
                    </li>
                ))}
            </ul>

            <button
                onClick={() =>
                    router.push(`/dashboard/menus/${menuId}/sections`)
                }
                style={{ marginTop: 20 }}
            >
                Retour aux sections
            </button>
        </>
    )
}
