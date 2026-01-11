"use client"

import Link from "next/link"
import AdminGuard from "@/components/AdminGuard"

export default function AdminDashboard() {
    return (
        <AdminGuard>
            <main style={styles.container}>
                <h1 style={styles.title}>Dashboard Admin</h1>

                <div style={styles.grid}>
                    <DashboardCard
                        title="Clients"
                        description="Gérer les clients, thèmes et modes de commande"
                        href="/admin/clients"
                        emoji="👥"
                    />

                    <DashboardCard
                        title="Menus"
                        description="Créer et éditer les menus"
                        href="/admin/menus"
                        emoji="📋"
                    />

                    <DashboardCard
                        title="Commandes"
                        description="Voir et traiter les commandes"
                        href="/admin/orders"
                        emoji="🧾"
                    />
                </div>
            </main>
        </AdminGuard>
    )
}

/* ───────── COMPONENT ───────── */

function DashboardCard({
    title,
    description,
    href,
    emoji
}: {
    title: string
    description: string
    href: string
    emoji: string
}) {
    return (
        <Link href={href} style={styles.card}>
            <div style={styles.emoji}>{emoji}</div>
            <h2 style={styles.cardTitle}>{title}</h2>
            <p style={styles.cardDesc}>{description}</p>
        </Link>
    )
}

/* ───────── STYLES ───────── */

const styles: Record<string, React.CSSProperties> = {
    container: {
        padding: 40,
        maxWidth: 1000,
        margin: "0 auto"
    },
    title: {
        fontSize: 28,
        marginBottom: 30
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 20
    },
    card: {
        display: "block",
        padding: 24,
        borderRadius: 12,
        background: "#111",
        border: "1px solid #333",
        textDecoration: "none",
        color: "white",
        transition: "transform 0.15s ease, box-shadow 0.15s ease"
    },
    emoji: {
        fontSize: 32,
        marginBottom: 10
    },
    cardTitle: {
        fontSize: 20,
        marginBottom: 6
    },
    cardDesc: {
        fontSize: 14,
        opacity: 0.7
    }
}
