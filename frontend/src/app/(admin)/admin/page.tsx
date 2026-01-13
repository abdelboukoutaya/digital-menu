"use client"

import { useEffect, useState } from "react"

type Stats = {
    clients: number
    menus: number
    orders: number
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null)
    const [status, setStatus] = useState<"ok" | "error" | "loading">("loading")

    useEffect(() => {
        const token = localStorage.getItem("admin_token")
        if (!token) return

        Promise.all([
            fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/admin/stats`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            ),
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/health`)
        ])
            .then(async ([statsRes, healthRes]) => {
                if (!statsRes.ok || !healthRes.ok) {
                    throw new Error("API error")
                }

                const statsData = await statsRes.json()
                await healthRes.json()

                setStats(statsData)
                setStatus("ok")
            })
            .catch(() => {
                setStatus("error")
            })
    }, [])

    if (status === "loading") {
        return <p>Chargement du dashboard…</p>
    }

    if (status === "error") {
        return (
            <p style={{ color: "red" }}>
                Impossible de charger l’état du système
            </p>
        )
    }

    return (
        <div>
            <h1 style={{ marginBottom: 10 }}>
                Bienvenue dans Digital Menu CMS
            </h1>

            <p style={{ opacity: 0.7, marginBottom: 30 }}>
                Tableau de bord — état global du système
            </p>

            {/* ÉTAT SYSTÈME */}
            <div style={styles.systemBox}>
                <strong>État du système :</strong>{" "}
                <span style={{ color: "#16a34a" }}>
                    API opérationnelle
                </span>
            </div>

            {/* STATS */}
            <div style={styles.statsGrid}>
                <StatCard
                    label="Clients"
                    value={stats?.clients ?? 0}
                />
                <StatCard
                    label="Menus"
                    value={stats?.menus ?? 0}
                />
                <StatCard
                    label="Commandes"
                    value={stats?.orders ?? 0}
                />
            </div>

            {/* MESSAGE ACCUEIL */}
            <div style={styles.welcomeBox}>
                <h2>Que souhaitez-vous faire ?</h2>
                <ul>
                    <li>➡ Gérer les clients</li>
                    <li>➡ Créer ou modifier des menus</li>
                    <li>➡ Suivre les commandes</li>
                </ul>
            </div>
        </div>
    )
}

/* ───────── COMPONENTS ───────── */

function StatCard({
    label,
    value
}: {
    label: string
    value: number
}) {
    return (
        <div style={styles.card}>
            <div style={styles.cardLabel}>{label}</div>
            <div style={styles.cardValue}>{value}</div>
        </div>
    )
}

/* ───────── STYLES ───────── */

const styles: Record<string, React.CSSProperties> = {
    systemBox: {
        padding: 16,
        borderRadius: 8,
        background: "#052e16",
        border: "1px solid #166534",
        marginBottom: 30
    },
    statsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 20,
        marginBottom: 40
    },
    card: {
        padding: 20,
        borderRadius: 12,
        background: "#111",
        border: "1px solid #333"
    },
    cardLabel: {
        fontSize: 14,
        opacity: 0.7,
        marginBottom: 6
    },
    cardValue: {
        fontSize: 32,
        fontWeight: "bold"
    },
    welcomeBox: {
        padding: 24,
        borderRadius: 12,
        background: "#0b0f19",
        border: "1px solid #1f2937"
    }
}
