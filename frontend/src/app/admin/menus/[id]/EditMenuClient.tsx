"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import type { CSSProperties } from "react"
import AdminGuard from "@/components/AdminGuard"

/* DND */
import { DndContext, closestCenter } from "@dnd-kit/core"
import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
    arrayMove
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

/* ───────── TYPES ───────── */

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

/* ───────── SORTABLE WRAPPER ───────── */

function SortableBlock({
    id,
    children
}: {
    id: string
    children: React.ReactNode
}) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <div ref={setNodeRef} style={style}>
            <div style={styles.dragHandle} {...attributes} {...listeners}>
                ☰
            </div>
            {children}
        </div>
    )
}

/* ───────── PAGE ───────── */

export default function EditMenuClient() {
    const { id } = useParams<{ id: string }>()
    const router = useRouter()

    const [menu, setMenu] = useState<Menu | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    /* ───────── LOAD MENU ───────── */

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
            .then(setMenu)
            .catch(() => setError("Impossible de charger le menu"))
            .finally(() => setLoading(false))
    }, [id, router])

    /* ───────── ADD / REMOVE ───────── */

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

    const addCategory = (s: number) => {
        if (!menu) return
        menu.sections[s].categories.push({
            title: "Nouvelle catégorie",
            items: []
        })
        setMenu({ ...menu })
    }

    const addItem = (s: number, c: number) => {
        if (!menu) return
        menu.sections[s].categories[c].items.push({
            name: "Nouveau produit",
            price: ""
        })
        setMenu({ ...menu })
    }

    /* ───────── SAVE ───────── */

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

    /* ───────── UI STATES ───────── */

    if (loading)
        return (
            <AdminGuard>
                <p style={styles.loading}>Chargement…</p>
            </AdminGuard>
        )

    if (error)
        return (
            <AdminGuard>
                <p style={styles.error}>{error}</p>
            </AdminGuard>
        )

    if (!menu) return null

    /* ───────── RENDER ───────── */

    return (
        <AdminGuard>
            <main style={styles.container}>
                <h1 style={styles.title}>
                    Menu — {menu.clientSlug} ({menu.language})
                </h1>

                <button onClick={addSection} style={styles.addBtn}>
                    + Ajouter une section
                </button>

                <DndContext collisionDetection={closestCenter}>
                    <SortableContext
                        items={menu.sections.map((s) => s.title)}
                        strategy={verticalListSortingStrategy}
                    >
                        {menu.sections.map((section, s) => (
                            <SortableBlock key={section.title} id={section.title}>
                                <div style={styles.section}>
                                    <input
                                        value={section.title}
                                        onChange={(e) => {
                                            section.title = e.target.value
                                            setMenu({ ...menu })
                                        }}
                                        style={styles.sectionTitle}
                                    />

                                    <button
                                        onClick={() => addCategory(s)}
                                        style={styles.subBtn}
                                    >
                                        + Ajouter une catégorie
                                    </button>

                                    <SortableContext
                                        items={section.categories.map(
                                            (c) => c.title
                                        )}
                                        strategy={
                                            verticalListSortingStrategy
                                        }
                                    >
                                        {section.categories.map((cat, c) => (
                                            <SortableBlock
                                                key={cat.title}
                                                id={cat.title}
                                            >
                                                <div style={styles.category}>
                                                    <input
                                                        value={cat.title}
                                                        onChange={(e) => {
                                                            cat.title =
                                                                e.target.value
                                                            setMenu({
                                                                ...menu
                                                            })
                                                        }}
                                                        style={
                                                            styles.categoryTitle
                                                        }
                                                    />

                                                    <button
                                                        onClick={() =>
                                                            addItem(s, c)
                                                        }
                                                        style={styles.subBtn}
                                                    >
                                                        + Ajouter un produit
                                                    </button>

                                                    <SortableContext
                                                        items={cat.items.map(
                                                            (i) => i.name
                                                        )}
                                                        strategy={
                                                            verticalListSortingStrategy
                                                        }
                                                    >
                                                        {cat.items.map(
                                                            (item, i) => (
                                                                <SortableBlock
                                                                    key={
                                                                        item.name
                                                                    }
                                                                    id={
                                                                        item.name
                                                                    }
                                                                >
                                                                    <div
                                                                        style={
                                                                            styles.item
                                                                        }
                                                                    >
                                                                        <input
                                                                            value={
                                                                                item.name
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) => {
                                                                                item.name =
                                                                                    e.target.value
                                                                                setMenu(
                                                                                    {
                                                                                        ...menu
                                                                                    }
                                                                                )
                                                                            }}
                                                                            placeholder="Nom"
                                                                        />
                                                                        <input
                                                                            value={
                                                                                item.price
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) => {
                                                                                item.price =
                                                                                    e.target.value
                                                                                setMenu(
                                                                                    {
                                                                                        ...menu
                                                                                    }
                                                                                )
                                                                            }}
                                                                            placeholder="Prix"
                                                                        />
                                                                    </div>
                                                                </SortableBlock>
                                                            )
                                                        )}
                                                    </SortableContext>
                                                </div>
                                            </SortableBlock>
                                        ))}
                                    </SortableContext>
                                </div>
                            </SortableBlock>
                        ))}
                    </SortableContext>
                </DndContext>

                <button onClick={saveMenu} style={styles.saveBtn}>
                    Sauvegarder le menu
                </button>
            </main>
        </AdminGuard>
    )
}

/* ───────── STYLES ───────── */

const styles: Record<string, CSSProperties> = {
    container: { padding: 40, maxWidth: 1000, margin: "0 auto" },
    title: { fontSize: 26, marginBottom: 20 },
    loading: { padding: 40 },
    error: { padding: 40, color: "red" },
    dragHandle: {
        cursor: "grab",
        userSelect: "none",
        fontSize: 18,
        marginBottom: 6
    },
    addBtn: { marginBottom: 20, fontWeight: "bold" },
    subBtn: { marginTop: 8, fontSize: 13 },
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
    categoryTitle: { width: "100%", fontWeight: "bold" },
    item: { display: "flex", gap: 8, marginTop: 6 },
    saveBtn: {
        marginTop: 30,
        padding: "12px 24px",
        backgroundColor: "#16a34a",
        color: "white",
        fontWeight: "bold",
        borderRadius: 6
    }
}
