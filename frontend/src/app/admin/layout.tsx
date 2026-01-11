"use client"

import React from "react" // ✅ OBLIGATOIRE
import Link from "next/link"
import { usePathname } from "next/navigation"
import AdminGuard from "@/components/AdminGuard"

export default function AdminLayout({
    children
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    return (
        <AdminGuard>
            <div style={styles.wrapper}>
                {/* SIDEBAR */}
                <aside style={styles.sidebar}>
                    <h2 style={styles.logo}>Digital Menu</h2>

                    <NavLink href="/admin" label="Dashboard" pathname={pathname} />
                    <NavLink
                        href="/admin/clients"
                        label="Clients"
                        pathname={pathname}
                    />
                    <NavLink
                        href="/admin/menus"
                        label="Menus"
                        pathname={pathname}
                    />
                    <NavLink
                        href="/admin/orders"
                        label="Commandes"
                        pathname={pathname}
                    />
                </aside>

                {/* CONTENT */}
                <main style={styles.content}>{children}</main>
            </div>
        </AdminGuard>
    )
}

/* ───── COMPONENT ───── */

function NavLink({
    href,
    label,
    pathname
}: {
    href: string
    label: string
    pathname: string
}) {
    const active = pathname === href

    return (
        <Link
            href={href}
            style={{
                ...styles.link,
                backgroundColor: active ? "#1f2937" : "transparent"
            }}
        >
            {label}
        </Link>
    )
}

/* ───── STYLES ───── */

const styles: Record<string, React.CSSProperties> = {
    wrapper: {
        display: "flex",
        minHeight: "100vh"
    },
    sidebar: {
        width: 240,
        background: "#0b0f19",
        padding: 20,
        borderRight: "1px solid #1f2937"
    },
    logo: {
        fontSize: 20,
        marginBottom: 30,
        color: "white"
    },
    link: {
        display: "block",
        padding: "10px 14px",
        borderRadius: 8,
        color: "white",
        textDecoration: "none",
        marginBottom: 6
    },
    content: {
        flex: 1,
        padding: 40
    }
}
