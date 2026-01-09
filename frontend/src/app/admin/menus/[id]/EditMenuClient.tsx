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
    _uid: string
    name: string
    price?: string
}

type Category = {
    _uid: string
    title: string
    items: Item[]
}

type Section = {
    _uid: string
    title: string
    categories: Category[]
}

type Menu = {
    _id: string
    clientSlug: string
    language: string
    sections: Section[]
}

/* ───────── SORTABLE BLOCK ───────── */

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
        transition,
        touchAction: "none"
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

    const [isDirty, setIsDirty] = useState(false)
    const [showLeaveModal, setShowLeaveModal] = useState(false)

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
            .then((data) => {
                data.sections.forEach((s: any) => {
                    s._uid ||= crypto.randomUUID()
                    s.categories.forEach((c: any) => {
                        c._uid ||= crypto.randomUUID()
                        c.items.forEach((i: any) => {
                            i._uid ||= crypto.randomUUID()
                        })
                    })
                })
                setMenu(data)
            })
            .catch(() => setError("Impossible de charger le menu"))
            .finally(() => setLoading(false))
    }, [id, router])

    /* ───────── BEFORE UNLOAD ───────── */

    useEffect(() => {
        const onBackAttempt = () => {
            if (!isDirty) return

            // Revenir immédiatement sur la page courante
            window.history.pushState(null, "", window.location.href)

            // Ouvrir le popup
            setShowLeaveModal(true)
        }

        window.addEventListener("popstate", onBackAttempt)

        // IMPORTANT : on ajoute un état initial dans l'historique
        window.history.pushState(null, "", window.location.href)

        return () => {
            window.removeEventListener("popstate", onBackAttempt)
        }
        const handler = (e: BeforeUnloadEvent) => {
            if (!isDirty) return
            e.preventDefault()
            e.returnValue = ""
        }
        window.addEventListener("beforeunload", handler)
        return () => window.removeEventListener("beforeunload", handler)
    }, [isDirty])

    /* ───────── CRUD ───────── */

    const addSection = () => {
        if (!menu) return
        setMenu({
            ...menu,
            sections: [
                ...menu.sections,
                {
                    _uid: crypto.randomUUID(),
                    title: "Nouvelle section",
                    categories: []
                }
            ]
        })
        setIsDirty(true)
    }

    const addCategory = (s: number) => {
        if (!menu) return
        menu.sections[s].categories.push({
            _uid: crypto.randomUUID(),
            title: "Nouvelle catégorie",
            items: []
        })
        setMenu({ ...menu })
        setIsDirty(true)
    }

    const addItem = (s: number, c: number) => {
        if (!menu) return
        menu.sections[s].categories[c].items.push({
            _uid: crypto.randomUUID(),
            name: "Nouveau produit",
            price: ""
        })
        setMenu({ ...menu })
        setIsDirty(true)
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

        setIsDirty(false)
        router.push("/admin/menus")
    }

    const attemptLeave = () => {
        if (isDirty) setShowLeaveModal(true)
        else router.push("/admin/menus")
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

                <div style={{ marginBottom: 20 }}>
                    <button onClick={addSection} style={styles.addBtn}>
                        + Ajouter une section
                    </button>
                    <button onClick={attemptLeave} style={{ marginLeft: 10 }}>
                        Quitter
                    </button>
                </div>

                <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={(e) => {
                        const { active, over } = e
                        if (!over || active.id === over.id) return

                        const oldIndex = menu.sections.findIndex(
                            (s) => s._uid === active.id
                        )
                        const newIndex = menu.sections.findIndex(
                            (s) => s._uid === over.id
                        )

                        setMenu({
                            ...menu,
                            sections: arrayMove(
                                menu.sections,
                                oldIndex,
                                newIndex
                            )
                        })
                        setIsDirty(true)
                    }}
                >
                    <SortableContext
                        items={menu.sections.map((s) => s._uid)}
                        strategy={verticalListSortingStrategy}
                    >
                        {menu.sections.map((section, s) => (
                            <SortableBlock
                                key={section._uid}
                                id={section._uid}
                            >
                                <div style={styles.section}>
                                    <input
                                        value={section.title}
                                        onChange={(e) => {
                                            section.title = e.target.value
                                            setMenu({ ...menu })
                                            setIsDirty(true)
                                        }}
                                        style={styles.sectionTitle}
                                    />

                                    <button
                                        onClick={() => addCategory(s)}
                                        style={styles.subBtn}
                                    >
                                        + Ajouter une catégorie
                                    </button>

                                    {section.categories.map((cat, c) => (
                                        <div key={cat._uid} style={styles.category}>
                                            <input
                                                value={cat.title}
                                                onChange={(e) => {
                                                    cat.title = e.target.value
                                                    setMenu({ ...menu })
                                                    setIsDirty(true)
                                                }}
                                                style={styles.categoryTitle}
                                            />

                                            <button
                                                onClick={() => addItem(s, c)}
                                                style={styles.subBtn}
                                            >
                                                + Ajouter un produit
                                            </button>

                                            {cat.items.map((item) => (
                                                <div
                                                    key={item._uid}
                                                    style={styles.item}
                                                >
                                                    <input
                                                        value={item.name}
                                                        onChange={(e) => {
                                                            item.name =
                                                                e.target.value
                                                            setMenu({
                                                                ...menu
                                                            })
                                                            setIsDirty(true)
                                                        }}
                                                    />
                                                    <input
                                                        value={item.price}
                                                        onChange={(e) => {
                                                            item.price =
                                                                e.target.value
                                                            setMenu({
                                                                ...menu
                                                            })
                                                            setIsDirty(true)
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </SortableBlock>
                        ))}
                    </SortableContext>
                </DndContext>

                <button onClick={saveMenu} style={styles.saveBtn}>
                    Sauvegarder le menu
                </button>

                {showLeaveModal && (
                    <div style={modal.overlay}>
                        <div style={modal.box}>
                            <h3>Modifications non sauvegardées</h3>
                            <p>Que souhaitez-vous faire ?</p>

                            <div style={modal.actions}>
                                <button
                                    onClick={saveMenu}
                                    style={modal.save}
                                >
                                    Sauvegarder
                                </button>
                                <button
                                    onClick={() => {
                                        setIsDirty(false)
                                        router.push("/admin/menus")
                                    }}
                                    style={modal.leave}
                                >
                                    Quitter sans sauvegarder
                                </button>
                                <button
                                    onClick={() =>
                                        setShowLeaveModal(false)
                                    }
                                    style={modal.cancel}
                                >
                                    Annuler
                                </button>
                            </div>
                        </div>
                    </div>
                )}
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
    addBtn: { fontWeight: "bold" },
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

const modal: Record<string, CSSProperties> = {
    overlay: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000
    },
    box: {
        background: "#111",
        padding: 24,
        borderRadius: 8,
        width: 360,
        textAlign: "center"
    },
    actions: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        marginTop: 20
    },
    save: {
        background: "#16a34a",
        color: "white",
        padding: 10,
        fontWeight: "bold"
    },
    leave: {
        background: "#dc2626",
        color: "white",
        padding: 10
    },
    cancel: {
        background: "#444",
        color: "white",
        padding: 10
    }
}
