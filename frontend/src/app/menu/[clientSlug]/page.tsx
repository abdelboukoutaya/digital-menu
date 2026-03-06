"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

const API = "https://chic-renewal-production.up.railway.app"

/* ───────── TYPES ───────── */

type Item = {
  name: string
  price?: string
  image?: string
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
  menuType: "catalogue" | "boutique"
  orderMode: "none" | "whatsapp" | "form"
  whatsappNumber?: string
}

/* ───────── HELPERS ───────── */

function buildWhatsAppLink(
  phone: string,
  restaurant: string,
  items: Item[]
) {
  const number = phone.replace(/\D/g, "")

  const message = encodeURIComponent(
    `Bonjour,\n\nJe souhaite commander chez *${restaurant}* :\n\n` +
    items
      .map(
        (i) => `• ${i.name}${i.price ? ` — ${i.price}` : ""}`
      )
      .join("\n") +
    `\n\nMerci.`
  )

  return `https://wa.me/${number}?text=${message}`
}

/* ───────── PAGE ───────── */

export default function PublicMenuPage() {
  const { clientSlug } = useParams<{ clientSlug: string }>()
  const [menu, setMenu] = useState<Menu | null>(null)
  const [cart, setCart] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API}/api/menus/${clientSlug}`)
      .then((res) => res.json())
      .then(setMenu)
      .finally(() => setLoading(false))
  }, [clientSlug])

  if (loading) return <p>Chargement…</p>
  if (!menu) return <p>Menu introuvable</p>

  const restaurantName = menu.clientSlug.replace(/-/g, " ")

  const canOrder =
    menu.menuType === "boutique" &&
    menu.orderMode === "whatsapp" &&
    menu.whatsappNumber

  const whatsappLink =
    canOrder && cart.length > 0
      ? buildWhatsAppLink(
        menu.whatsappNumber!,
        restaurantName,
        cart
      )
      : null

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <h1 style={{ marginBottom: 30 }}>{restaurantName}</h1>

      {menu.sections.map((section, si) => (
        <section key={si} style={{ marginBottom: 40 }}>
          <h2>{section.title}</h2>

          {section.categories.map((cat, ci) => (
            <div key={ci} style={{ marginTop: 20 }}>
              <h3>{cat.title}</h3>

              {cat.items.map((item, ii) => {
                const selected = cart.some(
                  (i) => i.name === item.name
                )

                return (
                  <div
                    key={ii}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 0",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 6 }}
                        />
                      )}
                      <div>
                        <strong>{item.name}</strong>
                        {item.price && (
                          <div style={{ fontSize: 13 }}>
                            {item.price}
                          </div>
                        )}
                      </div>
                    </div>

                    {canOrder && (
                      <button
                        onClick={() => {
                          setCart((prev) =>
                            selected
                              ? prev.filter(
                                (i) =>
                                  i.name !== item.name
                              )
                              : [...prev, item]
                          )
                        }}
                      >
                        {selected ? "Retirer" : "Ajouter"}
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </section>
      ))}

      {/* ───────── PANIER FIXE ───────── */}
      {canOrder && cart.length > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            background: "#111",
            color: "white",
            padding: 16,
            borderRadius: 10,
            width: 280,
          }}
        >
          <strong>Votre commande</strong>

          <ul style={{ paddingLeft: 16 }}>
            {cart.map((i, idx) => (
              <li key={idx}>
                {i.name} {i.price && `(${i.price})`}
              </li>
            ))}
          </ul>

          {whatsappLink && (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                marginTop: 10,
                background: "#25D366",
                color: "white",
                padding: 10,
                textAlign: "center",
                borderRadius: 6,
                textDecoration: "none",
              }}
            >
              Commander via WhatsApp
            </a>
          )}
        </div>
      )}
    </main>
  )
}
