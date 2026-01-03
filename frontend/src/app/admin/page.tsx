export default function AdminDashboard() {
    return (
        <main style={{ padding: 40 }}>
            <h1>Admin Dashboard</h1>

            <ul>
                <li><a href="/admin/clients">Clients</a></li>
                <li><a href="/admin/menus">Menus</a></li>
                <li><a href="/admin/orders">Orders</a></li>
            </ul>
        </main>
    )
}
