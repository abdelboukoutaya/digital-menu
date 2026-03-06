"use client"

import { useState } from "react"

type Item = {
    name: string
    price?: string
    image?: string
}

type Props = {
    sections: {
        title: string
        categories: {
            title: string
            items: Item[]
        }[]
    }[]
    primaryColor?: string
    slug: string
}

export default function MenuWithCart({
    sections,
    primaryColor = "#000",
    slug
}: Props) {
    const [cart, setCart] = useState<Item[]>([])

    const addToCart = (item: Item) => {
        setCart([...cart, item])
    }

    const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(
        `Bonjour, voici ma commande chez ${slug}:\n` +
        cart.map((i) => `- ${i.name} ${i.price ?? ""}`).join("\n")
    )}`

    return (
        <div>
            {/* MENU */}
            {sections.map((section, i) => (
                <section key={i}>
                    <h2>{section.title}</h2>

                    {section.categories.map((category, j) => (
                        <div key={j}>
                            <h3>{category.title}</h3>
                            <ul>
                                {category.items.map((item, k) => (
                                    <li key={k}>
                                        {item.name} {item.price && `- ${item.price}`}
                                        <button
                                            onClick={() => addToCart(item)}
                                            style={{
                                                marginLeft: 10,
                                                padding: "4px 8px",
                                                backgroundColor: primaryColor,
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: 4,
                                                cursor: "pointer"
                                            }}
                                        >
                                            Ajouter
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            ))}

            {/* PANIER */}
            {cart.length > 0 && (
                <div style={{ marginTop: 30 }}>
                    <h3>Votre commande</h3>
                    <ul>
                        {cart.map((item, i) => (
                            <li key={i}>
                                {item.name} {item.price && `- ${item.price}`}
                            </li>
                        ))}
                    </ul>

                    <a
                        href={whatsappUrl}
                        target="_blank"
                        style={{
                            display: "inline-block",
                            marginTop: 12,
                            padding: "12px 20px",
                            backgroundColor: primaryColor,
                            color: "#fff",
                            borderRadius: 8,
                            textDecoration: "none",
                            fontWeight: "bold"
                        }}
                    >
                        Envoyer la commande
                    </a>
                </div>
            )}
        </div>
    )
}
