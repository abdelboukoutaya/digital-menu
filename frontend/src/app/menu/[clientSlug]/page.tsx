"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

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
  clientSlug?: string
  language?: string
  sections?: Section[]
  orderMode?: "none" | "whatsapp" | "form"
  whatsappNumber?: string
}

export default function PublicMenuPage() {
  const { clientSlug } = useParams<{ clientSlug: string }>()
  const [menu, setMenu] = useState<Menu | null>(null)
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

  const whatsappLink =
    menu.orderMode === "whatsapp" && menu.whatsappNumber
      ? `https://wa.me/${menu.whatsappNumber.replace(/\D/g, "")}`
      : null

  return (
    <main style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ textTransform: "capitalize", marginBottom: 30 }}>
        {displayName}
      </h1>

      {sections.length === 0 && <p>Aucun menu disponible</p>}

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
                    {item.price && <strong>{item.price}</strong>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}

      {/* ───────── BOUTON COMMANDER ───────── */}
      {menu.orderMode === "whatsapp" && whatsappLink && (
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.whatsapp}
        >
          Commander via WhatsApp
        </a>
      )}

      {menu.orderMode === "form" && (
        <a
          href={`/menu/${clientSlug}/order`}
          style={styles.form}
        >
          Commander
        </a>
      )}
    </main>
  )
}

/* ───────── STYLES ───────── */

const styles: Record<string, React.CSSProperties> = {
  whatsapp: {
    position: "fixed",
    bottom: 20,
    right: 20,
    background: "#25D366",
    color: "white",
    padding: "14px 20px",
    borderRadius: 30,
    fontWeight: "bold",
    textDecoration: "none",
  },
  form: {
    position: "fixed",
    bottom: 20,
    right: 20,
    background: "#2563eb",
    color: "white",
    padding: "14px 20px",
    borderRadius: 30,
    fontWeight: "bold",
    textDecoration: "none",
  },
}
