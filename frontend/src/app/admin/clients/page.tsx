"use client"

import { useEffect, useState } from "react"

type Client = {
    _id: string
    name: string
    slug: string
    orderMode: string
}

export default function AdminClients() {
    const [clients, setClients] = useState<Client[]>([])
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        fetchClients()
    }, [])

    const fetchClients = async () => {
        console.log("API URL:", process.env.NEXT_PUBLIC_API_URL)

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/admin/clients`
        )

        console.log("STATUS:", res.status)

        const data = await res.json()
        console.log("DATA:", data)

        setClients(data)
    }


    return (
        <main style={{ padding: 40 }}>
            <h2>Clients</h2>

            <button
                onClick={() => setShowForm(!showForm)}
                style={{ marginBottom: 20 }}
            >
                {showForm ? "Fermer" : "Ajouter un client"}
            </button>

            {showForm && <AddClientForm onCreated={fetchClients} />}

            <table border={1} cellPadding={8}>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Slug</th>
                        <th>Mode commande</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client) => (
                        <tr key={client._id}>
                            <td>{client.name}</td>
                            <td>{client.slug}</td>
                            <td>{client.orderMode}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    )
}
