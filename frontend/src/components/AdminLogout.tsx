"use client"

import { useRouter } from "next/navigation"

export default function AdminLogout() {
    const router = useRouter()

    const logout = () => {
        localStorage.removeItem("admin_token")
        router.push("/admin/login")
    }

    return (
        <button
            onClick={logout}
            style={{
                marginTop: 20,
                padding: "8px 14px",
                background: "#ef4444",
                color: "white",
                borderRadius: 6
            }}
        >
            Se déconnecter
        </button>
    )
}
