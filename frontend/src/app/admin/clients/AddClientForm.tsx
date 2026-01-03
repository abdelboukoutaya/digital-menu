"use client"

import { useState } from "react"

type Props = {
    onCreated: () => void
}

export default function AddClientForm({ onCreated }: Props) {
    const [name, setName] = useState("")
    const [slug, setSlug] = useState("")
    const [orderMode, setOrderMode] = useState("catalogue")

    const submit = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/clients`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                slug,
                orderMode,
                theme: {
                    primaryColor: "#000000",
                    font: "sans-serif"
                }
            })
        })

        setName("")
        setSlug("")
        setOrderMode("catalogue")
        onCreated()
    }

    return (
        <div style={{ marginBottom: 20 }}>
            <div>
                <input
                    placeholder="Nom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div>
                <input
                    placeholder="Slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                />
            </div>

            <div>
                <select
                    value={orderMode}
                    onChange={(e) => setOrderMode(e.target.value)}
                >
                    <option value="catalogue">Catalogue</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="form">Formulaire</option>
                </select>
            </div>

            <button onClick={submit} style={{ marginTop: 10 }}>
                Enregistrer
            </button>
        </div>
    )
}
