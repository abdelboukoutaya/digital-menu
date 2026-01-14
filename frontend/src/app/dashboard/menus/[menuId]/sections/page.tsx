"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useRequireAdmin } from "@/lib/requireAdmin"
import { getAdminToken } from "@/lib/auth"

type Section = {
    _id?: string
    title: string
    categories: any[]
}

export default function SectionsPage() {
    useRequireAdmin()

    const { menuId } = useParams<{ menuId: string }>()
    const router = useRouter()

    const [sections, setSections] = useState<Section[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        async function fetchMenu() {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/${menuId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${getAdminToken()}`,
                        },
                    }
                )

                if (!res.ok) throw new Error("Erreur chargement sections")

                const data = await res.json()
                setSections(data.sections || [])
            } catch (e: any) {
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }

        fetchMenu()
    }, [menuId])

    async function saveSections(updatedSections: Section[]) {
        try {
            await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus/${menuId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getAdminToken()}`,
                    },
                    body: JSON.stringify({ sections: updatedSections }),
                }
            )
        } catch {
            alert("Erreur sauvegarde")
        }
    }

    function addSection() {
        const updated = [
            ...sections,
            { title: "Nouvelle section", categories: [] },
        ]
        setSections(updated)
        saveSections(updated)
    }

    function updateTitle(index: number, title: string) {
        const updated = [...sections]
        updated[index].title = title
        setSections(updated)
    }

    function removeSection(index: number) {
        if (!confirm("Supprimer cette section ?")) return
        const updated = sections.filter((_, i) => i !== index)
        setSections(updated)
        saveSections(updated)
    }

    if (loading) return <p>Chargement...</p>
    if (error) return <p className="error">{error}</p>

    return (
        <>
            <h1>Sections</h1>

            <button onClick={addSection}>+ Ajouter une section</button>

            <ul style={{ marginTop: 20 }}>
                {sections.map((section, index) => (
                    <li key={index} style={{ marginBottom: 12 }}>
                        <input
                            value={section.title}
                            onChange={(e) =>
                                updateTitle(index, e.target.value)
                            }
                            onBlur={() => saveSections(sections)}
                        />

                        <button
                            onClick={() =>
                                router.push(
                                    `/dashboard/menus/${menuId}/sections/${index}`
                                )
                            }
                            style={{ marginLeft: 10 }}
                        >
                            Catégories
                        </button>

                        <button
                            onClick={() => removeSection(index)}
                            className="button-danger"
                            style={{ marginLeft: 10 }}
                        >
                            Supprimer
                        </button>
                    </li>
                ))}
            </ul>

            <button
                onClick={() => router.push(`/dashboard/menus/${menuId}`)}
                style={{ marginTop: 20 }}
            >
                Retour au menu
            </button>
        </>
    )
}
