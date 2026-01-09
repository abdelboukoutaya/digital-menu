"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import AdminGuard from "@/components/AdminGuard"

type Section = {
    title: string
    categories: any[]
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

    // 🔹 Chargement du menu
    useEffect(() => {
        if (!id) {
            setError("Menu introuvable")
            setLoading(false)
            return
        }

        const fetchMenu = async () => {
            const token = localStorage.getItem("admin_token")
            if (!token) {
                router.replace("/admin/login")
                return
            }

            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                if (!res.ok) throw new Error()

                const data = await res.json()
                setMenu(data)
            } catch {
                setError("Impossible de charger le menu")
            } finally {
                setLoading(false)
            }
        }

        fetchMenu()
    }, [id, router])

    // 🔹 Ajouter une section
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

    // 🔹 Modifier titre section
    const updateSectionTitle = (index: number, value: string) => {
        if (!menu) return
        const sections = [...menu.sections]
        sections[index].title = value
        setMenu({ ...menu, sections })
    }

    // 🔹 Supprimer section
    const removeSection = (index: number) => {
        if (!menu) return
        setMenu({
            ...menu,
            sections: menu.sections.filter((_, i) => i !== index)
        })
    }

    // 🔹 Sauvegarde
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

    // 🔹 États UI
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

    if (!menu) {
        return (
            <AdminGuard>
                <p style={styles.error}>Menu introuvable</p>
            </AdminGuard>
        )
    }

    return (
        <AdminGuard>
            <main style={styles.container}>
                <h1 style={styles.title}>
                    Menu — {menu.clientSlug} ({menu.language})
                </h1>

                <button onClick={addSection} style={styles.addButton}>
                    + Ajouter une section
                </button>

                {menu.sections.map((section, i) => (
                    <div key={i} style={styles.sectionCard}>
                        <input
                            value={section.title}
                            onChange={(e) =>
                                updateSectionTitle(i, e.target.value)
                            }
                            style={styles.sectionInput}
                        />

                        <button
                            onClick={() => removeSection(i)}
                            style={styles.deleteButton}
                        >
                            Supprimer
                        </button>
                    </div>
                ))}

                <button onClick={saveMenu} style={styles.saveButton}>
                    Sauvegarder le menu
                </button>
            </main>
        </AdminGuard>
    )
}

/* 🎨 STYLES (simple & propre) */
const styles = {
    container: {
        padding: 40,
        maxWidth: 900,
        margin: "0 auto"
    },
    title: {
        fontSize: 24,
        marginBottom: 20
    },
    loading: {
        padding: 40
    },
    error: {
        padding: 40,
        color: "red"
    },
    addButton: {
        padding: "10px 16px",
        marginBottom: 20,
        fontWeight: "bold",
        cursor: "pointer"
    },
    sectionCard: {
        border: "1px solid #444",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16
    },
    sectionInput: {
        width: "100%",
        fontSize: 16,
        fontWeight: "bold",
        padding: 8
    },
    deleteButton: {
        marginTop: 10,
        color: "red",
        background: "none",
        border: "none",
        cursor: "pointer"
    },
    saveButton: {
        marginTop: 30,
        padding: "12px 24px",
        backgroundColor: "#16a34a",
        color: "white",
        fontWeight: "bold",
        borderRadius: 6,
        cursor: "pointer"
    }
}
