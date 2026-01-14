"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

const API = "https://chic-renewal-production.up.railway.app"

type Item = {
    name: string
    price?: string
}

type Category = {
    title: string
    items: Item[]
}

type Section = {
    title: string
    categories: Category[]
}

type Menu = {
    clientSlug: string
    sections: Section[]
}

export default function PublicOrderForm() {
    const { clientSlug } = useParams<{ clientSlug: string }>()
    const router = useRouter()

    const [menu, setMenu] = useState<Menu | null>(null)
    const [selected, setSelected] = useState<Item[]>([])
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")

    useEffect(() => {
        fetch(`${API}/api/menus/${clientSlug}`)
            .then((r) => r.json())
            .then((data) => {
                setMenu(data)
                setLoading(false)
            })
    }, [clientSlug])

    function toggleItem(item: Item) {
        setSelected((prev) =>
            prev.find((i) => i.name === item.name)
                ? prev.filter((i) => i.name !== item.name)
                : [...prev, item]
        )
    }

    function submitOrder() {
        if (!name || !phone || selected.length === 0) {
            alert("Veuillez remplir tous les champs")
            return
        }

        fetch(`${API}/api/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                clientSlug,
                name,
                phone,
                items: selected,
                source: "form",
            }),
        }).then(() => {
            alert("Commande envoyée")
            router.push(`/menu/${clientSlug}`)
        })
    }

    if (loading) return <p>Chargement…</p>
    if (!menu) return null

    return (
        <main style={{ padding: 20, maxWidth: 700, margin: "0 auto" }}>
            <h1>Commander</h1>

            <input
                placeholder="Votre nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                placeholder="Téléphone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />

            <h3>Produits</h3>

            {menu.sections.map((section, si) => (
                <div key={si}>
                    <h4>{section.title}</h4>

                    {section.categories.map((cat, ci) => (
                        <div key={ci}>
                            <strong>{cat.title}</strong>
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                {cat.items.map((item, ii) => (
                                    <li key={ii}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={!!selected.find((i) => i.name === item.name)}
                                                onChange={() => toggleItem(item)}
                                            />
                                            {item.name} {item.price && `— ${item.price}`}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ))}

            <button onClick={submitOrder}>Envoyer la commande</button>
        </main>
    )
}
