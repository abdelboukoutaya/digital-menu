"use client"

export default function LoginPage() {
    return (
        <div
            style={{
                width: 360,
                background: "white",
                padding: 24,
                borderRadius: 8,
                boxShadow: "0 10px 20px rgba(0,0,0,.1)",
            }}
        >
            <h1 style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
                Admin Login
            </h1>

            <form style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Mot de passe" />
                <button type="submit">Connexion</button>
            </form>
        </div>
    )
}
