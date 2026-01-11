"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

export default function AdminGuard({
    children
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        // ✅ NE PAS protéger la page login
        if (pathname === "/admin/login") return

        const token = localStorage.getItem("admin_token")
        const role = localStorage.getItem("admin_role")

        if (!token || role !== "admin") {
            router.replace("/admin/login")
        }
    }, [router, pathname])

    return <>{children}</>
}
