"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useRequireAdmin } from "@/lib/requireAdmin"
import { getAdminToken } from "@/lib/auth"

const API = "https://chic-renewal-production.up.railway.app"

type Section = {
    title: string
    categories: any[]
}

export default function SectionsPage() {
    useRequireAdmin()

    const { menuId } = useParams<{ menuId: string }>()
    const [sections, setSections] = useState<Section[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${API}/api/admin/menus/${menuId}`, {
            headers: {
                Authorization: `Bearer ${getAdminToken()}`,
            },
        })
            .then((r) => r.json())
            .then((menu) => {
                setSections(menu.sections || [])
                setLoading(false)
            })
    }, [menuId])

    function saveAll() {
        fetch(`${API}/api/admin/menus/${menuId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAdminToken()}`,
            },
            body: JSON.stringify({ sections }),
        }).then(() => alert("Sections enregistrées"))
    }

    if (loading) return <p>Chargement…</p>

    return (
        <>
            {/* BREADCRUMB */}
            <nav style={{ marginBottom: 20 }}>
                <Link href="/dashboard/menus">Menus</Link> {" > "}
                <Link href={`/dashboard/menus/${menuId}`}>Menu</Link> {" > "}
                <strong>Sections</strong>
            </nav>

            {/* HEADER */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1>Sections</h1>
                <button onClick={saveAll}>💾 Enregistrer</button>
            </div>

            <button
                onClick={() =>
                    setSections([...sections, { title: "Nouvelle section", categories: [] }])
                }
            >
                + Ajouter une section
            </button>

            <ul style={{ marginTop: 20 }}>
                {sections.map((section, i) => (
                    <li key={i} style={{ marginBottom: 10 }}>
                        <input
                            value={section.title}
                            onChange={(e) => {
                                const copy = [...sections]
                                copy[i].title = e.target.value
                                setSections(copy)
                            }}
                        />

                        <Link
                            href={`/dashboard/menus/${menuId}/sections/${i}`}
                            style={{ marginLeft: 10 }}
                        >
                            Catégories
                        </Link>

                        <button
                            style={{ marginLeft: 10 }}
                            onClick={() =>
                                setSections(sections.filter((_, x) => x !== i))
                            }
                        >
                            Supprimer
                        </button>
                    </li>
                ))}
            </ul>
        </>
    )
}
