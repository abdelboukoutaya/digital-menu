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
  clientSlug: string
  language: string
  sections: Section[]
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
  if (!menu) return null

  const whatsappLink =
    menu.whatsappNumber &&
    `https://wa.me/${menu.whatsappNumber}?text=${encodeURIComponent(
      "Bonjour, je souhaite commander depuis votre menu."
    )}`

  return (
    <main style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 20 }}>
        {menu.clientSlug.replace("-", " ")}
      </h1>

      {/* BOUTON COMMANDER */}
      {menu.orderMode === "whatsapp" && whatsappLink && (
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.orderBtn}
        >
          📲 Commander via WhatsApp
        </a>
      )}

      {menu.orderMode === "form" && (
        <a href="#order-form" style={styles.orderBtn}>
          🛒 Commander
        </a>
      )}

      {/* MENU */}
      {menu.sections.map((section, si) => (
        <section key={si} style={{ marginTop: 40 }}>
          <h2>{section.title}</h2>

          {section.categories.map((cat, ci) => (
            <div key={ci} style={{ marginTop: 20 }}>
              <h3>{cat.title}</h3>

              <ul style={{ listStyle: "none", padding: 0 }}>
                {cat.items.map((item, ii) => (
                  <li
                    key={ii}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "8px 0",
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

      {/* FORMULAIRE SIMPLE */}
      {menu.orderMode === "form" && (
        <form id="order-form" style={{ marginTop: 50 }}>
          <h2>Commander</h2>

          <input
            placeholder="Nom"
            required
            style={styles.input}
          />
          <input
            placeholder="Téléphone"
            required
            style={styles.input}
          />
          <textarea
            placeholder="Votre commande"
            required
            style={styles.textarea}
          />

          <button style={styles.submitBtn}>
            Envoyer la commande
          </button>
        </form>
      )}
    </main>
  )
}

const styles: Record<string, React.CSSProperties> = {
  orderBtn: {
    display: "inline-block",
    marginBottom: 30,
    padding: "14px 20px",
    background: "#16a34a",
    color: "white",
    borderRadius: 8,
    fontWeight: "bold",
    textDecoration: "none",
  },
  input: {
    display: "block",
    width: "100%",
    padding: 12,
    marginBottom: 10,
  },
  textarea: {
    display: "block",
    width: "100%",
    padding: 12,
    height: 120,
    marginBottom: 10,
  },
  submitBtn: {
    background: "#2563eb",
    color: "white",
    padding: "12px 20px",
    borderRadius: 8,
    fontWeight: "bold",
  },
}
