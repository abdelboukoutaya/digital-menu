"use client"

import { useRequireAdmin } from "@/lib/requireAdmin"

export default function DashboardPage() {
    useRequireAdmin()

    return (
        <>
            <h1>Dashboard Administrateur</h1>
            <p>Bienvenue dans le tableau de bord de Digital Menu.</p>
        </>
    )
}
