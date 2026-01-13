"use client"

import { useState } from "react"

type Props = {
    onCreated: () => void
}

export default function CreateMenuForm({ onCreated }: Props) {
    const [clientSlug, setClientSlug] = useState("")
    const [language, setLanguage] = useState("fr")

    const submit = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/menus`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                clientSlug,
                language,
                sections: []
            })
        })

        setClientSlug("")
        setLanguage("fr")
        onCreated()
    }

    return (
        <div style={{ marginBottom: 20 }}>
            <div>
                <input
                    placeholder="Client slug (ex: restaurant-demo)"
                    value={clientSlug}
                    onChange={(e) => setClientSlug(e.target.value)}
                />
            </div>

            <div>
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="fr">FR</option>
                    <option value="en">EN</option>
                </select>
            </div>

            <button onClick={submit} style={{ marginTop: 10 }}>
                Créer
            </button>
        </div>
    )
}
