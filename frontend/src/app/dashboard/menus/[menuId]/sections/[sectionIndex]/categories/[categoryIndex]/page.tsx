"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useRequireAdmin } from "@/lib/requireAdmin"
import { getAdminToken } from "@/lib/auth"

type Item = {
    name: string
    price?: string
}

type Category = {
    title: string
    items: Item[]
}

export default function ProductsPage() {
    useRequireAdmin()

    const { menuId, sectionIndex, categoryIndex } = useParams<{
        menuId: string
        sectionIndex: string
        categoryIndex: string
    }>()
    const router = useRouter()

    const sIndex = Number(sectionIndex)
    const cIndex = Number(categoryIndex)

    const [categoryTitle, setCategoryTitle] = useState("")
    const [items, setItems] = useState<Item[]>([])
    const [menuType, setMenuType] = useState<"catalogue" | "boutique">("catalogue")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        async function fetchCategory() {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/${menuId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${getAdminToken()}`,
                        },
                    }
                )

                if (!res.ok) throw new Error("Erreur chargement produits")

                const data = await res.json()

                const section = data.sections?.[sIndex]
                const category = section?.categories?.[cIndex]

                if (!section || !category) {
                    throw new Error("Section ou catégorie introuvable")
                }

                setCategoryTitle(category.title)
                setItems(category.items || [])

                // 👉 Pour l’instant, menuType par défaut
                // À l’étape Clients, on le liera réellement
                setMenuType("boutique") // change en "catalogue" si besoin
            } catch (e: any) {
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }

        fetchCategory()
    }, [menuId, sIndex, cIndex])

    async function saveItems(updatedItems: Item[]) {
        try {
            // Validation métier
            if (
                menuType === "boutique" &&
                updatedItems.some((i) => !i.price || i.price.trim() === "")
            ) {
                alert("Le prix est obligatoire pour une boutique")
                return
            }

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/${menuId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getAdminToken()}`,
                    },
                    body: JSON.stringify({
                        update: {
                            sectionIndex: sIndex,
                            categoryIndex: cIndex,
                            items: updatedItems,
                        },
                    }),
                }
            )

            if (!res.ok) throw new Error()
        } catch {
            alert("Erreur sauvegarde produits")
        }
    }

    function addItem() {
        const updated = [
            ...items,
            { name: "Nouveau produit", price: "" },
        ]
        setItems(updated)
        saveItems(updated)
    }

    function updateItem(
        index: number,
        field: "name" | "price",
        value: string
    ) {
        const updated = [...items]
            ; (updated[index] as any)[field] = value
        setItems(updated)
    }

    function removeItem(index: number) {
        if (!confirm("Supprimer ce produit ?")) return
        const updated = items.filter((_, i) => i !== index)
        setItems(updated)
        saveItems(updated)
    }

    if (loading) return <p>Chargement...</p>
    if (error) return <p className="error">{error}</p>

    return (
        <>
            <h1>Produits</h1>
            <p>
                Catégorie : <strong>{categoryTitle}</strong>
            </p>

            <button onClick={addItem}>+ Ajouter un produit</button>

            <table style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prix</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    value={item.name}
                                    onChange={(e) =>
                                        updateItem(index, "name", e.target.value)
                                    }
                                    onBlur={() => saveItems(items)}
                                />
                            </td>
                            <td>
                                <input
                                    value={item.price || ""}
                                    onChange={(e) =>
                                        updateItem(index, "price", e.target.value)
                                    }
                                    onBlur={() => saveItems(items)}
                                    placeholder={
                                        menuType === "boutique"
                                            ? "Prix obligatoire"
                                            : "Optionnel"
                                    }
                                />
                            </td>
                            <td>
                                <button
                                    onClick={() => removeItem(index)}
                                    className="button-danger"
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button
                onClick={() =>
                    router.push(
                        `/dashboard/menus/${menuId}/sections/${sIndex}`
                    )
                }
                style={{ marginTop: 20 }}
            >
                Retour aux catégories
            </button>
        </>
    )
}
