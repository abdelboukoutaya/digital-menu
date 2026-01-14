"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getAdminToken } from "@/lib/auth"
import { useRequireAdmin } from "@/lib/requireAdmin"

export default function ProductsPage() {
    useRequireAdmin()

    const { menuId, sectionIndex, categoryIndex } = useParams<any>()

    const s = Number(sectionIndex)
    const c = Number(categoryIndex)

    const [items, setItems] = useState<any[]>([])
    const [menuType, setMenuType] = useState<"catalogue" | "boutique">(
        "catalogue"
    )

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/${menuId}`, {
            headers: {
                Authorization: `Bearer ${getAdminToken()}`,
            },
        })
            .then((r) => r.json())
            .then((data) => {
                setItems(data.sections[s].categories[c].items || [])
                setMenuType(data.menuType || "catalogue")
            })
    }, [menuId, s, c])

    async function save(updated: any[]) {
        if (
            menuType === "boutique" &&
            updated.some((i) => !i.price || i.price === "")
        ) {
            alert("Prix obligatoire")
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
                    sections: (prev: any) => {
                        prev[s].categories[c].items = updated
                        return prev
                    },
                }),
            }
        )
    }

    return (
        <>
            <h1>Produits</h1>

            <button
                onClick={() => {
                    const updated = [...items, { name: "Produit", price: "" }]
                    setItems(updated)
                    save(updated)
                }}
            >
                + Ajouter
            </button>

            {items.map((item, i) => (
                <div key={i}>
                    <input
                        value={item.name}
                        onChange={(e) => {
                            const u = [...items]
                            u[i].name = e.target.value
                            setItems(u)
                        }}
                        onBlur={() => save(items)}
                    />

                    <input
                        value={item.price || ""}
                        placeholder={
                            menuType === "boutique" ? "Prix obligatoire" : "Optionnel"
                        }
                        onChange={(e) => {
                            const u = [...items]
                            u[i].price = e.target.value
                            setItems(u)
                        }}
                        onBlur={() => save(items)}
                    />

                    <button
                        onClick={() => {
                            const u = items.filter((_, x) => x !== i)
                            setItems(u)
                            save(u)
                        }}
                    >
                        Supprimer
                    </button>
                </div>
            ))}
        </>
    )
}
