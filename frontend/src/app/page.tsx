export default function HomePage() {
    return (
        <main className="container">
            <h1 style={{ fontSize: 42, marginBottom: 20 }}>Digital Menu</h1>

            <p style={{ fontSize: 18, lineHeight: 1.6, marginBottom: 40 }}>
                Digital Menu est une plateforme moderne qui permet aux restaurants,
                cafés et hôtels de créer et gérer leurs menus en ligne facilement,
                sans impression papier.
            </p>

            <h2 style={{ fontSize: 26, marginBottom: 16 }}>
                Pourquoi utiliser Digital Menu ?
            </h2>

            <ul style={{ fontSize: 16, lineHeight: 1.8, marginBottom: 50 }}>
                <li>📱 Menus accessibles via QR Code</li>
                <li>⚡ Mise à jour instantanée</li>
                <li>🎨 Design personnalisable</li>
                <li>🌍 Accessible sur tous les appareils</li>
            </ul>

            <a
                href="/admin"
                style={{
                    display: "inline-block",
                    background: "#111827",
                    color: "white",
                    padding: "12px 24px",
                    borderRadius: 8,
                }}
            >
                Accéder à l’espace administrateur
            </a>
        </main>
    )
}
