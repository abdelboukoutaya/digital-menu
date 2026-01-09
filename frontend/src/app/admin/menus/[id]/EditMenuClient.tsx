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

/* ───────── SORTABLE SECTION ───────── */

function SortableSection({
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
        transition,
        cursor: "grab"
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
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
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                if (!res.ok) throw new Error()
                return res.json()
            })
            .then((data) => setMenu(data))
            .catch(() => setError("Impossible de charger le menu"))
            .finally(() => setLoading(false))
    }, [id, router])

    /* ───────── SECTIONS CRUD ───────── */

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

    const updateSectionTitle = (index: number, value: string) => {
        if (!menu) return
        const sections = [...menu.sections]
        sections[index].title = value
        setMenu({ ...menu, sections })
    }

    const removeSection = (index: number) => {
        if (!menu) return
        setMenu({
            ...menu,
            sections: menu.sections.filter((_, i) => i !== index)
        })
    }

    /* ───────── DRAG & DROP SECTIONS ───────── */

    const onDragEndSections = (event: any) => {
        if (!menu) return
        const { active, over } = event
        if (!over || active.id === over.id) return

        const oldIndex = menu.sections.findIndex(
            (s) => s.title === active.id
        )
        const newIndex = menu.sections.findIndex(
            (s) => s.title === over.id
        )

        const sections = arrayMove(menu.sections, oldIndex, newIndex)
        setMenu({ ...menu, sections })
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

    if (loading) {
        return (
            <AdminGuard>
                <p style={styles.loading}>Chargement…</p>
            </AdminGuard>
        )
    }

    if (error) {
        return (
            <AdminGuard>
                <p style={styles.error}>{error}</p>
            </AdminGuard>
        )
    }

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

                <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={onDragEndSections}
                >
                    <SortableContext
                        items={menu.sections.map((s) => s.title)}
                        strategy={verticalListSortingStrategy}
                    >
                        {menu.sections.map((section, i) => (
                            <SortableSection
                                key={section.title}
                                id={section.title}
                            >
                                <div style={styles.section}>
                                    <input
                                        value={section.title}
                                        onChange={(e) =>
                                            updateSectionTitle(
                                                i,
                                                e.target.value
                                            )
                                        }
                                        style={styles.sectionTitle}
                                    />

                                    <button
                                        onClick={() => removeSection(i)}
                                        style={styles.remove}
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </SortableSection>
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
    container: {
        padding: 40,
        maxWidth: 900,
        margin: "0 auto"
    },
    title: {
        fontSize: 26,
        marginBottom: 20
    },
    loading: {
        padding: 40
    },
    error: {
        padding: 40,
        color: "red"
    },
    addBtn: {
        marginBottom: 20,
        fontWeight: "bold"
    },
    section: {
        border: "1px solid #444",
        padding: 16,
        marginBottom: 12,
        borderRadius: 8,
        background: "#111"
    },
    sectionTitle: {
        width: "100%",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8
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
        borderRadius: 6,
        cursor: "pointer"
    }
}
