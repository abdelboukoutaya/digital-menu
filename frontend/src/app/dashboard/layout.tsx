"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { clearAdminToken } from "@/lib/auth"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()

    function logout() {
        clearAdminToken()
        router.replace("/admin")
    }

    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <aside
                style={{
                    width: 240,
                    background: "#0b0f19",
                    color: "white",
                    padding: 20,
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                }}
            >
                <h2 style={{ marginBottom: 30 }}>Digital Menu</h2>

                <Link href="/dashboard">Dashboard</Link>
                <Link href="/dashboard/clients">Clients</Link>
                <Link href="/dashboard/menus">Menus</Link>
                <Link href="/dashboard/orders">Commandes</Link>

                <div style={{ flex: 1 }} />

                <button
                    onClick={logout}
                    style={{
                        background: "#7f1d1d",
                        color: "white",
                        border: "none",
                        padding: "10px",
                        borderRadius: 6,
                        cursor: "pointer",
                    }}
                >
                    Déconnexion
                </button>
            </aside>

            <main style={{ flex: 1, padding: 40 }}>{children}</main>
        </div>
    )
}
