type Item = {
    name: string
    price?: string
}

type Props = {
    sections: {
        title: string
        categories: {
            title: string
            items: Item[]
        }[]
    }[]
}

export default function MenuList({ sections }: Props) {
    return (
        <div>
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
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            ))}
        </div>
    )
}
