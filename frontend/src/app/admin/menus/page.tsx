"use client"

import { useEffect, useState } from "react"
import CreateMenuForm from "./CreateMenuForm"
type Menu = {
    _id: string
    clientSlug: string
    language: string
}

export default function AdminMenus() {
    const [menus, setMenus] = useState<Menu[]>([])
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        fetchMenus()
    }, [])

    const fetchMenus = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus`
        )
        const data = await res.json()
        setMenus(data)
    }

    return (
        <main style={{ padding: 40 }}>
            <h2>Menus</h2>

            <button
                onClick={() => setShowForm(!showForm)}
                style={{ marginBottom: 20 }}
            >
                {showForm ? "Fermer" : "Créer un menu"}
            </button>

            {showForm && <CreateMenuForm onCreated={fetchMenus} />}

            <table border={1} cellPadding={8}>
                <thead>
                    <tr>
                        <th>Client</th>
                        <th>Langue</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <h2>Menus - VERSION DEBUG ACTION</h2>

                    {menus.map((menu) => (
                        <tr key={menu._id}>
                            <td>{menu.clientSlug}</td>
                            <td>{menu.language}</td>
                            <td>
                                <a
                                    href={`/admin/menus/${menu._id}`}
                                    style={{
                                        color: "#4ade80",
                                        fontWeight: "bold",
                                        textDecoration: "underline",
                                        cursor: "pointer"
                                    }}
                                >
                                    Éditer
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>


            </table>
        </main>
    )
}
