"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useRequireAdmin } from "@/lib/requireAdmin"
import { getAdminToken } from "@/lib/auth"

const API = "https://chic-renewal-production.up.railway.app"

type Menu = {
    _id: string
    clientSlug: string
    language: string
    sections: any[]
    createdAt?: string
    updatedAt?: string
}

export default function MenusPage() {
    useRequireAdmin()
    const router = useRouter()

    const [menus, setMenus] = useState<Menu[]>([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)

    // Create form
    const [showCreate, setShowCreate] = useState(false)
    const [newSlug, setNewSlug] = useState("")
    const [newLang, setNewLang] = useState("fr")
    const [creating, setCreating] = useState(false)

    // Edit modal
    const [editMenu, setEditMenu] = useState<Menu | null>(null)
    const [editSlug, setEditSlug] = useState("")
    const [editLang, setEditLang] = useState("")

    // Delete confirmation
    const [deleteId, setDeleteId] = useState<string | null>(null)

    function fetchMenus() {
        setLoading(true)
        fetch(`${API}/api/admin/menus`, {
            headers: { Authorization: `Bearer ${getAdminToken()}` },
        })
            .then((res) => {
                if (!res.ok) throw new Error()
                return res.json()
            })
            .then((data) => {
                setMenus(data)
                setLoading(false)
            })
            .catch(() => {
                setError("Impossible de charger les menus")
                setLoading(false)
            })
    }

    useEffect(() => { fetchMenus() }, [])

    async function handleCreate() {
        if (!newSlug.trim()) return
        setCreating(true)
        try {
            const res = await fetch(`${API}/api/admin/menus`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getAdminToken()}`,
                },
                body: JSON.stringify({
                    clientSlug: newSlug.trim(),
                    language: newLang,
                    sections: [],
                }),
            })
            if (!res.ok) throw new Error()
            setNewSlug("")
            setNewLang("fr")
            setShowCreate(false)
            fetchMenus()
        } catch {
            alert("Erreur lors de la création du menu")
        } finally {
            setCreating(false)
        }
    }

    async function handleEdit() {
        if (!editMenu || !editSlug.trim()) return
        try {
            const res = await fetch(`${API}/api/admin/menus/${editMenu._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getAdminToken()}`,
                },
                body: JSON.stringify({
                    clientSlug: editSlug.trim(),
                    language: editLang,
                }),
            })
            if (!res.ok) throw new Error()
            setEditMenu(null)
            fetchMenus()
        } catch {
            alert("Erreur lors de la modification")
        }
    }

    async function handleDelete() {
        if (!deleteId) return
        try {
            await fetch(`${API}/api/admin/menus/${deleteId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${getAdminToken()}` },
            })
            setDeleteId(null)
            fetchMenus()
        } catch {
            alert("Erreur lors de la suppression")
        }
    }

    if (loading) return <p>Chargement…</p>
    if (error) return <p className="error">{error}</p>

    return (
        <>
            {/* HEADER */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <h1 style={{ margin: 0 }}>Menus</h1>
                <button
                    onClick={() => setShowCreate(!showCreate)}
                    style={{
                        background: showCreate ? "#6b7280" : "#2563eb",
                        padding: "10px 20px",
                        fontSize: 14,
                    }}
                >
                    {showCreate ? "✕ Annuler" : "+ Créer un menu"}
                </button>
            </div>

            {/* CREATE FORM */}
            {showCreate && (
                <div style={{
                    background: "white",
                    padding: 24,
                    borderRadius: 10,
                    marginBottom: 24,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    border: "1px solid #e5e7eb",
                }}>
                    <h2 style={{ fontSize: 18, marginBottom: 16 }}>Nouveau menu</h2>
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap" }}>
                        <div style={{ flex: 1, minWidth: 200 }}>
                            <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "#374151" }}>
                                Client slug
                            </label>
                            <input
                                placeholder="ex: restaurant-demo"
                                value={newSlug}
                                onChange={(e) => setNewSlug(e.target.value)}
                                style={{ width: "100%" }}
                            />
                        </div>
                        <div style={{ minWidth: 120 }}>
                            <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "#374151" }}>
                                Langue
                            </label>
                            <select value={newLang} onChange={(e) => setNewLang(e.target.value)} style={{ width: "100%" }}>
                                <option value="fr">🇫🇷 Français</option>
                                <option value="en">🇬🇧 English</option>
                                <option value="ar">🇲🇦 العربية</option>
                            </select>
                        </div>
                        <button
                            onClick={handleCreate}
                            disabled={creating || !newSlug.trim()}
                            style={{ background: "#059669", padding: "10px 24px" }}
                        >
                            {creating ? "Création..." : "✓ Créer"}
                        </button>
                    </div>
                </div>
            )}

            {/* MENUS TABLE */}
            {menus.length === 0 ? (
                <div style={{
                    textAlign: "center",
                    padding: 60,
                    background: "white",
                    borderRadius: 10,
                    color: "#6b7280",
                }}>
                    <p style={{ fontSize: 40, marginBottom: 12 }}>🍽️</p>
                    <p style={{ fontSize: 16, fontWeight: 500 }}>Aucun menu créé</p>
                    <p style={{ fontSize: 14 }}>Cliquez sur &quot;Créer un menu&quot; pour commencer</p>
                </div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Client</th>
                            <th>Langue</th>
                            <th>Sections</th>
                            <th style={{ textAlign: "right" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menus.map((m) => (
                            <tr key={m._id}>
                                <td>
                                    <strong>{m.clientSlug}</strong>
                                </td>
                                <td>
                                    <span style={{
                                        background: "#eff6ff",
                                        color: "#1d4ed8",
                                        padding: "4px 10px",
                                        borderRadius: 20,
                                        fontSize: 12,
                                        fontWeight: 600,
                                    }}>
                                        {m.language === "fr" ? "🇫🇷 FR" : m.language === "en" ? "🇬🇧 EN" : m.language === "ar" ? "🇲🇦 AR" : m.language.toUpperCase()}
                                    </span>
                                </td>
                                <td>{m.sections.length} section{m.sections.length !== 1 ? "s" : ""}</td>
                                <td style={{ textAlign: "right" }}>
                                    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                                        <button
                                            onClick={() => router.push(`/dashboard/menus/${m._id}/sections`)}
                                            style={{ background: "#2563eb", fontSize: 13, padding: "6px 14px" }}
                                        >
                                            📋 Gérer
                                        </button>
                                        <button
                                            onClick={() => {
                                                setEditMenu(m)
                                                setEditSlug(m.clientSlug)
                                                setEditLang(m.language)
                                            }}
                                            style={{ background: "#f59e0b", fontSize: 13, padding: "6px 14px" }}
                                        >
                                            ✏️ Modifier
                                        </button>
                                        <button
                                            onClick={() => setDeleteId(m._id)}
                                            style={{ background: "#dc2626", fontSize: 13, padding: "6px 14px" }}
                                        >
                                            🗑️ Supprimer
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* EDIT MODAL */}
            {editMenu && (
                <div style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000,
                }}>
                    <div style={{
                        background: "white",
                        padding: 32,
                        borderRadius: 12,
                        width: 420,
                        maxWidth: "90vw",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
                    }}>
                        <h2 style={{ fontSize: 20, marginBottom: 20 }}>Modifier le menu</h2>
                        <div style={{ marginBottom: 16 }}>
                            <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "#374151" }}>
                                Client slug
                            </label>
                            <input
                                value={editSlug}
                                onChange={(e) => setEditSlug(e.target.value)}
                                style={{ width: "100%" }}
                            />
                        </div>
                        <div style={{ marginBottom: 24 }}>
                            <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "#374151" }}>
                                Langue
                            </label>
                            <select value={editLang} onChange={(e) => setEditLang(e.target.value)} style={{ width: "100%" }}>
                                <option value="fr">🇫🇷 Français</option>
                                <option value="en">🇬🇧 English</option>
                                <option value="ar">🇲🇦 العربية</option>
                            </select>
                        </div>
                        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                            <button
                                onClick={() => setEditMenu(null)}
                                style={{ background: "#6b7280" }}
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleEdit}
                                style={{ background: "#059669" }}
                            >
                                ✓ Enregistrer
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* DELETE CONFIRMATION */}
            {deleteId && (
                <div style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000,
                }}>
                    <div style={{
                        background: "white",
                        padding: 32,
                        borderRadius: 12,
                        width: 400,
                        maxWidth: "90vw",
                        textAlign: "center",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
                    }}>
                        <p style={{ fontSize: 40, marginBottom: 12 }}>⚠️</p>
                        <h2 style={{ fontSize: 18, marginBottom: 8 }}>Supprimer ce menu ?</h2>
                        <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 24 }}>
                            Cette action est irréversible. Toutes les sections et produits seront supprimés.
                        </p>
                        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                            <button
                                onClick={() => setDeleteId(null)}
                                style={{ background: "#6b7280" }}
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleDelete}
                                style={{ background: "#dc2626" }}
                            >
                                🗑️ Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
