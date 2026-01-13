"use client"

import { useRequireAdmin } from "@/lib/requireAdmin"

export default function DashboardPage() {
    useRequireAdmin()

    return (
        <>
            <h1 style={{ fontSize: 28, marginBottom: 12 }}>
                Tableau de bord
            </h1>

            <p>
                Gérez vos clients, menus et commandes depuis cet espace.
            </p>
        </>
    )
}
