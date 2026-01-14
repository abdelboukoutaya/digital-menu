"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

const API = "https://chic-renewal-production.up.railway.app"

/* ───────── TYPES ───────── */

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

type MenuResponse = {
  clientSlug?: string
  sections?: Section[]
  menuType?: "catalogue" | "boutique"
  orderMode?: "none" | "whatsapp" | "form"
  whatsappNumber?: string | null
}

/* ───────── HELPERS ───────── */

function buildWhatsAppLink(
  whatsappNumber: string,
  restaurantName: string,
  items: Item[]
) {
  const cleanNumber = whatsappNumber.replace(/\D/g, "")

  const message = encodeURIComponent(
    `Bonjour,\n\nJe souhaite commander chez *${restaurantName}* :\n\n` +
    items
      .map(
        (i) =>
          `• ${i.name}${i.price ? ` — ${i.price}` : ""}`
      )
      .join("\n") +
    `\n\nMerci.`
  )

  return `https://wa.me/${cleanNumber}?text=${message}`
}

/* ───────── PAGE ───────── */

export default function PublicMenuPage() {
  const { clientSlug } = useParams<{ clientSlug: string }>()
  const [menu, setMenu] = useState<MenuResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch(`${API}/api/menus/${clientSlug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Menu introuvable")
        return res.json()
      })
      .then(setMenu)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [clientSlug])

  if (loading) return <p>Chargement…</p>
  if (error) return <p>{error}</p>
  if (!menu) return <p>Menu indisponible</p>

  const sections = Array.isArray(menu.sections) ? menu.sections : []

  const displayName =
    typeof menu.clientSlug === "string"
      ? menu.clientSlug.replace(/-/g, " ")
      : clientSlug.replace(/-/g, " ")

  const allItems = sections.flatMap((s) =>
    s.categories.flatMap((c) => c.items)
  )

  const showWhatsAppButton =
    menu.menuType === "boutique" &&
    menu.orderMode === "whatsapp" &&
    typeof menu.whatsappNumber === "string" &&
    menu.whatsappNumber.length > 0

  const whatsappLink = showWhatsAppButton
    ? buildWhatsAppLink(
      menu.whatsappNumber!,
      displayName,
      allItems
    )
    : null

  return (
    <main style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 30, textTransform: "capitalize" }}>
        {displayName}
      </h1>

      {sections.length === 0 && (
        <p>Aucun menu disponible</p>
      )}

      {sections.map((section, si) => (
        <section key={si} style={{ marginBottom: 40 }}>
          <h2>{section.title}</h2>

          {section.categories.map((cat, ci) => (
            <div key={ci} style={{ marginTop: 15 }}>
              <h3>{cat.title}</h3>

              <ul style={{ listStyle: "none", padding: 0 }}>
                {cat.items.map((item, ii) => (
                  <li
                    key={ii}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "6px 0",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <span>{item.name}</span>
                    {item.price && (
                      <strong>{item.price}</strong>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}

      {/* ───────── BOUTON COMMANDER ───────── */}
      {whatsappLink && (
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            background: "#25D366",
            color: "white",
            padding: "14px 20px",
            borderRadius: 30,
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          Commander via WhatsApp
        </a>
      )}
    </main>
  )
}
