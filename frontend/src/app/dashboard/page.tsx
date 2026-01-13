"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("admin_token")
        if (!token) router.replace("/admin")
    }, [router])

    return (
        <>
            <h1>Dashboard Administrateur</h1>
            <p>Bienvenue dans le tableau de bord de Digital Menu.</p>
        </>
    )
}
