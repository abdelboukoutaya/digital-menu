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

  return (
    <main style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ textTransform: "capitalize", marginBottom: 30 }}>
        {menu.clientSlug.replace("-", " ")}
      </h1>

      {menu.sections.map((section, si) => (
        <section key={si} style={{ marginBottom: 40 }}>
          <h2 style={{ marginBottom: 15 }}>{section.title}</h2>

          {section.categories.map((cat, ci) => (
            <div key={ci} style={{ marginBottom: 20 }}>
              <h3 style={{ marginBottom: 10 }}>{cat.title}</h3>

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
    </main>
  )
}
