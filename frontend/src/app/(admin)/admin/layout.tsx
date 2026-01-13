"use client"

import React from "react"
import Link from "next/link"
import AdminGuard from "@/components/AdminGuard"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AdminGuard>
            <div style={styles.wrapper}>
                <aside style={styles.sidebar}>
                    <h2 style={styles.logo}>Digital Menu</h2>

                    <Link href="/admin" style={styles.link}>
                        Dashboard
                    </Link>
                    <Link href="/admin/clients" style={styles.link}>
                        Clients
                    </Link>
                    <Link href="/admin/menus" style={styles.link}>
                        Menus
                    </Link>
                    <Link href="/admin/orders" style={styles.link}>
                        Commandes
                    </Link>
                </aside>

                <main style={styles.content}>{children}</main>
            </div>
        </AdminGuard>
    )
}

const styles: Record<string, React.CSSProperties> = {
    wrapper: {
        display: "flex",
        minHeight: "100vh",
    },
    sidebar: {
        width: 240,
        background: "#0b0f19",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 10,
    },
    logo: {
        color: "white",
        fontSize: 20,
        marginBottom: 30,
    },
    link: {
        color: "white",
        textDecoration: "none",
        padding: "8px 12px",
        borderRadius: 6,
        background: "#111827",
    },
    content: {
        flex: 1,
        padding: 40,
        background: "#f9fafb",
    },
}
