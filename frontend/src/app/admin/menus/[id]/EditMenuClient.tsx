"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import type { CSSProperties } from "react"
import AdminGuard from "@/components/AdminGuard"

type Item = {
    name: string
    price?: string
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
    _id: string
    clientSlug: string
    language: string
    sections: Section[]
}

export default function EditMenuClient() {
    const { id } = useParams<{ id: string }>()
    const router = useRouter()

    const [menu, setMenu] = useState<Menu | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    /* ───────────────────────── LOAD MENU ───────────────────────── */

    useEffect(() => {
        if (!id) return

        const token = localStorage.getItem("admin_token")
        if (!token) {
            router.replace("/admin/login")
            return
        }

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => {
                if (!res.ok) throw new Error()
                return res.json()
            })
            .then((data) => setMenu(data))
            .catch(() => setError("Impossible de charger le menu"))
            .finally(() => setLoading(false))
    }, [id, router])

    /* ───────────────────────── SECTIONS ───────────────────────── */

    const addSection = () => {
        if (!menu) return
        setMenu({
            ...menu,
            sections: [
                ...menu.sections,
                { title: "Nouvelle section", categories: [] }
            ]
        })
    }

    const updateSectionTitle = (s: number, value: string) => {
        if (!menu) return
        const sections = [...menu.sections]
        sections[s].title = value
        setMenu({ ...menu, sections })
    }

    const removeSection = (s: number) => {
        if (!menu) return
        setMenu({
            ...menu,
            sections: menu.sections.filter((_, i) => i !== s)
        })
    }

    /* ───────────────────────── CATEGORIES ───────────────────────── */

    const addCategory = (s: number) => {
        if (!menu) return
        const sections = [...menu.sections]
        sections[s].categories.push({ title: "Nouvelle catégorie", items: [] })
        setMenu({ ...menu, sections })
    }

    const updateCategoryTitle = (s: number, c: number, value: string) => {
        if (!menu) return
        const sections = [...menu.sections]
        sections[s].categories[c].title = value
        setMenu({ ...menu, sections })
    }

    const removeCategory = (s: number, c: number) => {
        if (!menu) return
        const sections = [...menu.sections]
        sections[s].categories = sections[s].categories.filter(
            (_, i) => i !== c
        )
        setMenu({ ...menu, sections })
    }

    /* ───────────────────────── ITEMS ───────────────────────── */

    const addItem = (s: number, c: number) => {
        if (!menu) return
        menu.sections[s].categories[c].items.push({
            name: "Nouvel item",
            price: ""
        })
        setMenu({ ...menu })
    }

    const updateItem = (
        s: number,
        c: number,
        i: number,
        field: "name" | "price",
        value: string
    ) => {
        if (!menu) return
        menu.sections[s].categories[c].items[i][field] = value
        setMenu({ ...menu })
    }

    const removeItem = (s: number, c: number, i: number) => {
        if (!menu) return
        menu.sections[s].categories[c].items =
            menu.sections[s].categories[c].items.filter(
                (_, index) => index !== i
            )
        setMenu({ ...menu })
    }

    /* ───────────────────────── SAVE ───────────────────────── */

    const saveMenu = async () => {
        if (!menu) return
        const token = localStorage.getItem("admin_token")
        if (!token) return

        await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/${menu._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(menu)
            }
        )

        alert("Menu sauvegardé")
        router.push("/admin/menus")
    }

    /* ───────────────────────── UI STATES ───────────────────────── */

    if (loading) return <AdminGuard><p style={styles.loading}>Chargement…</p></AdminGuard>
    if (error) return <AdminGuard><p style={styles.error}>{error}</p></AdminGuard>
    if (!menu) return null

    return (
        <AdminGuard>
            <main style={styles.container}>
                <h1 style={styles.title}>
                    Menu — {menu.clientSlug} ({menu.language})
                </h1>

                <button onClick={addSection} style={styles.addBtn}>
                    + Ajouter une section
                </button>

                {menu.sections.map((section, s) => (
                    <div key={s} style={styles.section}>
                        <input
                            value={section.title}
                            onChange={(e) =>
                                updateSectionTitle(s, e.target.value)
                            }
                            style={styles.sectionTitle}
                        />

                        <button
                            onClick={() => addCategory(s)}
                            style={styles.subBtn}
                        >
                            + Ajouter une catégorie
                        </button>

                        {section.categories.map((cat, c) => (
                            <div key={c} style={styles.category}>
                                <input
                                    value={cat.title}
                                    onChange={(e) =>
                                        updateCategoryTitle(
                                            s,
                                            c,
                                            e.target.value
                                        )
                                    }
                                    style={styles.categoryTitle}
                                />

                                <button
                                    onClick={() => addItem(s, c)}
                                    style={styles.subBtn}
                                >
                                    + Ajouter un item
                                </button>

                                {cat.items.map((item, i) => (
                                    <div key={i} style={styles.item}>
                                        <input
                                            placeholder="Nom"
                                            value={item.name}
                                            onChange={(e) =>
                                                updateItem(
                                                    s,
                                                    c,
                                                    i,
                                                    "name",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <input
                                            placeholder="Prix"
                                            value={item.price}
                                            onChange={(e) =>
                                                updateItem(
                                                    s,
                                                    c,
                                                    i,
                                                    "price",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <button
                                            onClick={() =>
                                                removeItem(s, c, i)
                                            }
                                            style={styles.remove}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}

                <button onClick={saveMenu} style={styles.saveBtn}>
                    Sauvegarder le menu
                </button>
            </main>
        </AdminGuard>
    )
}

/* ───────────────────────── STYLES ───────────────────────── */

const styles: Record<string, CSSProperties> = {
    container: { padding: 40, maxWidth: 1000, margin: "0 auto" },
    title: { fontSize: 26, marginBottom: 20 },
    loading: { padding: 40 },
    error: { padding: 40, color: "red" },
    addBtn: { marginBottom: 20, fontWeight: "bold" },
    section: {
        border: "1px solid #444",
        padding: 16,
        marginBottom: 20,
        borderRadius: 8
    },
    sectionTitle: { width: "100%", fontSize: 18, fontWeight: "bold" },
    category: {
        marginTop: 12,
        padding: 12,
        borderLeft: "3px solid #555"
    },
    categoryTitle: { fontWeight: "bold", width: "100%" },
    item: {
        display: "flex",
        gap: 8,
        marginTop: 6
    },
    subBtn: {
        marginTop: 8,
        fontSize: 13
    },
    remove: {
        color: "red",
        background: "none",
        border: "none",
        cursor: "pointer"
    },
    saveBtn: {
        marginTop: 30,
        padding: "12px 24px",
        backgroundColor: "#16a34a",
        color: "white",
        fontWeight: "bold",
        borderRadius: 6
    }
}
