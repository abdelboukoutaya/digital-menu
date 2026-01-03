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
                    </tr>
                </thead>
                <tbody>
                    {menus.map((menu) => (
                        <tr key={menu._id}>
                            <td>{menu.clientSlug}</td>
                            <td>{menu.language}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    )
}
