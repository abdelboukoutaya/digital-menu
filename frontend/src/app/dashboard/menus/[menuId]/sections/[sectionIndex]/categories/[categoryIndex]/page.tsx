"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useRequireAdmin } from "@/lib/requireAdmin"
import { getAdminToken } from "@/lib/auth"

const API = "https://chic-renewal-production.up.railway.app"

type Item = {
    name: string
    price?: string
}

export default function ProductsPage() {
    useRequireAdmin()

    const { menuId, sectionIndex, categoryIndex } = useParams<any>()
    const s = Number(sectionIndex)
    const c = Number(categoryIndex)

    const [menu, setMenu] = useState<any>(null)
    const [items, setItems] = useState<Item[]>([])
    const [menuType, setMenuType] = useState<"catalogue" | "boutique">("catalogue")
    const [loading, setLoading] = useState(true)

    /* ───────── LOAD MENU ───────── */
    useEffect(() => {
        fetch(`${API}/api/admin/menus/${menuId}`, {
            headers: {
                Authorization: `Bearer ${getAdminToken()}`,
            },
        })
            .then((r) => r.json())
            .then((data) => {
                setMenu(data)
                setMenuType(data.menuType || "catalogue")
                setItems(data.sections[s].categories[c].items || [])
                setLoading(false)
            })
    }, [menuId, s, c])

    /* ───────── SAVE ───────── */
    function saveAll() {
        if (!menu) return

        if (
            menuType === "boutique" &&
            items.some((i) => !i.price || i.price.trim() === "")
        ) {
            alert("Prix obligatoire pour une boutique")
            return
        }

        const updatedMenu = {
            ...menu,
            sections: menu.sections.map((sec: any, si: number) =>
                si === s
                    ? {
                        ...sec,
                        categories: sec.categories.map((cat: any, ci: number) =>
                            ci === c ? { ...cat, items } : cat
                        ),
                    }
                    : sec
            ),
        }

        fetch(`${API}/api/admin/menus/${menuId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAdminToken()}`,
            },
            body: JSON.stringify(updatedMenu),
        }).then(() => alert("Produits enregistrés"))
    }

    if (loading) return <p>Chargement…</p>

    return (
        <>
            {/* ───────── BREADCRUMB ───────── */}
            <nav style={{ marginBottom: 20 }}>
                <Link href="/dashboard/menus">Menus</Link> {" > "}
                <Link href={`/dashboard/menus/${menuId}`}>Menu</Link> {" > "}
                <Link href={`/dashboard/menus/${menuId}/sections`}>Sections</Link>{" "}
                {" > "}
                <Link href={`/dashboard/menus/${menuId}/sections/${s}`}>
                    Catégories
                </Link>{" "}
                {" > "}
                <strong>Produits</strong>
            </nav>

            {/* ───────── HEADER ───────── */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1>Produits</h1>
                <button onClick={saveAll}>💾 Enregistrer</button>
            </div>

            <button
                onClick={() =>
                    setItems([...items, { name: "Nouveau produit", price: "" }])
                }
            >
                + Ajouter un produit
            </button>

            <table style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prix</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, i) => (
                        <tr key={i}>
                            <td>
                                <input
                                    value={item.name}
                                    onChange={(e) => {
                                        const copy = [...items]
                                        copy[i].name = e.target.value
                                        setItems(copy)
                                    }}
                                />
                            </td>
                            <td>
                                <input
                                    value={item.price || ""}
                                    placeholder={
                                        menuType === "boutique"
                                            ? "Prix obligatoire"
                                            : "Optionnel"
                                    }
                                    onChange={(e) => {
                                        const copy = [...items]
                                        copy[i].price = e.target.value
                                        setItems(copy)
                                    }}
                                />
                            </td>
                            <td>
                                <button
                                    onClick={() =>
                                        setItems(items.filter((_, x) => x !== i))
                                    }
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
