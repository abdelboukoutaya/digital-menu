export default function AdminLoginPage() {
    return (
        <div className="login-box">
            <h1>Connexion Administrateur</h1>

            <form>
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Mot de passe" required />
                <button type="submit">Connexion</button>
            </form>
        </div>
    )
}
