import MenuWithCart from "@/components/MenuWithCart"
import MenuList from "@/components/MenuList"


type MenuResponse = {
  theme: {
    primaryColor?: string
    font?: string
  }
  orderMode: string
  sections: {
    title: string
    categories: {
      title: string
      items: {
        name: string
        price?: string
      }[]
    }[]
  }[]
}

// ❌ ICI : PAS DE WHATSAPP
// ❌ getMenu = uniquement fetch
async function getMenu(slug: string): Promise<MenuResponse> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/menus/${slug}?lang=fr`
  const res = await fetch(url, { cache: "no-store" })

  if (!res.ok) {
    throw new Error("Menu not found")
  }

  return res.json()
}

// ✅ ICI : AFFICHAGE + BOUTON
export default async function MenuPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  // 🔹 récupérer le slug
  const { slug } = await params

  // 🔹 récupérer le menu
  const menu = await getMenu(slug)

  // 🔹 CONFIG WHATSAPP (ÉTAPE 13.2)
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Bonjour, je souhaite commander chez ${slug}`
  )}`

  return (
    // 🔹 ICI COMMENCE LE JSX
    <main
      style={{
        padding: 40,
        color: menu.theme.primaryColor,
        fontFamily: menu.theme.font
      }}
    >
      {/* 🔹 BOUTON WHATSAPP */}
      {menu.orderMode === "whatsapp" && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            marginBottom: 24,
            padding: "12px 20px",
            backgroundColor: menu.theme.primaryColor,
            color: "#fff",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          Commander via WhatsApp
        </a>
      )}

      {/* 🔹 MODE WHATSAPP SIMPLE */}
      {menu.orderMode === "whatsapp" && <MenuList sections={menu.sections} />}

      {/* 🔹 MODE FORMULAIRE (PANIER) */}
      {menu.orderMode === "form" && (
        <MenuWithCart
          sections={menu.sections}
          primaryColor={menu.theme.primaryColor}
          slug={slug}
        />
      )}

      {/* 🔹 MODE CATALOGUE */}
      8{menu.orderMode === "catalogue" && <MenuList sections={menu.sections} />}


    </main>
  )
}
