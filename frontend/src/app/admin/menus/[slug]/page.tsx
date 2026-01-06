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
            items: { name: string; price?: string }[]
        }[]
    }[]
}

async function getMenu(slug: string): Promise<MenuResponse> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/menus/${slug}?lang=fr`,
        { cache: "no-store" }
    )

    if (!res.ok) {
        throw new Error("Menu not found")
    }

    return res.json()
}

export default async function MenuPage({
    params
}: {
    params: { slug: string }
}) {
    const menu = await getMenu(params.slug)

    return (
        <main
            style={{
                padding: 40,
                fontFamily: menu.theme.font,
                color: menu.theme.primaryColor
            }}
        >
            {menu.sections.map((section, i) => (
                <section key={i}>
                    <h2>{section.title}</h2>

                    {section.categories.map((cat, j) => (
                        <div key={j}>
                            <h3>{cat.title}</h3>
                            <ul>
                                {cat.items.map((item, k) => (
                                    <li key={k}>
                                        {item.name}{" "}
                                        {item.price && `- ${item.price}`}
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
