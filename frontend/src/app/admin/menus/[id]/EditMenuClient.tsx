"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import type { CSSProperties } from "react"
import AdminGuard from "@/components/AdminGuard"

/* DND */
import {
    DndContext,
    closestCenter
} from "@dnd-kit/core"

import {
    SortableContext,
    verticalListSortingStrategy,
    useSortable,
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

/* ───────── GENERIC SORTABLE ───────── */

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

    /* ───────── HELPERS ───────── */

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

    if (loading) return <AdminGuard><p style={styles.loading}>Chargement…</p></AdminGuard>
    if (error) return <AdminGuard><p style={styles.error}>{error}</p></AdminGuard>
    if (!menu) return null

    /* ───────── RENDER ───────── */

    return (
        <AdminGuard>
            <main style={styles.container}>
                <h1 style={styles.title}>
                    Menu — {menu.clientSlug} ({menu.language})
                </h1>

                <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={(e) => {
                        const { active, over } = e
                        if (!over || active.id === over.id) return
                        const oldIndex = menu.sections.findIndex(
                            (s) => s.title === active.id
                        )
                        const newIndex = menu.sections.findIndex(
                            (s) => s.title === over.id
                        )
                        setMenu({
                            ...menu,
                            sections: arrayMove(
                                menu.sections,
                                oldIndex,
                                newIndex
                            )
                        })
                    }}
                >
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
                                            const sections = [...menu.sections]
                                            sections[s].title = e.target.value
                                            setMenu({ ...menu, sections })
                                        }}
                                        style={styles.sectionTitle}
                                    />

                                    {/* CATEGORIES */}
                                    <DndContext
                                        collisionDetection={closestCenter}
                                        onDragEnd={(e) => {
                                            const { active, over } = e
                                            if (!over || active.id === over.id) return
                                            const cats = section.categories
                                            const old = cats.findIndex(c => c.title === active.id)
                                            const neu = cats.findIndex(c => c.title === over.id)
                                            cats.splice(0, cats.length, ...arrayMove(cats, old, neu))
                                            setMenu({ ...menu })
                                        }}
                                    >
                                        <SortableContext
                                            items={section.categories.map(c => c.title)}
                                            strategy={verticalListSortingStrategy}
                                        >
                                            {section.categories.map((cat, c) => (
                                                <SortableBlock key={cat.title} id={cat.title}>
                                                    <div style={styles.category}>
                                                        <input
                                                            value={cat.title}
                                                            onChange={(e) => {
                                                                cat.title = e.target.value
                                                                setMenu({ ...menu })
                                                            }}
                                                            style={styles.categoryTitle}
                                                        />

                                                        {/* ITEMS */}
                                                        <DndContext
                                                            collisionDetection={closestCenter}
                                                            onDragEnd={(e) => {
                                                                const { active, over } = e
                                                                if (!over || active.id === over.id) return
                                                                const items = cat.items
                                                                const old = items.findIndex(i => i.name === active.id)
                                                                const neu = items.findIndex(i => i.name === over.id)
                                                                items.splice(0, items.length, ...arrayMove(items, old, neu))
                                                                setMenu({ ...menu })
                                                            }}
                                                        >
                                                            <SortableContext
                                                                items={cat.items.map(i => i.name)}
                                                                strategy={verticalListSortingStrategy}
                                                            >
                                                                {cat.items.map((item, i) => (
                                                                    <SortableBlock key={item.name} id={item.name}>
                                                                        <div style={styles.item}>
                                                                            <input
                                                                                value={item.name}
                                                                                onChange={(e) => {
                                                                                    item.name = e.target.value
                                                                                    setMenu({ ...menu })
                                                                                }}
                                                                                placeholder="Nom"
                                                                            />
                                                                            <input
                                                                                value={item.price}
                                                                                onChange={(e) => {
                                                                                    item.price = e.target.value
                                                                                    setMenu({ ...menu })
                                                                                }}
                                                                                placeholder="Prix"
                                                                            />
                                                                        </div>
                                                                    </SortableBlock>
                                                                ))}
                                                            </SortableContext>
                                                        </DndContext>
                                                    </div>
                                                </SortableBlock>
                                            ))}
                                        </SortableContext>
                                    </DndContext>
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
        fontSize: 18,
        padding: "4px 8px",
        userSelect: "none"
    },
    section: {
        border: "1px solid #444",
        padding: 16,
        marginBottom: 20,
        borderRadius: 8,
        background: "#111"
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
    saveBtn: {
        marginTop: 30,
        padding: "12px 24px",
        backgroundColor: "#16a34a",
        color: "white",
        fontWeight: "bold",
        borderRadius: 6
    }
}
