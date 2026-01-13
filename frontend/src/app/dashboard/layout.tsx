"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { clearAdminToken } from "@/lib/auth"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const router = useRouter()

    function logout() {
        clearAdminToken()
        router.replace("/admin")
    }

    function NavItem({ href, label }: { href: string; label: string }) {
        const active = pathname === href

        return (
            <Link
                href={href}
                style={{
                    padding: "10px 14px",
                    borderRadius: 6,
                    background: active ? "#1f2937" : "transparent",
                    color: "white",
                    textDecoration: "none",
                }}
            >
                {label}
            </Link>
        )
    }

    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            {/* SIDEBAR */}
            <aside
                style={{
                    width: 240,
                    background: "#0b0f19",
                    color: "white",
                    padding: 20,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                }}
            >
                <h2 style={{ marginBottom: 30 }}>Digital Menu</h2>

                <NavItem href="/dashboard" label="Dashboard" />
                <NavItem href="/dashboard/clients" label="Clients" />
                <NavItem href="/dashboard/menus" label="Menus" />
                <NavItem href="/dashboard/orders" label="Commandes" />

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

            {/* CONTENT */}
            <div style={{ flex: 1 }}>
                {/* HEADER */}
                <header
                    style={{
                        height: 60,
                        borderBottom: "1px solid #e5e7eb",
                        padding: "0 24px",
                        display: "flex",
                        alignItems: "center",
                        background: "white",
                    }}
                >
                    <strong>Espace Administrateur</strong>
                </header>

                <main style={{ padding: 32 }}>{children}</main>
            </div>
        </div>
    )
}
