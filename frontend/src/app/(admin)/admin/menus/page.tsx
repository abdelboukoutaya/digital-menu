"use client"
import type { CSSProperties } from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import AdminGuard from "@/components/AdminGuard"
import CreateMenuForm from "./CreateMenuForm"

type Menu = {
    _id: string
    clientSlug: string
    language: string
}

export default function AdminMenusPage() {
    const [menus, setMenus] = useState<Menu[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        fetchMenus()
    }, [])

    const fetchMenus = async () => {
        try {
            const token = localStorage.getItem("admin_token")
            if (!token) {
                setError("Non authentifié")
                return
            }

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if (!res.ok) {
                throw new Error()
            }

            const data = await res.json()
            setMenus(data)
        } catch {
            setError("Impossible de charger les menus")
        } finally {
            setLoading(false)
        }
    }

    return (
        <AdminGuard>
            <main style={styles.container}>
                <header style={styles.header}>
                    <h1 style={styles.title}>Menus</h1>

                    <button
                        onClick={() => setShowForm(!showForm)}
                        style={styles.primaryButton}
                    >
                        {showForm ? "Fermer" : "Créer un menu"}
                    </button>
                </header>

                {showForm && (
                    <CreateMenuForm
                        onCreated={() => {
                            setShowForm(false)
                            fetchMenus()
                        }}
                    />
                )}

                {loading && <p>Chargement des menus…</p>}

                {error && <p style={styles.error}>{error}</p>}

                {!loading && menus.length === 0 && (
                    <p style={styles.empty}>Aucun menu disponible</p>
                )}

                {!loading && menus.length > 0 && (
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th>Client</th>
                                <th>Langue</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {menus.map((menu) => (
                                <tr key={menu._id}>
                                    <td>{menu.clientSlug}</td>
                                    <td>{menu.language}</td>
                                    <td>
                                        <Link
                                            href={`/admin/menus/${menu._id}`}
                                            style={styles.link}
                                        >
                                            Éditer
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </main>
        </AdminGuard>
    )
}

/* 🎨 STYLES */
const styles: Record<string, CSSProperties> = {
    container: {
        padding: 40,
        maxWidth: 900,
        margin: "0 auto"
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
    },
    title: {
        fontSize: 28
    },
    primaryButton: {
        padding: "10px 16px",
        fontWeight: "bold",
        cursor: "pointer"
    },
    error: {
        color: "red",
        marginTop: 20
    },
    empty: {
        marginTop: 20,
        color: "#999"
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        marginTop: 20
    },
    link: {
        color: "#22c55e",
        fontWeight: "bold",
        textDecoration: "underline"
    }
}
