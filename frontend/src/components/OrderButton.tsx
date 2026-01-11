"use client"

import { useState } from "react"

type Props = {
    slug: string
}

export default function OrderButton({ slug }: Props) {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const sendOrder = async () => {
        setLoading(true)
        setError(null)

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        clientSlug: slug,
                        language: "fr",
                        items: [
                            {
                                name: "Commande test",
                                price: ""
                            }
                        ],
                        source: "form"
                    })
                }
            )

            if (!res.ok) {
                throw new Error("Erreur lors de l’envoi")
            }

            setSuccess(true)
        } catch (e) {
            setError("Impossible d’envoyer la commande")
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <p
                style={{
                    marginTop: 30,
                    padding: 16,
                    backgroundColor: "#16a34a",
                    color: "white",
                    borderRadius: 8,
                    fontWeight: "bold"
                }}
            >
                Commande envoyée ✅
            </p>
        )
    }

    return (
        <div style={{ marginTop: 30 }}>
            {error && (
                <p style={{ color: "#dc2626", marginBottom: 10 }}>
                    {error}
                </p>
            )}

            <button
                onClick={sendOrder}
                disabled={loading}
                style={{
                    padding: "14px 24px",
                    backgroundColor: loading ? "#9ca3af" : "#16a34a",
                    color: "white",
                    fontSize: 16,
                    fontWeight: "bold",
                    borderRadius: 8,
                    cursor: loading ? "not-allowed" : "pointer",
                    border: "none"
                }}
            >
                {loading ? "Envoi en cours…" : "Commander"}
            </button>
        </div>
    )
}
